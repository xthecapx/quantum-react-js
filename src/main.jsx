import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import CHSH from './CHSH.jsx';
import Charts from './Charts.jsx';
import QuantumTeleportationDemo from './QuantumTeleportationDemo.jsx';
import ComparisonChart from './ComparisonChart.jsx';

// Import icons
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import CompareIcon from '@mui/icons-material/Compare';
import ScienceIcon from '@mui/icons-material/Science';

// Create a Home component
const Home = () => (
  <div>
    <h1>Welcome to Quantum Playground</h1>
    <p>This is an app to play with quantum concepts and experiments. Explore the different sections to learn about CHSH games, quantum teleportation, and more!</p>
  </div>
);

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
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'Home',
    icon: <HomeIcon />,
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
