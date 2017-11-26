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
        <input type="text" id="ruleName" v-model="variables.newVariableData.name">
        <label for="variableNumberOfRules">Number of rules:</label>
        <input type="text" id="variableNumberOfRules" v-model="variables.newVariableData.numberOfRules">
        <br>
        <label for="ruleRangeStart">Range:</label>
        <input type="number" step="any" id="ruleRangeStart" v-model="variables.newVariableData.start">
        <label for="ruleRangeEnd">Range:</label>
        <input type="number" step="any" id="ruleRangeEnd" v-model="variables.newVariableData.end">
        <button @click="addVariable">Add variable</button>
      </form>

      <ul class="input-variables">
        <h4>Input variables: </h4>
        <li v-for="input in variables.inputs" :key="input.name">
          <p>{{input.name}} goes from <strong>{{input.start}} to {{input.end}}</strong></p>
          <p>Has rules: <span v-for="rule in input.rules" :key="rule.name">{{rule.name}}, </span></p>
          <section class="add-rule" v-if="input.numberOfRules > input.rules.length">
            <h5>Add new input variable rule:</h5>
            <form v-on:submit.prevent>
              <label for="ruleName">Name:</label>
              <input type="text" id="ruleName" v-model="rules.newRuleData.name">
              <label for="ruleType">Type:</label>
              <select id="ruleType" v-model="rules.newRuleData.type">
                <option v-for="rule in rules.types" v-bind:value="rule" :key="rule.name">{{rule.name}}</option> 
              </select>
              <label for="ruleValue">Value:</label>
              <div v-for="(range, index) in rules.newRuleData.type.ranges" :key="index"> 
                <input v-model="rules.newRuleData.type.ranges[index]" type="number" step="any" id="ruleValue">
              </div>
              <button @click="addRule(input)">Add Rule</button>
            </form>
          </section>
        </li>
      </ul>
      <ul class="output-variables">
        <h4>Output variables: </h4>
        <li v-for="output in outputs" :key="output.name">
          <p>{{output.name}} goes from <strong>{{output.start}} to {{output.end}}</strong></p>
          <p>Has rules: <span v-for="rule in output.rules" :key="rule.name">{{rule.name}} </span></p>
          <section class="add-rule" v-if="output.numberOfRules > output.rules.length">
            <h5>Add new output variable rule:</h5>
            <form v-on:submit.prevent>
              <label for="ruleName">Name:</label>
              <input type="text" id="ruleName" v-model="rules.newRuleData.name">
              <label for="ruleType">Type:</label>
              <select id="ruleType" v-model="rules.newRuleData.type">
                <option v-for="rule in rules.types" v-bind:value="rule" :key="rule.name">{{rule.name}}</option> 
              </select>
              <label for="ruleValue">Value:</label>
              <div v-for="(range, index) in rules.newRuleData.type.ranges" :key="index">
                <input v-model="rules.newRuleData.type.ranges[index]" type="number" step="any" id="ruleValue">
              </div>
              <button @click="addRule(output)">Add Rule</button>
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
          <span class="contain-level" v-for="rule in input.rules" :key="rule.name">{{rule.type.value(rule.type.ranges, input.example)}}</span>
        </div>
      </form>
    </section>

    <section id="connections" v-if="variables.inputs.length">
      <form v-on:submit.prevent>
          <span>Compose your new rule: </span>
          <span v-for="(input, index) in variables.inputs" :key="index">
            <select v-model="newConnectionData.rules[index]">
              <option v-for="(rule, indexRule) in input.rules" :key="indexRule" v-bind:value="rule">
                {{rule.name}}
              </option>
            </select>
            <span id="norm">{{newConnectionData.type}}</span>
          </span>
        <button @click="createConnection">Add new connection</button>
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
        newVariableData: {
          name: '',
          start: 0,
          end: 0,
          numberOfRules: 1,
          rules: [],
          example: 0,
        },
        inputs: [],
        outputs: [],
      },
      rules: {
        newRuleData: {
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
      // connections: {
      // },
      newConnectionData: {
        name: 'name',
        type: 'AND',
        rules: [],
      },
      inputs: [],
      outputs: [],
      connections: {
        data: [],
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
    createConnection() {
      this.connections = {
        ...this.connections,
        data: [
          ...this.connections.data,
          {
            ...this.newConnectionData,
            rules: [...this.newConnectionData.rules],
          },
        ],
      };
    },
    addRule(input) {
      input.rules.push({
        ...this.rules.newRuleData,
        type: {
          ...this.rules.newRuleData.type,
          ranges: [...this.rules.newRuleData.type.ranges],
        },
      });
    },
    addVariable() {
      if (this.variables.variableType === 'input') {
        this.variables.inputs = [
          ...this.variables.inputs,
          { ...this.variables.newVariableData, rules: [] },
        ];
      } else {
        this.variables.outputs = [
          { ...this.variables.newVariableData, rules: [] },
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
