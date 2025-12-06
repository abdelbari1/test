import makeStyles from '@mui/styles/makeStyles'

export const ButtonStyles = makeStyles(theme => ({
    root: {
        '& *': {
            marginInline: props => props.spacing ? theme.spacing(0.5) : 0,
            fontWeight: props => props.size === 'small' || props.size === 'tiny' ? 500 : 600,
            fontSize: props => props.size === 'small' || props.size === 'tiny' ? 14 : 16
        },
    },
    color: props => props.variant === 'outlined'
        ? ({
            border: `1px solid ${props.disabled ? '#0000001f' : theme.palette[props.color]?.main}`,
            color: theme.palette[props.color]?.main,
            '&:hover': {
                backgroundColor: theme.palette[props.color]?.outlineHover,
                boxShadow: 'none',
            }
        })
        : ({
            backgroundColor: props.disabled ? '#0000001f' : theme.palette[props.color]?.main,
            color: theme.palette[props.color]?.contrastText,
            boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
            '&:hover': {
                backgroundColor: theme.palette[props.color]?.light,
                boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
            }
        })
}))