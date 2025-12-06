from fashion.models.domain import RelationCardinality


class RelationDescriptor:

    def __init__(self, orgin_cls: object, target_cls: object, pte: property, col: str, alias: str, card: RelationCardinality=RelationCardinality.One_One,
                inverted_column: str=None, inverted_alias: str=None):
        self.__orgin_cls = orgin_cls
        self.__target_cls = target_cls
        self.__property = pte
        self.__col = col
        self.__alias = alias
        self.__cardinality = card
        self.__inverted_col = inverted_column
        self.__inverted_al = inverted_alias

    @property
    def origin_cls(self) -> object:
        return self.__orgin_cls
    
    @origin_cls.setter
    def orgin_cls(self, oc: object):
        self.__orgin_cls = oc

    @property
    def target_cls(self) -> object:
        return self.__target_cls
    
    @target_cls.setter
    def target_cls(self, tc: object):
        self.__target_cls = tc

    @property
    def pte(self) -> property:
        return self.__property
    
    @pte.setter
    def pte(self, pt: property):
        self.__property = pt

    @property
    def column(self) -> str:
        return self.__col
    
    @column.setter
    def column(self, c: str):
        self.__col = c

    @property
    def alias(self) -> str:
        return self.__alias
    
    @alias.setter
    def alias(self, a: str):
        self.__alias = a

    @property
    def cardinality(self) -> RelationCardinality:
        return self.__cardinality
    
    @cardinality.setter
    def cardinality(self, ca: RelationCardinality):
        self.__cardinality = ca
    
    @property
    def inverted_column(self) -> str:
        return self.__inverted_col
    
    @inverted_column.setter
    def inverted_column(self, ic: str):
        self.__inverted_col = ic

    @property
    def inverted_alias(self) -> str:
        return self.__inverted_al
    
    @inverted_alias.setter
    def inverted_alias(self, ia: str):
        self.__inverted_al = ia

    @property
    def cached_id(self) -> str:
        if self.__cardinality == RelationCardinality.One_One:
            return f'{self.__property.fget.__name__}_cached_id'
        return None
    
    @property
    def is_inverted(self) -> bool:
        return self.__inverted_col is not None