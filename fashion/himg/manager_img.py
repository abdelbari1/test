import os
import base64
from PIL import Image
from io import BytesIO
from typing import List

class ContentManager:

    image_extension = 'jpg'

    def __init__(self, root: str) -> None:
        self.__root = root

    def __create_document_by_gender(self, container: str) -> str:
        dn = f'{self.__root}/{container}'
        os.makedirs(dn, exist_ok=True)
        return dn

    def __create_document_by_category(self, cont: str, cont_type: str) -> str:
        dit = f'{cont}/{cont_type}'
        os.makedirs(dit, exist_ok=True)
        return dit
    
    def store_images(self, cont: str, cat: str, imid: str, contents: List[str]):
        dct = self.__create_document_by_gender(cont)
        dcat = self.__create_document_by_category(dct, cat)
        for idx, content in enumerate(contents):
            self.__store_image(dcat, f'{imid}_{idx}', content)

    def store_image_main(self, cont: str, cat: str, img_name: str, content: str):
        dct = self.__create_document_by_gender(cont)
        dcat = self.__create_document_by_category(dct, cat)
        fn = f'{dcat}/{img_name}_main.{ContentManager.image_extension}'
        byte_decoded = base64.b64decode(content)
        img_src = Image.open(BytesIO(byte_decoded))
        out_img = img_src.convert('RGB')
        out_img.save(fn)
        
    def store_image_details(self, cont: str, cat: str, img_name: str, contents: List[str]):
        dct = self.__create_document_by_gender(cont)
        dcat = self.__create_document_by_category(dct, cat)
        for idx, content in enumerate(contents):
            self.__store_image(dcat, f'{img_name}_{idx}', content)

    def __store_image(self, dcat: str, img: str, content: str):
        fn = f'{dcat}/{img}.{ContentManager.image_extension}'
        byte_decoded = base64.b64decode(content)
        img_src = Image.open(BytesIO(byte_decoded))
        out_img = img_src.convert('RGB')
        out_img.save(fn)

    def get_all_images_by_category(self, container: str, cat: str):
        dct = f'{self.__root}/{container}/{cat}'
        if os.path.exists(dct):
            return os.listdir(dct)
        return []
    
    def get_document(self, container: str, cat: str) -> str:
        dct = f'{self.__root}/{container}/{cat}'
        if os.path.exists(dct):
            return dct
        return None
    
    def get_image_details(self, container: str, category: str, imid: str) -> List[str]:
        dcont = f'{self.__root}/{container}'
        dcat = f'{dcont}/{category}'
        if os.path.exists(dcat):
            imgs = [img for img in os.listdir(dcat) if img.startswith(f'{imid}_') and not img.endswith('main.jpg')]
            res = [f'{dcat}/{img}' for img in imgs if os.path.isfile(f'{dcat}/{img}')]
            return res
        return []
    
    def get_image_main(self, cont: str, cat: str, imn: str) -> str:
        dct = f'{self.__root}/{cont}/{cat}'
        if os.path.exists(dct):
            imgs = os.listdir(dct)
            cimg = f'{imn}_main.{ContentManager.image_extension}'
            if cimg in imgs:
                idx = imgs.index(cimg)
                return f'{dct}/{imgs[idx]}'
        return None

    def get_images(self, container: str, category: str, imid: str) -> List[str]:
        dcont = f'{self.__root}/{container}'
        dcat = f'{dcont}/{category}'
        if os.path.exists(dcat):
            imgs = [img for img in os.listdir(dcat) if img.startswith(imid)]
            res = [f'{dcat}/{img}' for img in imgs if os.path.isfile(f'{dcat}/{img}')]
            return res
        return []

    def get_image(self, cont: str, cat: str, imn: str) -> str:
        dct = f'{self.__root}/{cont}/{cat}'
        if os.path.exists(dct):
            imgs = os.listdir(dct)
            idx = imgs.index(f'{imn}{ContentManager.image_extension}')
            return imgs[idx]
        return None
    
    def delete_images(self, cont: str, cat: str, imgid: str) -> bool:
        images = self.get_image_details(cont, cat, imgid)
        for img in images:
            os.remove(img)
        return True

    def delete_image(self, cont: str, cat: str, imgid: str) -> bool:
        image = self.get_image_main(cont, cat, imgid)
        os.remove(image)
        return True

    def update_images(self, cont: str, cat: str, imgid: str, contents: List[str]) -> bool:
        # self.delete_images(cont, cat, imgid)
        self.store_image_details(cont, cat, imgid, contents)
        return True

    def update_image(self, cont: str, cat: str, imgid: str, content: str) -> bool:
        # self.delete_image(cont, cat, imgid)
        self.store_image_main(cont, cat, imgid, content)
        return True