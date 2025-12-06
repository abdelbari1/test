from fashion.models.wishlist import WishList
from fashion.api.fastapi.models.wishlist_model import WishListOut
from fashion.api.fastapi.transformers.item_transformer import ItemTransformer as it
from typing import List

class WishlistTransformer:

    @staticmethod
    def wishlists_b2p(wl: List[WishList]) -> WishListOut:
        items = [it.item_b2p(x.item) for x in wl if x.item is not None]
        user_id = wl[0].user.uid
        return WishListOut(user_id=user_id, items=items)
    

    @staticmethod
    def wishlist_b2p(wl: WishList) -> WishListOut:
        return WishListOut(user_id=wl.user.uid, items=[it.item_b2p(wl.item)])