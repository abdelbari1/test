import React from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
    Grid,
    TextField,
    Box,
    Typography,
    Link
} from '@mui/material'
import { AuthLayout } from '../../layouts'
import { useSnackbar } from 'notistack'
import { StyledButton, SubmitButton } from '../../components'
import { useFormik } from 'formik'
import * as yup from 'yup'
import global from '../../global'
import UserAPI from '../../apis/User.api'
import useStyles from './Login.styles'

export default function Login(props) {

    const classes = useStyles()
    const { _spacing } = global.methods
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = React.useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_pass: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object({
            first_name: yup.string().required(),
            last_name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            confirm_pass: yup.string().required().oneOf([yup.ref('password')], 'Password must be matching.')
        }),
        onSubmit: (values) => {
            setIsLoading(true)
            const payload = { ...values, user_role: 'Client' }
            UserAPI.createUser(payload)
                .then(res => {
                    enqueueSnackbar('User has been registered successfully', { variant: 'success' })
                    navigate('/login')
                })
                .catch(err => enqueueSnackbar('Failed to register a new account', { variant: 'error' }))
                .finally(() => setIsLoading(false))
        }
    })

    return (
        <AuthLayout
            title='Register Now'
        >
            <Grid component='form' onSubmit={formik.handleSubmit} container spacing={2} justifyContent='center' style={{ height: '100%' }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id='first_name'
                        name='first_name'
                        label='First Name *'
                        variant='outlined'
                        fullWidth
                        value={formik.values['first_name'] || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched['first_name'] && Boolean(formik.errors['first_name'])}
                        helperText={formik.touched['first_name'] && _spacing(formik.errors['first_name'])}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id='last_name'
                        name='last_name'
                        label='Last Name *'
                        variant='outlined'
                        fullWidth
                        value={formik.values['last_name'] || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched['last_name'] && Boolean(formik.errors['last_name'])}
                        helperText={formik.touched['last_name'] && _spacing(formik.errors['last_name'])}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id='email'
                        name='email'
                        label='Email *'
                        variant='outlined'
                        fullWidth
                        value={formik.values['email'] || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched['email'] && Boolean(formik.errors['email'])}
                        helperText={formik.touched['email'] && _spacing(formik.errors['email'])}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id='password'
                        name='password'
                        label='Password *'
                        variant='outlined'
                        fullWidth
                        value={formik.values['password'] || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched['password'] && Boolean(formik.errors['password'])}
                        helperText={formik.touched['password'] && _spacing(formik.errors['password'])}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id='confirm_pass'
                        name='confirm_pass'
                        label='Confirm Password *'
                        variant='outlined'
                        fullWidth
                        value={formik.values['confirm_pass'] || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched['confirm_pass'] && Boolean(formik.errors['confirm_pass'])}
                        helperText={formik.touched['confirm_pass'] && _spacing(formik.errors['confirm_pass'])}
                    />
                </Grid>
                <Grid item xs={12} component={Box} py={2}>
                    <Grid container spacing={2} justifyContent={'space-between'}>
                        <Grid item>
                            <Typography color='textSecondary' align='center' className={classes.loginLink}>
                                <Link component={RouterLink} to='/login'>
                                    I already have an account
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2}>
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
                                        isLoading={isLoading}
                                        disabled={formik.dirty && formik.isValid ? false : true}
                                    >
                                        {isLoading ? 'Processing' : 'Submit'}
                                    </SubmitButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AuthLayout>
    )
}