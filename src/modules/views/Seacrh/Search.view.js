import React from "react";
import { Grid, Box, CircularProgress, TextField } from '@mui/material'
import { CardCategory } from "../../components";
import { MainLayout } from "../../layouts";
import { useSnackbar } from "notistack";
import ItemAPI from '../../apis/Item.api'

export default function SearchView() {

    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    const [cacheData, setCacheData] = React.useState([])
    const { enqueueSnackbar } = useSnackbar()
    const [search, setSearch] = React.useState('')

    const handleItems = React.useCallback(() => {
        ItemAPI.getItems()
            .then(res => { setData(res.data); setCacheData(res.data) })
            .catch(err => enqueueSnackbar('Failed to load items'), { variant: 'error' })
            .finally(() => setLoading(false))
    }, [])

    React.useEffect(() => handleItems(), [handleItems])

    const handleFilter = (e) => {
        const { value } = e.target
        setSearch(value)
        const dataFiltered = cacheData.filter((item) => item.gender.toLowerCase().includes(value.toLowerCase()) || item.item_category.toLowerCase().includes(value.toLowerCase()))
        setData(dataFiltered)
    }

    return (
        <MainLayout
            title='Search'
        >
            <Grid container >
                <Grid item xs={12}>
                    <TextField
                        label='Search Item By Type, Category'
                        variant='outlined'
                        value={search || ''}
                        onChange={(e) => handleFilter(e)}
                        fullWidth
                        required
                    />
                </Grid>
                {loading ? <Grid container component={Box} justifyContent={'center'} py={20}>
                    <CircularProgress />
                </Grid>
                    :
                    <Grid item xs={12} component={Box} py={3}>
                        <Grid container spacing={2}>
                            {data.map((item, index) => (
                                <Grid item xs={12} sm={4} md={3} lg={2} key={index}>
                                    <CardCategory
                                        product={item}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                }
            </Grid>
        </MainLayout>
    )

}