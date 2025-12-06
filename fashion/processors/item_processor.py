from fastapi import HTTPException
from fashion.models.item import Item
from typing import List
from fashion.cache import acache
import shortuuid as suid
from uuid import uuid4
import datetime
from fashion.himg import cmi
from fashion.models.sizes import Sizes
import os
from fashion.models.user import User
import base64

class ItemProcessor:

    @staticmethod
    def get_all_items() -> List[Item]:
        return acache.get_entities(Item)
    
    @staticmethod
    def get_items_by_gender(rl: str) -> List[Item]:
        items = acache.get_entities_by_ptes(Item, [Item.gender], [rl], True)
        if items is None:
            return []
        return items

    @staticmethod
    def get_item_by_category(cat: str) -> List[Item]:
        items = acache.get_entities_by_ptes(Item, [Item.item_category], [cat], True)
        if items is None:
            return []
        return items

    @staticmethod
    def get_item_by_id(iid: str) -> Item:
        item = acache.get_entity_by_id(iid, Item)
        if item is None:
            raise HTTPException(status_code=400, detail=f'item not found')
        return item

    @staticmethod
    def create_item(it: Item, user_id: str) -> Item:
        user = acache.get_entity_by_id(user_id, User)
        if user is None:
            raise HTTPException(status_code=404, detail='user not found')
        it.uid = f'{uuid4()}'
        it.user = user
        if it.image_main is None:
            raise HTTPException(status_code=404, detail='unable to create an item without images')
        cmi.store_image_main(it.gender, it.item_category, it.uid, it.image_main)
        cmi.store_image_details(it.gender, it.item_category, it.uid, it.image_details)
        it.item_created = f'{datetime.datetime.now()}'
        if it.reference is None:
            it.reference = f'{suid.random(6)}'
        iti = acache.save_entity(it)
        if iti is False:
            raise HTTPException(status_code=400, detail=f'failed to create item')
        ItemProcessor.set_item_sizes(it)
        return it
    
    @staticmethod
    def set_item_sizes(it: Item) -> bool:
        cqty = [x.quantity for x in it.sizes if x.quantity <= 0 or x.quantity == None]
        if len(cqty) > 0:
            raise HTTPException(status_code=404, detail='cannot create a size with quantity 0')
        for x in it.sizes:
            x.uid = f'{uuid4()}'
        if acache.save_sub_entity(it, Item.sizes, Sizes, True) is False:
            raise HTTPException(status_code=404, detail='failed to set size to item')
        return True

    @staticmethod
    def create_items(its: List[Item], uids: List[str]) -> List[Item]:
        for it, uid in zip(its, uids):
            user = acache.get_entity_by_id(uid, User)
            if user is None:
                raise HTTPException(status_code=404, detail='user not found')
            if it.image_main is None:
                raise HTTPException(status_code=404, detail='unable to create an item without images')
            cmi.store_image_main(it.gender, it.item_category, it.uid, it.image_main)
            cmi.store_image_details(it.gender, it.item_category, it.uid, it.image_details)
            it.uid = f'{uuid4()}'
            it.user = user
            it.item_created = f'{datetime.datetime.now()}'
            if it.reference is None:
                it.reference = f'{suid.random(6)}'
        sv = acache.save_entities(its)
        for x in its:
            ItemProcessor.set_item_sizes(x)
        if sv is False:
            raise HTTPException(status_code=404, detail='failed to create items')
        return its

    @staticmethod
    def update_item(iid: str, item: Item, uid: str) -> bool:
        user = acache.get_entity_by_id(uid, User)
        if user is None:
            raise HTTPException(status_code=404, detail='user not found')
        _item: Item = acache.get_entity_by_id(iid, Item)
        if _item is None:
            raise HTTPException(status_code=400, detail=f'item {iid} not found')
        item.uid = iid
        item.user = user
        item.item_created = _item.item_created
        item.reference = _item.reference
        if len(_item.sizes) > 0:
            if acache.delete_entities(_item.sizes) is False:
                raise HTTPException(status_code=400, detail='failed to delete sizes')
        ItemProcessor.set_item_sizes(item)
        cmi.delete_image(item.gender, _item.item_category, iid)
        cmi.delete_images(item.gender, _item.item_category, iid)
        cmi.update_image(item.gender, item.item_category, iid, item.image_main)
        cmi.update_images(item.gender, item.item_category, iid, item.image_details)
        up:bool = acache.update_entity(item)
        if up is False:
            raise HTTPException(status_code=404, detail='failed to update item')
        return item

    @staticmethod
    def delete_item(iid: str) -> bool:
        item: Item = acache.get_entity_by_id(iid, Item)
        if item is None:
            raise HTTPException(status_code=400, detail=f'item {iid} not found')
        cmi.delete_image(item.gender, item.item_category, iid)
        cmi.delete_images(item.gender, item.item_category, iid)
        di = acache.delete_entity(item)
        if di is False:
            raise HTTPException(status_code=404, detail='failed to delete item')
        return True

    @staticmethod
    def delete_items(iids: List[str]) -> bool:
        items = [acache.get_entity_by_id(id, Item) for id in iids]
        if None in items:
            raise HTTPException(status_code=400, detail=f'some items not found')
        for x in items:
            cmi.delete_image(x.gender, x.item_category, x.uid)
            cmi.delete_images(x.gender, x.item_category, x.uid)
        dits = acache.delete_entities(items)
        if dits is False:
            raise HTTPException(status_code=404, detail=f'failed to delete items')
        return True

    @staticmethod
    def update_item_sts(iid: str, sts: str) -> bool:
        item = acache.get_entity_by_id(iid, Item)
        if item is None:
            raise HTTPException(status_code=400, detail='item not found')
        us = acache.patch_entity(item, Item.status_item, sts)
        if us is False:
            raise HTTPException(status_code=404, detail='failed to update item status')
        return True
    
    @staticmethod
    def get_item_image(img: str) -> List[str]:
        if os.path.isfile(img) is False:
            raise HTTPException(status_code=400, detail='image not found')
        with open(img, 'rb') as file:
            content = file.read()
            res = base64.b64encode(content)
            return res
        
    @staticmethod
    def get_item_images(imgs: List[str]) -> List[str]:
        return [ItemProcessor.get_item_image(img) for img in imgs]
    
    @staticmethod
    def get_items_by_gender_and_category(gd: str, it_cat: str) -> List[Item]:
        res = acache.get_entities_by_ptes(Item, [Item.gender, Item.item_category], [gd, it_cat], True)
        if res is None:
            return []
        return res
    
    @staticmethod
    def get_items_by_user_id(uid: str) -> List[Item]:
        res = acache.get_entities_by_ptes(Item, [Item.user], [uid], True)
        if res is None:
            return None
        return res
            