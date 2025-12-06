from fashion.api.fastapi.models.user_model import UserIn, UserOut
from fashion.models.user import User
from fashion.models.domain import UserRole

class UserTransformer:

    @staticmethod
    def user_b2p(usr: User) -> UserOut:
        return UserOut(uid=usr.uid, first_name=usr.first_name, last_name=usr.last_name, email=usr.email, password=usr.password, confirm_pass=usr.confirm_password,
                       user_role=usr.role)

    @staticmethod
    def user_p2b(usr: UserIn) -> User:
        return User(None, fname=usr.first_name, lname=usr.last_name, email=usr.email, password=usr.password, conPass=usr.confirm_pass,
                    role=UserRole._value2member_map_.get(usr.user_role)) 