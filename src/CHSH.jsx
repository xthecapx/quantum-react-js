import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { generateQuestions, validateGame } from './utils/game.js';

function CHSH() {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [status, setStatus] = useState('waiting');

  const handleA = (value) => {
    setA(value);
  };

  const handleB = (value) => {
    setB(value);
  };

  console.log(a === null, b === null, x === null, y === null);

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" gutterBottom>
            CHSH Game: {status}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6">
            Referee's Question: x = {x}, y = {y}
          </Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography variant="h6">Choose a:</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleA(0)}
          >
            0
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleA(1)}
          >
            1
          </Button>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography variant="h6">Choose b:</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleB(0)}
          >
            0
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleB(1)}
          >
            1
          </Button>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6">
            Your Choices: a = {a}, b = {b}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid size="grow">
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              const [x, y] = generateQuestions();

              setX(x);
              setY(y);
            }}
          >
            Referee
          </Button>
        </Grid>
        <Grid size="grow">
          <Button
            variant="contained"
            color="success"
            disabled={a === null || b === null || x === null || y === null}
            onClick={() => {
              const gameResult = validateGame(a, b, x, y);

              if (gameResult === 1) {
                setStatus('You win');
              } else {
                setStatus('You lose');
              }
            }}
          >
            Let's play
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default CHSH;
