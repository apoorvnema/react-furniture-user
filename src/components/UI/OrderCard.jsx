import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';

const OrderCard = ({ orderId, userName, email, address, orderDate, orderStatus, orderTotal, items, actions, id }) => {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: '12px', boxShadow: 3, textAlign:'left' }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Order ID: {orderId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>User:</strong> {userName} <br />
                    <strong>Email:</strong> {email} <br />
                    <strong>Address:</strong> {address} <br />
                    <strong>Order Date:</strong> {new Date(orderDate).toLocaleString()} <br />
                    <strong>Order Status:</strong> {orderStatus} <br />
                    <strong>Total Amount:</strong> ${orderTotal} <br />
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" component="div">
                        Items:
                    </Typography>
                    {items?.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">
                                {item.productName} (Qty: {item.quantity}) - ${item.price}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>

            {actions && (
                <CardActions sx={{ justifyContent: 'center', display: 'flex' }}>
                    {actions?.map((action, index) => (
                        <Button key={index} size="small" onClick={() => { action.onClick(id); }}>
                            {action.label}
                        </Button>
                    ))}
                </CardActions>
            )}
        </Card>
    );
};

export default OrderCard;
