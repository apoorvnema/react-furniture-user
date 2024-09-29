import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';

const categories = [
  { value: '1 door wardrobes', label: '1 Door Wardrobes' },
  { value: '2 door wardrobes', label: '2 Door Wardrobes' },
  { value: 'sliding wardrobes', label: 'Sliding Wardrobes' },
];

const ProductForm = ({ onSubmit, mode, initialValues }) => {
  const [productName, setProductName] = useState(initialValues?.name ? initialValues?.name : '');
  const [category, setCategory] = useState(initialValues?.category ? initialValues?.category : categories[0].value);
  const [quantity, setQuantity] = useState(initialValues?.quantity ? initialValues?.quantity : 1);
  const [description, setDescription] = useState(initialValues?.description ? initialValues?.description : '');
  const [productURL, setProductURL] = useState(initialValues?.imageUrl ? initialValues?.imageUrl : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      name: productName,
      category,
      quantity: parseInt(quantity),
      description,
      imageUrl: productURL,
      id: initialValues?.id ? initialValues?.id : null,
    };
    onSubmit(product);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value));
    setQuantity(value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <TextField
        label="Product Image URL"
        value={productURL}
        onChange={(e) => setProductURL(e.target.value)}
        required
      />
      <TextField
        label="Category"
        select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        {categories.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        required
        slotProps={{ htmlInput: { min: 0 } }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {mode || "Add"} Product
      </Button>
    </Box>
  );
};

export default ProductForm;
