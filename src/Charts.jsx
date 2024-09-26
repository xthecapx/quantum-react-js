import { useState } from 'react';
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

const strategyMap = {
  quantum: quantumStrategy,
  classicalZero: availableStrategies.classicalZeroStrategy,
  classicalAZero: availableStrategies.classicalAZeroStrategy,
  classicalANotB: availableStrategies.classicalANotBStrategy,
  classicalProbabilistic: availableStrategies.classicalProbabilisticStrategy,
  classicalRandom: availableStrategies.classicalRandomStrategy,
};

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
    <Box sx={{ flexGrow: 1, marginBottom: 2, display: 'flex', alignItems: 'top', flexDirection: 'column', height: '506px' }}>
      <Grid container spacing={2}>
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
              <MenuItem value="classicalZero">Classical Zero Strategy</MenuItem>
              <MenuItem value="classicalAZero">Classical A-Zero Strategy</MenuItem>
              <MenuItem value="classicalANotB">Classical A-Not-B Strategy</MenuItem>
              <MenuItem value="classicalProbabilistic">Classical Probabilistic Strategy</MenuItem>
              <MenuItem value="classicalRandom">Classical Random Strategy</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid>
          <button
            onClick={() => {
              const strategy = strategyMap[selectedStrategy];
              const { gamesWon } = runGame(1000, strategy);
              setResults((prevResults) => [
                ...prevResults,
                { gamesWon },
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
      {results.length > 0 && meanArray.length > 0 && (
      <ResponsiveChartContainer
        series={series}
        height={450}
        xAxis={[
          {
            id: 'point',
            data: Array.from({ length: results.length }, (_, i) => i),
            scaleType: 'linear',
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
        <ChartsAxisHighlight x="line" />
        <BarPlot />
        <LinePlot />
        <LineHighlightPlot />
        <ChartsXAxis
          label="Game Number"
          position="bottom"
          axisId="point"
          tickInterval={(_, index) => index % 100 === 0}
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
    )}
    </Box>
  );
}

export default Charts;
