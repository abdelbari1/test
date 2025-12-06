import React from 'react'
import { Grid, Box, CircularProgress, Typography } from '@mui/material'
import PurchaseAPI from '../../../apis/purchase.api'
import { useSnackbar } from 'notistack'
import global from '../../../global'
import { AdminLayout } from '../../../layouts'
import { CardCategory } from '../../../components'

export default function SoldItems() {

    const authUser = global.auth.user
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    const { enqueueSnackbar } = useSnackbar()

    const handleSoldItems = React.useCallback(() => {
        PurchaseAPI.getSoldItems(authUser.uid)
            .then(res => {
                const result = res.data.reduce((acc, curr) => {
                    curr.request_lines.forEach((prd) => {
                        acc.push({ item: prd.item, buyer: curr.buyer })
                    })
                    return acc
                }, [])
                setData(result)
            })
            .catch(err => enqueueSnackbar('Failed to load sold items', { variant: 'error' }))
            .finally(() => setLoading(false))
    }, [])

    React.useEffect(() => {
        handleSoldItems()
    }, [authUser.uid])

    return (
        <AdminLayout
            title='Sold Items'
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
                                    product={item.item}
                                    buyer={item.buyer}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    :
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <img src='/images/logo/fashify_op.png' className='not-found-img' alt='SIGNE' width='256' />
                            <Typography component='p' align='center' display='block'>
                                No items sold currently.
                            </Typography>
                        </Grid>
                    </Grid>
            }
        </AdminLayout>
    )

}