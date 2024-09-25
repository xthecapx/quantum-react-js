import { useState, useEffect } from 'react';
import { testQuantumTeleportation } from './utils/quantum-teleportation';

const QuantumTeleportationDemo = () => {
  const [circuit, setCircuit] = useState(null);
  const [step, setStep] = useState(0);
  const [teleportationComplete, setTeleportationComplete] = useState(false);

  useEffect(() => {
    if (circuit) {
      var container = document.getElementById("drawing");
      var svg = circuit.exportSVG(true);
      container.innerHTML = svg;
      container.style.backgroundColor = 'white'; // Add this line to set the background color
    }
  }, [circuit]);

  const steps = [
    "Let's start our quantum adventure!",
    "Step 1: Prepare the quantum state to teleport",
    "Step 2: Create entanglement between Bob and Alice",
    "Step 3: Alice performs her quantum operations",
    "Step 4: Alice measures her qubits and sends the results to Bob",
    "Step 5: Bob applies corrections based on Alice's measurements",
    "Teleportation complete! The quantum state has been teleported!"
  ];

  const handleNextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      if (step === steps.length - 2) {
        setTeleportationComplete(true);
      }
    }
  };

  const renderQubit = (qubitState, label) => (
    <div className="qubit">
      <div className={`qubit-circle ${qubitState}`}></div>
      <div className="qubit-label">{label}</div>
    </div>
  );

  function runTeleportationTest() {
    const newCircuit = testQuantumTeleportation();
    setCircuit(newCircuit.circuit);
    console.log('Teleportation test result:', newCircuit.circuit.stateAsString(true));
  }

  return (
    <div className="quantum-teleportation-demo">
      <h2>Quantum Teleportation for Beginners</h2>
      <div id="drawing"></div>
      <div className="quantum-visualization">
        {renderQubit(step >= 1 ? 'active' : '', "Alice's Qubit")}
        {renderQubit(step >= 2 ? 'entangled' : '', "Alice's Entangled Qubit")}
        {renderQubit(step >= 2 ? 'entangled' : '', "Bob's Qubit")}
      </div>
      <div className="step-description">
        <p>{steps[step]}</p>
      </div>
      <button onClick={handleNextStep} disabled={teleportationComplete}>
        {teleportationComplete ? 'Teleportation Complete!' : 'Next Step'}
      </button>
      <button onClick={runTeleportationTest}>Run Teleportation Test</button>
      {teleportationComplete && (
        <div className="celebration">
          🎉 Congratulations! You&apos;ve just witnessed quantum teleportation! 🎉
        </div>
      )}
    </div>
  );
};

export default QuantumTeleportationDemo;