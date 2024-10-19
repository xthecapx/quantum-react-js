import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Tab, Box, Button, Slider, Typography, TextField, Alert, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { chshCircuit } from './utils/quantum-strategy';

function SpinParticle({ degrees = 0, showArrow = false }) {
  const arrowStyle = {
    transform: `rotate(${degrees}deg)`,
    transformOrigin: 'center',
  };

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <defs>
        <radialGradient id="ballGradient" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
          <stop offset="0%" style={{stopColor:'#87CEFA', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#1E90FF', stopOpacity:1}} />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="20" fill="url(#ballGradient)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      {showArrow && (
        <>
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            stroke="red"
            strokeWidth="2"
            style={arrowStyle}
          />
          <polygon
            points="50,5 45,15 55,15"
            fill="red"
            style={arrowStyle}
          />
        </>
      )}
    </svg>
  );
}

function UnderstandingSpin() {
  const [showArrow, setShowArrow] = useState(false);
  const [showSecondParticle, setShowSecondParticle] = useState(false);

  return (
    <div>
      <h2>Understanding Spin</h2>
      <Box sx={{ '& > button': { m: 1 } }}>
        <Button
          variant="contained"
          onClick={() => setShowArrow(!showArrow)}
        >
          {showArrow ? 'Hide' : 'Show'} Spin Direction
        </Button>
        <Button
          variant="contained"
          onClick={() => setShowSecondParticle(!showSecondParticle)}
        >
          {showSecondParticle ? 'Hide' : 'Show'} Second Particle
        </Button>
      </Box>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <SpinParticle degrees={0} showArrow={showArrow} />
        {showSecondParticle && <SpinParticle degrees={180} showArrow={showArrow} />}
      </div>
    </div>
  );
}

const GreenSlider = styled(Slider)(({ theme }) => ({
  color: '#2e7d32',
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${theme.palette.success.main}33`,
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 14px ${theme.palette.success.main}33`,
    },
  },
}));

function MeasurementDemo({ initialSpinAngle = 0, onMeasure, onAngleChange }) {
  const [measurementAngle, setMeasurementAngle] = useState(0);
  const [measurementResult, setMeasurementResult] = useState(null);
  const [showSpinDirection, setShowSpinDirection] = useState(false);
  const [currentSpinAngle, setCurrentSpinAngle] = useState(initialSpinAngle);

  const handleAngleChange = (event, newValue) => {
    setMeasurementAngle(newValue);
    setMeasurementResult(null);
    setShowSpinDirection(false);
    if (onAngleChange) onAngleChange();
  };

  const calculateProbabilities = (angle) => {
    const relativeAngle = (angle - currentSpinAngle + 360) % 360;
    const radians = (relativeAngle * Math.PI) / 180;
    const prob1 = Math.cos(radians / 2) ** 2;
    const prob0 = Math.sin(radians / 2) ** 2;
    return { prob1, prob0 };
  };

  const handleMeasure = () => {
    const { prob1, prob0 } = calculateProbabilities(measurementAngle);
    const randomValue = Math.random();
    if (randomValue < prob1) {
      setMeasurementResult(1);
    } else {
      setMeasurementResult(0);
    }
    setShowSpinDirection(true);
    setCurrentSpinAngle(measurementAngle);
    if (onMeasure) {
      onMeasure(measurementAngle);
    }
  };

  const { prob1, prob0 } = calculateProbabilities(measurementAngle);

  // Adjust the angle for visual representation (rotate 90 degrees clockwise)
  const visualAngle = (measurementAngle + 270) % 360;

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 360) {
      setMeasurementAngle(value);
      setMeasurementResult(null);
      setShowSpinDirection(false);
    }
  };

  return (
    <div>
      <h2>Measurement Effect</h2>
      <Box sx={{ width: 300, margin: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
        <GreenSlider
          value={measurementAngle}
          onChange={handleAngleChange}
          aria-labelledby="measurement-angle-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={360}
          sx={{ flex: 1 }}
        />
        <TextField
          value={measurementAngle}
          onChange={handleInputChange}
          type="number"
          inputProps={{ min: 0, max: 360 }}
          sx={{ width: 70 }}
        />
      </Box>
      <svg width="200" height="200" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="1" />
        <SpinParticle 
          degrees={showSpinDirection ? currentSpinAngle : initialSpinAngle} 
          showArrow={showSpinDirection} 
        />
        <line
          x1="50"
          y1="50"
          x2={50 + 40 * Math.cos((visualAngle * Math.PI) / 180)}
          y2={50 + 40 * Math.sin((visualAngle * Math.PI) / 180)}
          stroke="#2e7d32"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      </svg>
      <Typography>Measurement Angle: {measurementAngle}°</Typography>
      <Typography>Current Spin Angle: {currentSpinAngle}°</Typography>
      <Typography>Probability of measuring 1: {prob1.toFixed(4)}</Typography>
      <Typography>Probability of measuring 0: {prob0.toFixed(4)}</Typography>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleMeasure}>
          Measure
        </Button>
      </Box>
      {measurementResult !== null && (
        <Typography>Measurement Result: {measurementResult}</Typography>
      )}
      <Typography variant="body2" sx={{ mt: 2 }}>
        The probability of measuring 1 is cos²(θ/2), where θ is the angle between the measurement direction and the current spin state.
        The probability of measuring 0 is sin²(θ/2), which is always 1 - cos²(θ/2).
      </Typography>
    </div>
  );
}

