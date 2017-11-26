<template>
  <div class="container">
    <project-name v-bind:project-name="projectName" v-model="projectName"/>
    <section class="project-variables">
      <form v-on:submit.prevent>
        <h4 @click="swapVariable">
          <span v-if="variables.variableType === 'input'">Input</span>
          <span v-if="variables.variableType === 'output'">Output</span> 
          variables (click)
        </h4>
        <label for="variableName">Name:</label>
        <input type="text" id="fuzzyAreaName" v-model="variables.newVariable.name">
        <label for="variableNumberOfFuzzyAreas">Number of fuzzyAreas:</label>
        <input type="text" id="variableNumberOfFuzzyAreas" v-model="variables.newVariable.numberOfFuzzyAreas">
        <br>
        <label for="fuzzyAreaRangeStart">Range:</label>
        <input type="number" step="any" id="fuzzyAreaRangeStart" v-model="variables.newVariable.start">
        <label for="fuzzyAreaRangeEnd">Range:</label>
        <input type="number" step="any" id="fuzzyAreaRangeEnd" v-model="variables.newVariable.end">
        <button @click="addVariable">Add variable</button>
      </form>

      <ul class="input-variables">
        <h4>Input variables: </h4>
        <li v-for="input in variables.inputs" :key="input.name">
          <p>{{input.name}} goes from <strong>{{input.start}} to {{input.end}}</strong></p>
          <p>Has fuzzyAreas: <span v-for="fuzzyArea in input.fuzzyAreas" :key="fuzzyArea.name">{{fuzzyArea.name}}, </span></p>
          <section class="add-fuzzyArea" v-if="input.numberOfFuzzyAreas > input.fuzzyAreas.length">
            <h5>Add new input variable fuzzyArea:</h5>
            <form v-on:submit.prevent>
              <label for="fuzzyAreaName">Name:</label>
              <input type="text" id="fuzzyAreaName" v-model="fuzzyAreas.newFuzzyArea.name">
              <br>
              <label for="fuzzyAreaType">Type:</label>
              <select id="fuzzyAreaType" v-model="fuzzyAreas.newFuzzyArea.type">
                <option v-for="fuzzyArea in fuzzyAreas.types" v-bind:value="fuzzyArea" :key="fuzzyArea.name">{{fuzzyArea.name}}</option> 
              </select>
              <label for="fuzzyAreaValue">Value:</label>
              <span v-for="(range, index) in fuzzyAreas.newFuzzyArea.type.ranges" :key="index"> 
                <input v-model="fuzzyAreas.newFuzzyArea.type.ranges[index]" type="number" step="any" id="fuzzyAreaValue">
              </span>
              <button @click="addFuzzyArea(input)">Add FuzzyArea</button>
            </form>
          </section>
        </li>
      </ul>
      <ul class="output-variables">
        <h4>Output variables: </h4>
        <li v-for="output in variables.outputs" :key="output.name">
          <p>{{output.name}} goes from <strong>{{output.start}} to {{output.end}}</strong></p>
          <p>Has fuzzyAreas: <span v-for="fuzzyArea in output.fuzzyAreas" :key="fuzzyArea.name">{{fuzzyArea.name}} </span></p>
          <section class="add-fuzzyArea" v-if="output.numberOfFuzzyAreas > output.fuzzyAreas.length">
            <h5>Add new output variable fuzzyArea:</h5>
            <form v-on:submit.prevent>
              <label for="fuzzyAreaName">Name:</label>
              <input type="text" id="fuzzyAreaName" v-model="fuzzyAreas.newFuzzyArea.name">
              <label for="fuzzyAreaType">Type:</label>
              <select id="fuzzyAreaType" v-model="fuzzyAreas.newFuzzyArea.type">
                <option v-for="fuzzyArea in fuzzyAreas.types" v-bind:value="fuzzyArea" :key="fuzzyArea.name">{{fuzzyArea.name}}</option> 
              </select>
              <label for="fuzzyAreaValue">Value:</label>
              <div v-for="(range, index) in fuzzyAreas.newFuzzyArea.type.ranges" :key="index">
                <input v-model="fuzzyAreas.newFuzzyArea.type.ranges[index]" type="number" step="any" id="fuzzyAreaValue">
              </div>
              <button @click="addFuzzyArea(output)">Add FuzzyArea</button>
            </form>
          </section>
        </li>
      </ul>
    </section>
    
    <section id="examples-data">
      <h2><strong>Provide example for your variables: </strong></h2>
      <form v-on:submit.prevent>
        <div v-for="input in variables.inputs" class="variable-data" :key="input.name">
          <label for="example-value">{{input.name}}</label>
          <input type="number" step="any" id="example-value" v-model="input.example">
          <span class="contain-level" v-for="fuzzyArea in input.fuzzyAreas" :key="fuzzyArea.name">{{fuzzyArea.type.value(fuzzyArea.type.ranges, input.example)}}</span>
        </div>
      </form>
    </section>

    <section id="rules" v-if="variables.inputs.length">
      <form v-on:submit.prevent>
          <span>Compose your new fuzzyArea: </span>
          <span v-for="(input, index) in variables.inputs" :key="index">
            <select v-model="rules.newRule.fuzzyAreas[index]">
              <option v-for="(fuzzyArea, indexFuzzyArea) in input.fuzzyAreas" :key="indexFuzzyArea" v-bind:value="fuzzyArea">
                {{fuzzyArea.name}}
              </option>
            </select>
            <span id="norm">{{rules.newRule.type}}</span>
          </span>
        <button @click="createRule">Add new rule</button>
      </form>

    </section>

  </div>
</template>

<script>

export default {
  name: 'MainPage',
  data() {
    return {
      projectName: 'My new project',
      variables: {
        variableType: 'input',
        newVariable: {
          name: '',
          start: 0,
          end: 0,
          numberOfFuzzyAreas: 1,
          fuzzyAreas: [],
          example: 0,
        },
        inputs: [],
        outputs: [],
      },
      fuzzyAreas: {
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
      },
      rules: {
        data: [],
        newRule: {
          name: 'name',
          type: 'AND',
          fuzzyAreas: [],
        },
      },
      chartData: {
        labels: [0, 30, 50],
        datasets: [{
          label: 'MF',
          backgroundColor: '#f87979',
          data: [1, 0.5, 0.2],
        }],
      },
    };
  },
  methods: {
    createRule() {
      this.rules = {
        ...this.rules,
        data: [
          ...this.rules.data,
          {
            ...this.rules.newRule,
            fuzzyAreas: [...this.rules.newRule.fuzzyAreas],
          },
        ],
      };
    },
    addFuzzyArea(input) {
      input.fuzzyAreas.push({
        ...this.fuzzyAreas.newFuzzyArea,
        type: {
          ...this.fuzzyAreas.newFuzzyArea.type,
          ranges: [...this.fuzzyAreas.newFuzzyArea.type.ranges],
        },
      });
    },
    addVariable() {
      if (this.variables.variableType === 'input') {
        this.variables.inputs = [
          ...this.variables.inputs,
          { ...this.variables.newVariable, fuzzyAreas: [] },
        ];
      } else {
        this.variables.outputs = [
          { ...this.variables.newVariable, fuzzyAreas: [] },
        ];
      }
    },
    swapVariable() {
      if (this.variables.variableType === 'input') {
        this.variables.variableType = 'output';
      } else {
        this.variables.variableType = 'input';
      }
    },
  },
};

/*
Input/Output 
*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}

span {
  padding: 10px;
}
</style>
