import React from 'react'
import { Grid, Box, CircularProgress, Typography } from '@mui/material'
import BookedAPI from '../../../apis/book_item.api'
import { useSnackbar } from 'notistack'
import global from '../../../global'
import { AdminLayout } from '../../../layouts'
import { CardCategory } from '../../../components'

export default function BookedItems() {

    const authUser = global.auth.user
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    const { enqueueSnackbar } = useSnackbar()

    const handleBookedItems = React.useCallback(() => {
        BookedAPI.getAllOwnerItemsBooked(authUser.uid)
            .then(res => {
                setData(res.data)
            })
            .catch(err => enqueueSnackbar('Failed to load sold items', { variant: 'error' }))
            .finally(() => setLoading(false))
    }, [])

    React.useEffect(() => {
        handleBookedItems()
    }, [authUser.uid])

    console.log(data);

    return (
        <AdminLayout
            title='Booked Items'
        >
            {loading ? <Grid container component={Box} justifyContent={'center'} py={15}>
                <CircularProgress />
            </Grid>
                :
                data.length > 0 ?
                    <Grid container spacing={4} component={Box} py={2}>
                        {data.map((item, index) => (
                            <Grid item xs={12} sm={4} md={3} lg={2} key={index}>
                                <CardCategory
                                    product={item.rental_item.item}
                                    productId={item.uid}
                                    rentalItem={{rental_price: item.rental_item.rental_price * item.duration, nb_of_days: item.duration}}
                                    from_to={{from: item.requested_start_date, to: item.requested_end_date}}
                                    rentalMode
                                />
                            </Grid>
                        ))}
                    </Grid>
                    :
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <img src='/images/logo/signe_op.png' className='not-found-img' alt='SIGNE' width='256' />
                            <Typography component='p' align='center' display='block'>
                                No items Booked currently.
                            </Typography>
                        </Grid>
                    </Grid>
            }
        </AdminLayout>
    )

}