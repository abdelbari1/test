import React from 'react'
import { MainLayout } from '../../layouts'
import { Grid, Box, Typography } from '@mui/material'
import { WishlistContext } from '../../contexts'
import { CardCategory } from '../../components'

export default function Wishlist() {

    const wishlistContext = React.useContext(WishlistContext)
    const data = wishlistContext.getUserWishlist()

    return (
        <MainLayout
            title='Wishlist'
        >
            {data.length > 0 ?
                <Grid container spacing={4} component={Box} py={2}>
                    {data.map((item) => (
                        <Grid item xs={12} sm={4} md={3} lg={2} key={item.uid}>
                            <CardCategory
                                product={item}
                                isWishlist
                            />
                        </Grid>
                    ))}
                </Grid>
                :
                <Grid container spacing={3}>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <img src='/images/logo/fashify_op.png' className='not-found-img' alt='SIGNE' width='256' />
                        <Typography component='p' align='center' display='block'>
                            You have no items in your wishlist
                        </Typography>
                    </Grid>
                </Grid>}
        </MainLayout>
    )

}