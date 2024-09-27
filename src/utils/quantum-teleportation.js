import QuantumCircuit from 'quantum-circuit';

export function AliceAndBobEntanglement() {
  const circuit = new QuantumCircuit(3);

  circuit.appendGate('h', 1);
  circuit.appendGate('cx', [1, 2]);

  return circuit;
}

export function RandomAllicePayload(circuit, angles) {
  angles.forEach(params => {
    circuit.appendGate('u3', 0, { params: [params.theta, params.phi, params.lambda] });
  });

  return circuit;
}

export function AlliceSendMessage(circuit) {
  circuit.appendGate('cx', [0, 1]);
  circuit.appendGate('h', 0);

  return circuit;
}

export function AlliceObservation(circuit) {
  circuit.addMeasure(1, 'wire1', 1);
  circuit.addMeasure(0, 'wire0', 0);
  // circuit.run();

  return circuit;
}

export function BobReceiveMessage(circuit) {
  circuit.appendGate('x', 2, {
    condition: {
      creg: 'wire1',
      value: 1
    }
  });
  circuit.appendGate('z', 2, {
    condition: {
      creg: 'wire0',
      value: 1
    }
  });

  return circuit;
}

export function BobVerification(circuit, angles) {
  angles.reverse().forEach(params => {
    circuit.appendGate('u3', 2, { params: [-params.theta, -params.lambda, -params.phi] });
  });

  circuit.addMeasure(2, 'confirmation', 2);

  return circuit;
}
