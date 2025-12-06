from enum import Enum
from fashion.models.domain import RelationCardinality
from fashion.models.sizes import Sizes
from fashion.persistance.cnt.default_conn_provider import DefaultConnectionProvider
from fashion.persistance.data_format import DataFormat
from fashion.persistance.query_builder import QueryBuilder
from fashion.tools.descriptor.model_desscriptor import ModelDescriptor
import psycopg2
from typing import List
from psycopg2.extras import RealDictCursor, execute_values

from fashion.tools.descriptor.relation_descriptor import RelationDescriptor

class Repository:
    
    def __init__(self, md: ModelDescriptor, conn: DefaultConnectionProvider, qb: QueryBuilder=None, df: DataFormat=None) -> None:
        self.__md = md
        self.__conn = conn
        self.__qb = qb if qb is not None else QueryBuilder(md)
        self.__df = df if df is not None else DataFormat(md)
        self.__transactions = []

    @property
    def model_desc(self) -> ModelDescriptor:
        return self.__md
    
    @property
    def conn(self) -> DefaultConnectionProvider:
        return self.__conn
    
    @property
    def query_builder(self) -> QueryBuilder:
        return self.__qb
    
    @property
    def data_format(self) -> DataFormat:
        return self.__df
    
    @property
    def in_transaction(self) -> bool:
        return len(self.__transactions) > 0
    
    def __current_trs(self, created: bool = True) -> psycopg2.extensions.connection:
        if self.in_transaction:
            return self.__transactions[-1]
        elif created:
            return self.__conn.get_connection()
        else:
            return None
        
    def __begin_trs(self) -> psycopg2.extensions.connection:
        cn = self.__conn.get_connection()
        self.__transactions.append(cn)
        return cn
    
    def __commit(self) -> bool:
        if self.in_transaction:
            cnt = self.__current_trs(False)
            cnt.commit()
            self.__conn.release_connection(cnt)
            self.__transactions.pop()
            return True
        else:
            return False
    
    def roolback(self) -> bool:
        if self.in_transaction:
            cn = self.__current_trs(False)
            cn.rollback()
            self.__conn.release_connection(cn)
            self.__transactions.pop()
            return True
        else:
            return False
        
    def __execute_query(self, ob: object, code: str, data: tuple=None, multi: bool=False):
        cnt = self.__current_trs(True)
        st=cnt.cursor(cursor_factory=RealDictCursor)
        st.execute(code, data)
        rows = st.fetchall() if multi else st.fetchone()
        if rows is None:
            return None
        res = [self.__build_entity(ob, row) for row in rows] if multi else self.__build_entity(ob, rows)
        st.close()
        if not self.in_transaction:
            self.__conn.release_connection(cnt)
        return res
    
    def get_user_creadential(self, ob: object, email: str, password: str) -> object:
        cnt = self.__current_trs(True)
        code = self.__qb.query_user_credential(ob)
        data = tuple([email, password])
        st = cnt.cursor(cursor_factory=RealDictCursor)
        st.execute(code, data)
        row = st.fetchone()
        if row is None:
            return None
        res = self.__build_entity(ob, row)
        if self.in_transaction is False:
            cnt.commit()
            st.close()
        return res
    
    def get_entities_by_ptes(self, ob: object, ptes: List[property], vals: List[str], isList: bool) -> List[object]:
        return self.__execute_query(ob, self.__qb.query_row_by_ptes(ob, ptes), tuple(vals), isList)
    
    def __load_all_by_relation(self, tob: object, col: str, val: List[str]) -> List[object]:
        return self.__execute_query(tob, self.__qb.query_row_by_inverted_col(tob, col), tuple(val), True)
    
    def load_relation_1n_for_all(self, op: List[object], pte: property):
        if op is None or len(op) <= 0:
            return
        entity = self.__md.get_entity_mapping(type(op[0]))
        rel = entity.get_relation_by_pte(pte)
        for x in op:
            val_pte_key = getattr(x, entity.pte_key.pte.fget.__name__)
            childs = self.__load_all_by_relation(rel.target_cls, rel.inverted_column, [val_pte_key])
            setattr(x, pte.fget.__name__, childs)
    
    def load_entities(self, o: object) -> List[object]:
        return self.__execute_query(ob=o, code=self.__qb.query_all_row_code(o), multi=True)

    def load_entity_by_id(self, uid: str, o: object) -> object:
        return self.__execute_query(o, self.__qb.select_row_code_by_id(o), (uid,))
        

    def save_entity(self, en: object) -> bool:
        return self.__internal_save_entity(en)
    
    def save_entities(self, ens: List[object]) -> bool:
        return self.__internal_save_entities(ens)
    

    def __internal_save_entity(self, cl: object, rels_value: dict=None) -> bool:
        cnt = self.__current_trs(True)
        code = self.__qb.insert_row_code(type(cl))
        data = self.__df.data_format(cl, rels_value)
        st = cnt.cursor()
        st.execute(code, data)
        res = True
        if self.in_transaction is False:
            cnt.commit()
            self.__conn.release_connection(cnt)
        return res

    def __internal_save_entities(self, clss: List[object], rels_dict: dict=None) -> bool:
        cnt = self.__current_trs(False) if self.in_transaction else self.__begin_trs()
        code = self.__qb.insert_row_code(type(clss[0]), True)
        data = [self.__df.data_format(x, rels_dict) for x in clss]
        crs = cnt.cursor()
        execute_values(crs, code, data, template=None, page_size=500)
        if self.in_transaction:
            self.__commit()
        return True

    def save_association(self, cls: object) -> bool:
        pass

    def __get_relation(self, o: object, pte: property):
        ent = self.__md.get_entity_mapping(type(o))
        rel = ent.get_relation_by_pte(pte)
        parent_id = getattr(o, ent.pte_key.pte.fget.__name__)
        val = getattr(o, pte.fget.__name__)
        return rel, val, parent_id
    
    def __save_1n_relation(self, rel: RelationDescriptor, val: List[object], pid: str) -> bool:
        pdict = {rel: pid}
        return self.__internal_save_entities(val, pdict)

    def save_relation(self, o: object, pte: property) -> bool:
        rel, val, parent_id = self.__get_relation(o, pte)
        if rel is None:
            return None
        if rel.cardinality == RelationCardinality.One_One:
            self.save_entity(val)
        else:
            self.__save_1n_relation(rel, val, parent_id)

    def update_entity(self, cls: object) -> bool:
        cnt = self.__current_trs(True)
        crs = cnt.cursor()
        code = self.__qb.update_row_code(type(cls))
        ent = self.__md.get_entity_mapping(type(cls))
        ptes = [x for x in ent.properties if x is not ent.pte_key]
        data = self.__df.data_format(cls, ptes=ptes)
        dt = tuple([x for x in data] + [getattr(cls, ent.pte_key.pte.fget.__name__)])
        crs.execute(code, dt)
        if self.in_transaction is False:
            cnt.commit()
            self.__conn.release_connection(cnt)
        return True
    
    def update_entities(self, obs: List[object]) -> bool:
        tp = type(obs[0])
        ent = self.__md.get_entity_mapping(tp)
        ptes = [x for x in ent.properties if x is not ent.pte_key]
        cnt = self.__current_trs(False) if self.in_transaction else self.__begin_trs()
        code = self.__qb.update_row_code(tp)
        st = cnt.cursor()
        for o in obs:
            dt = self.__df.data_format(o, ptes=ptes)
            data = tuple([x for x in dt] + [getattr(o, ent.pte_key.pte.fget.__name__)])
            st.execute(code, data)
        if self.in_transaction:
            self.__commit()
        return True

    def patch_entity(self, o: object, pte: property, pv) -> bool:
        cnt = self.__current_trs(True)
        code = self.__qb.patch_row_code(type(o), pte)
        ent = self.__md.get_entity_mapping(type(o))
        kp = ent.pte_key.pte.fget.__name__
        data = tuple([pv, getattr(o, kp)])
        st = cnt.cursor()
        st.execute(code, data)
        if self.in_transaction is False:
            cnt.commit()
        return True

    def delete_entity(self, cls: object) -> bool:
        cnt = self.__current_trs(True)
        ent = self.__md.get_entity_mapping(type(cls))
        kp = ent.pte_key.pte.fget.__name__
        code = self.__qb.delete_row_code(type(cls))
        data = tuple([getattr(cls, kp)])
        st = cnt.cursor()
        st.execute(code, data)
        if self.in_transaction is False:
            cnt.commit()
            st.close()
        return True

    def delete_entities(self, obs: List[object]) -> bool:
        tp = type(obs[0])
        itrs = self.in_transaction
        cnt = self.__current_trs(False) if itrs else self.__begin_trs()
        st = cnt.cursor()
        code = self.__qb.delete_rows_code(tp)
        ent = self.__md.get_entity_mapping(tp)
        kp = ent.pte_key.pte.fget.__name__
        data = [tuple([getattr(o, kp) for o in obs])]
        st.execute(code, data)
        if self.in_transaction:
            self.__commit()
        return True
    
    def delete_entity_ptes(self, o: object, ptes: List[property], values: List[str]) -> bool:
        cnt = self.__current_trs(True)
        code = self.__qb.delete_row_code_by_ptes(o, ptes)
        data = tuple(values)
        crs = cnt.cursor()
        crs.execute(code, data)
        if self.in_transaction is False:
            cnt.commit()
            crs.close()
        return True

    def __build_entity(self, ob, row) -> object:
        ent = self.__md.get_entity_mapping(ob)
        tp = ob()
        for x in ent.properties:
            val = row[x.alias]
            vtype = x.type
            if issubclass(vtype, Enum):
                x.pte.fset(tp, vtype._value2member_map_.get(val))
            else:
                x.pte.fset(tp, val)
        for rd in ent.get_relation_descriptor(RelationCardinality.One_One):
            setattr(tp, rd.cached_id, row[rd.alias])
        return tp
