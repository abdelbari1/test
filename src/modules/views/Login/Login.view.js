import React, { useContext } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
    Grid,
    Link,
    TextField,
    Typography,
    Box,
    Checkbox,
    FormControlLabel,
} from '@mui/material'
import { AuthLayout } from '../../layouts'
import AuthStyles from './Login.styles'
import LoginAPI from '../../apis/Login.api'
import { useSnackbar } from 'notistack'
import { StyledButton, SubmitButton } from '../../components'
import { AuthContext } from '../../contexts'

export default function Login(props) {

    const navigate = useNavigate()
    const authUser = useContext(AuthContext)
    const classes = AuthStyles()
    const emailRef = React.useRef()
    const passwordRef = React.useRef()
    const [remember, setRemember] = React.useState(true)
    const [isLoading, setIsLoading] = React.useState(false)
    const { enqueueSnackbar } = useSnackbar()
    
    const handleSubmit = e => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.target)
        const email = formData.get('Email')
        const password = formData.get('Password')
        LoginAPI.login(email, password)
            .then(res => {
                authUser.handleAuth(true, JSON.stringify(res.data), remember)
                res.data.user_role === 'Admin' ? navigate('/admin') : navigate(-1)
            })
            .catch(err => {
                err.response?.status === 401
                    ? enqueueSnackbar('Invalid email or password', { variant: 'warning' })
                    : enqueueSnackbar('Error while processing your request, please try again', { variant: 'error' })
                emailRef.current.value = ''
                passwordRef.current.value = ''
            })
            .finally(() => { setIsLoading(false) })
    }



    return (
        <AuthLayout
            title='Login'
        >
            <Grid component='form' onSubmit={e => handleSubmit(e)} container direction='column' justifyContent='center' style={{ height: '100%' }}>
                <Grid item component={Box} py={1}>
                    <TextField
                        variant='outlined'
                        fullWidth
                        label='Email'
                        type='email'
                        name='Email'
                        required
                        inputRef={emailRef}
                        disabled={isLoading}
                    />
                </Grid>
                <Grid item component={Box} py={1}>
                    <TextField
                        variant='outlined'
                        fullWidth
                        label='Password'
                        name='Password'
                        type='password'
                        required
                        inputRef={passwordRef}
                        disabled={isLoading}
                        inputProps={{ minLength: 6 }}
                    />
                </Grid>
                <Grid item component={Box} py={1}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name='remember'
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                                disabled={isLoading}
                                color='primary'
                            />
                        }
                        label={<Typography color='secondary'>Stay signed in</Typography>}
                    />
                </Grid>
                <Grid item component={Box} py={1}>
                    <SubmitButton
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        className={classes.button}
                        isLoading={isLoading}
                    >
                        {isLoading ? 'PROCESSING' : 'LOGIN'}
                    </SubmitButton>
                    <Grid item container justifyContent='center'>
                        <Typography color='textSecondary' align='center' className={classes.loginLink}>
                            <Link component={RouterLink} to='/forget-password'>
                                Forgot Your Password?
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item component={Box} py={2}>
                    <Grid container spacing={1} justifyContent={'space-between'}>
                        <Grid item>
                            <Typography component={'p'} sx={{marginTop: 1}}>Not an existing user?</Typography>
                        </Grid>
                        <Grid item>
                            <StyledButton
                                color='primary'
                                variant='outlined'
                                onClick={() => navigate('/register')}
                            >
                                Register Now
                            </StyledButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AuthLayout>
    )
}