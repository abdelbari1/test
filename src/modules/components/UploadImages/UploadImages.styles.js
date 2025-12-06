import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1)
    },
    content: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '230px',
        backgroundSize: 'cover',
        border: '1px solid #c4c4c4',
        borderRadius: theme.spacing(1),
        color: '#000'
        // [theme.breakpoints.down('sm')]:{
        //     height: '300px'
        // }
    },
    iconBar: {
        position: 'absolute',
        top: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.1) 100%)',
        borderRadius: theme.spacing(1),
        '& svg':{
            color: theme.palette.primary.main,
            '&:hover':{
                color: theme.palette.primary.hover
            }
        }
    },
    uploadInput: {
        display: 'none'
    },
}))