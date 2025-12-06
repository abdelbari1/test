from fashion.api.fastapi.services import app
from fashion.api.fastapi.models.item_model import ItemIn, ItemOut
from fashion.api.fastapi.transformers.item_transformer import ItemTransformer as it
from typing import List
from fastapi.responses import FileResponse
from fashion.models.item import Item
from fashion.processors.item_processor import ItemProcessor as ip
import os

@app.get('/fashion/api/items', response_model=List[ItemOut], tags=['Items'])
async def get_all_items():
    its: List[Item] = ip.get_all_items()
    return [it.item_b2p(i) for i in its]

@app.get('/fashion/api/items/image/item', tags=['Items'])
async def get_item_images(img: str):
    res = ip.get_item_image(img)
    return res

@app.get('/fashion/items/images/item', tags=['Items'])
async def get_item_images(images: List[str]):
    res = ip.get_item_images(images)
    return res

@app.get('/fashion/api/items/{iid}', response_model=ItemOut, tags=['Items'])
async def get_item_by_id(iid: str) -> ItemOut:
    res = ip.get_item_by_id(iid)
    return it.item_b2p(res)

@app.post('/fashion/api/items', response_model=ItemOut, tags=['Items'])
async def create_item(item: ItemIn) -> ItemOut:
    itm = it.item_p2b(item)
    res = ip.create_item(itm, item.user_id)
    return it.item_b2p(res)

@app.get('/fashion/api/items/gender/{cl}', response_model=List[ItemOut], tags=['Items'])
async def get_items_by_gender(cl: str) -> List[ItemOut]:
    res = ip.get_items_by_gender(cl)
    return [it.item_b2p(x) for x in res]

@app.get('/fashion/api/items/category/{cat}', response_model=List[ItemOut], tags=['Items'])
async def get_items_by_category(cat: str) -> List[ItemOut]:
    res: List[Item] = ip.get_item_by_category(cat)
    return [it.item_b2p(x) for x in res]

@app.post('/fashion/api/items/batch', response_model=List[ItemOut], tags=['Items'])
async def create_items(its: List[ItemIn]) -> List[ItemOut]:
    items = [it.item_p2b(x) for x in its]
    usrs = [x.user_id for x in its]
    res = ip.create_items(items, usrs)
    return [it.item_b2p(x) for x in res]

@app.put('/fashion/api/items/{iid}', response_model=ItemOut, tags=['Items'])
async def update_item(iid: str, itm: ItemIn) -> ItemOut:
    res = ip.update_item(iid, it.item_p2b(itm), itm.user_id)
    return it.item_b2p(res)

@app.patch('/fashion/api/items/{iid}', response_model=bool, tags=['Items'])
async def patch_item_sts(iid: str, sts: str) -> bool:
    res = ip.update_item_sts(iid, sts)
    return res

@app.delete('/fashion/api/items/{iid}', response_model=bool, tags=['Items'])
async def delete_item(iid: str) -> bool:
    res = ip.delete_item(iid)
    return res

@app.delete('/fashion/api/items', response_model=bool, tags=['Items'])
async def delete_items(iids: List[str]) -> bool:
    res = ip.delete_items(iids)
    return res

@app.get('/fashion/api/items/gender/{gd}/category/{it_category}', response_model=List[ItemOut], tags=['Items'])
async def get_items_by_gender_and_category(gd: str, it_category: str):
    res = ip.get_items_by_gender_and_category(gd, it_category)
    return [it.item_b2p(x) for x in res]

@app.get('/fashion/api/items/{user_id}/user', response_model=List[ItemOut], tags=['Items'])
async def get_items_by_user_id(user_id: str) -> List[ItemOut]:
    res = ip.get_items_by_user_id(user_id)
    return [it.item_b2p(x) for x in res]