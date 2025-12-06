import  makeStyles  from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        // paddingTop: theme.spacing(0),
        backgroundColor: '#f9f9f9'
    },
    // drawerToggleButton: {
    //     marginInline: 4,
    //     color: theme.palette.text.primary
    // },
    // drawerToggleIcon: {
    //     fontSize: 32,
    // },
    // drawer: {
    //     width: drawerWidth,
    //     flexShrink: 0,
    // },
    // drawerPaper: {
    //     width: drawerWidth,
    // },
    // drawerContainer: {
    //     overflow: 'auto',
    // },
    content: {
        flexGrow: 1,
        minHeight: 700,
        paddingInline: theme.spacing(4),
        paddingBlock: theme.spacing(3),
        backgroundColor: '#f9f9f9'
    },
    // logo: {
    //     display: 'flex',
    //     justifyContent: 'flex-end',
    //     flex: '0 100px',
    //     padding: theme.spacing(3, 3, 0, 5)
    // },
}))