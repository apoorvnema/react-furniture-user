import React from 'react';
import ReactDOM from 'react-dom';
import CircularProgress from '@mui/material/CircularProgress';
import './Loader.css';

const Loader = ({ loading }) => {
    if (!loading) return null;

    return ReactDOM.createPortal(
        <div className="overlay">
            <CircularProgress style={{ width: '6rem', height: '6rem' }} />
        </div>,
        document.getElementById('loader-root')
    );
};

export default Loader;
