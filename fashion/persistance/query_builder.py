from fashion.models.domain import RelationCardinality
from fashion.tools.descriptor.entity_descriptor import EntityDescriptor
from fashion.tools.descriptor.model_desscriptor import ModelDescriptor
from typing import List

class QueryBuilder:
    
    def __init__(self, md: ModelDescriptor) -> None:
        self.__md = md

    def __list_columns(self, obj: object, entity: EntityDescriptor, with_relation: bool=True) -> List[str]:
        columns = [pt.colmun for pt in entity.properties]
        if with_relation:
            columns = columns + [en.column for en in entity.relations if en.cardinality == RelationCardinality.One_One]
        if with_relation:
            invs = self.__md.get_inverted_relation(obj)
            invs_txt = [f'{r.inverted_column}' for r in invs] if invs is not None else []
            columns = columns + invs_txt
        return columns

    def insert_row_code(self, ob: object, short_format: bool=False) -> str:
        entity = self.__md.get_entity_mapping(ob)
        cols = self.__list_columns(ob, entity)
        '''insert into table (p,p,p,p) values (%s, %s, %s, %s)'''
        insert_clause = f'insert into {entity.table}'
        cols_clause = f"({', '.join(cols)})"
        values_clause = f"values ({', '.join(['%s' for _ in range(len(cols))])})"
        if short_format:
            return f'{insert_clause} {cols_clause} values %s'
        else:
            return f'{insert_clause} {cols_clause} {values_clause}'
    
    def query_all_row_code(self, cl: object) -> str:
        entity = self.__md.get_entity_mapping(cl)
        cols = [f'{entity.alias}.{pte.colmun} as {pte.alias}' for pte in entity.properties]
        cols_rel = [f'{entity.alias}.{rel.column} as {rel.alias}' for rel in entity.relations if rel.cardinality == RelationCardinality.One_One]
        columns = cols + cols_rel
        # 1..n relations with entity as target and that are inverted
        rels = [rl for rl in self.__md.get_inverted_relation(entity.clazz)]
        multi_rels_txt = [f'{entity.alias}.{r.inverted_column} as {r.inverted_alias}' for r in rels]
        select_clause = ', '.join(columns + multi_rels_txt)
        from_clause = f'from {entity.table} {entity.alias}'
        return f'select {select_clause} {from_clause}'
    
    def select_row_code_by_id(self, cl: object) -> str:
        entity = self.__md.get_entity_mapping(cl)
        select_clause = self.query_all_row_code(cl)
        where_clause = f'where {entity.alias}.{entity.pte_key.colmun} = %s'
        return f'{select_clause} {where_clause}'
    
    def query_row_by_inverted_col(self, cl: object, col: str) -> str:
        entity = self.__md.get_entity_mapping(cl)
        select_clause = self.query_all_row_code(cl)
        where_clause = f'where {entity.alias}.{col} = %s'
        return f'{select_clause} {where_clause}'
    
    def query_row_by_ptes(self, ob: object, ptes: List[property]) -> str:
        entity = self.__md.get_entity_mapping(ob)
        cols = []
        for pte in ptes:
            col_ptes = entity.get_property_descriptor(pte)
            if col_ptes is not None: cols.append(f'{entity.alias}.{col_ptes.colmun}')
            col_rel = entity.get_relation_by_pte(pte)
            if col_rel is not None: cols.append(f'{entity.alias}.{col_rel.column}')
        conditions = [f'{x} = %s' for x in cols]
        select_clause = self.query_all_row_code(ob)
        where_clause = f"where {' and '.join(conditions)}"
        return f'{select_clause} {where_clause}'

    def query_row_association(self, cls: object, sf: bool=False) -> str:
        entity = self.__md.get_entity_mapping(cls).get_association_descriptor(cls)
        insert_clause = f'insert into table {entity.table}'
        cols = [x.colmun for x in entity.properties_association]
        column_clause = f"({', '.join([entity.associate_column] + cols)})"
        values_clause = f"({', '.join(['%s' for _ in range(len([entity.associate_column] + cols))])})"
        if sf:
            return f'{insert_clause} {column_clause} values %s'
        else:
            return f'{insert_clause} {column_clause} {values_clause}'
        

    def update_row_code(self, o: object) -> str:
        entity = self.__md.get_entity_mapping(o)
        columns = [f'{x.colmun}=%s' for x in entity.properties if entity.pte_key.colmun != x.colmun]
        cols = ", ".join(columns)
        update_clause = f'update {entity.table}'
        set_clause = f'set {cols}'
        where_clause = f'where {entity.pte_key.colmun} = %s'
        return f'{update_clause} {set_clause} {where_clause}'
    
    def patch_row_code(self, o: object, pte: property) -> str:
        ent = self.__md.get_entity_mapping(o)
        update_clause = f'update {ent.table}'
        set_clause = f'set {ent.get_property_descriptor(pte).colmun} = %s'
        where_clause = f'where {ent.pte_key.colmun} = %s'
        return f'{update_clause} {set_clause} {where_clause}'
    
    def delete_row_code(self, o: object) -> str:
        entity = self.__md.get_entity_mapping(o)
        delete_clause = f'delete from {entity.table}'
        where_clause = f'where {entity.pte_key.colmun} = %s'
        return f'{delete_clause} {where_clause}'
    
    def delete_rows_code(self, o: object) -> str:
        entity = self.__md.get_entity_mapping(o)
        delete_clause = f'delete from {entity.table}'
        where_clause = f'where {entity.pte_key.column} in %s'
        return f'{delete_clause} {where_clause}'
    

    def query_user_credential(self, ob: object) -> str:
        entity = self.__md.get_entity_mapping(ob)
        columns = [f'{entity.alias}.{x.column} as {x.alias}' for x in entity.properties]# [fn.first_name, ln.last_name]
        select_clause = ', '.join(columns) # 'fn.first_name', 'ln.last_name'
        from_clause = f'from {entity.table} {entity.alias}'
        where_clause = f'where email= %s and pwd= %s'
        return f'select {select_clause} {from_clause} {where_clause}'
    
    def delete_row_code_by_ptes(self, o: object, ptes: List[property]) -> str:
        entity = self.__md.get_entity_mapping(o)
        delete_clause = f'delete from {entity.table}'
        col_pte_desc = [entity.get_property_descriptor(x).colmun for x in ptes if entity.get_property_descriptor(x) is not None]
        col_pte_rel = [entity.get_relation_by_pte(x).column for x in ptes if entity.get_relation_by_pte(x) is not None and entity.get_relation_by_pte(x).cardinality == RelationCardinality.One_One]
        columns = [f'{x} = %s' for x in col_pte_desc + col_pte_rel]
        where_clause = f"where {' and '.join(columns)}"
        return f'{delete_clause} {where_clause}'