from fashion.models.delivery import Delivery
from fashion.cache import acache
from fashion.models.user import User
from fastapi import HTTPException
from uuid import uuid4

class DeliveryProcessor:

    @staticmethod
    def get_delivery_by_user_id(uid: str) -> Delivery:
        user = acache.get_entity_by_id(uid, User)
        if user is None:
            raise HTTPException(status_code=400, detail='user not found')
        delivery = acache.get_entities_by_ptes(Delivery, [Delivery.user, Delivery.save], [uid, True], False)
        if delivery is None:
            return None
        return delivery
    
    @staticmethod
    def create_delivery(delivery: Delivery, user_id = str) -> Delivery:
        user = acache.get_entity_by_id(user_id, User)
        if user is None:
            raise HTTPException(status_code=400, detail='user not found')
        delivery.uid = f'{uuid4()}'
        delivery.user = user
        if acache.save_entity(delivery) is False:
            raise HTTPException(status_code=404, detail='failed to create a new delivery')
        return delivery
    
    @staticmethod
    def update_delivery(did: str, delivery: Delivery, user_id: str) -> Delivery:
        odelivery = acache.get_entity_by_id(did, Delivery)
        if odelivery is None:
            raise HTTPException(status_code=404, detail='delivery not found')
        user = acache.get_entity_by_id(user_id, User)
        if user is None:
            raise HTTPException(status_code=404, detail='user not found')
        delivery.uid = did
        delivery.user = user
        if acache.update_entity(delivery) is False:
            raise HTTPException(status_code=400, detail='failed to update delivery')
        return delivery
