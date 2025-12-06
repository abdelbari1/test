import { makeStyles } from "@mui/styles";


export default makeStyles((theme) => ({
    root: {
        // paddingInline: theme.spacing(2),
        paddingBlock: theme.spacing(2)
    },
    comp_and_care: {
        border: '1px solid #000',
        height: '350px',
        width: '350px',
        paddingInline: theme.spacing(3),
        paddingBlock: theme.spacing(3),
        // marginTop: theme.spacing(1),
        '& h6': {
            textTransform: 'uppercase',
            fontWeight: 'inherit',

        },
        '& p': {
            fontWeight: 300
        }
    },
    mainImage: {
        maxHeight: '400px',
        overflow: 'scroll',
        width: '300px',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        // border: '1px solid #000',
        // position: 'relative',
        // transition: 'all 0.3s',
        '& img': {
            // position: 'absolute',
            // top: 0,
            // left: 0,
            scrollSnapAlign: 'start',
            scrollBehavior: 'smooth',
            marginTop: -4,
            width: '300px',
            height: '410px',
            objectFit: 'fill',
            // transition: 'scrollSnapAlign 0.5s',
        }
    },
    lineImage: {
        paddingInline: theme.spacing(3),
        '& div': {
            // marginLeft: 20,
            width: '3px',
            height: '400px',
            // maxHeight: '400px',
            backgroundColor: '#ccc',
            position: 'relative',
            '&:before': {
                content: `""`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '3px',
                height: shrink => `${shrink * 50}px`,
                backgroundColor: theme.palette.primary.main
            }
        }
    },
    imageDetails: {
        display: 'flex',
        flexDirection: 'column',
        '& img': {
            width: 40,
            height: 50
        }
    },
    sizes: {
        paddingInline: theme.spacing(2),
        paddingBlock: theme.spacing(2),
        gap: '10px'
    },
    containerSize: {
        width: 350,
        border: '1px solid #000',
    },

    productName: {
        lineHeight: '25px',
        display: '-webkit-box',
        height: 100,
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 4,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    checkSize: {
        paddingInline: theme.spacing(2),
        paddingBlock: theme.spacing(2),
        gap: '10px'
    }
}))