from fashion.models.basic_entity import BasicEntity


class Sizes(BasicEntity):

    def __init__(self, uid: str = None, size: str=None, qty: int=1):
        super().__init__(uid)
        self.__size = size
        self.__qty = qty

    @property
    def size(self) -> str:
        return self.__size
    
    @size.setter
    def size(self, s: str):
        self.__size = s

    @property
    def quantity(self) -> int:
        return self.__qty
    
    @quantity.setter
    def quantity(self, q: int):
        self.__qty = q
