import React from 'react'
import { Grid, Box, Typography, IconButton, AppBar, Toolbar, Badge } from '@mui/material'
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import useStyles from './Appbar.Styles'
import { CartContext, WishlistContext } from '../../contexts'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { ShoppingCart as CartIcon, Favorite as WishlistIcon } from '@mui/icons-material'

export default function Appbar(props) {

    const cartContext = React.useContext(CartContext)
    const wishlistContext = React.useContext(WishlistContext)
    const navigate = useNavigate()
    const itemsLinks = [
        { text: 'Search', url: '/search' },
        { text: 'Log in', url: '/login' },
        { text: 'Help', url: '/help' },
        { icon: <WishlistIcon fontSize="large" />, url: '/wishlists', badge: wishlistContext.getUserWishlist().length },
        { icon: <CartIcon fontSize="large" />, url: '/shopping-bag', badge: cartContext.getUserCart().length }
    ]

    const GenderItems = [
        { text: 'Woman', url: '/gender/Woman' },
        { text: 'Men', url: '/gender/Men' },
        { text: 'Kids', url: '/gender/Kids_Boy' },
        { text: 'Rent', url: '/rent-items' }
    ]

    const { landing_page } = props

    const classes = useStyles(landing_page)

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 10,
            fontSize: 16,
            padding: '2px 4px',
        },
    }));

    return (
        // <HideOnScroll {...props}>
        <AppBar position='relative' className={classes.appBar} >
            <Toolbar className={classes.toolbar}>
                <Grid container spacing={2} justifyContent={'flex-start'}>
                    <Grid item md={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <IconButton>
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={10} style={{ marginTop: -18 }}>
                                <Grid container direction={'column'}>
                                    <Grid item md={12}>
                                        <Box component={'img'}
                                            src='/images/logo/fashify.png'
                                            width={190}
                                            height={190}
                                            onClick={() => navigate('/')}
                                            sx={{ cursor: 'pointer' }}
                                        />
                                    </Grid>
                                    <Grid item md={12}>
                                        <Grid container spacing={2} direction={'row'}>
                                            <ul className={classes.genderItems}>
                                                {GenderItems.map(({ text, url }, index) => (
                                                    <Grid item key={index}>
                                                        <RouterLink to={url} className={classes.genderItem} >
                                                            <Typography color="textPrimary" component='li'>
                                                                {text}
                                                            </Typography>
                                                        </RouterLink>
                                                    </Grid>
                                                ))}
                                            </ul>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={8}>
                        <Grid container spacing={2} justifyContent={'flex-end'}>
                            <ul className={classes.listItems}>
                                {itemsLinks.map(({ text, icon, url, badge }, index) => (
                                    text !== 'Search' ?
                                        <Grid item key={index}>
                                            {icon ?
                                                <IconButton
                                                    onClick={() => navigate(url)}
                                                >
                                                    <StyledBadge badgeContent={badge} color='error'>{icon}</StyledBadge>
                                                </IconButton>
                                                :
                                                <RouterLink to={url} className={classes.linkItem} >
                                                    <Typography color="textPrimary" component='li' className='no-srch'>
                                                        {text}
                                                    </Typography>
                                                </RouterLink>
                                            }
                                        </Grid>
                                        :
                                        <Grid item key={index}>
                                            <RouterLink to={url} className={classes.linkItem} >
                                                <Typography color="textPrimary" component='li' className='search'>
                                                    <SearchIcon /> {text}...
                                                </Typography>
                                            </RouterLink>
                                        </Grid>
                                ))}
                            </ul>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        // </HideOnScroll>
    )
}