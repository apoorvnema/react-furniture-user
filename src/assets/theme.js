import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
    button: {
      fontWeight: 600,
      textTransform: 'none', 
    },
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#3E2723', 
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: '#795548',
    },
  },
  palette: {
    primary: {
      main: '#8D6E63', 
      contrastText: '#FFFFFF',  
    },
    secondary: {
      main: '#3E2723',
      contrastText: '#FFFFFF', 
    },
    background: {
      default: '#FAFAFA', 
      paper: '#ECEFF1',  
    },
    text: {
      primary: '#3E2723', 
      secondary: '#795548', 
      disabled: 'rgba(0, 0, 0, 0.38)', 
    },
    action: {
      active: '#8D6E63',
    },
    error: {
      main: '#E57373', 
    },
    success: {
      main: '#4CAF50',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', 
          textTransform: 'none',  
          fontWeight: 600, 
          color: '#FFFFFF', 
          backgroundColor: '#8D6E63',
          '&:hover': {
            backgroundColor: '#795548',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ECEFF1', 
          color: '#FFFFFF',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ECEFF1', 
          borderRadius: '12px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#3E2723',
        },
      },
    },
  },
});

export default theme;
