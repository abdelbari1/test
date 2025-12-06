import React from 'react'
import { Grid, Box, Typography, Divider, CircularProgress, Hidden, TextField } from '@mui/material'
import { StyledButton, BreadCrumbs, CardCategory, Modal, ConfirmModal } from '../../components';
import { AdminLayout, MainLayout } from "../../layouts";
import { useParams } from 'react-router-dom';
import ItemAPI from '../../apis/Item.api'
import { useSnackbar } from 'notistack';
import useStyles from './Items.styles'
import './styleSheet.css'
import global from '../../global'
import { AddOrRemoveButtonCart } from '../../contexts/Card.context';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import BookedItemAPI from '../../apis/book_item.api'
import RentalItemAPI from '../../apis/rental_items.api'

export default function ItemDetails(props) {

    const navigate = useNavigate()
    const { _spacing } = global.methods
    const { riid, iid } = useParams()
    const [shrink, setShrink] = React.useState(1)
    const classes = useStyles(shrink)
    const [loading, setLoading] = React.useState(true)
    const [item, setItem] = React.useState({})
    const { enqueueSnackbar } = useSnackbar()
    const [images, setImages] = React.useState([])
    const [mainImage, setMainImage] = React.useState('')
    const [sizeSelected, setSizeSelected] = React.useState({})
    const [itemsCategory, setItemsCategory] = React.useState([])
    const [openModal, setOpenModal] = React.useState(false)
    const [rentDetails, setRentDetails] = React.useState({ selectedDate: null, nb_of_days_selected: '' })
    const [bookedItem, setBookedItem] = React.useState([])
    const [checked, setChecked] = React.useState(false)
    const [rentalItem, setRentalItem] = React.useState({})

    const handleBookedItem = (e, sid) => {
        e.preventDefault()
        setChecked(true)
        BookedItemAPI.getBookedItemByItemAndSize(iid, sid)
            .then(res => {
                const result = res.data
                const dates = result.reduce((acc, curr) => {
                    for (let i = 0; i <= curr.duration - 1; i++) {
                        acc.push(moment(curr.requested_start_date).add(i, 'days').format('YYYY-MM-DD'))
                    }
                    return acc
                }, [])
                setBookedItem(dates)
            })
            .catch(err => enqueueSnackbar('Failed to check if item is booked or not', { variant: 'error' }))
            .finally(() => setChecked(false))
    }

    const handleDeleteItem = () => {
        ItemAPI.deleteItem(item.uid)
            .then(res => {
                enqueueSnackbar('Item has been deleted successfully', { variant: 'success' })
                navigate('/admin/items')
            })
            .catch(err => enqueueSnackbar('Failed to delete item', { variant: 'error' }))
    }

    const handleItemsCategory = (ct, ic) => {
        ItemAPI.getItemByGenderAndCategory(ct, ic)
            .then(res => {
                const result = res.data
                result.sort((a, b) => (b.item_created > a.item_created) - (b.item_created < a.item_created))
                setItemsCategory(result)
            })
            .catch(err => enqueueSnackbar('Failed to load items category', { variant: 'error' }))
            .finally(() => setLoading(false))
    }

    const handleImageDetails = (main_image, img_del, gender, it_cat) => {
        ItemAPI.getImagesItem(img_del)
            .then(res => {
                setImages([main_image, ...res.map(rs => rs.data)])
            })
            .catch(err => enqueueSnackbar('Failed to load Images', { variant: 'error' }))
            .finally(() => props.admin ? setLoading(false) : handleItemsCategory(gender, it_cat))
    }

    const handleMainImage = (main_image, image_det, clType, itCat) => {
        ItemAPI.getImageItem(main_image)
            .then(res => {
                setMainImage(res.data)
                handleImageDetails(res.data, image_det, clType, itCat)
            })
            .catch(err => enqueueSnackbar('Failed to load main image', { variant: 'error' }))
    }

    const loadItem = () => {
        ItemAPI.getItemById(iid)
            .then(res => {
                setItem(res.data)
                handleMainImage(res.data.image_main, res.data.image_details, res.data.gender, res.data.item_category)
            })
            .catch(err => enqueueSnackbar('Failed to load item', { variant: 'error' }))
    }

    const loadRentalItem = () => {
        RentalItemAPI.getRentalById(riid)
            .then(res => {
                setItem(res.data.item)
                setRentalItem(res.data)
                handleMainImage(res.data.item.image_main, res.data.item.image_details, res.data.item.gender, res.data.item.item_category)
            })
            .catch(err => enqueueSnackbar('Failed to load rental item', { variant: 'error' }))
    }

    const handleLoadItem = React.useCallback(() => {
        if (props.rented) loadRentalItem()
        else loadItem()
    }, [iid])

    React.useEffect(() => { handleLoadItem() }, [iid])

    const handleClickImageDetails = (idx) => {
        const imageContainer = document.querySelector('.image-container')
        imageContainer.scrollTo({ left: 0, top: 410 * idx, behavior: 'smooth' })
        setShrink(idx + 1)
    }

    const handleScrollImages = (e) => {
        const imageContainer = document.querySelector('.image-container')
        const st = imageContainer.scrollTop
        setShrink(Math.round(st / 410) + 1)
    }

    const Layout = props.admin ? AdminLayout : MainLayout

    const breadCrumbsUser = [
        { text: loading ? '' : `${_spacing(item.gender)} Items`, url: `/gender/${item.gender}` },
        { text: loading ? '' : item.item_category }
    ]

    const breadCrumbsAdmin = [
        { text: `Items`, url: `/admin/items` },
        { text: loading ? '' : item.item_category }
    ]

    const breadCrumbsUserRent = [
        { text: `Rent Items`, url: `/rental-items` },
        { text: loading ? '' : item.item_category }
    ]

    return (
        <>
            <Layout
                title='Item Details'
            >
                <BreadCrumbs
                    items={props.admin ? breadCrumbsAdmin : props.rented ? breadCrumbsUserRent : breadCrumbsUser}
                />
                {loading ?
                    <Grid container component={Box} justifyContent={'center'} py={15}>
                        <CircularProgress />
                    </Grid>
                    :
                    <Grid container spacing={3} justifyContent={props.admin ? 'space-between' : 'center'} className={classes.root}>
                        {!props.admin && <Hidden lgDown>
                            <Grid item lg={3}>
                                <Grid container spacing={0} className={classes.comp_and_care}>
                                    <Grid item xs={12}>
                                        <Typography variant='h6'>Composition & Care</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant='h6'>Composition</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography component={'p'}>
                                            We work with monitoring programmes to ensure compliance with our social, environmental and health and safety
                                            standards for our products. To assess compliance, we have developed a programme of audits and continuous
                                            improvement plans.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <StyledButton
                                            color='primary'
                                            variant='text'
                                        >
                                            View More
                                        </StyledButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Hidden>}
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Grid container justifyContent={'center'}>
                                <Grid item className={`${classes.mainImage} image-container`} onScroll={(e) => handleScrollImages(e)}>
                                    {images.map((img, index) => (
                                        <Box
                                            component='img'
                                            src={`data:image/png;base64,${img}`}
                                            alt='image details'
                                            key={index}
                                        />
                                    ))}
                                </Grid>
                                <Grid item className={classes.lineImage}>
                                    <Box component={'div'} />
                                </Grid>
                                <Grid item className={classes.imageDetails}>
                                    {images.slice(0, 8).map((img, index) => (
                                        <Box
                                            component='img'
                                            src={`data:image/png;base64,${img}`}
                                            alt='image details'
                                            key={index}
                                            onClick={() => handleClickImageDetails(index)}
                                        />
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={props.admin ? 6 : 3}>
                            <Grid container justifyContent={'center'} direction={'column'} className={classes.containerSize}>
                                <Grid item>
                                    <Grid container direction={'column'} className={classes.sizes}>
                                        <Grid item>
                                            <Typography component='p' textTransform={'capitalize'}>{item.item_name}</Typography>
                                        </Grid>
                                        <Grid item className={classes.productName}>
                                            <Typography component='p' color='primary' align='left'>{item.description}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography component='p'>Check In-Store: <strong style={{ paddingLeft: 5 }}>{item.status}</strong></Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={props.rented ? 9 : 6}>
                                                    <Typography sx={{ fontWeight: 600 }} component='p' className={item.edited_price > 0 ? 'edited' : ''}>{props.rented ? <strong style={{ fontWeight: 400, paddingRight: 5 }}>Total Price: </strong> : ''} {item.actual_price} {item.currency === 'USD' ? '$' : 'L.L.'}</Typography>
                                                </Grid>
                                                {item.edited_price > 0 &&
                                                    <Grid item xs={props.rented ? 3 : 6}>
                                                        <Typography sx={{ fontWeight: 600 }} component='p' color='error'>{item.edited_price} {item.currency === 'USD' ? '$' : 'L.L.'}</Typography>
                                                    </Grid>
                                                }
                                            </Grid>
                                        </Grid>
                                        {props.rented &&
                                            <Grid item xs={12}>
                                                <Typography component='p'>Rental Price: <strong style={{ paddingLeft: 5 }}>{rentalItem.rental_price} {rentalItem.currency === 'USD' ? '$' : 'L.L.'} in {rentalItem.nb_of_days_selected} {`day(s)`}</strong></Typography>
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Divider sx={{ backgroundColor: '#000' }} />
                                </Grid>
                                <Grid item>
                                    <Grid container className={classes.checkSize} direction={'column'}>
                                        <Grid item>
                                            <Typography variant={'inherit'}>{item.reference}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container spacing={2}>
                                                {item.sizes.map((size) => (
                                                    <Grid item xs={6} key={size.uid}>
                                                        <StyledButton
                                                            color={sizeSelected?.uid === size.uid ? 'primary' : 'secondary'}
                                                            variant={sizeSelected?.uid === size.uid ? 'contained' : 'outlined'}
                                                            fullWidth
                                                            onClick={(e) => {
                                                                setSizeSelected(size)
                                                                if (props.rented) {
                                                                    handleBookedItem(e, size.uid)
                                                                }
                                                            }}
                                                            disabled={size.quantity === 0 || checked}
                                                        >
                                                            {size.size} {props.admin && ` / ${size.quantity}`}
                                                        </StyledButton>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                            <Grid container item xs={12} spacing={1} component={Box} py={1}>
                                                <Grid item>
                                                    <Typography component={'p'} sx={{ fontSize: 12 }}>Find Your Size</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography component={'p'} sx={{ fontSize: 12 }}>|</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography component={'p'} sx={{ fontSize: 12 }}>Measurement Guide</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {props.rented && <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={8}>
                                                    <DatePicker
                                                        inputVariant='outlined'
                                                        format='YYYY-MM-DD'
                                                        disablePast
                                                        margin='dense'
                                                        label={'Requested Date'}
                                                        value={rentDetails.selectedDate}
                                                        disabled={Object.keys(sizeSelected).length === 0}
                                                        shouldDisableDate={(day) => bookedItem.includes(moment(day).format('YYYY-MM-DD'))}
                                                        onChange={date => {
                                                            console.log(date);
                                                            setRentDetails({ ...rentDetails, selectedDate: moment(date) })
                                                        }}
                                                        style={{ margin: 0 }}
                                                        slotProps={{ textField: { fullWidth: true, required: true, vairant: 'inline', size: 'small' } }}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        label='Days'
                                                        variant='outlined'
                                                        size='small'
                                                        margin='dense'
                                                        fullWidth
                                                        disabled={Object.keys(sizeSelected).length === 0}
                                                        type='number'
                                                        required
                                                        style={{ margin: 0 }}
                                                        value={rentDetails.nb_of_days_selected || ''}
                                                        onChange={(e) => setRentDetails({ ...rentDetails, nb_of_days_selected: e.target.value })}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        }
                                    </Grid>
                                </Grid>
                                {props.admin &&
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <StyledButton
                                                color='secondary'
                                                variant='contained'
                                                fullWidth
                                                startIcon={<EditIcon />}
                                                style={{ borderRadius: 0 }}
                                                onClick={() => navigate(`/admin/edit-item/${item.uid}`)}
                                                texttransform='capitalize'
                                            >
                                                Edit Item
                                            </StyledButton>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <StyledButton
                                                fullWidth
                                                color='error'
                                                startIcon={<DeleteIcon />}
                                                variant='contained'
                                                texttransform='capitalize'
                                                style={{ borderRadius: 0 }}
                                                onClick={() => setOpenModal(true)}
                                            >
                                                Delete Item
                                            </StyledButton>
                                        </Grid>
                                    </Grid>
                                }
                                {!props.admin && <Grid item>
                                    <AddOrRemoveButtonCart
                                        product={item}
                                        setRentDetails={setRentDetails}
                                        loading={checked}
                                        rented={props.rented}
                                        rentDetails={rentDetails}
                                        productId={item.uid}
                                        size_selected={sizeSelected}
                                        setSizeSelected={setSizeSelected}
                                        rentalItem={rentalItem}
                                        unavailable_date={bookedItem}
                                        img={mainImage}
                                    />
                                </Grid>}
                            </Grid>
                        </Grid>
                        {!props.admin &&
                            <Grid item xs={12} component={Box} py={3}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant='h6'>You May Also Like</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    {itemsCategory.map((item) => (
                                        <Grid item xs={12} sm={3} md={2} key={item.uid}>
                                            <CardCategory
                                                product={item}
                                                isWishlist
                                                user
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                }
            </Layout>
            <Modal open={openModal} handleClose={() => setOpenModal(false)}>
                <ConfirmModal
                    title='Confirm Delete Item'
                    subtitle='The item will be permanently deleted'
                    handleClose={() => setOpenModal(false)}
                    handleSubmit={() => handleDeleteItem()}
                />
            </Modal>
        </>
    )

}
