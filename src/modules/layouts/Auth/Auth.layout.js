import React from 'react'
import {
    Grid,
    Typography,
    Link,
    Container,
    Box
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import useStyles from './Auth.styles'
import { Helmet } from 'react-helmet'
import { ThemeContext } from '../../contexts'

const loader = document.querySelector('body')

function AuthLayout(props) {
    const { title, children } = props
    const classes = useStyles()

    React.useEffect(() => {
        loader.classList.add(classes.background)
        return () => loader.classList.remove(classes.background)
    }, [classes.background])

    return (
        <Grid container className={classes.root}>
            <Helmet>
                Fashify | {title}
            </Helmet>
            <Grid container justifyContent='center' alignItems='center' style={{ paddingBottom: '20px' }}>
                <Grid item component={Box} px={4} className={classes.leftWrapper}>
                    <Typography variant='h4' align='center'>
                        Welcome to <b data-text="Fashify">Fashify</b> Website
                    </Typography>
                    <Typography component='p' align='center'>
                        Start Shopping with a few steps
                    </Typography>
                </Grid>
                <Grid item className={classes.rightWrapper}>
                    <Grid container component={Box} className={classes.form} direction='column' spacing={2}>
                        <Grid item >
                            <Grid container justifyContent='space-between'>
                                <Grid item>
                                    <Typography variant='h5' color='textPrimary' className={classes.titleForm}>
                                        {title}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container direction='row' justifyContent='center'>
                                        <Grid item style={{ width: '50px', marginRight: 20, marginTop: -15 }}>
                                            <img src='/images/logo/fashify_op.png' alt='logo' height='90' />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            {children}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AuthLayout
