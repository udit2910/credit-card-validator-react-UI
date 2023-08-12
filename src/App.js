import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CardValidation from './CardValidation';
import { CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

function App() {
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#000000"
      }
    }
  });
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static"  >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <CreditCardIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Card Validator
              </Typography>
            </Toolbar>
          </AppBar>
          <CardValidation />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
