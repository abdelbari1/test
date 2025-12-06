from fashion.models.basic_entity import BasicEntity
from fashion.models.item import Item
from fashion.models.domain import Currency


class RentalItem(BasicEntity):

    def __init__(self, uid: str = None, item: Item=None, nb_of_days: int=None, rental_price: int=None, currency: Currency=Currency.USD):
        super().__init__(uid)
        self.__item = item
        self.__nb_days = nb_of_days
        self.__rental_price = rental_price
        self.__currency = currency


    @property
    def item(self) -> Item:
        return self.__item
    
    @item.setter
    def item(self, i: Item):
        self.__item = i

    @property
    def nb_of_days(self) -> int:
        return self.__nb_days
    
    @nb_of_days.setter
    def nb_of_days(self, d: int):
        self.__nb_days = d

    @property
    def rental_price(self) -> int:
        return self.__rental_price
    
    @rental_price.setter
    def rental_price(self, r: int):
        self.__rental_price = r

    @property
    def currency(self) -> Currency:
        return self.__currency
    
    @currency.setter
    def currency(self, c: Currency):
        self.__currency = c