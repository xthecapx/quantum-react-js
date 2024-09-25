import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';


import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.jsx';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/charts',
    element: <Home />,
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
];


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={darkTheme}
      window={window !== undefined ? window() : undefined}
      >
      <DashboardLayout>
        <CssBaseline />
        <RouterProvider router={router} />
      </DashboardLayout>
    </AppProvider>
  </StrictMode>
);
