import React from 'react'
import { Grid, TextField, Typography, Box, Checkbox, MenuItem, FormControlLabel } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import useStyles from './Delivery.styles'
import { useFormik } from 'formik'
import * as yup from 'yup'
import global from '../../global'
import SubmitButton from '../SubmitButton/SubmitButton'
import StyledButton from '../StyledButton/StyledButton'

export default function DeliveryForm(props) {

    const classes = useStyles()
    const authUser = global.auth.user
    const { initialValuesObj, onSubmit, handlePurchase, editing, setEditing } = props
    const [loading, setLoading] = React.useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const initialValues = {
        region: '',
        address: '',
        appartment: '',
        city: '',
        postcode: null,
        phone: '',
        save: false,
        prefix: '',
        ...initialValuesObj
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object({
            region: yup.string().required(),
            address: yup.string().required(),
            appartment: yup.string().required(),
            city: yup.string().required(),
            phone: yup.string().required(),
            save: yup.boolean().required()
        }),
        onSubmit: (values) => {
            setLoading(true)
            const payload = { ...values, user_id: authUser.uid, phone: `${values.phone}` }
            onSubmit(payload)
                .then(res => handlePurchase(res.data.uid))
                .catch(err => enqueueSnackbar('Failed to complete order', { variant: 'error' }))
                .finally(() => {setLoading(false); props.setModalOpen(false)})
        }
    })

    return (
        <Grid container spacing={0} component={'form'} onSubmit={formik.handleSubmit} sx={{ paddingInline: 7 }}>
            <Grid item xs={12} component={Box} pb={2}>
                <Typography variant='h5' color='primary' align='center'>Personal Information</Typography>
            </Grid>
            <Grid item xs={12} component={Box} pb={2}>
                <Typography variant='h5'>Contact</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label='Email'
                    variant='outlined'
                    value={authUser.email}
                    disabled
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Email me with news and offers" />
            </Grid>
            <Grid item xs={12} container spacing={2} component={Box} pt={2}>
                <Grid item xs={12} >
                    <Grid container justifyContent={'space-between'}>
                        <Grid item>
                            <Typography variant='h5'>Delivery</Typography>
                        </Grid>
                        {Object.keys(initialValuesObj).length > 0 &&
                            <Grid item>
                                <StyledButton
                                    color='info'
                                    variant='outlined'
                                    onClick={(e) => { e.preventDefault(); setEditing(false) }}
                                >
                                    Edit Address
                                </StyledButton>
                            </Grid>}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='region'
                        name='region'
                        label='Region *'
                        fullWidth
                        disabled={editing}
                        value={formik.values['region'] || ''}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                            const { value } = e.target
                            const prefix = global.enums.cities.find(cty => cty.region === value).prefix
                            formik.setFieldValue('region', value)
                            formik.setFieldValue('prefix', prefix)
                        }}
                        error={formik.touched['region'] && Boolean(formik.errors['region'])}
                        helperText={formik.touched['region'] && global.methods._spacing(formik.errors['region'])}
                        select
                    >
                        {global.enums.cities.map((city, index) => (
                            <MenuItem value={city.region} key={index}>{city.region}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='address'
                        name='address'
                        label='Address *'
                        disabled={editing}
                        fullWidth
                        value={formik.values['address'] || ''}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched['address'] && Boolean(formik.errors['address'])}
                        helperText={formik.touched['address'] && global.methods._spacing(formik.errors['address'])}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='appartment'
                        name='appartment'
                        label='Appartment, Suite, ... *'
                        fullWidth
                        disabled={editing}
                        value={formik.values['appartment'] || ''}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched['appartment'] && Boolean(formik.errors['appartment'])}
                        helperText={formik.touched['appartment'] && global.methods._spacing(formik.errors['appartment'])}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        id='city'
                        name='city'
                        label='City *'
                        fullWidth
                        disabled={editing}
                        value={formik.values['city'] || ''}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched['city'] && Boolean(formik.errors['city'])}
                        helperText={formik.touched['city'] && global.methods._spacing(formik.errors['city'])}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        id='postcode'
                        name='postcode'
                        label='Postcode'
                        disabled={editing}
                        fullWidth
                        value={formik.values['postcode'] || ''}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <TextField
                        id='prefix'
                        name='prefix'
                        label='Prefix *'
                        fullWidth
                        aria-readonly
                        disabled
                        value={global.enums.cities.find(cty => cty.region == formik.values['region'])?.prefix || ''}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        id='phone'
                        name='phone'
                        label='Phone *'
                        fullWidth
                        disabled={editing}
                        value={formik.values['phone'] || ''}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched['phone'] && Boolean(formik.errors['phone'])}
                        helperText={formik.touched['phone'] && global.methods._spacing(formik.errors['phone'])}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            id='save'
                            name='save'
                            disabled={editing}
                            checked={formik.values['save']}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />}
                    label="Save this information for next time" />
            </Grid>
            <Grid item xs={12} component={Box} pt={2}>
                <Typography variant='h5'>Payment</Typography>
                <Typography component='p' color='textSecondary' sx={{ fontSize: 14, paddingTop: 1 }}>All transactions are secure and encrypted.</Typography>
            </Grid>
            <Grid item xs={12} component={Box} pt={3}>
                <Grid item container className={classes.cod}>
                    <Typography component={'p'} sx={{ fontWeight: 600 }}>Cash on Delivery {`(COD)`}</Typography>
                </Grid>
                <Grid item container className={classes.textBox}>
                    <Typography component={'p'}>This service is only available in Lebanon.<br />
                        Pay on service will be out of fees with every purchase above 1,000,000LBP
                        Please ask for our Credit Card Machine if you wish to settle your bill with your Debit Card.</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} component={Box} pt={3} pb={3}>
                <SubmitButton
                    type='submit'
                    color='primary'
                    variant='contained'
                    fullWidth
                    isLoading={loading}
                    padding={12}
                >
                    Complete Order
                </SubmitButton>
            </Grid>
        </Grid>
    )

}