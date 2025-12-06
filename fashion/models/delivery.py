from fashion.models.basic_entity import BasicEntity
from fashion.models.domain import Region
from fashion.models.user import User


class Delivery(BasicEntity):
    def __init__(self, uid: str = None, region: Region=Region.Lebanon, user: User=None, address: str=None, appartment: str=None,
                city: str=None, postcode: str=None, phone: str=None, save: bool=False):
        super().__init__(uid)
        self.__region = region
        self.__user = user
        self.__address = address
        self.__appartment = appartment
        self.__city = city
        self.__postcode = postcode
        self.__phone = phone
        self.__save = save

    @property
    def region(self) -> Region:
        return self.__region
    
    @region.setter
    def region(self, r: Region):
        self.__region = r

    @property
    def user(self) -> User:
        return self.__user
    
    @user.setter
    def user(self, u: User):
        self.__user = u

    @property
    def address(self) -> str:
        return self.__address
    
    @address.setter
    def address(self, a: str):
        self.__address = a

    @property
    def appartment(self) -> str:
        return self.__appartment
    
    @appartment.setter
    def appartment(self, a: str):
        self.__appartment = a

    @property
    def city(self) -> str:
        return self.__city
    
    @city.setter
    def city(self, c: str):
        self.__city = c

    @property
    def postcode(self) -> str:
        return self.__postcode
    
    @postcode.setter
    def postcode(self, p: str):
        self.__postcode = p

    @property
    def phone(self) -> str:
        return self.__phone
    
    @phone.setter
    def phone(self, p: str):
        self.__phone = p

    @property
    def save(self) -> bool:
        return self.__save
    
    @save.setter
    def save(self, s: bool):
        self.__save = s