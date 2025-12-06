import axios from 'axios'
import global from '../global'

const { baseURL, headers } = global.api

const RentalItemsAPI = axios.create({
    baseURL: `${baseURL}/fashion/api/`,
    headers
})

const createRentalItem = (payload) => RentalItemsAPI.post('rental-items', payload)

const batchRentalItems = (payload) => RentalItemsAPI.post('rental-items/batch', payload)

const getRentalItemsByUserAndGenderAndCat = (uid, gender, cat) => RentalItemsAPI.get(`rental-items/${uid}/${gender}/${cat}`)

const getUnrentalItemsByUserAndGenderAndCat = (uid, gender, cat) => RentalItemsAPI.get(`unrental-items/${uid}/${gender}/${cat}`)

const getRentalById = (rid) => RentalItemsAPI.get(`rental-items/${rid}`)

const updateRentalItem = (rid, payload) => RentalItemsAPI.put(`rental-items/${rid}`, payload)

const deleteRentalItem = (rid) => RentalItemsAPI.delete(`rental-items/${rid}`)

const deleteRentalItems = (riids) => {
    const promise = []
    riids.forEach(riid => promise.push(deleteRentalItem(riid)))
    return Promise.all(promise)
}

const getAllRentItems = () => RentalItemsAPI.get('rental-items')

const rentalObj = {
    createRentalItem,
    getRentalItemsByUserAndGenderAndCat,
    getUnrentalItemsByUserAndGenderAndCat,
    getRentalById,
    updateRentalItem,
    deleteRentalItem,
    batchRentalItems,
    deleteRentalItems,
    getAllRentItems
}

export default rentalObj