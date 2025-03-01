from fastapi import FastAPI
import models
from database import engine


# post problem

# post comment
# delete comment 


# update upvotes

app = FastAPI()

# models.Base.metadata.create_all(bind=engine)


@app.get("/")
async def root():
    return {"message: hello world"}

