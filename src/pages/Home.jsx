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
import { Tabs, Tab } from '@mui/material';
import { SearchIconWrapperStyle, SearchStyle, StyledInputBaseStyle } from '../assets/headerThemes';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authAction } from '../store/auth';
import Footer from '../components/Footer';
import SwiperNav from '../components/SwiperNav';
import ItemsCard from '../components/ItemsCard';

const Search = SearchStyle;

const SearchIconWrapper = SearchIconWrapperStyle;

const StyledInputBase = StyledInputBaseStyle;

export default function Home() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = React.useState(0);
    const token = useSelector(state => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filter, setFilter] = React.useState("");
    const [search, setSearch] = React.useState("");

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

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        switch(newValue) {
            case 0:
                setFilter("");
                break;
            case 1:
                setFilter("1 door wardrobe");
                break;
            case 2:
                setFilter("2 door wardrobe");
                break;
            case 3:
                setFilter("sliding wardrobe");
                break;
            default:
                setFilter("");
                break;
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

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
        <Box sx={{ display:'flex', flex: 1, flexDirection:'column', minHeight: '100vh' }}>
            <AppBar position="static" sx={{ borderRadius: 0 }}>
                <Toolbar>
                    <div style={{display:'flex', alignItems:'center', cursor:'pointer'}} onClick={()=>{navigate("/")}}>
                    <img src="logo.svg" alt="React Furniture logo" width="40" height="40" />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 2 }}
                    >
                        React Furniture
                    </Typography>
                    </div>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={search}
                            onChange={handleSearchChange}
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
                            <AccountCircle sx={{ fontSize: 40 }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                    <Tab label="All" />
                    <Tab label="1 Door Wardrobes" />
                    <Tab label="2 Door Wardrobes" />
                    <Tab label="Sliding Wardrobes" />
                </Tabs>
            </Box>

            {value === 0 && <SwiperNav />}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5, flexGrow: 1 }}>
            <ItemsCard filter={filter} search={search}/>
            </Box>
            <Footer />
        </Box>
    );
}