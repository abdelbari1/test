from fashion.models.delivery import Delivery
from fashion.api.fastapi.models.delivery_model import DeliveryIn, DeliveryOut
from fashion.api.fastapi.transformers.user_transformer import UserTransformer
from fashion.models.domain import Region


class DeliveryTransformer:

    @staticmethod
    def delivery_b2p(dly: Delivery) -> DeliveryOut:
        return DeliveryOut(uid=dly.uid, region=dly.region, address=dly.address, appartment=dly.appartment, city=dly.city, postcode=dly.postcode,
                           phone=dly.phone, save=dly.save, user=UserTransformer.user_b2p(dly.user))
    
    @staticmethod
    def delivery_p2b(dly: DeliveryIn) -> Delivery:
        return Delivery(None, region=Region._value2member_map_.get(dly.region), user=None, address=dly.address, appartment=dly.appartment, city=dly.city,
                        postcode=dly.postcode, phone=dly.phone, save=dly.save)