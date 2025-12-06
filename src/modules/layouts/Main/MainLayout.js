import React from 'react'
import { Helmet } from 'react-helmet'
import {
    Grid,
} from '@mui/material'
import { Appbar } from '../../components'
import MainStyle from './MainLayout.styles'

function MainLayout(props) {

    const classes = MainStyle({ noPadding: props.noPadding })
    const SideMenu = props.sideMenu

    return (
        <React.Fragment>
            <Helmet>
                <title> Signe {props.title} </title>
            </Helmet>
            <Appbar />
            <div className={classes.root}>
                {props.sideMenu &&
                    <SideMenu {...(props.options || {})} />
                }
                <Grid container direction='column' justifyContent='space-between'>
                    <Grid item>
                        <main className={classes.content}>
                            <Grid container spacing={props.noPadding ? 0 : 3} direction='column'>
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

export default MainLayout