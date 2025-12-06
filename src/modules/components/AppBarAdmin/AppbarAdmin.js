import * as React from 'react';
import { AppBarStyle } from './Appbar.Styles'
import { Typography, Grid, Toolbar, Box, AppBar, IconButton, Avatar, Menu, Button, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
import globals from '../../global'
import { Notifications as NotificationIcon } from '@mui/icons-material'
import { AuthContext } from '../../contexts';

export default function Appbar(props) {

    const classes = AppBarStyle()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const authContext = React.useContext(AuthContext)
    const authedUser = JSON.parse(localStorage.getItem('authedUser'))
    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => authContext.handleAuth(false)

    const links = [
        { text: 'Home', url: '/admin' },
        { text: 'About', url: '#' },
    ]

    return (
        <AppBar position='fixed' className={classes.appBar}>
            <Toolbar className={classes.appBarContent} style={{ minHeight: 56 }}>
                {props.drawer}
                <Grid container justifyContent='center' alignItems='center' spacing={2}>
                    <Grid item container lg={2} md={3} sm={6} alignItems='center' >
                        <RouterLink to='/admin'>
                            <img src='/images/logo/fashify.png' alt='logo' className={classes.logoImage} />
                        </RouterLink>
                    </Grid>
                    <Grid item lg={8} md={8} className={classes.items}>
                        <ul className={classes.linksList}>
                            {links.map(({ text, url }, index) => (
                                <RouterLink to={url} className={classes.linkItem} key={index}>
                                    <Typography component='li'>
                                        {text}
                                    </Typography>
                                </RouterLink>
                            ))}
                        </ul>
                    </Grid>
                    <Grid container item lg={2} md={2} sm={6} justifyContent='flex-end' className={classes.notification}>
                        <ul className={classes.linksList}>
                            <span className={classes.iconLink}>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-controls='notification-menu'
                                    aria-haspopup='true'
                                    size='medium'
                                >
                                    <NotificationIcon />
                                </IconButton>
                            </span>
                        </ul>
                    </Grid>
                    <Grid container item lg={1} md={1} justifyContent='flex-end' className={classes.items}>
                        <Avatar onClick={(e) => handleClick(e)} className={classes.avatar}>{globals.methods.avatarProfile(`${authedUser.first_name + ' ' + authedUser.last_name}`)}</Avatar>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            getcontentanchorel={null}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <div className={classes.profile}>
                                <Box className={classes.rootpaper}>
                                    <div className={classes.btnlog}>
                                        <Typography component='p' className={classes.trancEmail}>
                                            {globals.methods.trancEmail(authedUser.email)}
                                        </Typography>
                                        <Button
                                            className={classes.btn}
                                            onClick={handleLogout}
                                            size='medium'
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                    <Divider />
                                    <div className={classes.content}>
                                        <Avatar className={classes.avatar2}>{globals.methods.avatarProfile(`${authedUser.first_name + ' ' + authedUser.last_name}`)}</Avatar>
                                        <div className={classes.info}>
                                            <Typography component='h6'>
                                                {authedUser.first_name + ' ' + authedUser.last_name}
                                            </Typography>
                                            <Typography component='p'>
                                                {authedUser.email}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className={classes.account}>
                                        <RouterLink to='#' className={classes.linkaccount}>
                                            View Account
                                        </RouterLink>
                                    </div>
                                </Box>
                            </div>
                        </Menu>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar >
    )
}