import React from "react";
import { IconButton, Typography } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'


function QuantityPicker(props) {

    const { handleQuantityChange, product } = props
    
    const handleClick = (e, type) => {
        e.preventDefault()
        if (type === 'increment') {
            const increment = Number(product.quantity_selected) + 1
            handleQuantityChange(product.uid, increment)
        }
        else {
            const decrement = Number(product.quantity_selected) - 1
            handleQuantityChange(product.uid, decrement)
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #ccc', width: '120px' }}>
            <IconButton
                sx={{ backgroundColor: '#ccc', borderRadius: 0 }}
                disabled={Number(product.quantity_selected) === 1}
                onClick={(e) => handleClick(e, 'decrement')}
            >
                <RemoveIcon />
            </IconButton>
            <div style={{ paddingInline: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography component={'p'} fontSize={20}>{Number(product.quantity_selected)}</Typography>
            </div>
            <IconButton
                sx={{ backgroundColor: '#ccc', borderRadius: 0 }}
                disabled={Number(product.size_selected.quantity) === Number(product.quantity_selected)}
                onClick={(e) => handleClick(e, 'increment')}
            >
                <AddIcon />
            </IconButton>
        </div>
    )

}

export default QuantityPicker