import axios from 'axios'
import global from '../global'

const { baseURL, headers } = global.api

const ItemAPI = axios.create({
    baseURL: `${baseURL}/fashion/api/items`,
    headers
})

const getItemsByGender = (type) => ItemAPI.get(`/gender/${type}`)

const getImageItem = (image) => ItemAPI.get('/image/item', { params: { img: image } })

const getItemById = iid => ItemAPI.get(`${iid}`)

const getImagesItem = (imgs) => {
    const promise = []
    imgs.forEach((img) => promise.push(getImageItem(img)))
    return Promise.all(promise)
}

const getItemByCategory = (cat) => ItemAPI.get(`/category/${cat}`)

const createItem = item => ItemAPI.post('', item)

const createItems = items => ItemAPI.post('/batch', items)

const updateItem = (iid, item) => ItemAPI.put(`/${iid}`, item)

const deleteItem = (iid) => ItemAPI.delete(`/${iid}`)

const deleteItems = (iids) => ItemAPI.delete('', { data: iids })

const getItemByGenderAndCategory = (cT, iC) => ItemAPI.get(`/gender/${cT}/category/${iC}`)

const getItemByUser = (uid) => ItemAPI.get(`/${uid}/user`)

const getItems = () => ItemAPI.get('')

const getItemsImage = (prds) => {
    const promise = []
    prds.forEach((pd) => promise.push(getImageItem(pd.image_main)))
    return Promise.all(promise)
}

const itemObj = {
    getItemsImage,
    getItemsByGender,
    getImageItem,
    getItemById,
    getImagesItem,
    getItemByCategory,
    createItem,
    createItems,
    updateItem,
    deleteItem,
    deleteItems,
    getItemByGenderAndCategory,
    getItemByUser,
    getItems
}

export default itemObj