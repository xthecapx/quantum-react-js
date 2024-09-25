import { useState, useCallback } from 'react';
import { availableStrategies } from './utils/classic-strategy';
import { quantumStrategy } from './utils/quantum-strategy';
import { runGame } from './utils/game';
import { LineHighlightPlot, LinePlot } from '@mui/x-charts/LineChart';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const strategies = {
  quantum: quantumStrategy,
  ...availableStrategies
};

function ComparisonChart() {
  const [results, setResults] = useState({});
  const [gameCount, setGameCount] = useState(100);
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = useCallback(() => {
    setIsRunning(true);
    const newResults = Object.fromEntries(
      Object.keys(strategies).map(name => [name, []])
    );

    let currentGame = 0;
    const batchSize = 10; // Define batch size

    const runNextBatch = () => {
      const endGame = Math.min(currentGame + batchSize, gameCount);
      for (; currentGame < endGame; currentGame++) {
        Object.entries(strategies).forEach(([name, strategy]) => {
          const gameResult = runGame(1000, strategy).gamesWon;
          newResults[name].push(gameResult);
        });
      }

      setResults({ ...newResults });

      if (currentGame < gameCount) {
        setTimeout(runNextBatch, 0); // Schedule next batch
      } else {
        setIsRunning(false);
      }
    };

    runNextBatch();
  }, [gameCount]);

  const series = Object.entries(results).map(([name, games]) => ({
    type: 'line',
    label: name,
    data: games,
  }));

  return (
    <Box sx={{ width: '100%', height: 500 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          type="number"
          label="Number of Games"
          value={gameCount}
          onChange={(e) => setGameCount(Number(e.target.value))}
          sx={{ mr: 2 }}
          disabled={isRunning}
        />
        <Button onClick={runSimulation} variant="contained" disabled={isRunning}>
          {isRunning ? 'Running...' : 'Run Simulation'}
        </Button>
      </Box>
      {series.length > 0 ? (
        <ResponsiveChartContainer
          series={series}
          xAxis={[{ data: Array(gameCount).fill().map((_, i) => i + 1), scaleType: 'linear' }]}
          yAxis={[
            {
              id: 'wins',
              scaleType: 'linear',
              valueFormatter: (value) => Math.round(value),
            },
          ]}
        >
          <LinePlot />
          <LineHighlightPlot />
          <ChartsAxisHighlight x="line" />
          <ChartsXAxis label="Game Number" />
          <ChartsYAxis
            label="Wins (out of 1000)"
            position="left"
            axisId="wins"
            tickLabelStyle={{ fontSize: 10 }}
            sx={{
              [`& .${axisClasses.label}`]: {
                transform: 'translateX(-5px)',
              },
            }}
          />
          <ChartsTooltip />
        </ResponsiveChartContainer>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          Click "Run Simulation" to generate the chart
        </Box>
      )}
    </Box>
  );
}

export default ComparisonChart;