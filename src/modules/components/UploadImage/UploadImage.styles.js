import { makeStyles } from "@mui/styles";


export default makeStyles(theme => ({
    root: {
        position: 'relative',
    },
    
    removeButton: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
    uploadButton: {
        width: '100%',
        height: '200px',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #c4c4c4',
        boxShadow: 'none',
        color: '#000'
    },
    uploadInput: {
        display: 'none',
    },
}))