import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
    key: {
        fontWeight: 300,
        color: theme.palette.secondary.main,
        fontSize: 15
    },
    total: {
        fontWeight: 600,
        color: theme.palette.primary.main,
        fontSize: 18,
        display: 'flex',
        '& p': {
            fontWeight: 'lighter',
            color: '#ccc',
            marginTop: -1,
            paddingInline: theme.spacing(2)
        }
    }
}))