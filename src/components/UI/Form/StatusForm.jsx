import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';

const statuses = [
  { value: 'Shipped', label: 'Shipped' },
  { value: 'Delivered', label: 'Delivered' },
  { value: 'Canceled', label: 'Canceled' },
];

const StatusForm = ({ onSubmit, order }) => {
  const [status, setStatus] = useState(order?.orderStatus || statuses[0].value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(status, order);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Order Status"
        select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      >
        {statuses.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Update Status
      </Button>
    </Box>
  );
};

export default StatusForm;
