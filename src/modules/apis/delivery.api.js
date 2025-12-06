import axios from 'axios'
import global from '../global'

const {baseURL, headers} = global.api

const DeliveryAPI = axios.create({
    baseURL: `${baseURL}/fashion/api/delivery`,
    headers
})

const createDelivery = (payload) => DeliveryAPI.post('', payload)

const getDeliveryByUser = (uid) => DeliveryAPI.get(`/${uid}`)

const updateDelivery = (did, payload) => DeliveryAPI.put(`/${did}`, payload)

const deliveryObj = {
    createDelivery,
    getDeliveryByUser,
    updateDelivery
}

export default deliveryObj