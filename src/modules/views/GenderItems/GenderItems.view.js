import React from 'react'
import { Grid, Box, CircularProgress, Typography } from '@mui/material'
import { MainLayout } from '../../layouts'
import { CardCategory, SideMenuSearch, initFilters } from '../../components'
import ItemAPI from '../../apis/Item.api'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export default function GenderItems() {

    const [data, setData] = React.useState([])
    const [cacheData, setCacheData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [filters, setFilters] = React.useState(() => initFilters())
    const { type } = useParams()
    const { enqueueSnackbar } = useSnackbar()

    const handleGenderItems = React.useCallback(() => {
        ItemAPI.getItemsByGender(type)
            .then(res => {
                const result = res.data
                result.sort((a, b) => (b.item_created > a.item_created) - (b.item_created < a.item_created))
                setData(result)
                setCacheData(result)
            })
            .catch(err => enqueueSnackbar('Failed to load gender items', { variant: 'error' }))
            .finally(() => setLoading(false))
    }, [type])

    React.useEffect(() => {
        handleGenderItems()
    }, [type])

    return (
        <MainLayout
            title='Men'
            sideMenu={SideMenuSearch}
            options={{ cacheData, setData, gender: type }}
        >
            {loading ?
                <Grid container justifyContent={'center'} component={Box} py={20}>
                    <CircularProgress />
                </Grid>
                : data.length > 0 ?
                    <Grid container spacing={4} component={Box} py={2}>
                        {data.map((item) => (
                            <Grid item xs={12} sm={4} md={3} key={item.uid}>
                                <CardCategory
                                    product={item}
                                    isWishlist
                                    user
                                />
                            </Grid>
                        ))}
                    </Grid>
                    :
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <img src='/images/logo/fashify_op.png' className='not-found-img' alt='SIGNE' width='256' />
                            <Typography component='p' align='center' display='block'>
                                No items currently match your search for {type}. Try different filters.
                            </Typography>
                        </Grid>
                    </Grid>
            }
        </MainLayout>
    )

}