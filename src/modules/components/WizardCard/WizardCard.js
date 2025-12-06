import { Chip, Grid, Paper, Typography, Skeleton } from "@mui/material"
import WizardCardStyles from './WizardCard.styles'

const WizardCard = props => {
    const {
        text,
        image,
        Icon,
        chip,
        size = 'normal',
        color = 'default',
        skeleton = false,
        ...otherProps
    } = props

    const classes = WizardCardStyles({ size: size, color: color })

    return (
        <Paper className={classes.wizardCard} {...otherProps}>
            {skeleton
                ? <Skeleton variant="rect" height={75} width={75} />
                : image
                    ? <img src={image.src} alt={image.alt} />
                    : Icon
                        ? <Icon />
                        : null
            }
            <Grid container justifyContent='center' alignItems='center'>
                {skeleton
                    ? <Skeleton variant="text"  width={150} />
                    : text && <Typography component='p'> {text} </Typography>
                }
                {!skeleton && chip !== undefined && chip !== 0 &&
                    <Chip label={chip} size='small' color={'primary'} />
                }
            </Grid>
        </Paper>
    )
}

export default WizardCard