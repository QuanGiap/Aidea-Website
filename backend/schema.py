from pydantic import BaseModel, EmailStr

class CreateUser(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginUser(BaseModel):
    username: str
    password:str

class CreateComment(BaseModel):    
    body: str
    post_id: int
    