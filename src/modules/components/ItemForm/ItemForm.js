import React from 'react'
import { Grid, Box, TextField, MenuItem, IconButton, Tooltip } from '@mui/material'
import { StyledButton, SubmitButton, UploadImage, UploadImages } from '../'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import global from '../../global'
import * as yup from 'yup'
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material'
import useStyles from './ItemFrom.styles'

export default function ItemForm(props) {

    const classes = useStyles()
    const navigate = useNavigate()
    const { _spacing } = global.methods
    const { initialValuesObj, onSubmit, gender, editMode } = props
    const [loading, setLoading] = React.useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const initialValues = {
        image_main: '',
        item_name: '',
        item_category: '',
        item_model: '',
        currency: '',
        actual_price: '',
        status: '',
        reference: null,
        description: '',
        flash_sale: 0,
        image_details: [],
        ...initialValuesObj,
        sizes: initialValuesObj?.sizes?.length > 0 ? initialValuesObj.sizes : [{ size: '', quantity: '' }]
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object({
            item_name: yup.string().required(),
            item_category: yup.string().required(),
            item_model: yup.string().required(),
            currency: yup.string().required(),
            actual_price: yup.number().required(),
            status: yup.string().required(),
            description: yup.string().required(),
            image_main: yup.string().required(),
            flash_sale: yup.number().min(0).max(100).notRequired(),
            sizes: yup.array().min(1).of(
                yup.object().shape({
                    size: yup.string().required('Size is a required field'),
                    quantity: yup.number().required('Quantity is a required field')
                })
            )
        }),
        onSubmit: (values) => {
            setLoading(true)
            console.log(values)
            onSubmit(values)
                .then(res => {
                    editMode ?
                        enqueueSnackbar('Item has been updated successfully', { variant: 'success' })
                        :
                        enqueueSnackbar('Item has been created successfully', { variant: 'success' })
                    navigate('/admin/items')
                })
                .catch(err => editMode ? enqueueSnackbar('Failed to update item', { variant: 'error' }) : enqueueSnackbar('Failed to create a new item', { variant: 'error' }))
                .finally(() => setLoading(false))
        }
    })

    const handleAddSize = () => {
        formik.setFieldValue('sizes', [...formik.values.sizes, { size: '', quantity: '' }])
        formik.validateField('sizes')
    }

    const handleRemoveSize = (index) => {
        const sizes = [...formik.values.sizes]
        const gp_touched = formik.touched?.sizes ? [...formik.touched?.sizes] : []
        const szs_errors = formik.errors?.sizes ? [...formik.errors?.sizes] : []
        sizes.splice(index, 1)
        formik.setFieldValue(`sizes`, sizes)
        if (gp_touched.length > 0) {
            gp_touched.splice(index, 1)
            formik.setFieldTouched('sizes', gp_touched)
        }
        if (szs_errors.length > 0) {
            szs_errors.splice(index, 1)
            formik.setFieldError('sizes', szs_errors)
        }
    }

    return (
        <Grid container spacing={2} component={'form'} onSubmit={formik.handleSubmit} sx={{ paddingTop: 5 }}>
            <Grid item xs={12} sm={5} md={3} lg={2}>
                <Grid container item xs={12}>
                    <UploadImage
                        formik={formik}
                        editMode={editMode}
                    />
                </Grid>
                <Grid container item xs={12} component={Box} py={2}>
                    <UploadImages
                        formik={formik}
                        editMode={editMode}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} md={9} lg={10} sm={7}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id='item_name'
                            name='item_name'
                            label='Item Name *'
                            fullWidth
                            variant='outlined'
                            value={formik.values['item_name'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['item_name'] && Boolean(formik.errors['item_name'])}
                            helperText={formik.touched['item_name'] && _spacing(formik.errors['item_name'])}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id='item_category'
                            name='item_category'
                            label='Item Category *'
                            fullWidth
                            variant='outlined'
                            value={formik.values['item_category'] || ''}
                            onChange={formik.handleChange}
                            select
                            onBlur={formik.handleBlur}
                            error={formik.touched['item_category'] && Boolean(formik.errors['item_category'])}
                            helperText={formik.touched['item_category'] && _spacing(formik.errors['item_category'])}
                        >
                            {global.enums[gender].sort().map((cat, index) => (
                                <MenuItem value={cat} key={index}>
                                    {_spacing(cat)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id='item_model'
                            name='item_model'
                            label='Item Model *'
                            fullWidth
                            variant='outlined'
                            value={formik.values['item_model'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['item_model'] && Boolean(formik.errors['item_model'])}
                            helperText={formik.touched['item_model'] && _spacing(formik.errors['item_model'])}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id='status'
                            name='status'
                            label='Status *'
                            fullWidth
                            variant='outlined'
                            value={formik.values['status'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['status'] && Boolean(formik.errors['status'])}
                            helperText={formik.touched['status'] && _spacing(formik.errors['status'])}
                            select
                        >
                            <MenuItem value='Available'>Available</MenuItem>
                            <MenuItem value='Sold_out'>Sold Out</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id='currency'
                            name='currency'
                            label='Currency *'
                            fullWidth
                            variant='outlined'
                            value={formik.values['currency'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['currency'] && Boolean(formik.errors['currency'])}
                            helperText={formik.touched['currency'] && _spacing(formik.errors['currency'])}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id='actual_price'
                            name='actual_price'
                            label='Price *'
                            fullWidth
                            type='number'
                            variant='outlined'
                            value={formik.values['actual_price'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['actual_price'] && Boolean(formik.errors['actual_price'])}
                            helperText={formik.touched['actual_price'] && _spacing(formik.errors['actual_price'])}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id='reference'
                            name='reference'
                            label='Reference'
                            fullWidth
                            disabled={editMode}
                            variant='outlined'
                            value={formik.values['reference'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id='flash_sale'
                            name='flash_sale'
                            label='Flash Sale'
                            fullWidth
                            type='number'
                            InputProps={{ inputProps: { min: 0, max: 100 } }}
                            variant='outlined'
                            value={formik.values['flash_sale'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['flash_sale'] && Boolean(formik.errors['flash_sale'])}
                            helperText={formik.touched['flash_sale'] && _spacing(formik.errors['flash_sale'])}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <fieldset className={classes.fieldSet}>
                            <legend className={classes.legend}>Sizes</legend>
                            {formik.values['sizes'].map((sz, index) => (
                                <Grid container spacing={2} key={index}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id={`sizes[${index}].size`}
                                            name={`sizes[${index}].size`}
                                            label='Size *'
                                            fullWidth
                                            variant='outlined'
                                            value={sz.size || ''}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched['sizes'] && formik.errors.sizes && formik.touched.sizes[index]?.size && Boolean(formik.errors.sizes[index]?.size)}
                                            helperText={formik.touched['sizes'] && formik.errors.sizes && formik.touched.sizes[index]?.size && _spacing(formik.errors.sizes[index]?.size)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id={`sizes[${index}].quantity`}
                                            name={`sizes[${index}].quantity`}
                                            label='Quantity *'
                                            type='number'
                                            fullWidth
                                            variant='outlined'
                                            value={sz.quantity || ''}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched['sizes'] && formik.errors.sizes && formik.touched.sizes[index]?.quantity && Boolean(formik.errors.sizes[index]?.quantity)}
                                            helperText={formik.touched['sizes'] && formik.errors.sizes && formik.touched.sizes[index]?.quantity && _spacing(formik.errors.sizes[index]?.quantity)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container justifyContent='flex-end' spacing={2} component={Box} py={0}>
                                            <Grid item >
                                                {formik.values.sizes.length > 1 &&
                                                    <Tooltip title='Remove Size'>
                                                        <span>
                                                            <IconButton className={classes.btnAdd} onClick={() => handleRemoveSize(index)}>
                                                                <RemoveIcon />
                                                            </IconButton>
                                                        </span>
                                                    </Tooltip>
                                                }
                                            </Grid>
                                            <Grid item>
                                                <Tooltip title='Add Size'>
                                                    <span>
                                                        <IconButton className={classes.btnAdd} onClick={() => handleAddSize()}>
                                                            <AddIcon />
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </fieldset>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='description'
                            name='description'
                            label='Description *'
                            fullWidth
                            variant='outlined'
                            rows={4}
                            multiline
                            value={formik.values['description'] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched['description'] && Boolean(formik.errors['description'])}
                            helperText={formik.touched['description'] && _spacing(formik.errors['description'])}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2} justifyContent={'flex-end'}>
                            <Grid item>
                                <StyledButton
                                    color='error'
                                    variant='outlined'
                                    onClick={formik.handleReset}
                                >
                                    Reset
                                </StyledButton>
                            </Grid>
                            <Grid item>
                                <SubmitButton
                                    type='submit'
                                    color='primary'
                                    variant='contained'
                                    isLoading={loading}
                                    disabled={formik.dirty && formik.isValid ? false : true}
                                >
                                    Submit
                                </SubmitButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}