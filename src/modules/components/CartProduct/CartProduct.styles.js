import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
    productContainer: {
        // position: 'relative',
        transition: theme.transitions.create(["transform"], {
            duration: theme.transitions.duration.standard,
        })
    },
    
    cardActions: {
        // marginTop: theme.spacing(1)
    },
    key: {
        color: theme.palette.info.main,
        fontWeight: 600,
        fontSize: 16,
    },
    productImageContainer: {
        position: 'relative',
        cursor: 'pointer',
    },
    itemLink: {
        textDecoration: 'none',
        color: theme.palette.secondary.main,
        '&:hover': {
            color: theme.palette.primary.main,
        }
    },
    description: {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        lineClamp: 3,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}))