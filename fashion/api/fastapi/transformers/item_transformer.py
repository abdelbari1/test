from fashion.api.fastapi.models.item_model import ItemIn, ItemOut, SizeOut, SizeIn
from fashion.models.item import Item
from fashion.models.sizes import Sizes
from fashion.models.domain import ItemCategory, StatusItem, Gender, Currency
from fashion.himg import cmi
class ItemTransformer:
    

    @staticmethod
    def item_b2p(item: Item) -> ItemOut:
        sizes = [ItemTransformer.size_b2p(x) for x in item.sizes]
        image_details = cmi.get_image_details(item.gender, item.item_category, item.uid)
        image_main = cmi.get_image_main(item.gender, item.item_category, item.uid)
        
        return ItemOut(uid=item.uid, item_name=item.item_name, item_category=item.item_category, gender=item.gender,
                        sizes=sizes, flash_sale=item.flash_sale, actual_price=item.actual_price,
                        currency=item.currency, item_model=item.item_model, reference=item.reference, status=item.status_item,
                        description=item.description, edited_price=item.edited_price, item_created=item.item_created, image_main=image_main,
                        image_details=image_details, user_id=item.user.uid)

    @staticmethod
    def item_p2b(item: ItemIn) -> Item:
        sizes = [ItemTransformer.size_p2b(x) for x in item.sizes]
        return Item(None, item_name=item.item_name, sizes=sizes, item_category=ItemCategory._value2member_map_.get(item.item_category),
                gender=Gender._value2member_map_.get(item.gender), actual_price=item.actual_price,
                currency=Currency._value2member_map_.get(item.currency), status_item=StatusItem._value2member_map_.get(item.status),
                flash_sale=item.flash_sale, description=item.description, item_model=item.item_model,
                reference=item.reference, image_main=item.image_main, image_details=item.image_details, user=None)
    
    @staticmethod
    def size_b2p(size: Sizes) -> SizeOut:
        return SizeOut(uid=size.uid, size=size.size, quantity=size.quantity)

    @staticmethod
    def size_p2b(size: SizeIn) -> Sizes:
        return Sizes(None, size=size.size, qty=size.quantity)