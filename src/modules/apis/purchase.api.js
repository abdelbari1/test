import axios from 'axios'
import global from '../global'


const { baseURL, headers } = global.api

const PurchaseAPI = axios.create({
    baseURL: `${baseURL}/fashion/api/purchases`,
    headers
})

const createPurchaseOrder = (payload) => PurchaseAPI.post('', payload)

const getAllSellerPurchase = (sid) => PurchaseAPI.get(`/seller/${sid}`)

const getPurchaseById = (pid) => PurchaseAPI.get(`${pid}`)

const getSoldItems = (uid) => PurchaseAPI.get(`/owner/${uid}`)

const purchaseObj = {
    createPurchaseOrder,
    getAllSellerPurchase,
    getPurchaseById,
    getSoldItems
}

export default purchaseObj