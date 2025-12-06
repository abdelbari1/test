import React from 'react'
import { AuthContext } from './Auth.context'
import WishlistAPI from '../apis/wishlist.api'
import { useSnackbar } from 'notistack'
import { Tooltip, IconButton } from '@mui/material'
import { Favorite as BookmarkIcon, FavoriteBorder as BookmarkBorderIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export const WishlistContext = React.createContext()

export function WishlistContextProvider(props) {

    const { enqueueSnackbar } = useSnackbar()
    const authUser = JSON.parse(React.useContext(AuthContext).user) || {}
    const [wishlist, setWishlist] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    const itemExists = iid => wishlist.find(item => item.uid === iid)

    const isLogin = () => {
        if (authUser) {
            if (authUser.user_role === 'Client') return true
            else return false
        }
        return false
    }

    const getUserWishlist = () => wishlist

    const addToWishlist = (itid) => {
        setLoading(true)
        const payload = {
            user_id: authUser.uid,
            item_id: itid
        }
        WishlistAPI.addWishlist(payload)
            .then(res => {
                setWishlist(res.data.items)
                enqueueSnackbar('Item add to your wishlist', { variant: 'success' })
            })
            .catch(err => enqueueSnackbar('failed to add item to your wishlist', { variant: 'error' }))
            .finally(() => setLoading(false))
    }

    const removeFromWishlist = (itid) => {
        setLoading(true)
        WishlistAPI.deleteWishlist(authUser.uid, itid)
            .then(res => {
                setWishlist(res.data.items)
                enqueueSnackbar('Item removed from your wishlist', { variant: 'success' })
            })
            .catch(err => enqueueSnackbar('Failed to remove item from your wishlist', { variant: 'error' }))
            .finally(() => setLoading(false))
    }

    const addOrRemoveFromWishlist = (itid) => {
        if (itemExists(itid))
            removeFromWishlist(itid)
        else addToWishlist(itid)
    }

    // const moveToWishlist = (product) => {
    //     if (!itemExists(product.id))
    //         fetchWishlist()
    //     else addToWishlist(product.id)
    // }

    const fetchUserWishlist = React.useCallback((uid) => {
        WishlistAPI.getUserWishlist(uid)
            .then(res => setWishlist(res.data.items))
            .catch(err => enqueueSnackbar('failed to load user wishlist', { variant: 'error' }))
            .finally(() => setLoading(false))
    }, [enqueueSnackbar])

    React.useEffect(() => {
        if (authUser.uid && authUser.user_role === 'Client') {
            fetchUserWishlist(authUser.uid)
        }
    }, [authUser?.uid])

    return (
        <WishlistContext.Provider value={{ getUserWishlist, loading, addOrRemoveFromWishlist, itemExists, isLogin }}>
            {props.children}
        </WishlistContext.Provider>
    )

}

export const AddOrRemoveWishlistIconButton = (props) => {

    const { productId } = props
    const wishlistContext = React.useContext(WishlistContext)
    const isInWishlist = wishlistContext.itemExists(productId)
    const navigate = useNavigate()

    return (
        <Tooltip title={'Wishlist'} placement='top-start' >
            <IconButton
                onClick={(e) => {
                    e.stopPropagation()
                    wishlistContext.isLogin() ? wishlistContext.addOrRemoveFromWishlist(productId) : navigate('/login')
                }}
                size='small'
                color='primary'
                disabled={wishlistContext.isLoading}
            >
                {isInWishlist
                    ? <BookmarkIcon />
                    : <BookmarkBorderIcon />}
            </IconButton>
        </Tooltip >
    )
}