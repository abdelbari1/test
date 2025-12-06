from fashion.models.delivery import Delivery
from fashion.models.rental_items import RentalItem
from fashion.models.item import Item
from fashion.models.user import User
from fashion.models.item_booked import BookedItem
from typing import List
from fastapi import HTTPException
from fashion.cache import acache
from uuid import uuid4
from fashion.models.sizes import Sizes

from fashion.processors.item_processor import ItemProcessor

class RentalItemProcessor:

    @staticmethod
    def create_rental_item(ritem: RentalItem, item_id: str) -> RentalItem:
        item = acache.get_entity_by_id(item_id, Item)
        if item is None:
            raise HTTPException(status_code=400, detail='item not found')
        ritem.uid = f'{uuid4()}'
        ritem.item = item
        if acache.save_entity(ritem) is False:
            raise HTTPException(status_code=404, detail='failed to create a rental item')
        return ritem
    
    @staticmethod
    def create_rental_items(ritems: List[RentalItem], iids: List[str]) -> List[RentalItem]:
        items = [x for x in iids if acache.get_entity_by_id(x, Item) is None]
        if len(items) > 0:
            raise HTTPException(status_code=400, detail='some items not found')
        for ri, iid in zip(ritems, iids):
            ri.uid = f'{uuid4()}'
            ri.item = acache.get_entity_by_id(iid, Item)
        if acache.save_entities(ritems) is False:
            raise HTTPException(status_code=404, detail='failed to create a rental items')
        return ritems


    @staticmethod
    def get_all_items_by_user(uid: str, gender: str, cat: str) -> List[RentalItem]:
        ritems:List[RentalItem] = acache.get_entities(RentalItem)
        ritems_u = [x for x in ritems if x.item.user.uid == uid and x.item.gender == gender and x.item.item_category == cat]
        return ritems_u
    
    @staticmethod
    def get_all_unrental_items_user(uid: str, gender: str, cat: str) -> List[Item]:
        items = acache.get_entities_by_ptes(Item, [Item.user, Item.gender, Item.item_category], [uid, gender, cat], True)
        ritems = RentalItemProcessor.get_all_items_by_user(uid, gender, cat)
        uitems = [x for x in items if x.uid not in [y.item.uid for y in ritems]]
        return uitems

    @staticmethod
    def get_all_rent_items():
        ritems = acache.get_entities(RentalItem)
        return ritems
    
    @staticmethod
    def get_item_by_id(riid: str) -> RentalItem:
        res = acache.get_entity_by_id(riid, RentalItem)
        if res is None:
            raise HTTPException(status_code=400, detail='rental item not found')
        return res
    
    @staticmethod
    def update_item(riid: str, ritem: RentalItem, iid: str) -> RentalItem:
        item = acache.get_entity_by_id(iid, Item)
        if item is None:
            raise HTTPException(status_code=400, detail='item not found')
        old_ritem = acache.get_entity_by_id(riid, RentalItem)
        if old_ritem is None:
            raise HTTPException(status_code=400, detail='rental item not found')
        ritem.uid = old_ritem.uid
        ritem.item = item
        if acache.update_entity(ritem) is False:
            raise HTTPException(status_code=404, detail='failed to update rental item')
        return ritem
    
    @staticmethod
    def delete_item(riid: str) -> bool:
        ritem = acache.get_entity_by_id(riid, RentalItem)
        if ritem is None:
            raise HTTPException(status_code=400, detail='rental item not found')
        if acache.delete_entity(ritem) is False:
            raise HTTPException(status_code=404, detail='failed to delete rental item')
        return True
    
# ---------------------------------------------------Booked Items-----------------------------------------------------------------

    @staticmethod
    def create_booked_item(bitem: BookedItem, size_id: str, user_id: str, riid: str, owner_id: str, del_id: str) -> BookedItem:
        user = acache.get_entity_by_id(user_id, User)
        if user is None:
            raise HTTPException(status_code=404, detail='user not found')
        owner = acache.get_entity_by_id(owner_id, User)
        if owner is None:
            raise HTTPException(status_code=404, detail='owner not found')
        ritem:RentalItem = acache.get_entity_by_id(riid, RentalItem)
        if ritem is None:
            raise HTTPException(status_code=404, detail='rental item not found')
        size = ritem.item.find_size_by_id(size_id)
        if size is None:
            raise HTTPException(status_code=404, detail='size not found')
        check_item = acache.get_entities_by_ptes(BookedItem, [BookedItem.requested_start_date, BookedItem.user], [bitem.requested_start_date, user_id], False)
        if check_item is not None:
            raise HTTPException(status_code=406, detail='this item already booked')
        delivery: Delivery = acache.get_entity_by_id(del_id, Delivery)
        if delivery is None:
            raise HTTPException(status_code=404, detail='delivery not found')
        bitem.owner = owner
        bitem.rental_item = ritem
        bitem.user = user
        bitem.size = size
        bitem.delivery = delivery
        bitem.uid = f'{uuid4()}'
        if acache.save_entity(bitem) is False:
            raise HTTPException(status_code=400, detail='failed to book item')
        return bitem
    
    @staticmethod
    def update_booked_item(biid: str, bitem: BookedItem, size_id: str, user_id: str, riid: str, owner_id: str) -> BookedItem:
        obitem = acache.get_entity_by_id(biid, BookedItem)
        if obitem is None:
            raise HTTPException(status_code=404, detail='booked item not found')
        user = acache.get_entity_by_id(user_id, User)
        if user is None:
            raise HTTPException(status_code=404, detail='user not found')
        owner = acache.get_entity_by_id(owner_id, User)
        if owner is None:
            raise HTTPException(status_code=404, detail='owner not found')
        size = acache.get_entity_by_id(size_id, Sizes)
        if size is None:
            raise HTTPException(status_code=404, detail='size not found')
        ritem = acache.get_entity_by_id(riid, RentalItem)
        if ritem is None:
            raise HTTPException(status_code=404, detail='rental item not found')
        bitem.user = user
        bitem.owner = owner
        bitem.rental_item = ritem
        bitem.uid = obitem.uid
        bitem.size = size
        if acache.update_entity(bitem) is False:
            raise HTTPException(status_code=400, detail='failed to update booked item')
        return bitem
    
    @staticmethod
    def get_all_items_booked_by_uid(uid: str) -> List[BookedItem]:
        user = acache.get_entity_by_id(uid, User)
        if user is None:
            raise HTTPException(status_code=404, detail='user not found')
        bitems = acache.get_entities_by_ptes(BookedItem, [BookedItem.user], [uid], True)
        return bitems if bitems is not None else []
    
    @staticmethod
    def get_all_owner_items_booked(uid: str) -> List[BookedItem]:
        user = acache.get_entity_by_id(uid, User)
        if user is None:
            raise HTTPException(status_code=404, detail='user not found')
        bitems = acache.get_entities_by_ptes(BookedItem, [BookedItem.owner], [uid], True)
        return bitems if bitems is not None else []
    
    @staticmethod
    def get_booked_item_by_item(item_id: str, sid: str) -> List[BookedItem]:
        item:Item = acache.get_entity_by_id(item_id, Item)
        if item is None:
            raise HTTPException(status_code=404, detail='item not found')
        size = item.find_size_by_id(sid)
        if size is None:
            raise HTTPException(status_code=404, detail='size not found')
        bitems:List[BookedItem] = acache.get_entities(BookedItem)
        item_booked = [x for x in bitems if x.rental_item.item.uid == item_id and x.size.uid == sid]
        return item_booked
