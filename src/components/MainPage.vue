<template>
  <div class="container">

    <section class="project-data">
      <label for="project-name">Enter name of your project:</label>
      <input type="text" id="project-name" v-model="projectName">
      <br>
      <h2><strong>{{ projectName }}</strong></h2>
    </section>

    <section class="project-variables">
      <form v-on:submit.prevent>
        <h4 @click="swapVariable">
          <span v-if="variableType === 'input'">Input</span>
          <span v-if="variableType === 'output'">Output</span> 
          variables (click)
        </h4>
        <label for="variableName">Name:</label>
        <input type="text" id="ruleName" v-model="newVariableData.name">
        <label for="variableNumberOfRules">Number of rules:</label>
        <input type="text" id="variableNumberOfRules" v-model="newVariableData.numberOfRules">
        <br>
        <label for="ruleRangeStart">Range:</label>
        <input type="number" step="any" id="ruleRangeStart" v-model="newVariableData.start">
        <label for="ruleRangeEnd">Range:</label>
        <input type="number" step="any" id="ruleRangeEnd" v-model="newVariableData.end">
        <button @click="addInput">Add Rule</button>
      </form>

      <section style="display: none" class="add-rule">
        <h5>Add new input variable rule:</h5>
        <form v-on:submit.prevent>
          <label for="ruleName">Name:</label>
          <input type="text" id="ruleName" v-model="newRuleData.name">
          <label for="ruleValue">Value:</label>
          <input type="number" step="any" id="ruleValue" v-model="newRuleData.value">
          <button @click="addRule">Add Rule</button>
        </form>
        <br>
      </section>

      <ul class="input-variables">
        <h4>Input variables: </h4>
        <li v-for="input in inputs">
          <p>{{input.name}} goes from <strong>{{input.start}} to {{input.end}}</strong></p>
        </li>
      </ul>
      <ul class="output-variables">
        <h4>Output variables: </h4>
        <li v-for="output in outputs">
          <p>{{output.name}} goes from <strong>{{output.start}} to {{output.end}}</strong></p>
        </li>
      </ul>
    </section>
    
    <section>
      <h2><strong>Provide example for your variables: </strong></h2>
      <form v-on:submit.prevent>
        <div v-for="input in inputs" class="variable-data">
          <p>{{input.name}}</p>
          <input type="text" id="rule-name" v-model="newRuleData.name">
          <input type="text" id="rule-type" v-model="newRuleData.type">
          <br>
          <input type="number" step="any" id="rule-data-1" v-model="newRuleData.data[0]">
          <input type="number" step="any" id="rule-data-2" v-model="newRuleData.data[1]">
          <input type="number" step="any" id="rule-data-2" v-model="newRuleData.data[2]">
          <button @click="addData(input)">Add data</button>
        </div>
      </form>
    </section>
    
    <section style="display: none" class="add-rule">
      <h5>Add new input variable rule:</h5>
      <form v-on:submit.prevent>
        <label for="ruleName">Name:</label>
        <input type="text" id="ruleName" v-model="newRuleData.name">
        <label for="ruleValue">Value:</label>
        <input type="number" step="any" id="ruleValue" v-model="newRuleData.value">
        <button @click="addRule">Add Rule</button>
      </form>
      <br>
    </section>
    <bar-chart 
      :chart-data="chartData"
    >
    </bar-chart>

    <router-link to="/chart">Show chart fullscreen </router-link>
  </div>
</template>

<script>

export default {
  name: 'MainPage',
  data() {
    return {
      projectName: 'My new project',
      exampleData: {
        values: [],
      },
      newRuleData: {
        name: 'Name',
        type: 'Type',
        data: [0, 0, 0],
      },
      newVariableData: {
        name: '',
        start: 0,
        end: 0,
        numberOfRules: 1,
        rules: [],
      },
      variableType: 'input',
      inputs: [],
      outputs: [],
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
    addRule: function createRule() {
      this.chartData = {
        labels: [...this.chartData.labels, this.newRuleData.name],
        datasets: [{
          ...this.chartData.datasets[0],
          data: [...this.chartData.datasets[0].data, this.newRuleData.value],
        }],
      };
    },
    addInput: function createInput() {
      if (this.variableType === 'input') {
        this.inputs = [
          ...this.inputs,
          { ...this.newVariableData },
        ];
      } else {
        this.outputs = [
          ...this.outputs,
          { ...this.newVariableData },
        ];
      }
    },
    swapVariable: function changeVariable() {
      if (this.variableType === 'input') {
        this.variableType = 'output';
      } else {
        this.variableType = 'input';
      }
    },
    addData: function addNewData(req) {
      console.log(req);
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
</style>
