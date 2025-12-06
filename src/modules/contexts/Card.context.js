import React from 'react'
import { useSnackbar } from 'notistack'
import { AuthContext } from './Auth.context'
import { StyledButton } from '../components'
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material'
import moment from 'moment'

const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]'

export const CartContext = React.createContext()
const initCart = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
        const cartArray = JSON.parse(savedCart)
        if (isObject(cartArray))
            return cartArray
    }
    return {}
}

export function CartContextProvider(props) {

    const [CartState, setCartState] = React.useState(() => initCart())
    const { enqueueSnackbar } = useSnackbar()

    const authedUser = JSON.parse(React.useContext(AuthContext).user) || {}

    const isLogin = () => {
        if (authedUser) {
            if (authedUser.user_role === 'Client') return true
            else return false
        }
        return false
    }

    const itemExists = (productId) => CartState[authedUser.uid]?.find(product => product.uid === productId)

    const itemExistsWithSameSize = (productId, size_id) => CartState[authedUser.uid]?.find(product => product.uid === productId && product.size_selected.uid === size_id)

    const saveCart = (newCartState) => {
        localStorage.setItem('cart', JSON.stringify(newCartState))
        setCartState(newCartState)
    }

    const getUserCart = () => CartState[authedUser.uid] || []

    const addToCart = (product, size_selected, rented, rentDetails, rentalItem, unavailable_date) => {
        if (!isLogin()) {
            enqueueSnackbar('Please login to add product to the shopping bag', { variant: 'warning' })
            window.location = '/login'
            return
        }
        if (itemExistsWithSameSize(product.uid, size_selected.uid)) {
            enqueueSnackbar(`Item already exists in your Shopping Bag`, { variant: 'info', })
            return
        }
        else {
            const newCartState = { ...CartState }
            const userCart = newCartState[authedUser.uid] || []
            if (rented) userCart.push({
                ...product,
                size_selected: size_selected,
                quantity_selected: 1,
                rented,
                rental_item_id: rentalItem.uid,
                rental_price: rentalItem.rental_price,
                nb_of_days: rentalItem.nb_of_days,
                selectedDate: moment(rentDetails.selectedDate).format('YYYY-MM-DD hh:mm:ss'),
                nb_of_days_selected: rentDetails.nb_of_days_selected,
                unavailable_date
            })
            else userCart.push({ ...product, size_selected: size_selected, quantity_selected: 1 })
            const newUserCartState = [...userCart]
            newCartState[authedUser.uid] = newUserCartState
            saveCart(newCartState)
            enqueueSnackbar(`Item is added to the Shopping Bag`, { variant: 'success', })
        }
    }

    const emptyCart = () => saveCart({})

    const removeProducts = (products) => {
        const newCartState = { ...CartState }
        const userCart = newCartState[authedUser.uid] || []
        const newUserCartState = userCart.filter(cartProduct => !products.find(product => product.uid === cartProduct.uid))
        newCartState[authedUser.uuid] = newUserCartState
        saveCart(newCartState)
    }

    const handleQuantityChange = (productId, quantity_selected) => {
        const newCartState = { ...CartState }
        const userCart = newCartState[authedUser.uid] || []
        const productObj = userCart.find(prd => prd.uid === productId)
        const quantity_available = productObj.size_selected.quantity
        if (quantity_available < quantity_selected) {
            enqueueSnackbar('The Max quantity of this size is ' + quantity_available, { variant: 'warning' })
        }
        else {
            const productIndex = userCart.findIndex(prd => prd.uid === productId)
            userCart[productIndex].quantity_selected = quantity_selected
            newCartState[authedUser.uid] = userCart
            saveCart(newCartState)
        }
    }

    const handleDateDayChange = (product, key, value) => {
        const newCartState = { ...CartState }
        const userCart = newCartState[authedUser.uid] || []
        const productIndex = userCart.findIndex(prd => prd.uid === product.uid)
        userCart[productIndex][key] = value
        newCartState[authedUser.uid] = userCart
        saveCart(newCartState)
    }

    const removeFromCart = (product) => {
        if (!itemExistsWithSameSize(product.uid, product.size_selected.uid)) {
            enqueueSnackbar(`Item does not exist in your shopping bag`, { variant: 'error', })
            return
        }
        else {
            const newCartState = { ...CartState }
            const userCart = newCartState[authedUser.uid] || []
            const newUserCartState = userCart.filter(cartProduct => cartProduct.uid !== product.uid || cartProduct.size_selected.uid !== product.size_selected.uid)
            newCartState[authedUser.uid] = newUserCartState
            saveCart(newCartState)
            enqueueSnackbar(`Item is removed from your Shopping Bag`, { variant: 'info', })
        }
    }

    return (
        <CartContext.Provider value={{ CartState, handleDateDayChange, setCartState, addToCart, removeFromCart, removeProducts, handleQuantityChange, getUserCart, emptyCart, itemExists, itemExistsWithSameSize, isLogin }}>
            {props.children}
        </CartContext.Provider>
    )

}

export const AddOrRemoveButtonCart = (props) => {

    const { product, productId, size_selected, setSizeSelected, rented, rentDetails, setRentDetails, loading, rentalItem, unavailable_date } = props
    const cartContex = React.useContext(CartContext)

    const handleDisabled = () => {
        if (loading) return true
        if (rented) {
            if (Object.values(rentDetails)[0]?.length === 0 || Object.values(rentDetails)[1]?.length === 0)
                return true
        }
        if (Object.keys(size_selected)?.length === 0) return true

    }

    return (
        cartContex.itemExistsWithSameSize(productId, size_selected.uid) ?
            <StyledButton
                startIcon={<RemoveIcon />}
                variant='contained'
                color='error'
                fullWidth
                sx={{ borderRadius: 0 }}
                onClick={(e) => {
                    e.stopPropagation()
                    cartContex.removeFromCart(product)
                }}
            >
                Remove From Cart
            </StyledButton>
            :
            <StyledButton
                startIcon={<AddIcon />}
                variant='contained'
                color='primary'
                sx={{ borderRadius: 0 }}
                fullWidth
                disabled={handleDisabled()}
                onClick={(e) => {
                    e.stopPropagation()
                    cartContex.addToCart(product, size_selected, rented, rentDetails, rentalItem, unavailable_date)
                    setSizeSelected({})
                    setRentDetails({ selectedDate: null, days: '' })
                }}
            >
                Add To Cart
            </StyledButton>
    )

}