from fashion.api.fastapi.services import app
from fashion.api.fastapi.transformers.delivery_transformer import DeliveryTransformer as dt
from fashion.processors.delivery_processor import DeliveryProcessor as dp
from fashion.api.fastapi.models.delivery_model import DeliveryIn, DeliveryOut
from typing import Union


@app.get('/fashion/api/delivery/{user_id}', response_model=Union[DeliveryOut, None], tags=['Delivery'])
async def get_delivery_by_user(user_id: str):
    res = dp.get_delivery_by_user_id(user_id)
    if res is None:
        return None
    return dt.delivery_b2p(res)

@app.post('/fashion/api/delivery', response_model=DeliveryOut, tags=['Delivery'])
async def create_delivery(delivery: DeliveryIn) -> DeliveryOut:
    res = dp.create_delivery(dt.delivery_p2b(delivery), delivery.user_id)
    return dt.delivery_b2p(res)


@app.put('/fashion/api/delivery/{did}', response_model=DeliveryOut, tags=['Delivery'])
async def update_delivery(did: str, delivery: DeliveryIn) -> bool:
    res = dp.update_delivery(did, dt.delivery_p2b(delivery), delivery.user_id)
    return dt.delivery_b2p(res)
