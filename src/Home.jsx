import React from 'react';
import { Typography, Container, Paper, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Quantum Playground
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom>
          Explore the Fascinating World of Quantum Computing
        </Typography>
        
        <Typography variant='p'>
          Quantum Playground is an interactive application designed to help you understand and experiment with key concepts in quantum computing. Whether you're a student, researcher, or just curious about quantum mechanics, this app provides hands-on experiences with quantum phenomena.
        </Typography>
        
        <Typography variant="h6" component="h3" gutterBottom>
          What you can explore:
        </Typography>
        
        <Box component="ul" sx={{ paddingLeft: 3 }}>
          <Typography component="li">
            <strong>CHSH Game:</strong> Dive into the CHSH (Clauser-Horne-Shimony-Holt) experiment, a fundamental test of quantum entanglement and Bell's inequality.
          </Typography>
          <Typography component="li">
            <strong>Strategy Charts:</strong> Visualize different strategies for the CHSH game and compare their performance.
          </Typography>
          <Typography component="li">
            <strong>Strategy Comparison:</strong> Run multiple strategies simultaneously and analyze their relative effectiveness.
          </Typography>
          <Typography component="li">
            <strong>Quantum Teleportation:</strong> Explore the mind-bending concept of quantum teleportation through an interactive demonstration.
          </Typography>
        </Box>
        
        <Typography paragraph sx={{ marginTop: 2 }}>
          Each section of the app provides interactive simulations and visualizations to help you grasp these complex quantum concepts. Feel free to experiment, adjust parameters, and see how quantum systems behave under different conditions.
        </Typography>
        
        <Typography>
          Ready to start your quantum journey? Use the navigation menu to explore different experiments and dive into the quantum realm!
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;