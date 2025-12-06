import React from 'react'
import { SnackbarProvider } from 'notistack'
import { IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import useStyles from './AlertProvider.styles'

export default function AlertProvider(props) {

    const classes = useStyles()
    const notistackRef = React.useRef()

    const onClickDismiss = (key) => {
        notistackRef.current.closeSnackbar(key)
    }

    return (
        <SnackbarProvider
            ref={notistackRef}
            maxSnack={5}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            className={classes.root}
            action={(key) =>
                <IconButton
                    size='small'
                    aria-label='close'
                    color='inherit'
                    onClick={() => onClickDismiss(key)}
                >
                    <CloseIcon fontSize='small' />
                </IconButton>
            }
        >
            {props.children}
        </SnackbarProvider>
    )

}