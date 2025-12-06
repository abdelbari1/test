import json
from typing import List
from fashion.models.domain import RelationCardinality
from fashion.tools.descriptor.entity_descriptor import EntityDescriptor
from fashion.tools.descriptor.model_desscriptor import ModelDescriptor
from fashion.tools.descriptor.property_descriptor import PropertyDescriptor
import enum

class DataFormat:
    
    def __init__(self, md: ModelDescriptor) -> None:
        self.__md = md

    @property
    def descriptor(self) -> ModelDescriptor:
        return self.__md
    
    def data_format(self, cls: object, rel_val: dict=None, ptes: List[PropertyDescriptor]=None):
        entity = self.__md.get_entity_mapping(type(cls))
        selected_properties = ptes
        if ptes is None:
            selected_properties = entity.properties
        res = self.__format_properties(cls, entity, selected_properties)
        if ptes is None:
            res.extend(self.__format_relations(cls, entity, rel_val))
        return tuple(res)

    def __format_properties(self, o: object, en: EntityDescriptor, ptes: List[PropertyDescriptor] = None):
        if ptes is None:
            ptes = en.properties
        return [self.__format_property(o, pte) for pte in ptes]
    
    def __format_property(self, o: object, p: PropertyDescriptor):
        collection = [dict, List, tuple, list]
        val = getattr(o, p.pte.fget.__name__)
        vtype = p.type
        if val is None:
            return None
        elif vtype in collection and p.array :
            lst = json.dumps(val)
            return lst.replace('[', '{').replace(']', '}')
        elif issubclass(vtype, enum.Enum):
            return val.value
        else:
            return val
        
    def __format_11_relation(self, o: object, pte: property) -> str:
        target = getattr(o, pte.fget.__name__)
        if target is None:
            return None
        tdesc = self.__md.get_entity_mapping(type(target))
        return getattr(target, tdesc.pte_key.pte.fget.__name__)

    def __format_11_relations(self, o: object, ent: EntityDescriptor) -> List[str]:
        return [self.__format_11_relation(o, x.pte) for x in ent.relations if x.cardinality == RelationCardinality.One_One]

    def __format_inverted_relations(self, o: object, rels_val: dict) -> List[str]:
        if rels_val is None:
            return []
        return [rels_val[x] for x in self.__md.get_inverted_relation(type(o))]
        
    def __format_relations(self, o: object, ent: EntityDescriptor, rels_val: dict) -> List[str]:
        return \
            self.__format_11_relations(o, ent) + \
            self.__format_inverted_relations(o, rels_val)

        