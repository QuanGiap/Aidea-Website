from pydantic import BaseModel

class ProblemBase(BaseModel):
    title: str
    body: str

