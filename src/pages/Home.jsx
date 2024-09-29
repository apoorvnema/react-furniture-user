import { useDispatch } from 'react-redux';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { SearchIconWrapperStyle, SearchStyle, StyledInputBaseStyle } from '../assets/headerThemes';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authAction } from '../store/auth';
import Footer from '../components/Footer';
import SwiperNav from '../components/SwiperNav';

const Search = SearchStyle;

const SearchIconWrapper = SearchIconWrapperStyle;

const StyledInputBase = StyledInputBaseStyle;

export default function Home() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const token = useSelector(state => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        navigate('/login');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        dispatch(authAction.logout());
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {token ? [
                <MenuItem key="profile" onClick={handleMenuClose}>Profile</MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
            ] : <MenuItem onClick={handleLogin}>Login</MenuItem>}
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ borderRadius: 0 }}>
                <Toolbar>
                    <img src="logo.svg" alt="React Furniture logo" width="40" height="40" />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 2 }}
                    >
                        React Furniture
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex' }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle sx={{ fontSize: 40 }}/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
            <SwiperNav />
            <Footer />
        </Box>
    );
}