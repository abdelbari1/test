import { makeStyles } from "@mui/styles";
import { colors } from "@mui/material";



export default makeStyles((theme) => ({
    root: {
        padding: 0,
        margin: 0,
        boxSizing: 'border-box',
        overflow: 'hidden',
    },
    header: {
        backgroundColor: 'transparent',
        minHeight: 65,
        padding: 10,
        position: 'fixed',
        width: '100%'
    },
    listItems: {
        listStyle: 'none',
        display: 'flex',
        gap: theme.spacing(3),
        paddingBlock: theme.spacing(1),
        '& button': {
            marginTop: -10,
            '& svg':{
                color: theme.palette.background.paper
            },
            '&:hover': {
                '& svg': {
                    color: theme.palette.primary.main
                }
            }
        },
        '& a': {
            textDecoration: 'none',
            '& .no-srch': {
                textTransform: 'uppercase',
                color: '#fff',
                fontSize: 17,
                fontWeight: 500,
                marginInline: theme.spacing(3),
                paddingInline: theme.spacing(0.5),
                position: 'relative',
                '&:before': {
                    content: `""`,
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: '0%',
                    height: '3px',
                    background: `linear-gradient(to right, #FCF6BA 10%, #BF953F 100%)`,
                    transition: 'width .3s'
                },
                '&:hover:before': {
                    width: '100%',
                }
            },
            '& .search': {
                boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 30%), 0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 5px 0px rgb(0 0 0 / 18%)',
                backgroundColor: theme.palette.background.paper,
                borderRadius: 20,
                paddingInline: 15,
                paddingBlock: 8,
                fontSize: 15,
                fontStyle: 'italic',
                textTransform: 'capitalize',
                width: 100,
                '& svg': {
                    marginBottom: -6,
                    transform: 'rotate(70deg)',
                    fontSize: 22,
                },
                '&:hover': {
                    background: `linear-gradient(to right, #FCF6BA 10%, ${theme.palette.primary.main} 100%)`,
                    transation: 'all 0.5s',
                    // color: theme.palette.background.paper,
                    // '& svg':{
                    //     color: theme.palette.background.paper
                    // }
                }
            }
        }
    },
    genderItems: {
        listStyle: 'none',
        display: 'flex',
        gap: theme.spacing(3),
        // paddingBlock: theme.spacing(1),
        '& a': {
            textDecoration: 'none',
            '& li': {
                textTransform: 'uppercase',
                color: '#fff',
                fontSize: 14,
                fontWeight: 500,
                marginInline: theme.spacing(1.5),
                position: 'relative',
                '&:before': {
                    content: `""`,
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: '0%',
                    height: '3px',
                    background: `linear-gradient(to right, #FCF6BA 10%, #BF953F 100%)`,
                    transition: 'width .3s'
                },
                '&:hover:before': {
                    width: '100%',
                }
            },
        }
    },
    imageContainer: {
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        '& img': {
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }
    },
    arrowl: {
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
    },
    arrowr: {
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
    },
}))