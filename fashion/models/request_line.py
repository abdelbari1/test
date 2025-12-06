from fashion.models.basic_entity import BasicEntity
from fashion.models.item import Item

class RequestLine:
    def __init__(self, item: Item=None, size: str=None, qty_purchase: int=None):
        self.__item = item
        self.__size = size
        self.__qty_purchase = qty_purchase


    @property
    def item(self) -> Item:
        return self.__item
    
    @item.setter
    def item(self, i: Item):
        self.__item = i

    @property
    def size(self) -> str:
        return self.__size
    
    @size.setter
    def size(self, s: str):
        self.__size = s

    @property
    def quantity_purchase(self) -> int:
        return self.__qty_purchase
    
    @quantity_purchase.setter
    def quantity_purchase(self, q: int):
        self.__qty_purchase = q