import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem, useMediaQuery } from '@mui/material';
import Footer from '../components/Footer';
import { authAction } from '../store/auth';
import ApiManager from '../services/ApiManager';
import Loader from '../components/UI/Loader';

export default function Orders() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);
    const token = useSelector(state => state.auth.token);
    const [orders, setOrders] = React.useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        dispatch(authAction.logout());
    };

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const userId = localStorage.getItem('userId');
                const response = await ApiManager.getOrders();
                const filteredOrders = Object.values(response).filter(order => order.userId === userId);
                setOrders(filteredOrders);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [])

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
            {token ? (
                <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
            ) : (
                <MenuItem onClick={handleLogin}>Login</MenuItem>
            )}
        </Menu>
    );

    return (
        <>
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', minHeight: '100vh' }}>
                <Loader loading={loading} />
                <AppBar position="static" sx={{ borderRadius: 0 }}>
                    <Toolbar>
                        <div
                            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                            onClick={() => { navigate("/") }}
                        >
                            <img src="/logo.svg" alt="React Furniture logo" width="40" height="40" />
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 2 }}
                            >
                                React Furniture
                            </Typography>
                        </div>
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

                <Box sx={{ padding: 4, flexGrow: 1 }}>
                    <Typography variant="h4" sx={{ marginBottom: 2 }}>
                        Your Orders
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {orders && orders.length > 0 ? (
                            orders.map((order) => {
                                return <Box key={order.orderId} sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 4 }}>
                                    <Typography variant="h6">Order ID: {order.orderId}</Typography>
                                    <Typography variant="body1">Date: {new Date(order.orderDate).toLocaleDateString()}</Typography>
                                    <Typography variant="body1">Total: ₹{order.orderTotal}</Typography>
                                    <Typography variant="body1">Status: {order.orderStatus}</Typography>
                                    <Box>
                                        <Typography variant="body2" sx={{ marginTop: 1 }}>Items:</Typography>
                                        {order.items.map((item) => (
                                            <Typography key={item.id} variant="body2">
                                                {item.name} x {item.quantity}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Box>
                            })
                        ) : (
                            <Typography variant="body1">You have no orders.</Typography>
                        )}
                    </Box>
                </Box>

                <Footer />
            </Box>
        </>
    );
}
