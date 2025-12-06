import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
    tableFiltersPanel: {
        background: theme.palette.background.paper,
        border: '1px solid #dadada',
        borderRadius: 2,
        position: 'relative',
        padding: theme.spacing(1.5),
        margin: 0,  
        width: '100%',
    },
    actionBtn: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1)
        }
    },
}))