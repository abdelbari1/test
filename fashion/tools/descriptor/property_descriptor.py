

class PropertyDescriptor:

    def __init__(self, pte: property, col: str, alias: str, type: object, key: bool, arr: bool):
        self.__pte = pte
        self.__col = col
        self.__alias = alias
        self.__type = type
        self.__key = key
        self.__array = arr

    @property
    def pte(self) -> property:
        return self.__pte
    
    @pte.setter
    def pte(self, pt: property):
        self.__pte = pt

    @property
    def colmun(self) -> str:
        return self.__col
    
    @colmun.setter
    def column(self, c: str):
        self.__col = c

    @property
    def alias(self) -> str:
        return self.__alias
    
    @alias.setter
    def alias(self, a: str):
        self.__alias = a

    @property
    def type(self) -> object:
        return self.__type
    
    @type.setter
    def type(self, t: object):
        self.__type = t
    
    @property
    def array(self) -> bool:
        return self.__array
    
    @property
    def key(self) -> bool:
        return self.__key