import React from 'react';
import { Hidden, IconButton, Grid, Typography } from '@mui/material'
import { Helmet } from 'react-helmet';
import { AppBarAdmin } from '../../components'
import useStyles from './AdminLayout.styles'
import { Menu } from '@mui/icons-material'

export default function AdminLayout(props) {

    const classes = useStyles()
    const SideMenu = props.sideMenu
    const [open, setOpen] = React.useState(false)

    return (
        <React.Fragment>
            <Helmet>
                <title> Signe | {props.title} </title>
            </Helmet>
            <AppBarAdmin
                drawer={props.drawerIcon
                    && <Hidden mdUp>
                        <IconButton
                            aria-label='open-drawer'
                            edge='start'
                            onClick={() => setOpen(!open)}
                            disableRipple
                            className={classes.drawerToggleButton}
                        >
                            <Menu className={classes.drawerToggleIcon} />
                        </IconButton>
                    </Hidden>}
            />
            <div className={classes.root}>
                {/* {props.drawer
                    && <Drawer
                        open={open}
                        setOpen={setOpen}
                        {...(props.activeDrawer || {})}
                    />} */}
                {props.sideMenu &&
                    <SideMenu {...(props.options || {})} />
                }
                <Grid container direction='column' justifyContent='space-between'>
                    <Grid item>
                        <main className={classes.content}>
                            <Grid container spacing={props.noPadding ? 0 : 3} direction='column'>
                                <Grid container item justifyContent={props.centerTitle ? 'center' : 'space-between'}>
                                    <Typography variant='h4' className={classes.title}>
                                        {props.title}
                                    </Typography>
                                </Grid>
                                <Grid item style={props.grid ? { display: 'grid' } : {}}>
                                    {props.children}
                                </Grid>
                            </Grid>
                        </main>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}