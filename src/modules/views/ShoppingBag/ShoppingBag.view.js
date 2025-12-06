import React from 'react'
import { Grid, Box, Typography, Divider, TextField, CircularProgress, Paper, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import useStyles from './ShoppingBag.styles'
import { CartContext, AuthContext } from '../../contexts'
import { useSnackbar } from 'notistack'
import { groupBy } from 'lodash'
import { MainLayout } from '../../layouts'
import { StyledButton, Modal, DeliveryForm } from '../../components'
import { ExpandMore } from '@mui/icons-material'
import CartProduct from '../../components/CartProduct/CartProduct'
import { v4 as uuid4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import DeliveryAPI from '../../apis/delivery.api'
import PurchaseAPI from '../../apis/purchase.api'
import ItemAPI from '../../apis/Item.api'
import BookedAPI from '../../apis/book_item.api'

const getProductsItemsCount = (products) => products.length
const getProductsQuantity = (products) => products.reduce((totalQuantity, product) => Number(product.quantity_selected) + totalQuantity, 0)
const getProductsPrice = (products) => products.reduce((totalPrice, product) => {
    if (!product.rented) {
        if (product.edited_price > 0) totalPrice = totalPrice + (product.edited_price * product.quantity_selected)
        else totalPrice = totalPrice + (product.actual_price * product.quantity_selected)
    }
    else {
        totalPrice = totalPrice + (Number(product.rental_price) * Number(product.nb_of_days_selected))
    }
    return totalPrice
}, 0)

function CheckoutForm(props) {

    const { products, confirmCheckout, noPaper, delivery, handlePurchase, editing, setEditing } = props
    const [modalOpen, setModalOpen] = React.useState(false)
    const classes = useStyles()
    const shipping = 3
    const currency = products.length > 0 ? products[0].currency : 'USD'

    const content = <Grid container spacing={3}>
        <Grid item xs={12}>
            <Typography variant='h5'>Order Summary</Typography>
        </Grid>
        <Grid item xs={12}>
            <Grid container spacing={3} justifyContent='space-between'>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Divider variant="fullWidth" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs className={classes.key}>Items</Grid>
                                <Grid item>{getProductsItemsCount(products)}</Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs className={classes.key}>Quantities</Grid>
                                <Grid item>{getProductsQuantity(products)}</Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs className={classes.key}>Subtotal</Grid>
                                <Grid item>{getProductsPrice(products)} {currency}</Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs className={classes.key}>Shipping</Grid>
                                <Grid item>3 {currency}</Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Divider variant="fullWidth" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs className={classes.total}>Total <p>{`(VAT included)`}</p></Grid>
                                <Grid item>{getProductsPrice(products) + shipping} {currency}</Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Divider variant="fullWidth" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <StyledButton
                        onClick={() => setModalOpen(true)}
                        fullWidth
                        color='primary'
                        variant='contained'
                        padding={10}
                    >
                        CheckOut
                    </StyledButton>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    return (
        <>
            {
                noPaper
                    ? <Box style={{ border: '1px solid rgba(50,50,50,0.25)' }} p={3}>{content} </Box>
                    : <Paper>
                        <Box p={3}>{content} </Box>
                    </Paper >
            }
            <Modal open={modalOpen} handleClose={() => setModalOpen(false)}>
                <DeliveryForm
                    initialValuesObj={delivery}
                    onSubmit={(payload) => confirmCheckout(payload)}
                    handlePurchase={handlePurchase}
                    editing={editing}
                    setEditing={setEditing}
                    setModalOpen={setModalOpen}
                />
            </Modal >
        </>
    )
}


function CartProducts(props) {

    const {
        products,
        handleQuantityChange,
        handleRemoveFromCart,
        handleDateDayChange,
        sellerName,
        itemsImage
    } = props

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls='panel1a-content'
                id='panel1a-header'
            >
                <Typography color='textPrimary'>{sellerName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={3}>
                    {products.map((product) =>
                        <CartProduct
                            key={uuid4()}
                            product={product}
                            handleQuantityChange={handleQuantityChange}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleDateDayChange={handleDateDayChange}
                            itemsImage={itemsImage}
                            products={props.prods}
                        />)}

                </Grid>
            </AccordionDetails>
        </Accordion>

    )
}


export default function ShoppingBag() {

    const cartContext = React.useContext(CartContext)
    const [sellersProducts, setSellersProducts] = React.useState([])
    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [delivery, setDelivery] = React.useState({})
    const authUser = JSON.parse(React.useContext(AuthContext).user) || {}
    const [editing, setEditing] = React.useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [itemsImage, setItemsImage] = React.useState([])

    const handlePurchase = (did) => {
        sellersProducts.forEach(({ user_created, products }) => {
            const unrentedProducts = products.filter(prd => !prd.rented)
            const payloadBooked = products.filter((prd) => prd.rented).map((product) => (
                {
                    rental_item_id: product.rental_item_id,
                    size_id: product.size_selected.uid,
                    requested_start_date: product.selectedDate,
                    duration: Number(product.nb_of_days_selected),
                    user_id: authUser.uid,
                    owner_id: user_created,
                    delivery_id: did
                }
            ))
            const payloadPurchase = {
                buyer: authUser.uid,
                seller: user_created,
                purchase_status: 'Delivery',
                delivery: did,
                request_lines: unrentedProducts.map((prd) => (
                    {
                        item_id: prd.uid,
                        size: prd.size_selected.uid,
                        quantity: prd.quantity_selected
                    }
                ))
            }
            if (unrentedProducts.length > 0) {
                PurchaseAPI.createPurchaseOrder(payloadPurchase)
                    .then(res => {
                        enqueueSnackbar('Order has been completed successfully', { variant: 'success' })
                    })
                    .catch(err => enqueueSnackbar('Failed to purchase items', { variant: 'error' }))
            }
            if (payloadBooked.length > 0) {
                BookedAPI.createBookedItems(payloadBooked)
                    .then(res => {
                        enqueueSnackbar('Order has been completed booked', { variant: 'success' })
                    })
                    .catch(err => enqueueSnackbar('Failed to booking order', { variant: 'error' }))
            }
        })
        cartContext.emptyCart()
        setProducts([])
        setSellersProducts([])
    }

    const handleCheckout = (delivery_details) => {
        if (Object.keys(delivery).length > 0) {
            return DeliveryAPI.updateDelivery(delivery.uid, delivery_details)
        }
        else {
            return DeliveryAPI.createDelivery(delivery_details)
        }
    }

    const handleQuantityChange = (id, quantity) => {
        const currentProducts = [...products]
        const productIndex = currentProducts.findIndex(product => product.uid === id)
        currentProducts[productIndex].quantity_selected = quantity
        setProducts(currentProducts)
        cartContext.handleQuantityChange(id, quantity)
    }

    const handleDateDayChange = (prd, key, value) => {
        const currentProducts = [...products]
        const productIndex = currentProducts.findIndex(product => product.uid === prd.uid)
        currentProducts[productIndex][key] = value
        setProducts(currentProducts)
        cartContext.handleDateDayChange(prd, key, value)
    }

    const handleRemoveFromCart = (prd) => {
        const currentProducts = products.filter(product => product.uid !== prd.uid || product.size_selected.uid !== prd.size_selected.uid)
        setProducts(currentProducts)
        cartContext.removeFromCart(prd)
    }

    const handleImages = (prds) => {
        ItemAPI.getItemsImage(prds)
            .then(res => {
                const result = res.map((rs, idx) => ({ uid: prds[idx].uid, image: rs.data }))
                setItemsImage(result)
            })
            .catch(err => enqueueSnackbar('failed to load item images', { variant: 'error' }))
            .finally(() => setLoading(false))
    }

    React.useEffect(() => {
        if (!products.length) {
            const prds = cartContext.getUserCart()
            setProducts(prds)
            const grpProducts = groupBy(prds, prd => prd.user_id)
            const prods = []
            Object.entries(grpProducts).forEach(([user_created, products]) => {
                prods.push({ user_created, products })
            })
            setSellersProducts(prods)
            if (cartContext.isLogin() && authUser?.uid && authUser?.user_role === 'Client') {
                DeliveryAPI.getDeliveryByUser(authUser.uid)
                    .then(res => {
                        if (res.data) {
                            setDelivery(res.data)
                            setEditing(true)
                        }
                        else {
                            setDelivery({})
                            setEditing(false)
                        }
                        prds.length ? handleImages(prds) : setLoading(false)
                    })
                    .catch(err => { enqueueSnackbar('Failed to load delivery', { variant: 'error' }); setLoading(false) })
            }
        }
        else {
            const grpProducts = groupBy(products, prd => prd.user_id)
            const prods = []
            Object.entries(grpProducts).forEach(([user_created, products]) => {
                prods.push({ user_created, products })
            })
            setSellersProducts(prods)
        }
    }, [cartContext.getUserCart, products.length])

    return (
        <MainLayout
            title='Shopping Bag'
        >
            {
                loading ? <Grid container component={Box} justifyContent={'center'} py={20}>
                    <CircularProgress />
                </Grid>
                    :
                    <Grid container>
                        {products.length > 0 ?
                            <Grid container spacing={3} direction={'row-reverse'}>
                                <Grid item xs={12} sm={12} md={5} lg={4}>
                                    <CheckoutForm
                                        requestsCount={sellersProducts.length}
                                        products={products}
                                        confirmCheckout={handleCheckout}
                                        delivery={delivery}
                                        handlePurchase={handlePurchase}
                                        editing={editing}
                                        setEditing={setEditing}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={7} lg={8}>
                                    <Grid container spacing={5}>
                                        {sellersProducts.map((sellerProducts) =>
                                            <Grid item xs={12} key={uuid4()}>
                                                <CartProducts
                                                    confirmCheckout={handleCheckout}
                                                    sellerName={'Anonymous Seller'}
                                                    products={sellerProducts.products}
                                                    handleQuantityChange={handleQuantityChange}
                                                    handleRemoveFromCart={handleRemoveFromCart}
                                                    handleDateDayChange={handleDateDayChange}
                                                    itemsImage={itemsImage}
                                                    prods={products}
                                                />
                                            </Grid>)}
                                    </Grid>
                                </Grid>
                            </Grid>
                            :
                            <Grid container justifyContent='center' spacing={3}>
                                <img src='/images/logo/fashify_op.png' className='not-found-img' alt='SIGNE' width='256' />
                                <Grid item xs={12}>
                                    <Typography component='p' align='center' display='block'>
                                        No items added to Shopping Bag, add some items.
                                        {/* from <Link component={RouterLink} to='/market'> marketplace </Link> */}
                                    </Typography>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <Typography component='p' align='center' display='block'>
                                        Check your requests <Link component={RouterLink} to='/market/requests'> here </Link>
                                    </Typography>
                                </Grid> */}
                            </Grid>
                        }
                    </Grid>
            }
        </MainLayout>
    )

}