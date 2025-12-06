import {
    Grid,
    useMediaQuery,
    Typography,
    useTheme,
    Box
} from '@mui/material'
import {
    NotificationsOutlined as NotificationsIcon,
    ArchiveOutlined as ItemsIcon,
    FavoriteBorder as WishlistIcon,
    People as PeopleIcon,
    Key as KeyIcon,
    ShoppingBag as SoldIcon,
    WorkHistory as BookedIcon
} from '@mui/icons-material'
import { AdminLayout } from '../../../layouts'
import { WizardCard } from '../../../components'
import useStyles from './Landing.styles'
import { useNavigate } from 'react-router-dom'

function LandingAdminPage(props) {

    const theme = useTheme()
    const classes = useStyles()
    const navigate = useNavigate()
    const _isWidthUp = breakpoint => useMediaQuery(theme.breakpoints.up(breakpoint))

    const topCategories = [
        { text: 'Store Items', Icon: ItemsIcon, url: '/admin/items' },
        { text: 'Rental Items', Icon: KeyIcon, url: '/admin/rental-items' },
        { text: 'Sold Items', Icon: SoldIcon, url: '/admin/sold-items' },
        { text: 'Booked Items', Icon: BookedIcon, url: '/admin/booked-items' },
        { text: 'Notifications', Icon: NotificationsIcon, url: '#', chip: 0 },
        { text: 'Wishlist', Icon: WishlistIcon, url: '#', chip: 0 },
        { text: 'Users', Icon: PeopleIcon, url: '/admin/users' },
    ]

    return (
        <AdminLayout
            title={'Welcome to Marketplace'}
            centerTitle
        >
            <Grid container className={classes.root} justifyContent='center'>
                <Grid item xs={12}>
                    <Typography variant='h6' gutterBottom> Get Started </Typography>
                </Grid>
                <Grid item hidden={!_isWidthUp('md')} lg={1} xl={2} />
                <Grid
                    container item
                    xs={12} lg={10} xl={8}
                    justifyContent='center'
                    component={Box}
                    pt={5}
                >
                    {(topCategories).map(({ text, url, chip, Icon }, index) =>
                        <Grid key={index} item xs={12} sm={6} md={3} xl={3}>
                            <WizardCard
                                text={text}
                                Icon={Icon}
                                size='small'
                                chip={chip}
                                onClick={() => navigate(url)}
                            />
                        </Grid>)}
                </Grid>
                <Grid item hidden={!_isWidthUp('md')} lg={1} xl={2} />
            </Grid>
        </AdminLayout>
    );
}

export default LandingAdminPage