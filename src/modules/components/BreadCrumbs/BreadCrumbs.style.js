import { makeStyles } from "@mui/styles";


export default makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        fontSize: 19,
        '& a': {
            textDecoration: 'none',
            color: theme.palette.secondary.main,
        },
        '& p': {
            color: theme.palette.secondary.main,
        }
    },
    link: {
        '&:hover': {
            color: theme.palette.primary.main,
        }
    },
}))