from typing import List
from fashion.models.basic_entity import BasicEntity
from fashion.models.user import User
from fashion.models.item import Item


class WishlistAssociations:

    def __init__(self, item: Item=None) -> None:
        self.__item = item

    @property
    def item(self) -> Item:
        return self.__item
    
    @item.setter
    def item(self, i: Item):
        self.__item = i


class WishList:
    def __init__(self, user: User=None, item: Item=None):
        self.__user = user
        self.__item = item

    @property
    def user(self) -> User:
        return self.__user
    
    @user.setter
    def user(self, usr: User):
        self.__user = usr

    @property
    def item(self) -> Item:
        return self.__item
    
    @item.setter
    def item(self, its: Item):
        self.__item = its

