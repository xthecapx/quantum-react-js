import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import CHSH from './CHSH.jsx';
import Charts from './Charts.jsx';
import QuantumTeleportationDemo from './QuantumTeleportationDemo.jsx';
import ComparisonChart from './ComparisonChart.jsx';
import Home from './Home.jsx';

// Import icons
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import CompareIcon from '@mui/icons-material/Compare';
import ScienceIcon from '@mui/icons-material/Science';


const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chsh',
    element: <CHSH />,
  },
  {
    path: '/chsh/charts',
    element: <Charts />,
  },
  {
    path: '/chsh/comparison',
    element: <ComparisonChart />,
  },
  {
    path: '/quantum-teleportation',
    element: <QuantumTeleportationDemo />,
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const NAVIGATION = [
  {
    segment: '',
    title: 'Home',
    icon: <HomeIcon />,
    element: <Home />,
  },
  {
    segment: 'chsh',
    title: 'CHSH Experiment',
    icon: <FolderIcon />,
    children: [
      {
        segment: '',
        title: 'CHSH Game',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'charts',
        title: 'Strategy Charts',
        icon: <BarChartIcon />,
      },
      {
        segment: 'comparison',
        title: 'Strategy Comparison',
        icon: <CompareIcon />,
      },
    ],
  },
  {
    segment: 'quantum-teleportation',
    title: 'Quantum Teleportation',
    icon: <FolderIcon />,
    children: [
      {
        segment: '',
        title: 'Experiment',
        icon: <ScienceIcon />,
      },
    ]
  },
  
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline />
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={darkTheme}
    >
      <DashboardLayout>
        <RouterProvider router={router} />
      </DashboardLayout>
    </AppProvider>
  </StrictMode>
);
