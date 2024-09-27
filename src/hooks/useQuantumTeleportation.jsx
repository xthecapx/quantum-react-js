import QuantumCircuit from 'quantum-circuit';
import { useState, useCallback, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { AlliceObservation, AlliceSendMessage, AliceAndBobEntanglement, RandomAllicePayload, BobVerification, BobReceiveMessage } from "../utils/quantum-teleportation";

export const initialAngles = {
  theta: (Math.random() * 2 * Math.PI).toFixed(2),
  phi: (Math.random() * 2 * Math.PI).toFixed(2),
  lambda: (Math.random() * 2 * Math.PI).toFixed(2)
};

export const useQuantumTeleportation = () => {
  const [circuit, setCircuit] = useState(null);
  const [repetitions, setRepetitions] = useState(1);
  const [results, setResults] = useState([]);

  const { register, control, handleSubmit, getValues } = useForm({
    defaultValues: {
      u3Gates: [{ theta: initialAngles.theta, phi: initialAngles.phi, lambda: initialAngles.lambda }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "u3Gates"
  });

  const updateCircuit = useCallback((data) => {
    const circuit = new QuantumCircuit(3);

    // Alice's circuit
    const entanglement = AliceAndBobEntanglement(circuit);
    const payload = RandomAllicePayload(entanglement, data.u3Gates);
    const message = AlliceSendMessage(payload);
    const observation = AlliceObservation(message);

    // Bob's circuit
    const BobDecodeMessageCircuit = BobReceiveMessage(observation)
    const BobVerificationCircuit = BobVerification(BobDecodeMessageCircuit, data.u3Gates);

    setCircuit(BobVerificationCircuit);
  }, [setCircuit]);

  const runTeleportation = () => {
    if (!circuit) return;
    const newResults = [];
    for (let i = 0; i < repetitions; i++) {
      circuit.run();
      newResults.push({
        id: i + 1,
        probabilities: circuit.probabilities(),
        cregsAsString: circuit.cregsAsString(),
        confirmation: circuit.getCregBit('confirmation', 2),
        wire0: circuit.getCregBit('wire0', 0),
        wire1: circuit.getCregBit('wire1', 1),
        circuitPrint: circuit.stateAsString(true)
      });
    }
    setResults(newResults);
  };

  const onSubmit = (data) => {
    updateCircuit(data);
  };

  useEffect(() => {
    updateCircuit(getValues());
  }, [updateCircuit, getValues]);

  return { circuit, fields, append, results, repetitions, setRepetitions, runTeleportation, remove, register, handleSubmit, onSubmit };
};
