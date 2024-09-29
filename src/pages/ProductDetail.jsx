import * as React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Button } from '@mui/material';

export default function ProductDetail() {
    const navigate = useNavigate();
    const location = useLocation();

    const product = location.state?.items;

    if (!product) {
        return (
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
                    </Toolbar>
                </AppBar>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <Typography variant="h5">Product not found.</Typography>
                </Box>

                <Footer />
            </Box>
        );
    }

    return (
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
                </Toolbar>
            </AppBar>

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
            <Button type="submit" variant="contained" color="primary" sx={{ width: '20%'}}>
                Add to Cart
            </Button>
            </Box>
            <Footer />
        </Box>
    );
}
