import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';

//to show users notifications on the website:
import { Toaster } from 'react-hot-toast';

//for frontend<->backend communication:
import axios from 'axios';

//to make api requests from the frontend to the backend:
axios.defaults.baseURL = 'http://localhost:5000/api/v1';
axios.defaults.withCredentials = true; //to exchange cookies;

//theme to be used throughout:
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab , serif',
    allVariants: { color: 'white' },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position='top-right' />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
