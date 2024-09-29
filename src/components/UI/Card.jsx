import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Box } from '@mui/material';

const CustomCard = ({ title, description, imageUrl, actions, quantity, category, id }) => {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: '12px', boxShadow: 3 }}>
            {imageUrl && (
                <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl}
                    alt={title}
                    sx={{ borderRadius: '12px 12px 0 0' }}
                />
            )}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                        {quantity<=0 ? `Out of stock` : `Quantity: ${quantity}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                        {category}
                    </Typography>
                </Box>
                <Box sx={{ mt   : 1 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        {description}
                    </Typography>
                </Box>
            </CardContent>

            {actions && (
                <CardActions sx={{ justifyContent: 'space-between', display: 'flex' }}>
                    {actions?.map((action, index) => (
                        <Button key={index} size="small" onClick={()=>{action.onClick(id)}}>
                            {action.label}
                        </Button>
                    ))}
                </CardActions>
            )}
        </Card>
    );
};

export default CustomCard;
