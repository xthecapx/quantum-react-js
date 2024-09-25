import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { generateQuestions, validateGame } from './utils/game.js';

function CHSH() {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [status, setStatus] = useState('waiting');

  const handleA = () => {
    if (x !== null) setA(a === 1 ? 0 : 1);
  };

  const handleB = () => {
    if (y !== null) setB(b === 1 ? 0 : 1);
  };

  const generateQuestion = () => {
    const [newX, newY] = generateQuestions();
    setX(newX);
    setY(newY);
    setA(null);
    setB(null);
    setStatus('Question generated');
  };

  const checkResult = () => {
    const gameResult = validateGame(a, b, x, y);
    setStatus(gameResult === 1 ? 'You win!' : 'You lose!');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        CHSH Game: {status}
      </Typography>

      <svg width="400" height="200" viewBox="0 0 400 200">
        <rect width="400" height="200" fill="white" />

        {/* Player A */}
        <circle 
          cx="100" cy="100" r="30" 
          fill={a === null ? 'lightgray' : (a === 1 ? 'blue' : 'red')}
          onClick={handleA}
          style={{cursor: x !== null ? 'pointer' : 'default'}}
        />
        <text x="100" y="105" textAnchor="middle" fill="white">A</text>

        {/* Player B */}
        <circle 
          cx="100" cy="180" r="30" 
          fill={b === null ? 'lightgray' : (b === 1 ? 'blue' : 'red')}
          onClick={handleB}
          style={{cursor: y !== null ? 'pointer' : 'default'}}
        />
        <text x="100" y="185" textAnchor="middle" fill="white">B</text>

        {/* Referee */}
        <circle 
          cx="300" cy="140" r="30" 
          fill="green" 
          onClick={generateQuestion}
          style={{cursor: 'pointer'}}
        />
        <text x="300" y="145" textAnchor="middle" fill="white">R</text>

        {/* Arrows and labels */}
        {x !== null && (
          <>
            <path d="M 270 130 L 130 100" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="200" y="105" textAnchor="middle" fill="black">x = {x}</text>
          </>
        )}
        {y !== null && (
          <>
            <path d="M 270 150 L 130 180" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="200" y="185" textAnchor="middle" fill="black">y = {y}</text>
          </>
        )}
        {a !== null && (
          <path d="M 130 100 L 270 130" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
        )}
        {b !== null && (
          <path d="M 130 180 L 270 150" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
        )}

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" />
          </marker>
        </defs>
      </svg>

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="success" onClick={checkResult} disabled={a === null || b === null}>
          Check Result
        </Button>
      </Box>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Referee's Questions: x = {x}, y = {y}
      </Typography>
      <Typography variant="body1">
        Your Choices: a = {a}, b = {b}
      </Typography>
    </Box>
  );
}

export default CHSH;
