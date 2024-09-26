import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { generateQuestions, validateGame } from './utils/game.js';
import { Tooltip } from '@mui/material';
import Joyride from 'react-joyride';

function CHSH() {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [status, setStatus] = useState('waiting');
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    setRunTour(true);
  }, []);

  const steps = [
    {
      target: '.winning-criteria',
      content: 'First, read the winning criteria to understand the game rules.',
      placement: 'top',
    },
    {
      target: '.referee',
      content: 'Click on the referee to generate questions for players A and B.',
      placement: 'left',
    },
    {
      target: '.player-a',
      content: 'Click on player A to generate their answer.',
      placement: 'right',
    },
    {
      target: '.player-b',
      content: 'Click on player B to generate their answer.',
      placement: 'right',
    },
    {
      target: '.check-result',
      content: 'Finally, click here to check the result of the game.',
      placement: 'top',
    },
  ];

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

  const resetGame = () => {
    setA(null);
    setB(null);
    setX(null);
    setY(null);
    setStatus('waiting');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: 'auto', textAlign: 'center' }}>
      <Joyride
        continuous
        run={runTour}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />  

      <Typography variant="h4" gutterBottom>
        CHSH Game: {status}
      </Typography>

      <svg width="700" height="400" viewBox="0 0 700 400">
        <rect width="700" height="400" fill="white" />

        {/* Player A */}
        <Tooltip title="Click to set player A's answer" placement="right">
          <circle 
            className="player-a"
            cx="100" cy="100" r="40" 
            fill={a === null ? 'lightgray' : (a === 1 ? 'blue' : 'red')}
            onClick={handleA}
            style={{cursor: x !== null ? 'pointer' : 'default'}}
          />
        </Tooltip>
        <text x="100" y="105" textAnchor="middle" fill="white" fontSize="20">A</text>
        {a !== null && (
          <text x="160" y="105" textAnchor="start" fill="black" fontSize="16">a = {a}</text>
        )}

        {/* Player B */}
        <Tooltip title="Click to set player B's answer" placement="right">
          <circle 
            className="player-b"
            cx="100" cy="300" r="40" 
            fill={b === null ? 'lightgray' : (b === 1 ? 'blue' : 'red')}
            onClick={handleB}
            style={{cursor: y !== null ? 'pointer' : 'default'}}
          />
        </Tooltip>
        <text x="100" y="305" textAnchor="middle" fill="white" fontSize="20">B</text>
        {b !== null && (
          <text x="160" y="305" textAnchor="start" fill="black" fontSize="16">b = {b}</text>
        )}

        {/* Referee */}
        <Tooltip title="Click to generate questions" placement="left">
          <circle 
            className="referee"
            cx="600" cy="200" r="40" 
            fill="green" 
            onClick={generateQuestion}
            style={{cursor: 'pointer'}}
          />
        </Tooltip>
        <text x="600" y="205" textAnchor="middle" fill="white" fontSize="20">R</text>

        {/* Arrows and labels */}
        {x !== null && (
          <>
            <path d="M 560 190 L 140 100" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="350" y="130" textAnchor="middle" fill="black" fontSize="16">x = {x}</text>
          </>
        )}
        {y !== null && (
          <>
            <path d="M 560 210 L 140 300" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="350" y="270" textAnchor="middle" fill="black" fontSize="16">y = {y}</text>
          </>
        )}
        {a !== null && (
          <path d="M 140 100 L 560 190" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
        )}
        {b !== null && (
          <path d="M 140 300 L 560 210" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
        )}

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" />
          </marker>
        </defs>
      </svg>

      <Box sx={{ mt: 2 }}>
        <Tooltip title="Check the result of the game" placement="top">
          <span>
            <Button 
              className="check-result"
              variant="contained" 
              color="success" 
              onClick={checkResult} 
              disabled={a === null || b === null}
              sx={{ mr: 2 }}
            >
              Check Result
            </Button>
          </span>
        </Tooltip>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={resetGame}
        >
          Reset Game
        </Button>
      </Box>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Referee&apos;s Questions: x = {x}, y = {y}
      </Typography>
      <Typography variant="body1">
        Your Choices: a = {a}, b = {b}
      </Typography>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }} className="winning-criteria">
        Winning Criteria
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="CHSH game winning criteria">
          <TableHead>
            <TableRow>
              <TableCell>x</TableCell>
              <TableCell>y</TableCell>
              <TableCell>Winning Condition</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>a = b</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>0</TableCell>
              <TableCell>1</TableCell>
              <TableCell>a = b</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>0</TableCell>
              <TableCell>a = b</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>a ≠ b</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Note: a and b are the answers from players A and B respectively
      </Typography>
    </Box>
  );
}

export default CHSH;
