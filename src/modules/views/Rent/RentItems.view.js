import React from 'react'
import { Grid, Box, CircularProgress, Typography, Autocomplete, TextField } from '@mui/material'
import { CardCategory } from '../../components'
import RentalItemsAPI from '../../apis/rental_items.api'
import { useSnackbar } from 'notistack'
import global from '../../global'
import { MainLayout } from '../../layouts'

export default function ItemsRentedView() {

    const { _spacing } = global.methods
    const { enqueueSnackbar } = useSnackbar()
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [gender, setGender] = React.useState('')

    const handleItemByUser = React.useCallback((gnd) => {
        RentalItemsAPI.getAllRentItems()
            .then(res => {
                const result = res.data.filter(rd => rd.item.gender === gnd)
                setData(result)
            })
            .catch(err => enqueueSnackbar('Failed to load rental items', { variant: 'error' }))
            .finally(() => setLoading(false))
    }, [])

    React.useEffect(() => {
        if (gender.length > 0) {
            handleItemByUser(gender)
        }
    }, [gender])

    return (
        <MainLayout
            title='Rental Items'
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Autocomplete
                        value={gender}
                        id='gender'
                        name='gender'
                        options={['Men', 'Woman']}
                        getOptionLabel={(option) => _spacing(option)}
                        onChange={(e, value, reason) => { setGender(value) }}
                        isOptionEqualToValue={(op, val) => op.includes(val)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant='outlined'
                                label='Gender'
                                required
                            />
                        )}
                    />
                </Grid>
            </Grid>
            {gender.length === 0 ?
                <Grid container item xs={12} justifyContent={'center'} alignItems={'center'}>
                    <Box mt={3} pt={16} pb={16}>
                        <Typography align="center" variant="h6">
                            Please select gender
                        </Typography>
                    </Box>
                </Grid>
                :
                <>
                    {loading ?
                        <Grid container justifyContent={'center'} component={Box} py={20}>
                            <CircularProgress />
                        </Grid>
                        : data.length > 0 ?
                            <Grid container spacing={4} component={Box} py={2}>
                                {data.map((item) => (
                                    <Grid item xs={12} sm={4} md={3} lg={2} key={item.uid}>
                                        <CardCategory
                                            product={item.item}
                                            productId={item.uid}
                                            rentalItem={item}
                                            rentalMode
                                            userRent
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            :
                            <Grid container spacing={3}>
                                <Grid item xs={12} style={{ textAlign: 'center' }}>
                                    <img src='/images/logo/signe_op.png' className='not-found-img' alt='SIGNE' width='256' />
                                    <Typography component='p' align='center' display='block'>
                                        No rental items currently
                                    </Typography>
                                </Grid>
                            </Grid>
                    }
                </>
            }
        </MainLayout >
    )

}