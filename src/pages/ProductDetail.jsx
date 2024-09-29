import * as React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, Fab, Menu, MenuItem, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { authAction } from '../store/auth';
import TransitionsModal from '../components/UI/Modal';
import Cart from '../components/UI/Form/Cart';
import { cartAction } from '../store/cart';

export default function ProductDetail() {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [showModal, setShowModal] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);
    const token = useSelector(state => state.auth.token);
    const product = location.state?.item;
    const id = location.state?.id;
    const dispatch = useDispatch();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        navigate('/login');
    }

    const handleShowOrders = () => {
        navigate('/orders');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        dispatch(authAction.logout());
    }

    const handleShowCart = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

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
                <MenuItem key="orders" onClick={handleShowOrders}>orders</MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
            ] : <MenuItem onClick={handleLogin}>Login</MenuItem>}
        </Menu>
    );

    if (!product) {
        return (
            <>
                <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', minHeight: '100vh' }}>
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

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                        <Typography variant="h5">Product not found.</Typography>
                    </Box>

                    <Footer />
                    <Fab
                        variant={!isSmallScreen ? 'extended' : 'circular'}
                        color="primary"
                        aria-label="add"
                        style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
                        onClick={handleShowCart}
                    >
                        <AddShoppingCartIcon />
                        {!isSmallScreen && <Typography sx={{ ml: 1, color: '#FFFFFF' }}>Show Cart</Typography>}
                    </Fab>
                </Box>
                <TransitionsModal show={showModal} onClose={handleCloseModal} title={"Your Cart"} >
                    <Cart mode={"Add"} onSubmit={() => { }} />
                </TransitionsModal>
            </>
        );
    }

    const handleAddToCart = () => {
        dispatch(cartAction.addToCart({...product, id,  allowedQuantity: product?.quantity}));
    }

    return (
        <>
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', minHeight: '100vh' }}>
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

                <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                    <Typography variant="h4" sx={{ marginBottom: 1 }}>
                        {product.name}
                    </Typography>
                    <Box
                        component="img"
                        src={product.imageUrl}
                        alt={product.name}
                        sx={{ width: 300, height: 300, marginBottom: 1, objectFit: 'cover', borderRadius: 4 }}
                    />
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        Category: {product.category}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        Quantity: {product.quantity}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        {product.description}
                    </Typography>
                    <Button type="submit" variant="contained" color="primary" sx={{ width: 'fit-content' }} onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </Box>
                <Footer />
                <Fab
                    variant={!isSmallScreen ? 'extended' : 'circular'}
                    color="primary"
                    aria-label="add"
                    style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
                    onClick={handleShowCart}
                >
                    <AddShoppingCartIcon />
                    {!isSmallScreen && <Typography sx={{ ml: 1, color: '#FFFFFF' }}>Show Cart</Typography>}
                </Fab>
            </Box>
            <TransitionsModal show={showModal} onClose={handleCloseModal} title={"Your Cart"} >
                <Cart mode={"Add"} onSubmit={() => { }} />
            </TransitionsModal>
        </>
    );
}
