from fashion.api.fastapi.services import app
from fashion.api.fastapi.models.wishlist_model import WishListIn, WishListOut
from fashion.api.fastapi.transformers.wishlist_transformer import WishlistTransformer as wt
from typing import List
from fashion.processors.wishlist_processor import WishlistProcessor as wp

@app.get('/fashion/api/wishlists/{uid}', response_model=WishListOut, tags=['Wishlists'])
async def get_all_wishlist(uid: str) -> WishListOut:
    res = wp.get_wishlist_by_user(uid)
    return wt.wishlists_b2p(res)

@app.post('/fashion/api/wishlists', response_model=WishListOut, tags=['Wishlists'])
async def create_wishlist(wish: WishListIn) -> WishListOut:
    res = wp.create_wishlist(wish.user_id, wish.item_id)
    return wt.wishlists_b2p(res)

@app.delete('/fashion/api/wishlists/{uid}/{itid}', response_model=WishListOut, tags=['Wishlists'])
async def delete_wishlist_item(uid: str, itid: str):
    res = wp.delete_wishlist_item(uid, itid)
    return wt.wishlists_b2p(res)