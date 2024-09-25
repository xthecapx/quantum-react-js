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

import './App.css';

function Charts() {
  const [count, setCount] = useState(0);
  const [results, setResults] = useState([]);
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid
            size="auto"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <a href="https://react.dev" target="_blank">
              <img
                src={reactLogo}
                className="logo react logo-spin"
                alt="React logo"
              />
            </a>
          </Grid>
          <Grid
            size="grow"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <h1>Quantum CHSH game</h1>
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
        <ChartsAxisHighlight x="wins" />
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
