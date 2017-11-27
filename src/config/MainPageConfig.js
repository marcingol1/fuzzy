
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

const exampleVariables = {
  ...variables,
  variableType: 'input',
  newVariable: {
    name: '',
    start: 0,
    end: 0,
    fuzzyAreasCount: 1,
    fuzzyAreas: [],
    example: 0,
  },
  inputs: [
    {
      name: 'Temperature',
      start: -20,
      end: 40,
      fuzzyAreasCount: 4,
      example: 22,
      fuzzyAreas: [
        {
          name: 'Freezing',
          type: {
            name: 'Triangle',
            ranges: [-20, -10, 0],
            value: fuzzyAreas.types.triangle.value,
          },
        },
        {
          name: 'Breeze',
          type: {
            name: 'Triangle',
            ranges: [-5, 5, 23],
            value: fuzzyAreas.types.triangle.value,
          },
        },
        {
          name: 'Warm',
          type: {
            name: 'Trapezoid',
            ranges: [10, 15, 20, 25],
            value: fuzzyAreas.types.trapezoid.value,
          },
        },
        {
          name: 'Hot',
          type: {
            name: 'Triangle',
            ranges: [20, 30, 40],
            value: fuzzyAreas.types.triangle.value,
          },
        },
      ],
    },
    {
      name: 'Humidity',
      start: 0,
      end: 100,
      fuzzyAreasCount: 4,
      example: 45,
      fuzzyAreas: [
        {
          name: 'Only air',
          type: {
            name: 'Triangle',
            ranges: [0, 25, 35],
            value: fuzzyAreas.types.triangle.value,
          },
        },
        {
          name: 'Airy',
          type: {
            name: 'Triangle',
            ranges: [20, 35, 55],
            value: fuzzyAreas.types.triangle.value,
          },
        },
        {
          name: 'Comfort',
          type: {
            name: 'Trapezoid',
            ranges: [20, 60, 70, 75],
            value: fuzzyAreas.types.trapezoid.value,
          },
        },
        {
          name: 'Humid',
          type: {
            name: 'Triangle',
            ranges: [40, 90, 100],
            value: fuzzyAreas.types.triangle.value,
          },
        },
      ],
    },
  ],
  outputs: [
    {
      name: 'Watering',
      start: 0,
      end: 100,
      fuzzyAreasCount: 4,
      fuzzyAreas: [
        {
          name: 'No watering',
          type: {
            name: 'Triangle',
            ranges: [0, 50, 60],
            value: fuzzyAreas.types.triangle.value,
          },
        },
        {
          name: 'Sprinkle',
          type: {
            name: 'Triangle',
            ranges: [30, 70, 80],
            value: fuzzyAreas.types.triangle.value,
          },
        },
        {
          name: 'Tiny watering',
          type: {
            name: 'Trapezoid',
            ranges: [30, 40, 70, 80],
            value: fuzzyAreas.types.trapezoid.value,
          },
        },
        {
          name: 'Huge watering',
          type: {
            name: 'Triangle',
            ranges: [50, 90, 100],
            value: fuzzyAreas.types.triangle.value,
          },
        },
      ],
    },
  ],
};

const config = {
  projectName: 'My new project',
  variables: exampleVariables,
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
