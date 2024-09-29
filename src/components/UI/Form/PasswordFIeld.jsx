import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

function CustomPasswordField({id=1, label="Password", ...props}) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl fullWidth variant="outlined" sx={{mt:1, mb:1}}>
            <InputLabel size="small" htmlFor={`outlined-adornment-password${id}`}>
                {label}
            </InputLabel>
            <OutlinedInput
                id={`outlined-adornment-password${id}`}
                type={showPassword ? 'text' : 'password'}
                name={label}
                size="small"
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="small"
                        >
                            {showPassword ? (
                                <VisibilityOff fontSize="inherit" />
                            ) : (
                                <Visibility fontSize="inherit" />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                {...props}
            />
        </FormControl>
    );
}

export default CustomPasswordField;