from fashion.api.fastapi.services import app
from fashion.api.fastapi.models.purchase_model import PurchaseIn, PurchaseOut
from fashion.api.fastapi.transformers.purchase_transformer import PurchaseTransformer as pt
from fashion.processors.purchase_processor import PurchaseProcessor as pp
from typing import List

@app.post('/fashion/api/purchases', response_model=PurchaseOut, tags=['Purchases'])
async def create_purchase(purchase: PurchaseIn):
    iids = [x.item_id for x in purchase.request_lines]
    sids = [x.size for x in purchase.request_lines]
    pcht = pt.purchase_p2b(purchase)
    res = pp.create_purchase_request(purchase.buyer, purchase.seller, iids, sids, pcht, purchase.delivery)
    return pt.purchase_b2p(res)

@app.get('/fashion/api/purchases/{pid}', response_model=PurchaseOut, tags=['Purchases'])
async def get_purchase_by_id(pid: str) -> PurchaseOut:
    res = pp.get_purchase_by_id(pid)
    return pt.purchase_b2p(res)

@app.get('/fashion/api/purchases/owner/{oid}', response_model=List[PurchaseOut], tags=['Purchases'])
async def get_sold_items_owner(oid: str):
    res = pp.get_sold_items(oid)
    return [pt.purchase_b2p(x) for x in res]