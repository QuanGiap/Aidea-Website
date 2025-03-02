from fastapi import FastAPI, Depends, HTTPException
import models
from database import get_db, engine
from sqlalchemy.orm import Session
import schema
from passlib.context import CryptContext
from sqlalchemy.exc import SQLAlchemyError
import logging
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os


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

# models.Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

load_dotenv(dotenv_path='../.env')

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        return False
    return user

app = FastAPI()

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
    

@app.get("/")
async def root():
    return {"message: hello world"}

