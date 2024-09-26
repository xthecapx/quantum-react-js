import { useState, useCallback, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { createQuantumTeleportationCircuit } from "../utils/quantum-teleportation";

export const initialAngles = {
  theta:(Math.random() * 2 * Math.PI).toFixed(2),
  phi:(Math.random() * 2 * Math.PI).toFixed(2),
  lambda:(Math.random() * 2 * Math.PI).toFixed(2)
};

export const useQuantumTeleportation = () => {
  const [circuit, setCircuit] = useState(null);
  const [angles, setAngles] = useState(null);

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
    const u3 = data.u3Gates.map(gate => [gate.theta, gate.phi, gate.lambda]);
    const u3Inverse = u3.map(([theta, phi, lambda]) => [-theta, -lambda, -phi]);

    const newCircuit = createQuantumTeleportationCircuit((circuit) => {
      u3.forEach(params => {
        circuit.appendGate('u3', 0, { params });
      });
    });

    u3Inverse.reverse().forEach(params => {
      newCircuit.appendGate('u3', 2, { params });
    });

    newCircuit.addMeasure(2, 'c2', 2);

    setCircuit(newCircuit);
    setAngles({ u3, u3Inverse });
  }, [setCircuit, setAngles]);

  const onSubmit = (data) => {
    updateCircuit(data);
  };

  useEffect(() => {
    updateCircuit(getValues());
  }, [updateCircuit, getValues]);

  return { circuit, angles, fields, append, remove, register, handleSubmit, onSubmit };
};
