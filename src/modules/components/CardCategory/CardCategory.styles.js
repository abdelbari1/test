import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) => ({
    root: {
        width: '100%',
        position: 'relative',
        // maxHeight: 420,
        '&:hover': {
            boxShadow: '0px 3px 20px -2px rgba(0, 0, 0, 0.2), 0px 3px 20px 0px rgba(0, 0, 0, 0.14), 0px 1px 20px 0px rgba(0, 0, 0, 0.12)'
        },
        overflow: 'hidden',
        border: props => props.isRented ? `2px solid ${theme.palette.primary.main}` : 'none'
    },
    fullHeight: {
        height: '100%',
    },
    wishlistButton: {
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 100,
    },
    fields: {
        '& .css-1cavb22-MuiFormLabel-root-MuiInputLabel-root': {
            fontSize: '14px',
            marginTop: 2
        }
    },
    attributeKey: {
        fontSize: 16,
        // paddingInline: theme.spacing(1),
        fontWeight: '600',
        color: theme.palette.primary.main
    },
    attributeValue: {
        color: theme.palette.primary.default,
        fontSize: 15,
        // paddingInline: theme.spacing(1),
        fontWeight: 500,
    },
}));