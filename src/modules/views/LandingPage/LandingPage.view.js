import React from "react";
import { Grid, Box, Typography, IconButton, Badge } from "@mui/material";
import useStyles from './LandingPage.styles';
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import { Link as RouterLink } from 'react-router-dom'
import { CartContext, WishlistContext } from '../../contexts'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { styled } from '@mui/material/styles';
import { ShoppingCart as CartIcon, Favorite as WishlistIcon } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";

export default function LandingPage(props) {

    const classes = useStyles()
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

    const images = [
        { image: '/images/landing-image/landing1.jpg', alt: 'chemis' },
        { image: '/images/landing-image/landing3.jpg', alt: 'couple' }
    ]

    let current = 0

    const cls = () => {
        const slider = document.querySelectorAll('.slider')
        for (let img of slider) {
            img.style.display = 'none'
            img.style.transition = 'all 1s linear'
        }
    }

    const handleStart = () => {
        cls()
        const slider = document.querySelectorAll('.slider')
        if (current === 0) current = slider.length - 1
        else current--
        slider[current].style.display = 'block'
        slider[current].style.transition = 'all 1s linear'
    }

    const handleNext = () => {
        cls()
        const slider = document.querySelectorAll('.slider')
        current + 1 === slider.length ? current = 0 : current++
        slider[current].style.display = 'block'
        slider[current].style.transition = 'all 5s linear'
    }

    React.useEffect(() => {
        const intervalID = setInterval(() => {
            handleNext()
        }, 5000)
        return () => clearInterval(intervalID)
    }, [])

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 10,
            fontSize: 16,
            padding: '2px 4px',
        },
    }));

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <Grid container spacing={2} justifyContent={'space-between'} component={Box} paddingRight={5}>
                    <Grid item md={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <IconButton>
                                    <MenuIcon sx={{ color: '#fff' }} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={10} style={{ marginTop: -18 }}>
                                <Grid container direction={'column'}>
                                    <Grid item md={12}>
                                        <Typography variant="h1" fontSize={'120px'} sx={{ color: '#fff' }}>FASHIFY</Typography>
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
            </header>
            <div className={classes.imageContainer}>
                <div className={`${classes.arrowl}`}>
                    <IconButton
                        onClick={() => handleStart()}
                    >
                        <KeyboardDoubleArrowLeftIcon fontSize="large" sx={{ color: '#fff' }} />
                    </IconButton>
                </div>
                <div className={'images'}>
                    {images.map((img, index) => (<div key={index} className='slider'><img src={img.image} alt={img.alt} /></div>))}
                </div>
                <div className={`${classes.arrowr}`}>
                    <IconButton
                        onClick={() => handleNext()}
                    >
                        <KeyboardDoubleArrowRightIcon fontSize="large" sx={{ color: '#fff' }} />
                    </IconButton>
                </div>
            </div>
        </div>
    )

}