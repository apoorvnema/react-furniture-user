import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                textAlign: 'center',
                position:'static',
                bottom: 0,
                width: '100%',
                bgcolor: 'background.paper',
                boxShadow: 1,
            }}
        >
            <Typography variant="body2" color="textSecondary">
                © {new Date().getFullYear()} React Furniture. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;
