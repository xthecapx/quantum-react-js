import QuantumCircuit from 'quantum-circuit';

export function chshCircuit(x, y) {
  const circuit = new QuantumCircuit(2);

  circuit.appendGate('h', 0);
  circuit.appendGate('cx', [0, 1]);

  // Alice
  if (x === 0) {
    circuit.appendGate('ry', 0, {
      params: {
        theta: '0',
      },
    });
  } else {
    circuit.appendGate('ry', 0, {
      params: {
        theta: '-pi / 2',
      },
    });
  }
  circuit.addMeasure(0, 'a', 1);

  // Bob
  if (y === 0) {
    circuit.appendGate('ry', 1, {
      params: {
        theta: '-pi / 4',
      },
    });
  } else {
    circuit.appendGate('ry', 1, {
      params: {
        theta: 'pi / 4',
      },
    });
  }
  circuit.addMeasure(1, 'b', 1);

  return circuit;
}

export function quantumStrategy(x, y) {
  /**
   * Carry out the best strategy for the CHSH game.
   *
   * @param {number} x - Alice's bit (must be 0 or 1)
   * @param {number} y - Bob's bit (must be 0 or 1)
   * @returns {[number, number]} - Alice and Bob's answer bits (respectively)
   */
  const c = chshCircuit(x, y);
  c.run();

  return [c.getCregValue('a'), c.getCregValue('b')];
}
