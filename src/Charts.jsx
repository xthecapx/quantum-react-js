import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { availableStrategies } from './utils/classic-strategy';
import { quantumStrategy } from './utils/quantum-strategy';
import { runGame } from './utils/game';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LineHighlightPlot, LinePlot } from '@mui/x-charts/LineChart';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import './App.css';

function Charts() {
  const [count, setCount] = useState(0);
  const [results, setResults] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState('quantum');

  const mean =
    results.reduce((acc, current) => acc + current.gamesWon, 0) /
    results.length;
  const meanArray = Array(results.length).fill(mean);
  const series = [
    {
      type: 'line',
      yAxisId: 'wins',
      color: 'green',
      label: 'Wins',
      data: results.map((result) => result.gamesWon),
    },
    {
      type: 'line',
      yAxisId: 'mean',
      color: 'red',
      label: 'Mean',
      data: meanArray,
    },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="strategy-select-label">Strategy</InputLabel>
              <Select
                labelId="strategy-select-label"
                id="strategy-select"
                value={selectedStrategy}
                label="Strategy"
                onChange={(e) => setSelectedStrategy(e.target.value)}
              >
                <MenuItem value="quantum">Quantum Strategy</MenuItem>
                <MenuItem value="classicalAZero">Classical A-Zero Strategy</MenuItem>
                <MenuItem value="classicalRandom">Classical Random Strategy</MenuItem>
                <MenuItem value="classicalProbabilistic">Classical Probabilistic Strategy</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <button
              onClick={() => {
                const {
                  classicalAZeroStrategy,
                  classicalRandomStrategy,
                  classicalProbabilisticStrategy,
                } = availableStrategies;
                let strategy;
                switch (selectedStrategy) {
                  case 'classicalAZero':
                    strategy = classicalAZeroStrategy;
                    break;
                  case 'classicalRandom':
                    strategy = classicalRandomStrategy;
                    break;
                  case 'classicalProbabilistic':
                    strategy = classicalProbabilisticStrategy;
                    break;
                  default:
                    strategy = quantumStrategy;
                }
                const { gamesWon } = runGame(1000, strategy);
                setResults((prevResults) => [
                  ...prevResults,
                  { gamesWon, date: new Date() },
                ]);
                setCount((prevCount) => prevCount + 1);
              }}
            >
              New Game {count}
            </button>
          </Grid>
          <Grid>
            <button
              onClick={() => {
                setResults([]);
                setCount(0);
              }}
            >
              Reset Results
            </button>
          </Grid>
        </Grid>
      </Box>
      <ResponsiveChartContainer
        series={series}
        height={400}
        margin={{ top: 10 }}
        xAxis={[
          {
            id: 'date',
            data: results.map((result) => result.date),
            scaleType: 'band',
            valueFormatter: (value) => value.toLocaleDateString(),
          },
        ]}
        yAxis={[
          {
            id: 'wins',
            scaleType: 'linear',
          },
          {
            id: 'mean',
            scaleType: 'linear',
          },
        ]}
      >
        <ChartsAxisHighlight x="line" /> {/* Changed from x="wins" to x="line" */}
        <BarPlot />
        <LinePlot />
        <LineHighlightPlot />
        <ChartsXAxis
          label="date"
          position="bottom"
          axisId="date"
          tickInterval={(value, index) => {
            return index % 30 === 0;
          }}
          tickLabelStyle={{
            fontSize: 10,
          }}
        />
        <ChartsYAxis
          label="% Wins"
          position="left"
          axisId="wins"
          tickLabelStyle={{ fontSize: 10 }}
          sx={{
            [`& .${axisClasses.label}`]: {
              transform: 'translateX(-5px)',
            },
          }}
        />
        <ChartsYAxis
          label="Mean"
          position="right"
          axisId="mean"
          tickLabelStyle={{ fontSize: 10 }}
        />
        <ChartsTooltip />
      </ResponsiveChartContainer>
      <div className="card">
        <button
          onClick={() => {
            const {
              classicalAZeroStrategy,
              classicalRandomStrategy,
              classicalProbabilisticStrategy,
            } = availableStrategies;
            const { totalScore, gamesWon } = runGame(
              1000,
              quantumStrategy
            );
            setResults((result) => {
              return [...result, { gamesWon, date: new Date() }];
            });
            setCount((count) => count + 1);
          }}
        >
          New Game {count}
        </button>
      </div>
    </>
  );
}

export default Charts;
