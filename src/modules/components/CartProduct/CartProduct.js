import React from 'react'
import {
    Box,
    Grid,
    Typography,
    IconButton,
    Tooltip,
    TextField
} from '@mui/material'
import CartStyles from './CartProduct.styles'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import globals from '../../global'
import { v4 as uuid4 } from 'uuid'
import { DateTimePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import QuantityPicker from './QuantityPicker'

export default function CartProduct(props) {

    const { imageBase64Js } = globals.methods
    const classes = CartStyles()
    const navigate = useNavigate()
    const { product, handleQuantityChange, handleRemoveFromCart, handleDateDayChange, itemsImage } = props
    const image = itemsImage.find((it) => it.uid === product.uid)?.image

    return (
        <Grid item xs={12} key={uuid4()} className={classes.productContainer}>
            <Box style={{ border: '1px solid rgba(50,50,50,0.7)' }} p={3}>
                <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} sm={5} md={5} lg={3}>
                        <img
                            onClick={() => navigate(`/item-details/${product.uid}`)}
                            style={{ border: '1px solid rgba(50,50,50,0.1)' }}
                            className={classes.productImageContainer}
                            width='100%'
                            height={250}
                            src={image ? imageBase64Js(image) : ''} alt='item'
                        />
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} lg={5}>
                        <Grid container spacing={1} direction={'column'}>
                            <Grid item>
                                <Typography component='p' textTransform={'capitalize'} maxWidth={250} noWrap>{product.item_name}</Typography>
                            </Grid>
                            {!product.rented &&
                                <Grid item sx={{ display: 'flex' }}>
                                    <Typography component='p' sx={{ textDecoration: product.edited_price > 0 ? 'line-through' : '', paddingRight: 7 }}> {product.actual_price} {product.currency === 'USD' ? '$' : 'L.L.'}</Typography>
                                    {product.edited_price > 0 && <Typography component='p' color='error'> {product.edited_price} {product.currency === 'USD' ? '$' : 'L.L.'}</Typography>}
                                </Grid>
                            }
                            {product.rented &&
                                <Grid item sx={{ display: 'flex' }}>
                                    <Typography component='p' sx={{ textDecoration: product.edited_price > 0 ? 'line-through' : '', paddingRight: 7 }}> {product.rental_price} {product.currency === 'USD' ? '$' : 'L.L.'} in {product.nb_of_days} {`Day(s)`} </Typography>
                                </Grid>
                            }
                            <Grid item>
                                <Typography component='p'>Size: <strong style={{ fontSize: 18, paddingInline: 10 }}>{product.size_selected.size}</strong></Typography>
                            </Grid>
                            <Grid item>
                                <Typography component='p'>Available Quantity: <strong style={{ fontSize: 18, paddingInline: 10 }}>{product.size_selected.quantity}</strong></Typography>
                            </Grid>
                            {product.rented && <Grid item xs={12}>
                                <Grid container spacing={3} component={Box} pt={3}>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <DateTimePicker
                                            inputVariant='outlined'
                                            format='YYYY-MM-DD'
                                            disablePast
                                            margin='dense'
                                            label={'Selected Date'}
                                            value={moment(product.selectedDate)}
                                            shouldDisableDate={(day) => product.unavailable_date.includes(moment(day).format('YYYY-MM-DD'))}
                                            onChange={date => handleDateDayChange(product, 'selectedDate', moment(date).format('YYYY-MM-DD hh:mm:ss'))}
                                            style={{ margin: 0 }}
                                            slotProps={{ textField: { fullWidth: true, required: true, vairant: 'inline', size: 'small' } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField
                                            label='Days'
                                            variant='outlined'
                                            size='small'
                                            margin='dense'
                                            fullWidth
                                            type='number'
                                            required
                                            style={{ margin: 0 }}
                                            value={product.nb_of_days_selected}
                                            onChange={(e) => {
                                                e.preventDefault()
                                                handleDateDayChange(product, 'nb_of_days_selected', e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                {!product.rented &&
                                    <QuantityPicker
                                        handleQuantityChange={handleQuantityChange}
                                        product={product}
                                    />}
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container justifyContent={'flex-end'}>
                                    <Grid item>
                                        {handleRemoveFromCart &&
                                            <Tooltip title='Remove from Cart'>
                                                <IconButton
                                                    onClick={() => handleRemoveFromCart(product)}
                                                    size='large'
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}