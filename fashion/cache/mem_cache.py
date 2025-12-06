from fashion.models.item_booked import BookedItem
from fashion.models.basic_entity import BasicEntity
from fashion.models.delivery import Delivery
from fashion.models.domain import RelationCardinality
from fashion.models.purchase import Purchase
from fashion.models.rental_items import RentalItem
from fashion.models.sizes import Sizes
from fashion.models.user import User
from fashion.models.item import Item
from fashion.models.wishlist import WishList
from fashion.models.notification import Notification
from typing import List
from fashion.persistance.repository import Repository

class MemCache:
    
    def __init__(self):
        self.__rep = None
        entities = [User, Item, Sizes, WishList, Notification, Delivery, Purchase, RentalItem, BookedItem]
        self.__data = {e: {} for e in entities}

    def set_repository(self, rep: Repository):
        self.__rep = rep
        self.initialize_cache()

    def initialize_cache(self):
        print('Initialize MemCahe...')
        print('\tloading users...', end='')
        self.__loading_users()
        print('done.\n\tloading items...', end='')
        self.__loading_items()
        print('done.\n\tloading sizes...', end='')
        self.__loading_sizes()
        print('done.\n\tloading deliveries...', end='')
        self.__loading_deliveries()
        print('done.\n\tloading purchases...', end='')
        self.__loading_purchases()
        print('done.\n\tloading rental items...', end='')
        self.__loading_rental_items()
        print('done.\n\tloading booked items...', end='')
        self.__loading_booked_items()
        print('done')

    def __loading_purchases(self):
        purchases = self.__rep.load_entities(Purchase)
        self.__rep.load_relation_1n_for_all(purchases, Purchase.lines)
        for x in purchases:
            x.buyer = self.get_entity_by_id(x.buyer_cached_id, User)
            x.seller = self.get_entity_by_id(x.seller_cached_id, User)
            x.delivery = self.get_entity_by_id(x.delivery_cached_id, Delivery)
            for line in x.lines:
                line.item = self.get_entity_by_id(line.item_cached_id, Item)
        p_dict = {p.uid: p for p in purchases}
        self.__data[Purchase] = p_dict

    def __loading_deliveries(self):
        dels: List[Delivery] = self.__rep.load_entities(Delivery)
        for x in dels:
            x.user = self.get_entity_by_id(x.user_cached_id, User)
        del_dict = {x.uid: x for x in dels}
        self.__data[Delivery] = del_dict

    def __loading_sizes(self):
        items: List[Item] = [x for x in self.__data[Item].values()]
        self.__rep.load_relation_1n_for_all(items, Item.sizes)
        sizes = [s for x in items for s in x.sizes]
        siz_dict = {x.uid: x for x in sizes}
        self.__data[Sizes] = siz_dict

    def __loading_items(self):
        its:List[Item] = self.__rep.load_entities(Item)
        for x in its:
            x.user = self.get_entity_by_id(x.user_cached_id, User)
        its_d = {it.uid: it for it in its}
        self.__data[Item] = its_d

    def __loading_users(self):
        usrs:List[User] = self.__rep.load_entities(User)
        self.__data[User] = {x.uid: x for x in usrs}

    def __loading_rental_items(self):
        ritems: List[RentalItem] = self.__rep.load_entities(RentalItem)
        for x in ritems:
            x.item = self.get_entity_by_id(x.item_cached_id, Item)
        rd = {x.uid: x for x in ritems}
        self.__data[RentalItem] = rd

    def __loading_booked_items(self):
        bitems: List[BookedItem] = self.__rep.load_entities(BookedItem)
        for x in bitems:
            x.owner = self.get_entity_by_id(x.owner_cached_id, User)
            x.user = self.get_entity_by_id(x.user_cached_id, User)
            x.rental_item = self.get_entity_by_id(x.rental_item_cached_id, RentalItem)
            x.size = self.get_entity_by_id(x.size_cached_id, Sizes)
            x.delivery = self.get_entity_by_id(x.delivery_cached_id, Delivery)
        bd = {x.uid: x for x in bitems}
        self.__data[BookedItem] = bd

    def __get_cache_class(self, cls: object) -> dict:
        res = self.__data.get(cls)
        if res is None:
            res = {}
            self.__data[cls] = res
        return res

    def save_entities(self, cls: List[BasicEntity]) -> bool:
        cls_cache = self.__get_cache_class(type(cls[0]))
        if self.__rep.save_entities(cls):
            for x in cls:
                cls_cache[x.uid] = x
            return True
        return False
    
    def save_nn_entities(self) -> bool:
        pass

    def save_sub_entity(self, o: object, pte: property, target_cls: object, isList: bool=False) -> bool:
        if self.__rep.save_relation(o, pte):
            cls_cache = self.__get_cache_class(target_cls)
            obs = getattr(o, pte.fget.__name__)
            if isList:
                for x in obs:
                    cls_cache[x.uid] = x
            cls_cache[obs.uid] = obs


    def save_entity(self, cls: BasicEntity) -> bool:
        cls_cache = self.__get_cache_class(type(cls))
        if self.__rep.save_entity(cls):
            if hasattr(cls, 'uid'): cls_cache[cls.uid] = cls
            return True
        return False

    def get_entity_by_id(self, uid: str, cls: object) -> object:
        res = self.__data[cls].get(uid)
        if res is None:
            res = self.__rep.load_entity_by_id(uid, cls)
            if res is not None:
                self.__data[cls][res.uid] = res
        return res
    
    def get_entities_by_ptes(self, cls: object, ptes: List[property], pte_vals: List[str], isList: bool) -> List[object]:
        res = self.__rep.get_entities_by_ptes(cls, ptes, pte_vals, isList)
        if res is None:
            return None
        entity = self.__rep.model_desc.get_entity_mapping(cls)
        ent_1_1 = [x for x in entity.relations if x.cardinality == RelationCardinality.One_One]
        ent_1_n = [x for x in entity.relations if x.cardinality == RelationCardinality.One_Many]
        if isList:
            for e1n in ent_1_n:
                self.__rep.load_relation_1n_for_all(res, e1n.pte)
                for x in res:
                    for y in getattr(x, e1n.pte.fget.__name__):
                        en11 = self.__rep.model_desc.get_entity_mapping(type(y))
                        rel11 = [x for x in en11.relations if x.cardinality == RelationCardinality.One_One]
                        for z in rel11:
                            setattr(y, z.pte.fget.__name__, self.get_entity_by_id(getattr(y, f'{z.pte.fget.__name__}_cached_id'), z.target_cls))
            for x in res:
                for ent in ent_1_1:
                    setattr(x, ent.pte.fget.__name__, self.get_entity_by_id(getattr(x, f'{ent.pte.fget.__name__}_cached_id'), ent.target_cls))
        else:
            for ent in ent_1_1:
                setattr(res, ent.pte.fget.__name__, self.get_entity_by_id(getattr(res, f'{ent.pte.fget.__name__}_cached_id'), ent.target_cls))
            for e1n in ent_1_n:
                self.__rep.load_relation_1n_for_all(res, e1n.pte)
        return res
    
    # def get_entities_by_pte(self, pte: property, pte_val: str, ob: object) -> List[object]:
    #     res = self.__rep.load_entity_by_pte(pte, pte_val, ob, True)
    #     for x in res:
    #         x.user = self.get_entity_by_id(x.user_cached_id, User)
    #     if res is None:
    #         return None
    #     return res

    def get_entities(self, cls: object) -> List[object]:
        res = self.__data[cls].values()
        return res

    def update_entity(self, cls: object) -> bool:
        cls_cache = self.__get_cache_class(type(cls))
        if self.__rep.update_entity(cls):
            cls_cache[cls.uid] = cls
            return True
        return False
    
    def update_entities(self, obs: List[object]) -> bool:
        cls_cache = self.__get_cache_class(type(obs[0]))
        if self.__rep.update_entities(obs):
            for o in obs:
                cls_cache[o.uid] = o
            return True
        return False

    def delete_entity(self, cls: object) -> bool:
        cls_cache = self.__get_cache_class(type(cls))
        if self.__rep.delete_entity(cls):
            cls_cache.pop(cls.uid, cls)
            return True
        return False
    
    def delete_entity_by_pte(self, o: object, ptes: List[property], values: List[str]) -> bool:
        if self.__rep.delete_entity_ptes(o, ptes, values):
            return True
        return False
    
    def delete_entities(self, obs: List[object]) -> bool:
        cls_cache = self.__get_cache_class(type(obs[0]))
        if self.__rep.delete_entities(obs):
            for o in obs:
                cls_cache.pop(o.uid, o)
            return True
        return False
    
    def patch_entity(self, o: object, pte: property, pv) -> bool:
        cls_cache = self.__get_cache_class(type(o))
        if self.__rep.patch_entity(o, pte, pv):
            pte.fset(o, pv)
            cls_cache[o.uid] = o
            return True
        return False
    
    def get_usr_credential(self, email: str, password: str) -> User:
        usr = self.__rep.get_user_creadential(User, email, password)
        if usr is None:
            return None
        return usr
    
    # def get_items_by_ptes(self, ob: object, ptes: List[property], values: List[str], isList: bool) -> List[object]:
    #     res = self.__rep.get_entities_by_ptes(ob, ptes, values, isList)
    #     if res is None:
    #         return None
    #     if isList:
    #         self.__rep.load_relation_1n_for_all(res, Item.sizes)
    #         for x in res:
    #             x.user = self.get_entity_by_id(x.user_cached_id, User)
    #     else: 
    #         self.__rep.load_relation_1n_for_all([res], Item.sizes)
    #         res.user = self.get_entity_by_id(res.user_cached_id, User)
    #     return res
    
    # def get_delivery_by_ptes(self, ob: object, ptes: List[property], values: List[str], isList: bool) -> List[object]:
    #     res = self.__rep.get_entities_by_ptes(ob, ptes, values, isList)
    #     if res is None:
    #         return None
    #     if isList:
    #         for x in res:
    #             x.user = self.get_entity_by_id(x.user_cached_id, User)
    #     else: res.user = self.get_entity_by_id(res.user_cached_id, User)
    #     return res
        
        

