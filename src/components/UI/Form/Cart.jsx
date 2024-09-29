import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Box, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { cartAction } from '../../../store/cart';
import ApiManager from '../../../services/ApiManager';

const Cart = ({ handleCloseModal, fetchItems }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [address, setAddress] = useState(cart.address || '');
  const [name, setName] = useState(cart.name || '');

  const handleIncrement = (id) => {
    dispatch(cartAction.addToCart({ id, price: cart.items.find(item => item.id === id).price }));
  };

  const handleDecrement = (id) => {
    dispatch(cartAction.removeFromCart(id));
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBuyNow = async () => {
    if (address && name) {
      try {
        const body = {
          orderId: Math.random().toString(36).substr(2, 9),
          userId: localStorage.getItem('userId') || 'Guest',
          userName: name,
          items: cart.items,
          address: address,
          email: localStorage.getItem('email') || 'Guest',
          orderStatus: "Ordered",
          orderDate: new Date(),
          orderTotal: cart.orderTotal
        }
        const bodyQty = cart.items.map(item => ({ id: item?.id, quantity: item?.quantity, allowed: item?.allowedQuantity }));
        bodyQty.forEach(async item => {
          item.quantity = item.allowed - item.quantity;
          await ApiManager.updateProductQuantity({ quantity: item.quantity }, item.id);
        });
        await ApiManager.placeOrder(body);
        alert('Order Placed Successfully');
      }
      catch (error) {
        console.log(error);
      }
      finally {
        localStorage.setItem('address', address);
        handleCloseModal();
        dispatch(cartAction.clearCart());
        fetchItems();
      }
    } else {
      alert('Please enter your name & address!');
    }
  };

  const handleSavedAddress = () => {
    const savedAddress = localStorage.getItem('address');
    if (!savedAddress) { alert('No saved address found'); return; }
    setAddress(savedAddress);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>

      {cart.items && cart.items.length > 0 ? (
        <>
          <List>
            {cart.items.map(item => (
              <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText primary={item.name} secondary={`Price: ₹${item.price}, Total: ₹${item.totalPrice}`} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => handleDecrement(item.id)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ marginX: 1 }}>
                    {item.quantity}
                  </Typography>
                  <IconButton onClick={() => handleIncrement(item.id)}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Total Amount: ₹{cart.orderTotal || 0}
          </Typography>

          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            required
            fullWidth
            sx={{ marginY: 2 }}
          />
          <Button variant="outlined" onClick={handleSavedAddress}>Use Saved Address</Button>
          <TextField
            label="Delivery Address"
            multiline
            rows={3}
            value={address}
            onChange={handleAddressChange}
            required
            fullWidth
            sx={{ marginY: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleBuyNow}
            disabled={cart.items.length === 0}
          >
            Buy Now (Cash on Delivery Only)
          </Button>
        </>
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
    </Box>
  );
};

export default Cart;
