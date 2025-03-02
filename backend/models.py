from database import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, text
from sqlalchemy.orm import relationship
from sqlalchemy.orm import mapped_column
from sqlalchemy import ForeignKey

class Problems(Base):
    __tablename__ = "problems"

    id = mapped_column(Integer, primary_key=True, nullable=False)
    #reddit_id  = Column(String,unique=True, nullable=False)
    title = Column(String,nullable=False)
    body = Column(String,nullable=False)
    category = Column(String)
    url = Column(String)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    upvotes = Column(Integer, default=0)

    comments = relationship("Comments", back_populates="problem")

class Comments(Base):
    __tablename__ = "comments"

    id = Column(Integer,primary_key=True,nullable=False)
    problem_id = mapped_column(ForeignKey("problems.id"))
    user_id = mapped_column(ForeignKey("users.id"))
    comment_text = Column(String,nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    upvotes = Column(Integer, default=0)

    problem = relationship("Problems", back_populates="comments")
    user = relationship("Users", back_populates="comments")

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer,primary_key=True,nullable=False)
    username = Column(String,unique=True, nullable=False)
    email = Column(String,unique=True, nullable=False)
    password_hash = Column(String,nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    comments = relationship("Comments", back_populates="user")
