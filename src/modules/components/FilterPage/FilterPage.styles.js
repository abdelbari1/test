import { colors } from '@mui/material'
import { makeStyles } from '@mui/styles'


export default makeStyles(theme => ({
    root: {
        position: 'sticky',
        top: props => props.admin !== undefined ? 75 : 0,
        width: 340,
        maxHeight: 'calc(100vh - 110px)',
        overflow: 'hidden auto',
        backgroundColor: 'transparent',
        // boxShadow: theme.palette.type === 'light' ? '2px 0px 8px 0px rgba(200,200,200,0.5)' : '2px 0px 2px 0px rgba(50,50,50,0.5)',
        zIndex: 1,
        // marginTop: 1,
        paddingInline: theme.spacing(1),
        paddingTop: props => props.admin ? theme.spacing(5) : theme.spacing(1),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down(780)]: {
            display: 'none'
        },
        '&::-webkit-scrollbar': {
            width: '5px',
            display: 'none'
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#ccc'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main
        },
    },
    content: {
        width: '100%',
        // height: '550px',
        // overflow: 'auto',
        paddingTop: theme.spacing(1),
        // paddingBottom: theme.spacing(4),
    },
    profileDrawer: {
        display: 'flex',
        justifyContent: 'flex-start',
        borderRadius: 10,
        // boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 30%), 0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 5px 0px rgb(0 0 0 / 18%)',
        flexDirection: 'column',
        // marginBlock: theme.spacing(3),
        paddingBlock: theme.spacing(2),
        paddingInline: theme.spacing(1),
        '& p': {
            color: theme.palette.primary.main,
            fontSize: 18
        }
    },
    properties: {
        display: 'flex',
        flexDirection: 'column',
        // paddingBlock: theme.spacing(1),
        paddingInline: theme.spacing(1),
    },
    divider: {
        paddingBlock: theme.spacing(0.5),
        '& hr': {
            backgroundColor: colors.grey[500]
        }
    },
    options: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(-0.5),
        paddingInline: theme.spacing(1.5)
    },
    items: {
        display: 'flex',
        flexDirection: 'row',
        // marginBlock: theme.spacing(-0.5),
        '& p': {
            // marginTop: theme.spacing(1),
            fontSize: 16,
            color: theme.palette.secondary.main,
        },
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer',
        borderRadius: 40,
        '& p': {
            color: theme.palette.primary.main,
            fontSize: 18,
            fontWeight: 600
        },
        '& svg': {
            color: theme.palette.primary.main,
            fontSize: 22,
            marginTop: theme.spacing(-0.5)
        }
    },
    heading: {
        textAlign: 'center',
        marginLeft: theme.spacing(-1),
        marginTop: theme.spacing(-1.5),
        '& p': {
            fontSize: 25,
            fontWeight: 600,
        }
    },
    checkbox: {
        marginTop: theme.spacing(-0.5),
        color: theme.palette.secondary.main,
        '& .MuiIconButton-label': {
            color: theme.palette.secondary.main
        }
    }
}))