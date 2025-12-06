from fashion.api.fastapi.services import app
from fashion.api.fastapi.models.user_model import UserIn, UserOut
from fashion.api.fastapi.transformers.user_transformer import UserTransformer as ut
from typing import List
from fashion.models.user import User
from fashion.processors.user_processor import UserProcessor as up

@app.get('/fashion/api/users', response_model=List[UserOut], tags=['Users'])
async def get_all_users() -> List[UserOut]:
    usrs: List[User] = up.get_all_users()
    return [ut.user_b2p(u) for u in usrs]

@app.get('/fashion/api/users/{uid}', response_model=UserOut, tags=['Users'])
async def get_user_by_id(uid: str) -> UserOut:
    usr: User = up.get_user_by_id(uid)
    return ut.user_b2p(usr)

@app.post('/fashion/api/users', response_model=UserOut, tags=['Users'])
async def create_user(usr: UserIn) -> UserOut:
    res = up.create_user(ut.user_p2b(usr))
    return ut.user_b2p(res)

@app.put('/fashion/api/users/{uid}', response_model=bool, tags=['Users'])
async def update_user(uid: str, usr: UserIn) -> bool:
    res = up.update_user(uid, ut.user_p2b(usr))
    return res

@app.patch('/fashion/api/users/{uid}', response_model=bool, tags=['Users'])
async def update_password(uid: str, pwd: str) -> bool:
    res = up.update_password(uid, pwd)
    return res

@app.delete('/fashion/api/users/{uid}', response_model=bool, tags=['Users'])
async def delete_user(uid: str) -> bool:
    res = up.delete_user(uid)
    return res

@app.delete('/fashion/api/users', response_model=bool, tags=['Users'])
async def delete_user(uids: List[str]) -> bool:
    res = up.delete_users(uids)
    return res