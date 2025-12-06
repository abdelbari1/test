import React from 'react'
import { Grid, Paper, Autocomplete, Box, Typography, TextField } from '@mui/material'
import { BreadCrumbs, ItemForm } from '../../../components'
import { AdminLayout } from '../../../layouts'
import useStyles from './AddItem.styles'
import ItemAPI from '../../../apis/Item.api'
import global from '../../../global'

export default function AddItem() {

    const authUser = global.auth.user
    const { _spacing } = global.methods
    const classes = useStyles()
    const [gender, setGender] = React.useState('')

    return (
        <AdminLayout
            title='Add Item'
        >
            <BreadCrumbs 
                items={[
                    {text: 'Items', url: '/admin/items'},
                    {text: 'Add Item'}
                ]}
            />
            <Paper className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={gender}
                            id='gender'
                            name='gender'
                            options={global.constants.gender}
                            getOptionLabel={(option) => _spacing(option)}
                            onChange={(e, value, reason) => { setGender(value) }}
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
                {gender
                    ? <ItemForm
                        onSubmit={(payload) => ItemAPI.createItem({ user_id: authUser.uid, gender: gender, ...payload })}
                        initialValues={{}}
                        gender={gender}
                    />
                    : <Box mt={3} pt={16} pb={16}>
                        <Typography align="center" variant="h6">
                            Please select item type
                        </Typography>
                    </Box>
                }
            </Paper>
        </AdminLayout>
    )

}