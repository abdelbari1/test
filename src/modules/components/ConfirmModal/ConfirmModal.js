import React from 'react';
import { Grid, Typography } from '@mui/material'
import { StyledButton, SubmitButton } from '..'

export default function ConfirmModal(props) {

    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const handleSubmitStatus = e => {
        e.preventDefault()
        setIsSubmitting(true)
        props.handleSubmit()
        props.handleClose()
    }

    return (
        <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12}>
                <Typography
                    variant='h5'
                    color='primary'
                    align='center'
                    style={{ fontWeight: 500 }}
                >
                    {props.title}
                </Typography>
            </Grid>
            {props.subtitle &&
                <Grid item xs={12}>
                    <Typography
                        component='p'
                        color='textPrimary'
                        align='center'
                        gutterBottom
                    >
                        {props.subtitle}
                    </Typography>
                </Grid>}
            {props.subtitle2 &&
                <Grid item xs={12}>
                    <Typography
                        variant='h5'
                        color='primary'
                        align='center'
                    >
                        {props.subtitle2}
                    </Typography>
                </Grid>}
            <Grid container spacing={1} item justifyContent='center'  component={'form'} onSubmit={(e) => handleSubmitStatus(e)}>
                <Grid item xs={12} sm={5} lg={4}>
                    <SubmitButton
                        type='submit'
                        variant='outlined'
                        color='primary'
                        isLoading={isSubmitting}
                        fullWidth
                    >
                        Confirm
                    </SubmitButton>
                </Grid>
                <Grid item xs={12} sm={5} lg={4}>
                    <StyledButton fullWidth onClick={props.handleClose} color='error' variant='outlined'>
                        Cancel
                    </StyledButton>
                </Grid>
            </Grid>
        </Grid>
    )
}
