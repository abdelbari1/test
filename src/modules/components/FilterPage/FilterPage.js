import React from 'react'
import { Collapse, Typography, Divider, IconButton, FormControlLabel, Checkbox, SliderThumb } from '@mui/material'
import {
    ExpandMore as OpenIcon,
    ExpandLess as CloseIcon,
} from '@mui/icons-material'
import global from '../../global'
import useStyles from './FilterPage.styles'
import Filters from './ClassFilter'
import AirbnbSlider from './AirbnbSlider'
import { FilterEntities } from './FilterEntities'

export default function SideMenuSearch(props) {

    const { setData, gender, cacheData, is_all, admin } = props
    const classes = useStyles({ admin })
    const cls_filters = React.useMemo(() => new Filters([gender], is_all), [])
    const [expanded, setExpanded] = React.useState({ gender: true, category: true, size: true, price: true, color: true })
    const [filters, setFilters] = React.useState({ ...cls_filters.items_sidebar })
    const handleExpandCategory = (key) => {
        setExpanded({ ...expanded, [key]: !expanded[key] })
    }

    const handleFiltered = () => {
        const filter_item = new FilterEntities()
        filter_item.change_gender_item(cls_filters.dymData.gender)
        filter_item.change_category_item(cls_filters.dymData.category)
        filter_item.change_size_item(cls_filters.dymData.size)
        filter_item.change_price_item(cls_filters.dymData.price)
        const data_filtered = filter_item.filter_items(cacheData)
        setData([...data_filtered])
    }

    const handleCheckedBox = (e, key) => {
        const { name, checked } = e.target
        cls_filters.set_dymData(key, name, checked)
        const filtered = cls_filters.handle_items_sidebar(key, name, checked)
        cls_filters.items_sidebar = filtered
        setFilters(cls_filters.items_sidebar)
        handleFiltered()
    }

    const handle_change_price = (e) => {
        const low = e.target.value[0]
        const high = e.target.value[1]
        const filtered = cls_filters.handle_price(low, high)
        cls_filters.items_sidebar = filtered
        setFilters(cls_filters.items_sidebar)
        handleFiltered()
    }

    function AirbnbThumbComponent(props) {
        const { children, ...other } = props;
        return (
            <SliderThumb {...other}>
                {children}
                <span>$</span>
            </SliderThumb>
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.profileDrawer}>
                <div className={classes.heading}>
                    <Typography component='p'>Filters</Typography>
                </div>
                <div className={classes.divider}>
                    <Divider />
                </div>
                <div className={classes.content}>
                    <form id='properties-form'>
                        {Object.keys(filters).map((key, index) => (
                            <div key={index} className={classes.properties}>
                                <div className={classes.title} onClick={() => handleExpandCategory(key)}>
                                    <Typography component='p'>{global.methods._spacing(key)}</Typography>
                                    <IconButton
                                        aria-expanded={expanded[key]}
                                        aria-label="show more"
                                    >
                                        {expanded[key] ? <OpenIcon /> : <CloseIcon />}
                                    </IconButton>
                                </div>
                                <Collapse in={expanded[key]} timeout="auto" unmountOnExit sx={key === 'price' ? { paddingBlock: 5 } : {}}>
                                    {key !== 'price' && key !== 'color' &&
                                        filters[key].map((opt, index) => (
                                            opt.value !== 'Default' &&
                                            <div key={index} className={classes.options}>
                                                <div className={classes.items}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                name={opt.value.toString()}
                                                                className={classes.checkbox}
                                                                value={opt.value.toString()}
                                                                color='secondary'
                                                                checked={opt.checked}
                                                                onChange={(e) => handleCheckedBox(e, key)}
                                                            />
                                                        }
                                                        label={<Typography component='p' >{key !== 'size' ? global.methods._spacing(opt.value.toString()) : opt.value}</Typography>}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    {key === 'price' &&
                                        <AirbnbSlider
                                            slots={{ thumb: AirbnbThumbComponent }}
                                            getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                                            value={[filters?.price?.lowest, filters?.price?.highest]}
                                            valueLabelDisplay='on'
                                            max={1000}
                                            min={10}
                                            onChange={e => handle_change_price(e)}
                                        />
                                    }
                                </Collapse>
                            </div>
                        ))
                        }
                    </form>
                </div>
                <div className={classes.divider}>
                    <Divider />
                </div>
            </div >
        </div >
    )

}