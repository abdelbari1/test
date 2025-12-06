import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
    button: {
        fontSize: 18
    },
    loginLink: {
        marginBlock: theme.spacing(1)
    },
    altText: {
        marginBlock: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        }
    }
}))