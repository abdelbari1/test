import axios from 'axios'
import global from '../global'

const { baseURL, headers } = global.api

const WishlistAPI = axios.create({
    baseURL: `${baseURL}/fashion/api/wishlists`,
    headers
})

const getUserWishlist = (uid) => WishlistAPI.get(`/${uid}`)

const addWishlist = (payload) => WishlistAPI.post('', payload)

const deleteWishlist = (uid, iid) => WishlistAPI.delete(`/${uid}/${iid}`)


const wishObj = {
    getUserWishlist,
    addWishlist,
    deleteWishlist
}

export default wishObj