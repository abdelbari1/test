import React from "react";
import { Breadcrumbs, Typography, Skeleton } from "@mui/material";
import useStyles from './BreadCrumbs.style'
import { v4 as uuidv4 } from 'uuid'
import { NavigateNext } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function BreadCrumbs(props) {

    const classes = useStyles()
    const { items } = props
    const icon = props.icon || <NavigateNext fontSize='small' />

    return (
        <Breadcrumbs aria-label="breadcrumb" separator={icon} className={classes.root}>
            {items.map((item) => (
                item.url && !item.text.length
                    ? <Skeleton key={uuidv4()} variant="text" width="100px" />
                    : item.url ? <Link to={item.url} key={uuidv4()} className={classes.link}> {item.text}</Link>
                        : (!item.text.length || item.text === '')
                            ? <Skeleton key={uuidv4()} variant="text" width="100px" />
                            : <Typography key={uuidv4()} component='p' >{item.text}</Typography>
            ))}
        </Breadcrumbs>
    )
}