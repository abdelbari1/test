import React from 'react'
import {
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from '@mui/icons-material'
import StyledButton from '../StyledButton/StyledButton'

export default function ButtonCollapse (props) {
    const { open, setOpen } = props
    return (
        <StyledButton
            onClick={() => setOpen(!open)}
            style={{ flexGrow: 1, justifyContent: 'space-between' }}
            color={props.color || 'info'}
            variant={open ? 'outlined' : 'contained'}
        >
            {props.title}
            {open
                ? <ExpandLessIcon />
                : <ExpandMoreIcon />}
        </StyledButton>
    )
}