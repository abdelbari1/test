import React from 'react'
import { Grid, Box, Typography, CircularProgress } from '@mui/material'
import { CardCategory, MainPage, StyledButton } from '../.././../components'
import { AdminLayout } from '../../../layouts'
import RentalAPI from '../../../apis/rental_items.api'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import global from '../../../global'
import { useNavigate } from 'react-router-dom'

export default function AddRentalItem() {

    const category = { 'Men': 'Suits', 'Woman': 'Dresses' }
    const authUser = global.auth.user
    const navigate = useNavigate()
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const { enqueueSnackbar } = useSnackbar()
    const { gender } = useParams()
    const [rentalItems, setRentalItems] = React.useState({})
    const [submitting, setSubmitting] = React.useState(false)

    const getUnrentalItems = React.useCallback((gnd, cat) => {
        RentalAPI.getUnrentalItemsByUserAndGenderAndCat(authUser.uid, gnd, cat)
            .then(res => setData(res.data))
            .catch(err => enqueueSnackbar('Failed to load rental items', { variant: 'error' }))
            .finally(() => setLoading(false))
    }, [])

    React.useEffect(() => getUnrentalItems(gender, category[gender]), [getUnrentalItems])

    const createRentalItems = (e) => {
        e.preventDefault()
        setSubmitting(true)
        const payload = Object.keys(rentalItems).map((itid) => ({
            nb_of_days: rentalItems[itid].nb_of_days,
            rental_price: rentalItems[itid].rental_price,
            currency: data.find(dt => dt.uid === itid).currency,
            item_id: itid
        }))
        RentalAPI.batchRentalItems(payload)
            .then(res => {
                enqueueSnackbar('The items have been successfully set for rent', { variant: 'success' })
                setRentalItems({})
                navigate('/admin/rental-items')
            })
            .catch(err => enqueueSnackbar('Failed to set items for rent', { variant: 'error' }))
            .finally(() => setSubmitting(false))
    }

    return (
        <AdminLayout
            title='Add Rental Items'
        >
            {loading ?
                <Grid container justifyContent={'center'} component={Box} py={15}>
                    <CircularProgress />
                </Grid>
                :
                <Grid container>
                    <Grid item xs={12}>
                        <MainPage
                            divider
                            topActions={[
                                <StyledButton
                                    color='primary'
                                    variant='outlined'
                                    disabled={Object.keys(rentalItems).length === 0 || submitting}
                                    onClick={(e) => createRentalItems(e)}
                                >
                                    {submitting && <CircularProgress style={{ marginRight: '10px' }} size={20} />}
                                    {submitting ? 'Processing' : 'Submit'}
                                </StyledButton>
                            ]}
                        />
                    </Grid>
                    {data.length > 0 ?
                        <Grid container spacing={4} component={Box} py={2}>
                            {data.map((item) => (
                                <Grid item xs={12} sm={4} md={3} lg={2} key={item.uid}>
                                    <CardCategory
                                        product={item}
                                        addRentalItem
                                        rentalItems={rentalItems}
                                        setRentalItems={setRentalItems}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        :
                        <Grid container spacing={3}>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <img src='/images/logo/signe_op.png' className='not-found-img' alt='SIGNE' width='256' />
                                <Typography component='p' align='center' display='block'>
                                    You have no items for rent.
                                </Typography>
                            </Grid>
                        </Grid>}
                </Grid>
            }
        </AdminLayout>
    )

}