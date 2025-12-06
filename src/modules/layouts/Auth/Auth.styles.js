import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
    container1: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#d1d1d1',
        zIndex: 100,
        display: 'none',
        animation: `$animatedHiden 8s linear forwards`
    },
    container2: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#d1d1d1',
        zIndex: 100,
        display: 'block',
    },
    root: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    background: {
        backgroundColor: '#f0f2f5',
    },
    form: {
        boxShadow: '0px 0px 50px -30px rgb(0 0 0 / 30%), 0px 0px 25px 0px rgb(0 0 0 / 20%), 0px 1px 24px 0px rgb(0 0 0 / 18%);',
        paddingInline: theme.spacing(3),
        borderRadius: '10px'
    },
    imageName: {
        paddingInline: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    titleForm: {
        marginTop: theme.spacing(1)
    },
    leftWrapper: {
        paddingBlock: theme.spacing(3),
        '& h4': {
            fontSize: theme.spacing(5)
        },
        '& b': {
            position: 'relative',
            fontSize: theme.spacing(7),
            WebkitTextStrokeColor: theme.palette.primary.main,
            WebkitTextStrokeWidth: '1px',
            color: theme.palette.background.paper,
            overflow: 'hidden',
            '&:before': {
                content: `attr(data-text)`,
                position: 'absolute',
                // top: 17.5,
                left: 0,
                height: '100%',
                width: '0%',
                color: theme.palette.primary.main,
                WebkitTextStrokeWidth: 0,
                WebkitTextStrokeColor: theme.palette.primary.main,
                overflow: 'hidden',
                animation: `$animateTitle 5000ms linear infinite`,
                // animationDirection: 'alternate-reverse'
            }
        },
        '& p': {
            fontSize: '26px',
            paddingBlock: theme.spacing(1)
        }
    },
    rightWrapper: {
        paddingLeft: theme.spacing(4),
        width: '500px',
        [theme.breakpoints.down('sm')]: {
            paddingInline: theme.spacing(4),
            paddingBlock: theme.spacing(3)
        }
    },
    "@keyframes animateTitle": {
        "0%": {
            width: '0%'
        },
        "70%, 90%": {
            width: '100%'
        }
    },
    "@keyframes animatedHiden": {
        '0%': {
            display: 'block',
        },
        '50%, 70%': {
            display: 'none'
        }
    },
}))