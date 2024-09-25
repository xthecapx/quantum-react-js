import { useState, useEffect, useRef } from 'react';
import { testQuantumTeleportation } from './utils/quantum-teleportation';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  TextField
} from '@mui/material';

const QuantumTeleportationDemo = () => {
  const [repetitions, setRepetitions] = useState(1);
  const [results, setResults] = useState([]);
  const [circuit, setCircuit] = useState(null);
  const [angles, setAngles] = useState(null);
  const svgContainerRef = useRef(null);

  useEffect(() => {
    const { circuit: newCircuit, angles: newAngles } = testQuantumTeleportation();
    setCircuit(newCircuit);
    setAngles(newAngles);
  }, []);

  useEffect(() => {
    if (circuit && svgContainerRef.current) {
      const svg = circuit.exportSVG(true);
      const svgWithBackground = svg.replace('<svg', '<svg style="background-color: white;"');
      svgContainerRef.current.innerHTML = svgWithBackground;
    }
  }, [circuit]);

  const runTeleportation = () => {
    const newResults = [];
    for (let i = 0; i < repetitions; i++) {
      const { circuit: newCircuit, angles: newAngles } = testQuantumTeleportation();
      newCircuit.run();
      newResults.push({
        id: i + 1,
        result: newCircuit.getCregBit('c2', 0),
        u3: newAngles.u3,
        u3Inverse: newAngles.u3Inverse
      });
    }
    setResults(newResults);
  };

  const displayResults = results.length > 10
    ? [...results.slice(0, 5), { id: '...', result: '...', u3: ['...', '...', '...'], u3Inverse: ['...', '...', '...'] }, ...results.slice(-5)]
    : results;

  const formatAngle = (angle) => {
    return typeof angle === 'number' ? angle.toFixed(4) : 'N/A';
  };

  return (
    <div className="quantum-teleportation-demo">
      <h2>Quantum Teleportation Experiment</h2>
      <p>
        In this experiment, we teleport a qubit state prepared with a random U gate.
        After teleportation, we apply the inverse of the U gate. If teleportation
        is successful, the final measurement should always be 0.
      </p>
      <div ref={svgContainerRef} className="circuit-diagram"></div>
      <div>
        <TextField
          label="Number of repetitions"
          type="number"
          value={repetitions}
          onChange={(e) => setRepetitions(Math.max(1, parseInt(e.target.value)))}
          inputProps={{ min: "1" }}
          variant="outlined"
          margin="normal"
        />
      </div>
      <Button variant="contained" color="primary" onClick={runTeleportation}>
        Run Teleportation
      </Button>
      {results.length > 0 && (
        <div>
          <h3>Results:</h3>
          <TableContainer component={Paper}>
            <Table aria-label="teleportation results">
              <TableHead>
                <TableRow>
                  <TableCell>Run</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>U3</TableCell>
                  <TableCell>U3 Inverse</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayResults.map(({ id, result, u3, u3Inverse }) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{result}</TableCell>
                    <TableCell>[{u3.map(formatAngle).join(', ')}]</TableCell>
                    <TableCell>[{u3Inverse.map(formatAngle).join(', ')}]</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <p>Successful teleportations: {results.filter(r => r.result === 0).length}</p>
          <p>Failed teleportations: {results.filter(r => r.result === 1).length}</p>
          <p>Success rate: {((results.filter(r => r.result === 0).length / results.length) * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default QuantumTeleportationDemo;