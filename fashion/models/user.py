from fashion.models.basic_entity import BasicEntity
from pydantic import EmailStr
from fashion.models.domain import UserRole

class User(BasicEntity):
    def __init__(self, uid:str=None, fname:str=None, lname: str=None, email:EmailStr=None, password:str=None, conPass:str=None, role:UserRole.Client=None):
        super().__init__(uid)
        self.__fname = fname
        self.__lname = lname
        self.__email = email
        self.__password = password
        self.__conPass = conPass
        self.__role = role

    @property
    def first_name(self) -> str:
        return self.__fname
    
    @first_name.setter
    def first_name(self, un: str):
        self.__fname = un

    @property
    def last_name(self) -> str:
        return self.__lname
    
    @last_name.setter
    def last_name(self, un: str):
        self.__lname = un

    @property
    def email(self) -> EmailStr:
        return self.__email
    
    @email.setter
    def email(self, ema: EmailStr):
        self.__email = ema

    @property
    def password(self) -> str:
        return self.__password
    
    @password.setter
    def password(self, pasw: str):
        self.__password = pasw     

    @property
    def confirm_password(self) -> str:
        return self.__conPass
    
    @confirm_password.setter
    def confirm_password(self, conp: str):
        self.__conPass = conp  
 
    @property
    def role(self) -> UserRole:
        return self.__role
    
    @role.setter
    def role(self, rol: UserRole):
        self.__role = rol