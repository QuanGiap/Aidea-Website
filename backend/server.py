from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import models
from database import get_db, engine
from sqlalchemy.orm import Session
import schema
from passlib.context import CryptContext
from sqlalchemy.exc import SQLAlchemyError
import logging
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO)
logging.getLogger('passlib').setLevel(logging.ERROR)
logger = logging.getLogger(__name__)


# **PRIORITY
# get posts
# signup
# login
# post comment


# **IF HAVE TIME
# delete comment 
# edit/update comment

# update posts upvotes
# update comment upvotes

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

load_dotenv(dotenv_path='../.env')


SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(username: str, password: str, db: Session):
    user = db.query(models.Users).filter(models.Users.username == username).first()
    if not user:
        return False
    if not pwd_context.verify(password, user.password_hash):
        return False
    return user

def get_user_by_username(db: Session, username: str):
    return db.query(models.Users).filter(models.Users.username == username).first()


origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/posts")
async def get_posts(db: Session = Depends(get_db)):
    try:
        posts = db.query(models.Problems).all()
        if not posts:
            raise HTTPException(status_code=404, detail="No posts found")
        
        posts_dict = [
            {
                "id": post.id,
                "title": post.title,
                "body": post.body,
                "category": post.category,
                "url": post.url,
                "created_at": post.created_at,
                "upvotes": post.upvotes,
                "comments": post.comments,
            }
            for post in posts
        ]
        return posts_dict
    
    except SQLAlchemyError as e:
        logger.error(f"Database error occurred: {e}")
        raise HTTPException(status_code=500, detail="Database error occurred") 

@app.post("/signup")
async def user_signup(user: schema.CreateUser, db: Session = Depends(get_db)):
    try:
        db_user = db.query(models.Users).filter(models.Users.email == user.email).first()
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        password_hash = get_password_hash(user.password)
        db_user = models.Users(username=user.username, email=user.email, password_hash=password_hash)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return {"username": db_user.username, "email": db_user.email}
    except SQLAlchemyError as e:
        db.rollback()  
        logger.error(f"Database error occurred: {e}")
        raise HTTPException(status_code=500, detail="Database error occurred") 
    

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        return payload
    except JWTError:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")

@app.get("/verify-token/{token}")
async def verify_user_token(token: str):
    verify_token(token=token)
    return {"message": "Token is valid"}


@app.post('/login')
async def user_login(user: schema.LoginUser, db: Session = Depends(get_db)):
    db_user = db.query(models.Users).filter(models.Users.username == user.username).first()
    
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    if not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    access_token_expires = timedelta(minutes=30) 
    access_token = create_access_token(data={"sub": db_user.username}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer"}



def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        
        user = db.query(models.Users).filter(models.Users.username == username).first()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")
    
@app.get("/comments")
async def get_comments(db: Session = Depends(get_db)):
    try:

        comments = db.query(models.Comments).all()

        if not comments:
            raise HTTPException(status_code=404, detail="No comments found")

        comment_list = []
        for comment in comments:
            comment_data = {
                "comment_id": comment.id,
                "body": comment.comment_text,
                "post_id": comment.problem_id,
                "user_id": comment.user_id,
                "created_at": comment.created_at,  # Assuming you have a created_at field
                "username": comment.user.username  # Assuming you have a User model and relationship defined
            }
            comment_list.append(comment_data)

        return {"comments": comment_list}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/comments")
async def post_comment(comment: schema.CreateComment, db: Session = Depends(get_db), current_user: models.Users = Depends(get_current_user)):
    post = db.query(models.Problems).filter(models.Problems.id == comment.post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    new_comment = models.Comments(comment_text=comment.body, user_id=current_user.id, problem_id=comment.post_id)
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    
    return {"message": "Comment created successfully", 
            "comment": {"id": new_comment.id, "text": new_comment.comment_text, "user_id": new_comment.user_id, "post_id": new_comment.problem_id}}
@app.get("/")
async def root():
    return {"message: hello world"}

