import React from 'react'
import Modal from '@mui/material/Modal'
// import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'
import ModalStyles from './Modal.styles'

export default function TransitionsModal(props) {
    const classes = ModalStyles()
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                // disableScrollLock={true}
                // slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        {props.children}
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}