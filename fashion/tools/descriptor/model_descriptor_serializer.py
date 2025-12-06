from fashion.models.domain import RelationCardinality
from fashion.tools.descriptor.association_descriptor import AssociationDescriptor, PropertyAssociationDescriptor
from fashion.tools.descriptor.entity_descriptor import EntityDescriptor
from fashion.tools.descriptor.model_desscriptor import ModelDescriptor
from fashion.tools.descriptor.property_descriptor import PropertyDescriptor
from fashion.tools.descriptor.relation_descriptor import RelationDescriptor
import json
from pydoc import locate

class ModelDescriptorSerializer:
    

    def load_descriptor(self, fn: str) -> ModelDescriptor:
        with open(fn, 'r') as reader:
            md_loaded = json.load(reader)
            res = ModelDescriptor()
            for md in md_loaded:
                ed = self.load_entity(md)
                res.add_entity_mapping(ed)
            return res

    def load_entity(self, md: dict) -> EntityDescriptor:
        clazz = md.get('clazz')
        table = md.get('table')
        alias = md.get('alias')
        ptes = md.get('ptes')
        relations = md.get('relations')
        associations = md.get('associations')
        clas = locate(clazz)
        res = EntityDescriptor(clas, table, alias)
        for pte in ptes:
            pd = self.load_property(clas, pte)
            res.add_property_descriptor(pd)
        for rel in relations:
            rd = self.load_relation(clas, rel)
            res.add_relation_descriptor(rd)
        ass = self.load_associations(clas, associations)
        res.add_association_descriptor(ass)
        return res

    def load_property(self, cl: object, pte: dict) -> PropertyDescriptor:
        pn = pte.get('name')
        col = pte.get('column')
        alias = pte.get('alias')
        key = pte.get('key')
        array = pte.get('array')
        pte_type = pte.get('type')
        property_type = locate(pte_type)
        prop = getattr(cl, pn)
        res = PropertyDescriptor(prop, col, alias, property_type, key, array)
        return res

    def load_relation(self, cls: object, rel: dict) -> RelationDescriptor:
        target = rel.get('target')
        pn = rel.get('property')
        col = rel.get('column')
        alias = rel.get('alias')
        card = rel.get('cardinality')
        cardinality = RelationCardinality._value2member_map_.get(card)
        in_col = rel.get('inverted_column')
        in_al = rel.get('inverted_alias')
        target_clas = locate(target)
        prop = getattr(cls, pn)
        res = RelationDescriptor(cls, target_clas, prop, col, alias, cardinality, in_col, in_al)
        return res
    
    def load_associations(self, cl: object, ass: dict) -> AssociationDescriptor:
        table = ass.get('table')
        alias = ass.get('alias')
        in_col = ass.get('inverted_column')
        in_al = ass.get('inverted_alias')
        pte_ass = ass.get('pte')
        res = AssociationDescriptor(cl, table, alias, in_col, in_al)
        if pte_ass is not None:
            for pa in pte_ass:
                pad = self.load_property_association(pa)
                res.add_property_association(pad)
        return res

    def load_property_association(self, pa: dict) -> PropertyAssociationDescriptor:
        target = pa.get('target')
        prop = pa.get('property')
        column = pa.get('column')
        alias = pa.get('alias')
        res = PropertyAssociationDescriptor(target, prop, column, alias)
        return res