import QuantumCircuit from 'quantum-circuit';

export function createQuantumTeleportationCircuit(initialGate) {
  const circuit = new QuantumCircuit(3);

  if(initialGate) {
    initialGate(circuit);
  }

  // Prepare the entangled state (Bell state) between qubits 1 and 2
  circuit.appendGate('h', 1);
  circuit.appendGate('cx', [1, 2]);

  // Alice's operations
  circuit.appendGate('cx', [0, 1]);
  circuit.appendGate('h', 0);

  // Measure qubits 0 and 1
  circuit.addMeasure(0, 'c0', 0);
  circuit.addMeasure(1, 'c1', 1);

  // Bob's operations (conditional on measurement results)
  circuit.appendGate('cz', [1, 2], {
    condition: {
      creg: 'c0',
      value: 1
    }
  });
  circuit.appendGate('cx', [0, 2], {
    condition: {
      creg: 'c1',
      value: 1
    }
  });

  return circuit;
}

export function testQuantumTeleportation() {

  
  // Generate random angles for the U gate
  const theta = Math.random() * 2 * Math.PI;
  const phi = Math.random() * 2 * Math.PI;
  const lambda = Math.random() * 2 * Math.PI;

  const circuit = createQuantumTeleportationCircuit((circuit) => {
    /* circuit.appendGate('u3', 0, {
      params: [theta, phi, lambda]
    }); */
    circuit.appendGate('x', 0);
  });
  
  circuit.addMeasure(2, 'c2', 2)
  

  circuit.run();

  return {
    angles: { theta, phi, lambda },
    circuit: circuit
  };
}