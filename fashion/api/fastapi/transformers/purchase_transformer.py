from fashion.api.fastapi.transformers.delivery_transformer import DeliveryTransformer
from fashion.api.fastapi.transformers.item_transformer import ItemTransformer
from fashion.api.fastapi.transformers.user_transformer import UserTransformer
from fashion.models.purchase import Purchase
from fashion.api.fastapi.models.purchase_model import PurchaseOut, PurchaseIn, RequestLineIn, RequestLineOut
from fashion.models.domain import PurchaseStatus
from fashion.models.request_line import RequestLine



class PurchaseTransformer:

    @staticmethod
    def purchase_b2p(pur : Purchase ) -> PurchaseOut:
        lines = [PurchaseTransformer.request_line_b2p(x) for x in pur.lines]
        seller = UserTransformer.user_b2p(pur.seller)
        buyer = UserTransformer.user_b2p(pur.buyer)
        delivery = DeliveryTransformer.delivery_b2p(pur.delivery)
        return PurchaseOut(uid=pur.uid, seller=seller, buyer=buyer, purchase_status=pur.purchase_status, request_lines=lines,
                           purcahse_date=pur.purchase_date, purchase_item_status=pur.purchase_item_status, delivery=delivery) 
    

    @staticmethod
    def purchase_p2b(pur : PurchaseIn) -> Purchase:
        lines = [PurchaseTransformer.request_line_p2b(x) for x in pur.request_lines]
        return Purchase(uid=None, buyer=None, seller=None, lines=lines, purchase_status=PurchaseStatus._value2member_map_.get(pur.purchase_status), delivery=None)
    
    
    @staticmethod
    def request_line_b2p(rl: RequestLine) -> RequestLineOut:
        item = ItemTransformer.item_b2p(rl.item)
        return RequestLineOut(item=item, size=rl.size, quantity=rl.quantity_purchase)
    
    @staticmethod
    def request_line_p2b(rl: RequestLineIn) -> RequestLine:
        return RequestLine(item=None, size=None, qty_purchase=rl.quantity)
    