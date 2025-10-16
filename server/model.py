from pydantic import BaseModel, EmailStr
from datetime import datetime

class Feedback(BaseModel):
    name:str
    email:EmailStr
    phone:str
    rating:int
    feedback:str
    created_by:datetime = datetime.now()

class Login(BaseModel):
    username:str
    password:str