function EntangledParticles() {
  const [spinAngle1, setSpinAngle1] = useState(0);
  const [spinAngle2, setSpinAngle2] = useState(180);
  const [particle1Measured, setParticle1Measured] = useState(false);
  const [particle1Defining, setParticle1Defining] = useState(false);

  const handleAngleChange1 = () => {
    setParticle1Measured(false);
    setParticle1Defining(true);
  };

  const handleMeasurement1 = (newAngle) => {
    setSpinAngle1(newAngle);
    setSpinAngle2((newAngle + 180) % 360);
    setParticle1Measured(true);
    setParticle1Defining(false);
  };

  const handleMeasurement2 = (newAngle) => {
    setSpinAngle2(newAngle);
    setSpinAngle1((newAngle + 180) % 360);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Entangled Particles
      </Typography>
      <Typography variant="body1" paragraph>
        These two particles are entangled. When one particle is measured, the other particle's spin is instantly determined to be in the opposite direction.
      </Typography>
      <Box display="flex" justifyContent="space-around">
        <Box width="45%">
          <Typography variant="h6" gutterBottom>
            Particle 1
          </Typography>
          <MeasurementDemo 
            initialSpinAngle={spinAngle1} 
            onMeasure={handleMeasurement1}
            onAngleChange={handleAngleChange1}
          />
        </Box>
        <Box width="45%">
          <Typography variant="h6" gutterBottom>
            Particle 2
          </Typography>
          {particle1Defining ? (
            <Typography>Spin of Particle 1 is being defined. Particle 2 state is uncertain.</Typography>
          ) : particle1Measured ? (
            <MeasurementDemo 
              initialSpinAngle={spinAngle2} 
              onMeasure={handleMeasurement2}
            />
          ) : (
            <Typography>Measure Particle 1 to determine the state of Particle 2.</Typography>
          )}
        </Box>
      </Box>
    </div>
  );
}

function RealLifeExperiments() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Try It Yourself: Real-Life Quantum Experiments
      </Typography>
      <Typography variant="body1" paragraph>
        While our simulations provide a great introduction to quantum concepts, nothing beats hands-on experience with real quantum equipment. If you're interested in conducting your own quantum experiments, there are commercial options available:
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          1. qutools GmbH
        </Typography>
        <Typography variant="body1" paragraph>
          qutools offers a range of quantum physics education kits and equipment, including interferometers and time-taggers.
        </Typography>
        <Link href="https://qutools.com/" target="_blank" rel="noopener noreferrer">
          Visit qutools website
        </Link>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          2. ID Quantique
        </Typography>
        <Typography variant="body1" paragraph>
          ID Quantique provides advanced quantum detection systems, including single-photon detectors and quantum random number generators.
        </Typography>
        <Link href="https://www.idquantique.com/quantum-detection-systems/overview/" target="_blank" rel="noopener noreferrer">
          Explore ID Quantique's quantum detection systems
        </Link>
      </Box>
      <Alert severity="warning" sx={{ mt: 2 }}>
        Please note that professional quantum equipment can be expensive. However, the opportunity to conduct real quantum experiments and gain hands-on experience is invaluable for those seriously interested in quantum physics and technology.
      </Alert>
    </div>
  );
}

function CHSHCircuitDemo() {
  const svgContainerRef = useRef(null);

  useEffect(() => {
    const circuit = chshCircuit(0, 0); // Default values for x and y
    drawCircuit(circuit);
  }, []);

  const drawCircuit = (circuit) => {
    if (circuit && svgContainerRef.current) {
      const svg = circuit.exportSVG(true);
      const svgWithBackground = svg.replace('<svg', '<svg style="background-color: white;"');
      svgContainerRef.current.innerHTML = svgWithBackground;
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        CHSH Game Circuit
      </Typography>
      <Typography variant="body1" paragraph>
        This is the quantum circuit used in the CHSH game strategy:
      </Typography>
      <div ref={svgContainerRef}></div>
    </div>
  );
}

function QuantumStrategy() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <h1>Quantum Strategy</h1>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="quantum strategy tabs">
          <Tab label="Understanding Spin" />
          <Tab label="Measurement" />
          <Tab label="Entangled Particles" />
          <Tab label="CHSH Circuit" />
          <Tab label="Real-Life Experiments" />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {tabValue === 0 && <UnderstandingSpin />}
        {tabValue === 1 && <MeasurementDemo />}
        {tabValue === 2 && <EntangledParticles />}
        {tabValue === 3 && <CHSHCircuitDemo />}
        {tabValue === 4 && <RealLifeExperiments />}
      </Box>
    </div>
  );
}

export default QuantumStrategy;
