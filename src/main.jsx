import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Charts from './Charts.jsx';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import PercentIcon from '@mui/icons-material/Percent';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import HomeIcon from '@mui/icons-material/Home';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import CHSH from './CHSH.jsx';

const router = createHashRouter([
  {
    path: '/',
    element: <CHSH />,
  },
  {
    path: '/charts',
    element: <Charts />,
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
    segment: '',
    title: 'Home',
    icon: <HomeIcon />,
  },
  {
    segment: 'CHSH Game',
    title: 'Charts',
    icon: <PercentIcon />,
  },
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={darkTheme}
      window={window !== undefined ? window : undefined}
      >
      <DashboardLayout>
        <CssBaseline />
        <RouterProvider router={router} />
      </DashboardLayout>
    </AppProvider>
  </StrictMode>
);
