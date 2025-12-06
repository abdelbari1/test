import React from 'react'
import { Grid, Box, Divider } from '@mui/material'
import { ButtonCollapse } from '../'
import useStyles from './MainPage.styles'
import { Tune } from '@mui/icons-material'

export default function MainPage(props) {

    // const { data, setData } = props
    // const FilterRow = props.filterRow
    // const filtersRef = React.useRef()
    // const handleClearFilters = () => { if (filtersRef.current) filtersRef.current.reset() }
    // const [memData] = React.useState(data || [])

    const classes = useStyles()
    const [filtersOpen, setFiltersOpen] = React.useState(false)

    return (
        <>
            <Grid
                container
                justifyContent='space-between'
                direction='row-reverse'
            >
                <Grid container item xs={12} sm={9} md={10} justifyContent='flex-end' alignItems="center">
                    {props.topActions && props.topActions.map((Action, index) =>
                        <Grid
                            key={index}
                            component={Box} pb={1}
                            item xs={12} sm={'auto'} md={'auto'} lg={'auto'}
                            className={classes.actionBtn}
                        >
                            {Action}
                        </Grid>)
                    }
                </Grid>
                {props.filter &&
                    <Grid container item component={Box} pb={1} xs={12} sm={3} md={2} lg={1}>
                        <Grid item xs>
                            <ButtonCollapse
                                title='Filters'
                                openIcon={<Tune />}
                                closeIcon={<Tune />}
                                textAlign='end'
                                component='form'
                                color='primary'
                                open={filtersOpen}
                                setOpen={setFiltersOpen}
                            />
                        </Grid>
                    </Grid>}
                {props.divider &&
                    <Grid item component={Box} py={1} xs={12} md={12}>
                        <Divider />
                    </Grid>}
            </Grid>
            {/* {props.filter &&
                <Collapse component={Box} in={filtersOpen} pb={1}>
                    <Grid
                        container item
                        component={Box} pb={1}
                        className={classes.tableFiltersPanel}
                        spacing={1}
                        justifyContent='flex-end'
                    >
                        {props.filterRow &&
                            <FilterRow
                                filtersRef={filtersRef}
                                setData={setData}
                                filterData={memData}
                                wells={props.wells}
                                rigs={props.rigs}
                                moves={props.moves}
                            />}
                        <Grid item xs={12} sm={3} md={2} lg='auto' style={{ alignSelf: 'center' }}>
                            <StyledButton
                                size='tiny'
                                padding={2}
                                variant='outlined'
                                color='warning'
                                // onClick={handleClearFilters}
                                fullWidth
                            >
                                Clear Filters
                            </StyledButton>
                        </Grid>
                    </Grid>
                </Collapse>
            } */}
        </>
    )

}