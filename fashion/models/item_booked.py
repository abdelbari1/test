from fashion.models.basic_entity import BasicEntity
from fashion.models.delivery import Delivery
from fashion.models.rental_items import RentalItem
from fashion.models.sizes import Sizes
from fashion.models.user import User
from datetime import datetime, timedelta


class BookedItem(BasicEntity):

    def __init__(self, uid: str=None, rental_item: RentalItem=None, size: Sizes=None, requested_start_date: datetime=None, duration: int=None, user: User=None,
                owner: User=None, requested_end_date: datetime=None, delivery: Delivery=None) -> None:
        super().__init__(uid)
        self.__rental_item = rental_item
        self.__size = size
        self.__requested_start_date = requested_start_date
        self.__duration = duration
        self.__user = user
        self.__owner = owner
        self.__delivery = delivery
        self.__requested_end_date = requested_end_date
        if self.__requested_end_date is None and self.__requested_start_date is not None and self.__duration is not None:
            self.__requested_end_date = self.__requested_start_date + timedelta(days=self.__duration)


    @property
    def rental_item(self) -> RentalItem:
        return self.__rental_item
    
    @rental_item.setter
    def rental_item(self, ri: RentalItem):
        self.__rental_item = ri

    @property
    def delivery(self) -> Delivery:
        return self.__delivery
    
    @delivery.setter
    def delivery(self, ri: Delivery):
        self.__delivery = ri

    @property
    def size(self) -> Sizes:
        return self.__size
    
    @size.setter
    def size(self, ri: Sizes):
        self.__size = ri

    @property
    def requested_start_date(self) -> datetime:
        return self.__requested_start_date 
    
    @requested_start_date.setter
    def requested_start_date(self, rd: datetime):
        self.__requested_start_date = rd

    @property
    def requested_end_date(self) -> datetime:
        return self.__requested_start_date + timedelta(days=self.__duration)
    
    @requested_end_date.setter
    def requested_end_date(self, rd: datetime):
        self.__requested_end_date = rd

    @property
    def duration(self) -> int:
        return self.__duration
    
    @duration.setter
    def duration(self, d: int):
        self.__duration = d
        if self.__requested_end_date is None and self.__requested_start_date is not None and self.__duration is not None:
            self.__requested_end_date = self.__requested_start_date + timedelta(days=self.__duration)

    @property
    def user(self) -> User:
        return self.__user
    
    @user.setter
    def user(self, u: User):
        self.__user = u

    @property
    def owner(self) -> User:
        return self.__owner
    
    @owner.setter
    def owner(self, u: User):
        self.__owner = u