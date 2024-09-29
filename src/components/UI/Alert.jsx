import React from 'react';
import ReactDOM from 'react-dom';
import Alert from '@mui/material/Alert';

const CustomAlert = ({ visible, type, message }) => {
    if (!visible) return null;

    return ReactDOM.createPortal(
            <Alert severity={type}>
                {message}
            </Alert>,
        document.getElementById('alert-root')
    );
};

export default CustomAlert;
