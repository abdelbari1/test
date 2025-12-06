from fashion.models.user import User
from fashion.models.wishlist import WishList
from fashion.models.item import Item
from typing import List
from fashion.cache import acache
from fastapi import HTTPException

class WishlistProcessor:

    @staticmethod
    def get_wishlist_by_user(uid: str) -> List[WishList]:
        user = acache.get_entity_by_id(uid, User)
        if user is None:
            raise HTTPException(status_code=404, detail='user not found')
        wishlist = acache.get_entities_by_ptes(WishList, [WishList.user], [uid], True)
        if wishlist is None:
            raise HTTPException(status_code=404, detail='failed to load user wishlist')
        if len(wishlist) == 0:
            return [WishList(user=user)]
        return wishlist

    @staticmethod
    def create_wishlist(uid: str, iid: str) -> List[WishList]:
        user = acache.get_entity_by_id(uid, User)
        if user is None:
            raise HTTPException(status_code=404, detail='user not found')
        item = acache.get_entity_by_id(iid, Item)
        if item is None:
            raise HTTPException(status_code=404, detail='some of items not found')
        wishlist = acache.get_entities_by_ptes(WishList, [WishList.user, WishList.item], [uid, iid], False)
        if wishlist is not None:
            raise HTTPException(status_code=400, detail='item already wishlisted')
        res = WishList(user, item)
        if acache.save_entity(res) is False:
            raise HTTPException(status_code=400, detail='failed to create wishlist')
        wishlist = acache.get_entities_by_ptes(WishList, [WishList.user], [uid], True)
        if wishlist is None:
            raise HTTPException(status_code=404, detail='failed to load user wishlist')
        if len(wishlist) == 0:
            return [WishList(user=user)]
        return wishlist

    @staticmethod
    def delete_wishlist_item(uid: str, itid: str) -> List[WishList]:
        user = acache.get_entity_by_id(uid, User)
        if user is None:
            raise HTTPException(status_code=404, detail='user not found')
        item = acache.get_entity_by_id(itid, Item)
        if item is None:
            raise HTTPException(status_code=404, detail='some of items not found')
        wishlist = acache.get_entities_by_ptes(WishList, [WishList.user, WishList.item], [uid, itid], False)
        if wishlist is None:
            raise HTTPException(status_code=400, detail='item not found in wishlist')
        if acache.delete_entity_by_pte(WishList, [WishList.user, WishList.item], [uid, itid]) is False:
            raise HTTPException(status_code=400, detail='failed to delete item from wishlist')
        wishlist = acache.get_entities_by_ptes(WishList, [WishList.user], [uid], True)
        if wishlist is None:
            raise HTTPException(status_code=404, detail='failed to load user wishlist')
        if len(wishlist) == 0:
            return [WishList(user=user)]
        return wishlist
        