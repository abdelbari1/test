import React from 'react'
import { Grid, Box, CircularProgress, Typography, Link, Autocomplete, TextField } from '@mui/material'
import { CardCategory, MainPage, StyledButton, Modal, ConfirmModal } from '../../../components'
import RentalItemsAPI from '../../../apis/rental_items.api'
import { useSnackbar } from 'notistack'
import { Link as RouterLink } from 'react-router-dom'
import { AdminLayout } from '../../../layouts'
import global from '../../../global'
import { useNavigate } from 'react-router-dom'
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'

export default function RentalItemsView() {

    const category = { 'Men': 'Suits', 'Woman': 'Dresses' }
    const { _spacing } = global.methods
    const navigate = useNavigate()
    const authUser = global.auth
    const user_id = authUser.user.uid
    const { enqueueSnackbar } = useSnackbar()
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [openModal, setOpenModal] = React.useState(false)
    const [itemsDelete, setItemsDelete] = React.useState([])
    const [gender, setGender] = React.useState('')

    const handleItemByUser = React.useCallback((ged, cat) => {
        RentalItemsAPI.getRentalItemsByUserAndGenderAndCat(user_id, ged, cat)
            .then(res => {
                const result = res.data
                setData(result)
            })
            .catch(err => enqueueSnackbar('Failed to load rental items', { variant: 'error' }))
            .finally(() => setLoading(false))
    }, [user_id])

    React.useEffect(() => {
        if (gender.length > 0) {
            handleItemByUser(gender, category[gender])
        }
    }, [user_id, gender])

    const handleDeleteItems = () => {
        RentalItemsAPI.deleteRentalItems(itemsDelete)
            .then(res => {
                enqueueSnackbar('Rental items has been deleted successfully', { variant: 'success' })
                handleItemByUser(gender, category[gender])
            })
            .catch(err => enqueueSnackbar('failed to delete rental items', { variant: 'error' }))
    }

    return (
        <AdminLayout
            title='Rental Items'
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <MainPage
                        divider
                        filter
                        topActions={[
                            <StyledButton
                                color='error'
                                startIcon={<DeleteIcon />}
                                variant='outlined'
                                onClick={() => setOpenModal(true)}
                                disabled={itemsDelete.length === 0}
                            >
                                Delete Items
                            </StyledButton>,
                            <StyledButton
                                color='primary'
                                disabled={gender.length === 0}
                                variant='outlined'
                                startIcon={<AddIcon />}
                                onClick={() => navigate(`/admin/add-rental-item/${gender}`)}
                            >
                                Add Item
                            </StyledButton>
                        ]}
                    />
                </Grid>
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
                                            isCheck
                                            admin
                                            setItemsChecked={setItemsDelete}
                                            itemsChecked={itemsDelete}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            :
                            <Grid container spacing={3}>
                                <Grid item xs={12} style={{ textAlign: 'center' }}>
                                    <img src='/images/logo/fashify_op.png' className='not-found-img' alt='SIGNE' width='256' />
                                    <Typography component='p' align='center' display='block'>
                                        No rental items currently, add some items from <Link component={RouterLink} to='/admin/add-rental-item'> Add Items </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                    }
                </>
            }
            <Modal open={openModal} handleClose={() => setOpenModal(false)}>
                <ConfirmModal
                    title='Confirm To Delete Rental Items'
                    subtitle={`These Items ${itemsDelete.length} will be only deleted from rental items.`}
                    handleClose={() => setOpenModal(false)}
                    handleSubmit={() => handleDeleteItems()}
                />
            </Modal>
        </AdminLayout >
    )

}