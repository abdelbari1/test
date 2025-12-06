from typing import List
from fashion.models.domain import RelationCardinality
from fashion.tools.descriptor.association_descriptor import AssociationDescriptor
from fashion.tools.descriptor.property_descriptor import PropertyDescriptor
from fashion.tools.descriptor.relation_descriptor import RelationDescriptor


class EntityDescriptor:
    
    def __init__(self, clazz: object, table: str, alias: str):
        self.__clazz = clazz
        self.__table = table
        self.__alias = alias
        self.__ptes = {}
        self.__relations = []
        self.__associations = {}

    @property
    def clazz(self) -> object:
        return self.__clazz
    
    @clazz.setter
    def clazz(self, c: object):
        self.__clazz = c

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
    def properties(self) -> List[PropertyDescriptor]:
        return self.__ptes.values()

    def add_property_descriptor(self, pt: PropertyDescriptor):
        self.__ptes[pt.pte] = pt

    def get_property_descriptor(self, pte: property) -> PropertyDescriptor:
        return self.__ptes.get(pte)

    def get_property_descriptor_by_name(self, pn: str) -> PropertyDescriptor:
        if any((res := ma_pte).pte.fget.__name__ == pn for ma_pte in self.__ptes.values()):
            return res
        return None

    @property
    def relations(self) -> List[RelationDescriptor]:
        return self.__relations

    def add_relation_descriptor(self, rd: RelationDescriptor):
        self.__relations.append(rd)

    def get_relation_descriptor(self, rc: RelationCardinality) -> List[RelationDescriptor]:
        return [x for x in self.__relations if x.cardinality == rc]
    
    def get_relation_by_pte(self, pte: property) -> RelationDescriptor:
        if any((res := x).pte == pte for x in self.__relations):
            return res
        return None
    
    @property
    def pte_key(self) -> PropertyDescriptor:
        if any((pid := e).key for e in self.__ptes.values()):
            return pid
        return None
    
    def add_association_descriptor(self, ad: AssociationDescriptor):
        self.__associations[ad.orgin_cls] = ad

    def get_association_descriptor(self, cls: object) -> AssociationDescriptor:
        return self.__associations[cls]