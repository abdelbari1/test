import React from 'react'
import { Grid, Paper, Box, TextField, CircularProgress } from '@mui/material'
import { BreadCrumbs, ItemForm } from '../../../components'
import { AdminLayout } from '../../../layouts'
import useStyles from './EditItem.styles'
import ItemAPI from '../../../apis/Item.api'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'

export default function EditItem() {

    const { iid } = useParams()
    const classes = useStyles()
    const [item, setItem] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const { enqueueSnackbar } = useSnackbar()

    const handleItem = React.useCallback(() => {
        ItemAPI.getItemById(iid)
            .then(res => setItem(res.data))
            .catch(err => enqueueSnackbar('Failed to load item', { variant: 'error' }))
            .finally(() => setLoading(false))
    }, [iid])

    React.useEffect(() => handleItem(), [iid])

    console.log(item)

    return (
        <AdminLayout
            title='Add Item'
        >
            <BreadCrumbs
                items={[
                    { text: 'Items', url: '/admin/items' },
                    { text: 'Add Item' }
                ]}
            />
            {loading ?
                <Grid container component={Box} justifyContent={'center'} py={15}>
                    <CircularProgress />
                </Grid>
                :
                <Paper className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                name='gender'
                                label={'Gender'}
                                variant='outlined'
                                fullWidth
                                required
                                value={item.gender}
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <ItemForm
                        onSubmit={(payload) => ItemAPI.updateItem(iid, { gender: item.gender, ...payload })}
                        initialValuesObj={item}
                        gender={item.gender}
                        editMode
                    />
                </Paper>
            }
        </AdminLayout>
    )

}