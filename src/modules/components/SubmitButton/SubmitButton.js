import {
    CircularProgress,
} from '@mui/material'
import Button from '../StyledButton/StyledButton'

function SubmitButton (props) {
    const { children, isLoading, tooltip, hideOnLoading, spacing = false, ...newProps } = props
    return (
        <Button
            {...newProps}
            type='submit'
            spacing={spacing}
            disabled={isLoading || newProps.disabled}
            tooltip={tooltip}
        >
            {isLoading && <CircularProgress style={{ marginRight: '10px' }} size={20} />}
            {isLoading && hideOnLoading ? 'Processing' : children}
        </Button>
    )
}
export default SubmitButton;