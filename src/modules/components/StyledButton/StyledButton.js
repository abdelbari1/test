import { Button, Tooltip } from '@mui/material'
import { ButtonStyles } from './StyledButton.styles'

const StyledButton = props => {
    const {
        children,
        variant,
        className,
        color,
        padding,
        margin,
        size,
        spacing = true,
        style,
        tooltip,
        ...otherProps
    } = props
    const classes = ButtonStyles({
        color,
        variant,
        size,
        spacing,
        disabled: props.disabled
    })
    return (
        tooltip
        ? <Tooltip title={tooltip} placement="bottom">
            <Button
                {...otherProps}
                style={{
                    ...style,
                    padding: padding || '',
                    marginInline: margin || '',
                    display: 'flex',
                    boxShadow: props.disabled ? 'none' : '',
                    overflow: 'hidden',
                    textTransform: props.texttransform
                }}
                className={`${classes.root} ${classes.color} ${className}`.trim()}
            >
                {props.children}
            </Button>
        </Tooltip>
        : <Button
            {...otherProps}
            style={{
                ...style,
                padding: padding || '',
                marginInline: margin || '',
                display: 'flex',
                boxShadow: props.disabled ? 'none' : '',
                overflow: 'hidden',
                textTransform: props.textTransform,
            }}
            className={`${classes.root} ${classes.color} ${className}`.trim()}
        >
            {props.children}
        </Button>
    )
}

export default StyledButton