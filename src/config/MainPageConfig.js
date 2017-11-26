
const variables = {
  variableType: 'input',
  newVariable: {
    name: '',
    start: 0,
    end: 0,
    fuzzyAreasCount: 1,
    fuzzyAreas: [],
    example: 0,
  },
  inputs: [],
  outputs: [],
};

const fuzzyAreas = {
  newFuzzyArea: {
    name: 'Name',
    type: {},
  },
  types: {
    triangle: {
      name: 'Triangle',
      ranges: [0, 0, 0],
      value: (rangesParam, valueParam) => {
        const ranges = rangesParam.map(range => parseInt(range, 10));
        const value = parseInt(valueParam, 10);
        if (value < ranges[0] || value > ranges[2]) return 0;
        if (value < ranges[1]) return (value - ranges[0]) / (ranges[1] - ranges[0]);
        return (ranges[2] - value) / (ranges[2] - ranges[1]);
      },
    },
    trapezoid: {
      name: 'Trapezoid',
      ranges: [0, 0, 0, 0],
      value: (rangesParam, valueParam) => {
        const ranges = rangesParam.map(range => parseInt(range, 10));
        const value = parseInt(valueParam, 10);
        if (value < ranges[0] || value > ranges[3]) return 0;
        if (value < ranges[1]) return (value - ranges[0]) / (ranges[1] - ranges[0]);
        else if (value < ranges[2]) return 1;
        return (ranges[3] - value) / (ranges[3] - ranges[2]);
      },
    },
  },
};

const rules = {
  data: [],
  newRule: {
    name: 'name',
    type: 'AND',
    fuzzyAreas: {
      inputs: [],
      output: {
        value: 0,
      },
    },
  },
};

const config = {
  projectName: 'My new project',
  variables,
  fuzzyAreas,
  rules,
  chartData: {
    labels: [0, 30, 50],
    datasets: [{
      label: 'MF',
      backgroundColor: '#f87979',
      data: [1, 0.5, 0.2],
    }],
  },
};

export default config;
