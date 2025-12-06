from fashion.models.domain import RelationCardinality
from fashion.tools.descriptor.entity_descriptor import EntityDescriptor
from typing import List

from fashion.tools.descriptor.relation_descriptor import RelationDescriptor

class ModelDescriptor:

    def __init__(self) -> None:
        self.__mapping = {}
        self.__inverted_relations = {}

    def add_entity_mapping(self, ed: EntityDescriptor):
        self.__mapping[ed.clazz] = ed

    def get_entity_mapping(self, cls: object) -> EntityDescriptor:
        return self.__mapping.get(cls)
    
    @property
    def entities(self) -> List[EntityDescriptor]:
        return self.__mapping.values()
    
    def compute_inverted_relations(self) -> None:
        for en in self.entities:
            for rel in en.relations:
                if rel.cardinality == RelationCardinality.One_Many and rel.is_inverted:
                    rl = self.__inverted_relations.get(rel.target_cls)
                    if rl is None:
                        rl = [rel]
                        self.__inverted_relations[rel.target_cls] = rl
                    else:
                        rl.append(rel)

    def get_inverted_relation(self, target: object) -> List[RelationDescriptor]:
        rls = self.__inverted_relations.get(target)
        return rls if rls is not None else []
    