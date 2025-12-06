import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        paddingTop: props => props.noPadding ? 0 : theme.spacing(10),
        backgroundColor: theme.palette.type === 'light' ? '#f9f9f9' : '#494949'
    },
    drawerToggleButton: {
        marginInline: 4,
        color: theme.palette.text.primary
    },
    drawerToggleIcon: {
        fontSize: 32,
    },
    content: {
        flexGrow: 1,
        minHeight: 700,
        paddingInline: theme.spacing(5),
        paddingBlock: theme.spacing(5),
    },
    title: {
        color: theme.palette.secondary.main,
        fontWeight: 600,
    },
}))