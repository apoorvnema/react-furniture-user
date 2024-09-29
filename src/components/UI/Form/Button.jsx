import {Button} from '@mui/material';

function CustomButton() {
    return (
        <Button
            type="submit"
            variant="contained"
            color="info"
            size="small"
            disableElevation
            fullWidth
            sx={{mt:1, mb:1}}
            >
            Sign In
        </Button>
    );
}

export default CustomButton;