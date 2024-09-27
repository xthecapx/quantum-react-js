import { useEffect, useRef } from 'react';
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
import { useQuantumTeleportation } from './hooks/useQuantumTeleportation';

const QuantumTeleportationDemo = () => {
  const { circuit, runTeleportation, results, repetitions, setRepetitions,fields, append, remove, register, handleSubmit, onSubmit } = useQuantumTeleportation();
  const svgContainerRef = useRef(null);

  const drawCircuit = (circuit) => {
    if (circuit && svgContainerRef.current) {
      const svg = circuit.exportSVG(true);
      const svgWithBackground = svg.replace('<svg', '<svg style="background-color: white;"');
      svgContainerRef.current.innerHTML = svgWithBackground;
    }
  }

  useEffect(() => {
    drawCircuit(circuit);
  }, [circuit]);

  const displayResults = results.length > 10
    ? [
        ...results.slice(0, 5), 
        { 
          id: '...', 
          result: ['...', '...', '...'],
          u3: ['...', '...', '...'], 
          u3Inverse: ['...', '...', '...'], 
          cregsAsString: '...', 
          confirmation: '...' 
        }, 
        ...results.slice(-5)
      ]
    : results;

  return (
    <div className="quantum-teleportation-demo">
      <h2>Quantum Teleportation Experiment</h2>
      <p>
        In this experiment, we teleport a qubit state prepared with a random U gate.
        After teleportation, we apply the inverse of the U gate. If teleportation
        is successful, the final measurement should always be 0.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <TextField
              {...register(`u3Gates.${index}.theta`)}
              label="Theta"
            />
            <TextField
              {...register(`u3Gates.${index}.phi`)}
              label="Phi"
            />
            <TextField
              {...register(`u3Gates.${index}.lambda`)}
              label="Lambda"
            />
            <Button onClick={() => remove(index)}>Remove</Button>
          </div>
        ))}
        <Button color="secondary" variant="contained" type="button" onClick={() => append({ theta:(Math.random() * 2 * Math.PI).toFixed(2), phi:(Math.random() * 2 * Math.PI).toFixed(2), lambda:(Math.random() * 2 * Math.PI).toFixed(2) })}>Add U3 Gate</Button>
        <Button color="primary" type="submit" variant="contained">Update Circuit</Button>
      </form>
      <div ref={svgContainerRef} className="circuit-diagram"></div>
      <div>
        <TextField
          label="Number of repetitions"
          value={repetitions}
          onChange={(e) => setRepetitions(Math.max(1, parseInt(e.target.value)))}
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
                  <TableCell>Confirmation</TableCell>
                  <TableCell>Wire0</TableCell>
                  <TableCell>Wire0</TableCell>
                  <TableCell>Probabilities</TableCell>
                  <TableCell>Circuit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayResults.map(({ id, probabilities, wire0, wire1, circuitPrint, confirmation }) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{confirmation}</TableCell>
                    <TableCell>{wire0}</TableCell>
                    <TableCell>{wire1}</TableCell>
                    <TableCell>{probabilities ? probabilities.join(', ') : 'N/A'}</TableCell>
                    <TableCell>
                      {circuitPrint.split('\n').map((line, index) => {
                        const [state, probability] = line.split('\t');
                        return (
                          <div key={index}>
                            <span style={{ fontFamily: 'monospace' }}>{state}</span>
                            <span style={{ marginLeft: '10px', color: 'gray' }}>{probability}</span>
                          </div>
                        );
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <p>Successful teleportations: {results.filter(r => r.confirmation === 0).length}</p>
          <p>Failed teleportations: {results.filter(r => r.confirmation === 1).length}</p>
          <p>Success rate: {((results.filter(r => r.confirmation === 0).length / results.length) * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default QuantumTeleportationDemo;