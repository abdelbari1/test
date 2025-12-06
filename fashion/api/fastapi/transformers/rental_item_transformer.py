from fashion.api.fastapi.models.rental_item_model import RentalItemIn, RentalItemOut, BookedItemIn, BookedItemOut
from fashion.api.fastapi.transformers.delivery_transformer import DeliveryTransformer
from fashion.api.fastapi.transformers.user_transformer import UserTransformer
from fashion.models.rental_items import RentalItem
from fashion.models.item_booked import BookedItem
from fashion.models.domain import *
from fashion.api.fastapi.transformers.item_transformer import ItemTransformer

class RentalItemTransformer:

    @staticmethod
    def rental_item_b2p(ri: RentalItem) -> RentalItemOut:
        item = ItemTransformer.item_b2p(ri.item)
        return RentalItemOut(uid=ri.uid, item=item, rental_price=ri.rental_price, nb_of_days=ri.nb_of_days, currency=ri.currency)
    
    @staticmethod
    def rental_item_p2b(ri: RentalItemIn) -> RentalItem:
        return RentalItem(None, None, nb_of_days=ri.nb_of_days, rental_price=ri.rental_price, currency=Currency._value2member_map_.get(ri.currency))
    
    @staticmethod
    def booked_item_b2p(bi: BookedItem) -> BookedItemOut:
        user = UserTransformer.user_b2p(bi.user)
        delivery  = DeliveryTransformer.delivery_b2p(bi.delivery)
        size = ItemTransformer.size_b2p(bi.size)
        rental_item = RentalItemTransformer.rental_item_b2p(bi.rental_item)
        return BookedItemOut(uid=bi.uid, rental_item=rental_item, size=size, requested_start_date=bi.requested_start_date, duration=bi.duration, requested_end_date=bi.requested_end_date,
                            user=user, owner_id=bi.owner.uid, delivery=delivery)
    
    @staticmethod
    def booked_item_p2b(bi: BookedItemIn) -> BookedItem:
        return BookedItem(None, None, None, requested_start_date=bi.requested_start_date, duration=bi.duration)