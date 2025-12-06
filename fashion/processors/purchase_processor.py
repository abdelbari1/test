from fashion.models.delivery import Delivery
from fashion.models.domain import PurchaseItemStatus
from fashion.models.item import Item
from fashion.models.purchase import Purchase
from fashion.models.request_line import RequestLine
from typing import List
from fashion.cache import acache
from fashion.models.sizes import Sizes
from fashion.models.user import User
from fastapi import HTTPException
from uuid import uuid4

class PurchaseProcessor:

    @staticmethod
    def create_purchase_request(buyer: str, seller: str, iids: List[str], sids: List[str], purchase: Purchase, delid: str) -> Purchase:
        _buyer = acache.get_entity_by_id(buyer, User)
        if _buyer is None:
            raise HTTPException(status_code=400, detail='buyer not found')
        _seller = acache.get_entity_by_id(seller, User)
        if _seller is None:
            raise HTTPException(status_code=400, detail='seller not found')
        _delivery = acache.get_entity_by_id(delid, Delivery)
        if _delivery is None:
            raise HTTPException(status_code=400, detail='delivery not found')
        eiids = []
        esids = []
        for iid, sid in zip(iids, sids):
            item:Item = acache.get_entity_by_id(iid, Item)
            if item is not None:
                size = item.find_size_by_id(sid)
                if size is None: esids.append(sid)
            else: eiids.append(iid)
        if len(eiids) > 0:
            raise HTTPException(status_code=400, detail='item not found')
        if len(esids) > 0:
            raise HTTPException(status_code=400, detail='size not found')
        new_sizes = []
        for iid, sid, rl in zip(iids, sids, purchase.lines):
            item =  acache.get_entity_by_id(iid, Item)
            size =  item.find_size_by_id(sid)
            if size.quantity < rl.quantity_purchase:
                raise HTTPException(status_code=400, detail='quantity purchased is not available')
            size.quantity = size.quantity - rl.quantity_purchase
            new_sizes.append(size)
            rl.item = item
            rl.size = size.size
        purchase.uid = f'{uuid4()}'
        purchase.buyer = _buyer
        purchase.seller = _seller
        purchase.delivery = _delivery
        purchase.purchase_item_status = PurchaseItemStatus.Pending
        pch = acache.save_entity(purchase)
        if pch is False:
            raise HTTPException(status_code=404, detail='failed to create purchase')
        acache.save_sub_entity(purchase, Purchase.lines, RequestLine, True)
        acache.update_entities(new_sizes)
        return purchase

    @staticmethod
    def get_sold_items(oid: str) -> List[Purchase]:
        purchase = acache.get_entities_by_ptes(Purchase, [Purchase.seller], [oid], True)
        if purchase is None:
            raise HTTPException(status_code=400, detail='failed to load seller items')
        return purchase

    @staticmethod
    def get_purchase_by_id(pid: str) -> Purchase:
        purchase = acache.get_entity_by_id(pid, Purchase)
        if purchase is None:
            raise HTTPException(status_code=400, detail='purchase not found')
        return purchase