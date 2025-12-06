import { makeStyles } from "@mui/styles";
import { colors } from '@mui/material'


export default makeStyles((theme) => ({
    fieldSet: {
        // margin: 0,
        position: 'relative',
        borderRadius: 7,
        // borderWidth: 1,
        // borderColor: '#ccc'
        // border: '2px solid #ccc',
        padding: '10px 10px 10px 10px',
        // backgroundColor: '#ccc',
    },
    legend: {
        fontSize: 17,
        fontWeight: 600,
        paddingInline: 5,
    }
}))