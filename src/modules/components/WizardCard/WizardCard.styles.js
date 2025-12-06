import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
    wizardRoot: {
            
    },
    wizardCard: {
        overflow: 'hidden',
        background: props => props.color === 'secondary'
            ? theme.palette.secondary.main
            : theme.palette.background.paper,
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        height: props => props.size === 'large' ? 250 : 160,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        color: props => props.color === 'secondary'
            ? theme.palette.secondary.contrastText
            : theme.palette.secondary.main,
        '& p': {
            fontSize: props => props.size === 'large' ? 28 : 22,
            margin: theme.spacing(0.5)
        },
        '& img': {
            width: '30%',
            margin: theme.spacing(0.5),
        },
        '& svg': {
            fontSize: props => props.size === 'large' ? 64 : 48,
            margin: theme.spacing(0.5),
        },
        '&:hover': {
            background: theme.palette.primary.hover,
            color: theme.palette.background.paper,
            '& img': {
            },
        },
        transition: theme.transitions.create(['background'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter,
        }),
    }
}))