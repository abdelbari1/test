import axios from 'axios'
import global from '../global'

const { baseURL, headers } = global.api

const BookedAPI = axios.create({
    baseURL: `${baseURL}/fashion/api/booked-items`,
    headers
})

const createBookedItem = (payload) => BookedAPI.post('', payload)

const updateBookedItem = (bid, payload) => BookedAPI.put(`${bid}`, payload)

const getAllItemsBookedByUserId = (uid) => BookedAPI.get(`/user/${uid}`)

const getAllOwnerItemsBooked = (oid) => BookedAPI.get(`/owner/${oid}`)

const getBookedItemByItemAndSize = (iid, sid) => BookedAPI.get(`/${iid}/size/${sid}`)

const createBookedItems = (payloads) => {
    const promise = []
    payloads.forEach((pr) => promise.push(createBookedItem(pr)))
    return Promise.all(promise)
}

const bookeditemsobj = {
    createBookedItem,
    updateBookedItem,
    getAllItemsBookedByUserId,
    getAllOwnerItemsBooked,
    getBookedItemByItemAndSize,
    createBookedItems
}

export default bookeditemsobj   