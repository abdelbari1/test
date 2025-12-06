import React from 'react';
import {
    Box,
    Grid,
    Paper,
    Skeleton,
    IconButton,
    Tooltip,
    Typography,
    TextField,
    Checkbox
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useStyles from './CardCategory.styles'
import ItemAPI from '../../apis/Item.api'
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon, Edit as EditIcon, CheckBox } from '@mui/icons-material'
import { useSnackbar } from 'notistack';
import { AddOrRemoveWishlistIconButton } from '../../contexts/Wishlist.context';
import moment from 'moment';

export default function CardCategory(props) {

    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const {
        product,
        admin,
        userRent,
        user,
        rentalMode,
        addRentalItem,
        rentalItems,
        setRentalItems,
        isWishlist,
        isCheck,
        itemsChecked,
        setItemsChecked,
        productId,
        buyer
    } = props

    const isRented = addRentalItem && Object.keys(rentalItems).includes(product.uid)
    const classes = useStyles({ isRented })

    const [image, setImage] = React.useState('')
    const [loading, setLoading] = React.useState(true)

    const handleImage = () => {
        ItemAPI.getImageItem(product.image_main)
            .then(res => setImage(res.data))
            .catch(err => enqueueSnackbar('Failed to load image', { variant: 'error' }))
            .finally(() => setLoading(false))
    }

    const handleClick = () => {
        if (user) navigate(`/item-details/${product.uid}`)
        if (userRent) navigate(`/rent-item-details/${props.rentalItem.uid}/${product.uid}`)
        if (admin) navigate(`/admin/item-details/${product.uid}`)
    }

    React.useEffect(() => {
        handleImage()
    }, [product.uid])

    const handleChangeCheckBox = (e) => {
        const { value, checked } = e.target
        console.log(value)
        if (checked) setItemsChecked((prev) => ([...prev, value]))
        else {
            setItemsChecked((prev) => prev.filter(id => id !== value))
        }
    }

    return (
        <Paper className={`${classes.root}`} elevation={3}>
            <Grid container direction='column' className={classes.fullHeight}>
                <Grid item className={classes.wishlistButton}>
                    {admin &&
                        <Tooltip title='Edit'>
                            <IconButton
                                onClick={(e) => { e.stopPropagation(); navigate(`/admin/edit-item/${product.uid}`) }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>}

                    {isWishlist && <AddOrRemoveWishlistIconButton productId={product.uid} />}
                    {isCheck && <Checkbox value={productId} onChange={(e) => handleChangeCheckBox(e)} />}
                </Grid>
                <Grid item xs={12} sx={{ height: '370px', overflow: 'hidden' }} onClick={() => handleClick()}>
                    {loading ?
                        <Skeleton
                            variant='rectangular'
                            height={350}
                        />
                        :
                        <Box
                            component={'img'}
                            src={`data:image/png;base64,${image}`}
                            alt={product.gender}
                            sx={{ width: '100%', height: '370px' }}
                        />
                    }
                </Grid>
                {!rentalMode && <Grid item xs={12} sx={{ maxHeight: buyer ? '100px' : '70px', overflow: 'hidden' }}>
                    <Grid container component={Box} px={2} py={1} spacing={1}>
                        <Grid item xs={12}>
                            <Typography component={'p'} textTransform={'capitalize'} color='textSecondary' noWrap sx={{ maxWidth: 200, textTransform: 'capitalize' }}>
                                {product.item_model}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ textDecoration: product.edited_price > 0 ? 'line-through' : 'none', fontWeight: 'bold' }} component={'p'}>{product.actual_price} {product.currency}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={'p'} color='error' sx={{ fontWeight: 'bold' }}>{product.edited_price > 0 ? `${product.edited_price} ${product.currency}` : ''}</Typography>
                        </Grid>
                        {buyer &&
                            <Grid item xs={12}>
                                <Typography component={'p'} color='primary' sx={{ fontWeight: 'bold' }}>{buyer.first_name} {buyer.last_name}</Typography>
                            </Grid>
                        }
                    </Grid>
                </Grid>}
                {rentalMode &&
                    <Grid item xs={12} sx={{ maxHeight: props.from_to ? '120px' : '70px', overflow: 'hidden' }}>
                        <Grid container component={Box} px={2} py={1} spacing={1}>
                            <Grid item xs={12}>
                                <Typography component={'p'} textTransform={'capitalize'} color='textSecondary' noWrap sx={{ maxWidth: 200, textTransform: 'capitalize' }}>
                                    {product.item_model}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ textDecoration: product.edited_price > 0 ? 'line-through' : 'none', fontWeight: 'bold' }} component={'p'}>{props.rentalItem.rental_price} {props.rentalItem.currency}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component={'p'} sx={{ fontWeight: 'bold' }}>{props.rentalItem.nb_of_days} {`Day(s)`}</Typography>
                            </Grid>
                            {props.from_to &&
                                <>
                                    <Grid item xs={6}>
                                        <Typography variant='subtitle2' className={classes.attributeKey}>From</Typography>
                                        <Typography component='p' className={classes.attributeValue}>{moment(props.from_to.from).format('YYYY-MM-DD')}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='subtitle2' className={classes.attributeKey}>To</Typography>
                                        <Typography component='p' className={classes.attributeValue}>{moment(props.from_to.to).format('YYYY-MM-DD')}</Typography>
                                    </Grid>
                                </>
                            }
                        </Grid>
                    </Grid>
                }
                {addRentalItem &&
                    <Grid item xs={12}>
                        <Grid container component={Box} px={2} py={1} spacing={1}>
                            <Grid item xs={12}>
                                <Grid container spacing={2} className={classes.fields}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label='Price'
                                            name='rental_price'
                                            variant='outlined'
                                            fullWidth
                                            required
                                            size='small'
                                            value={rentalItems[product.uid]?.rental_price || ''}
                                            onChange={(e) => setRentalItems({ ...rentalItems, [product.uid]: { ...rentalItems[product.uid], rental_price: e.target.value } })}
                                            onBlur={(e) => e.stopPropagation()}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label='By Days'
                                            name='nb_of_days'
                                            variant='outlined'
                                            fullWidth
                                            size='small'
                                            sx={{ fontSize: 10 }}
                                            required
                                            value={rentalItems[product.uid]?.nb_of_days || ''}
                                            onChange={(e) => setRentalItems({ ...rentalItems, [product.uid]: { ...rentalItems[product.uid], nb_of_days: e.target.value } })}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </Paper >
    )
}