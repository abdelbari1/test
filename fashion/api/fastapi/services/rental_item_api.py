from fashion.api.fastapi.models.item_model import ItemOut
from fashion.api.fastapi.services import app
from fashion.api.fastapi.models.rental_item_model import RentalItemIn, RentalItemOut, BookedItemIn, BookedItemOut
from fashion.api.fastapi.transformers.item_transformer import ItemTransformer
from fashion.api.fastapi.transformers.rental_item_transformer import RentalItemTransformer as rit
from fashion.processors.rental_item_processor import RentalItemProcessor as rip
from typing import List

@app.post('/fashion/api/rental-items', response_model=RentalItemOut, tags=['Rental Items'])
async def create_rental_item(item: RentalItemIn):
    res = rip.create_rental_item(rit.rental_item_p2b(item), item.item_id)
    return rit.rental_item_b2p(res)

@app.post('/fashion/api/rental-items/batch', response_model=List[RentalItemOut], tags=['Rental Items'])
async def create_rental_item(items: List[RentalItemIn]):
    ritf = [rit.rental_item_p2b(x) for x in items]
    iids = [x.item_id for x in items]
    res = rip.create_rental_items(ritf, iids)
    return [rit.rental_item_b2p(x) for x in res]

@app.get('/fashion/api/rental-items/{uid}/{gender}/{cat}', response_model=List[RentalItemOut], tags=['Rental Items'])
async def get_all_rental_items_by_user(uid: str, gender: str, cat: str):
    res = rip.get_all_items_by_user(uid, gender, cat)
    return [rit.rental_item_b2p(x) for x in res]

@app.get('/fashion/api/unrental-items/{uid}/{gender}/{cat}', response_model=List[ItemOut], tags=['Rental Items'])
async def get_all_unrental_items_by_user(uid: str, gender: str, cat: str):
    res = rip.get_all_unrental_items_user(uid, gender, cat)
    return [ItemTransformer.item_b2p(x) for x in res]

@app.get('/fashion/api/rental-items/{riid}', response_model=RentalItemOut, tags=['Rental Items'])
async def get_rental_item_by_id(riid: str):
    res = rip.get_item_by_id(riid)
    return rit.rental_item_b2p(res)

@app.put('/fashion/api/rental-items/{riid}', response_model=RentalItemOut, tags=['Rental Items'])
async def update_rental_item(riid: str, item: RentalItemIn):
    res = rip.update_item(riid, rit.rental_item_p2b(item), item.item_id)
    return rit.rental_item_b2p(res)

@app.delete('/fashion/api/rental-items/{riid}', response_model=bool, tags=['Rental Items'])
async def delete_rental_item(riid: str):
    res = rip.delete_item(riid)
    return res

@app.get('/fashion/api/rental-items', response_model=List[RentalItemOut], tags=['Rental Items'])
async def get_all_rent_items():
    res = rip.get_all_rent_items()
    return [rit.rental_item_b2p(x) for x in res]

# ---------------------------------------------------Booked Items-----------------------------------------------------------------

@app.post('/fashion/api/booked-items', response_model=BookedItemOut, tags=['Booked Items'])
async def create_booked_item(item: BookedItemIn):
    res = rip.create_booked_item(rit.booked_item_p2b(item), item.size_id, item.user_id, item.rental_item_id, item.owner_id, item.delivery_id)
    return rit.booked_item_b2p(res)

@app.put('/fashion/api/booked-items/{biid}', response_model=BookedItemOut, tags=['Booked Items'])
async def update_booked_item(biid: str, item: BookedItemIn):
    res = rip.update_booked_item(biid, rit.booked_item_p2b(item), item.size_id, item.user_id, item.rental_item_id, item.owner_id)
    return rit.booked_item_b2p(res)

@app.get('/fashion/api/booked-items/user/{uid}', response_model=List[BookedItemOut], tags=['Booked Items'])
async def get_all_items_booked_by_user_id(uid: str):
    res = rip.get_all_items_booked_by_uid(uid)
    return [rit.booked_item_b2p(x) for x in res]

@app.get('/fashion/api/booked-items/owner/{uid}', response_model=List[BookedItemOut], tags=['Booked Items'])
async def get_all_owner_items_booked(uid: str):
    res = rip.get_all_owner_items_booked(uid)
    return [rit.booked_item_b2p(x) for x in res]

@app.get('/fashion/api/booked-items/{item_id}/size/{sid}', response_model=List[BookedItemOut], tags=['Booked Items'])
async def get_booked_item_by_item_id(item_id: str, sid: str):
    res = rip.get_booked_item_by_item(item_id, sid)
    return [rit.booked_item_b2p(x) for x in res]


@app.post('/fashion/api/booked-items/batch', response_model=List[BookedItemOut], tags=['Booked Items'])
async def create_booked_items(bits: List[BookedItemIn]):
    bitst = [rit.booked_item_p2b(x) for x in bits]
    oids = [x.owner_id for x in bits]
    uids = [x.user_id for x in bits]
    sids = [x.size_id for x in bits]
    rids = [x.rental_item_id for x in bits]
    pass
    