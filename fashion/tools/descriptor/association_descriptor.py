from typing import List


class PropertyAssociationDescriptor:
    def __init__(self, target: object, pte: property, column: str, alias: str):
        self.__target = target
        self.__pte = pte
        self.__colmun = column
        self.__alias = alias

    @property
    def target_class(self) -> object:
        return self.__target
    
    @target_class.setter
    def target_class(self, t: object):
        self.__target = t

    @property
    def pte(self) -> property:
        return self.__pte
    
    @pte.setter
    def pte(self, p: property):
        self.__pte = p

    @property
    def colmun(self) -> str:
        return self.__colmun
    
    @colmun.setter
    def column(self, c: str):
        self.__colmun

    @property
    def alias(self) -> str:
        return self.__alias
    
    @alias.setter
    def alias(self, a: str):
        self.__alias = a


class AssociationDescriptor:

    def __init__(self, orgin_cls: object, table: str, alias: str, as_col: str, as_al: str ) -> None:
        self.__orgin_cls = orgin_cls
        self.__table = table
        self.__alias = alias
        self.__as_col = as_col
        self.__as_alias = as_al
        self.__pte_ass = {}

    @property
    def orgin_cls(self) -> object:
        return self.__orgin_cls
    
    @orgin_cls.setter
    def orgin_cls(self, o: object):
        self.__orgin_cls = o

    @property
    def table(self) -> str:
        return self.__table
    
    @table.setter
    def table(self, t: str):
        self.__table = t

    @property
    def alias(self) -> str:
        return self.__alias
    
    @alias.setter
    def alias(self, a: str):
        self.__alias = a

    @property
    def associate_column(self) -> str:
        return self.__as_col
    
    @associate_column.setter
    def associate_column(self, c: str):
        self.__as_col = c

    @property
    def associate_alias(self) -> str:
        return self.__as_alias
    
    @associate_alias.setter
    def associate_alias(self, a: str):
        self.__as_alias = a

    def add_property_association(self, pa: PropertyAssociationDescriptor):
        self.__pte_ass[pa.target_class] = pa

    def get_property_association(self, cl: object) -> PropertyAssociationDescriptor:
        return self.__pte_ass[cl]
    
    @property
    def properties_association(self) -> List[PropertyAssociationDescriptor]:
        return self.__pte_ass.values()