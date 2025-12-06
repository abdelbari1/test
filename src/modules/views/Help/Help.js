import React from "react";
import { MainLayout } from "../../layouts";
import { TextField } from "@mui/material";


export default function Help(){

    const [value, setValue] = React.useState([{name: 'Abdel Bari'}])
    const [value2, setValue2] = React.useState([{name: 'Abdel Bari'}])

    const handleChange = (e, prd) => {
        const current = [...value2]
        const index = current.findIndex(v => v.name === prd.name)
        current[index].name = e.target.value
        console.log(current);
        // setValue2(current)
    }

    console.log('value ', value);
    console.log('value2 ', value2);

    return (
        <TextField 
            label='Name'
            variant="outlined"
            fullWidth
            value={value[0].name}
            onChange={(e) => handleChange(e, value[0])}
        />
    )

}