from fastapi import HTTPException
from fashion.models.user import User
from typing import List
from fashion.cache import acache
from fashion.models.domain import UserRole
from uuid import uuid4

class UserProcessor:

    @staticmethod
    def get_all_users() -> List[User]:
        return acache.get_entities(User)

    @staticmethod
    def get_user_by_id(uid: str) -> User:
        usr = acache.get_entity_by_id(uid, User)
        if usr is None:
            raise HTTPException(status_code=400, detail=f'user {uid} not found')
        return usr

    @staticmethod
    def create_user(usr: User) -> User:
        _usr = acache.get_entities_by_ptes(User, [User.email], [usr.email], False)
        if _usr is not None:
            raise HTTPException(status_code=400, detail=f'email {usr.email} already exists')
        if usr.role == UserRole.Admin:
            raise HTTPException(status_code=400, detail=f'cannot create a user as admin')
        if usr.password != usr.confirm_password:
            raise HTTPException(status_code=404, detail='password is mismatching')
        usr.uid = f'{uuid4()}'
        ui = acache.save_entity(usr)
        if ui is False:
            raise HTTPException(status_code=404, detail='failed to create a user')
        return usr
        

    @staticmethod
    def update_user(uid: str, usr: User) -> bool:
        _usr: User = acache.get_entity_by_id(uid, User)
        if _usr is None:
            raise HTTPException(status_code=400, detail=f'user {uid} not found')
        usr.uid = uid
        usr.email = _usr.email
        if acache.update_entity(usr) is False:
            raise HTTPException(status_code=404, detail='failed to update user')
        return True

    @staticmethod
    def update_password(uid: str, pwd: str) -> bool:
        usr = acache.get_entity_by_id(uid, User)
        if usr is None:
            raise HTTPException(status_code=400, detail=f'user {uid} not found')
        if acache.patch_entity(usr, User.password, pwd) is False:
            raise HTTPException(status_code=404, detail='failed to update password')
        elif acache.patch_entity(usr, User.confirm_password, pwd) is False:
            raise HTTPException(status_code=404, detail='failed to update confirm password')
        else:
            return True

    @staticmethod
    def delete_user(uid: str) -> bool:
        usr = acache.get_entity_by_id(uid, User)
        if usr is None:
            raise HTTPException(status_code=400, detail=f'user {uid} not found')
        if acache.delete_entity(usr) is False:
            raise HTTPException(status_code=404, detail='failed to delete user')
        return True

    @staticmethod
    def delete_users(uids: List[str]) -> bool:
        usrs = [acache.get_entity_by_id(id, User) for id in uids]
        if None in usrs:
            raise HTTPException(status_code=400, detail='some usr not found')
        if acache.delete_entities(usrs) is False:
            raise HTTPException(status_code=404, detail='failed to delete users')
        return True
    
    @staticmethod
    def get_user_by_creds(email: str, password: str) -> User:
        usr = acache.get_usr_credential(email, password)
        return usr