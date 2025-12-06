import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        paddingBlock: theme.spacing(2),
        paddingInline: theme.spacing(2),
        maxWidth: '50%',
        minWidth: '30%',
        minHeight: '15%',
        maxHeight: '85%',
        overflowY: 'auto',
        borderRadius: 4,
        backgroundImage: 'url(/assets/images/logo/d-logo-15.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '40%',
        backgroundPosition: 'bottom -60px left -40px',
    },
}))