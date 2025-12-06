import React from 'react'
import { Grid, Box, CircularProgress, Typography, Link } from '@mui/material'
import { CardCategory, SideMenuSearch, initFilters, MainPage, StyledButton, Modal, ConfirmModal } from '../../../components'
import ItemAPI from '../../../apis/Item.api'
import { useSnackbar } from 'notistack'
import { Link as RouterLink } from 'react-router-dom'
import { AdminLayout } from '../../../layouts'
import global from '../../../global'
import { useNavigate } from 'react-router-dom'
import { CloudUpload, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'

export default function ItemsView() {

    const navigate = useNavigate()
    const authUser = global.auth
    const user_id = authUser.user.uid
    const { enqueueSnackbar } = useSnackbar()
    const [data, setData] = React.useState([])
    const [cacheData, setCacheData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [filters, setFilters] = React.useState(() => initFilters())
    const [openModal, setOpenModal] = React.useState(false)
    const [itemsDelete, setItemsDelete] = React.useState([])

    const handleItemByUser = React.useCallback(() => {
        ItemAPI.getItemByUser(user_id)
            .then(res => {
                const result = res.data
                result.sort((a, b) => (b.item_created > a.item_created) - (b.item_created < a.item_created))
                setData(result)
                setCacheData(result)
            })
            .catch(err => enqueueSnackbar('Failed to load items by user', { variant: 'error' }))
            .finally(() => setLoading(false))
    }, [user_id])

    React.useEffect(() => {
        handleItemByUser()
    }, [user_id])

    const handleDeleteItems = () => {
        ItemAPI.deleteItems(itemsDelete)
            .then(res => {
                if (res.data) {
                    const filtered = data.filter(dt => !itemsDelete.includes(dt.uid))
                    setData([...filtered])
                    setCacheData([...filtered])
                    enqueueSnackbar('Items has been deleted successfully', { variant: 'success' })
                }
            })
            .catch(err => enqueueSnackbar('Failed to delete Items selected', { variant: 'error' }))
    }

    return (
        <AdminLayout
            title='Items'
            sideMenu={SideMenuSearch}
            options={{ cacheData, setData, gender: 'Default', is_all: true, admin: true }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <MainPage
                        divider
                        topActions={[
                            <StyledButton
                                color='error'
                                startIcon={<DeleteIcon />}
                                variant='outlined'
                                onClick={() => setOpenModal(true)}
                            >
                                Delete Items
                            </StyledButton>,
                            <StyledButton
                                color='secondary'
                                variant='outlined'
                                startIcon={<CloudUpload />}
                            // onClick={() => }
                            >
                                Import Items
                            </StyledButton>,
                            <StyledButton
                                color='primary'
                                variant='outlined'
                                startIcon={<AddIcon />}
                                onClick={() => navigate('/admin/add-item')}
                            >
                                Add Item
                            </StyledButton>
                        ]}
                    />
                </Grid>
            </Grid>
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
                                    admin
                                    productId={item.uid}
                                    isCheck
                                    setItemsChecked={setItemsDelete}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    :
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <img src='/images/logo/fashify_op.png' className='not-found-img' alt='SIGNE' width='256' />
                            <Typography component='p' align='center' display='block'>
                                No items currently, add some items from <Link component={RouterLink} to='/admin/add-item'> Add Items </Link>
                            </Typography>
                        </Grid>
                    </Grid>
            }
            <Modal open={openModal} handleClose={() => setOpenModal(false)}>
                <ConfirmModal
                    title='Confirm To Delete Items'
                    subtitle={`These Items ${itemsDelete.length} will be permanently deleted.`}
                    handleClose={() => setOpenModal(false)}
                    handleSubmit={() => handleDeleteItems()}
                />
            </Modal>
        </AdminLayout>
    )

}