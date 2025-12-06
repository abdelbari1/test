import { makeStyles } from "@mui/styles";
import { colors } from "@mui/material";

export default makeStyles((theme) => ({
    cod: {
        paddingInline: theme.spacing(2),
        paddingBlock: theme.spacing(2),
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: colors.yellow[100],
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: '100%'
    },
    textBox: {
        paddingInline: theme.spacing(2),
        paddingBlock: theme.spacing(2),
        border: `1px solid #ccc`,
        backgroundColor: colors.grey[200]
    }
}))