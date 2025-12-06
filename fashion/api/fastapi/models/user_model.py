from pydantic import BaseModel, EmailStr


class User(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    confirm_pass: str
    user_role: str

class UserIn(User):
    pass

class UserOut(User):
    uid: str