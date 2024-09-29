import { InputAdornment, TextField } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';

function CustomTextField({ label = "Name", name = "name", icon = <TextFieldsIcon fontSize="inherit" />, ...props }) {
    return (
        <TextField
            id={`input-with-icon-${name}`}
            label={label}
            name={name}
            size="small"
            required
            fullWidth
            variant="outlined"
            {...props}
            sx={{mt:1, mb:1}}
        />
    );
}

export default CustomTextField;
