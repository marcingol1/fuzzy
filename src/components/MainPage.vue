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
        <label for="variable-name">Name:</label>
        <input type="text" id="variable-name" v-model="variables.newVariable.name">
        <label for="variable-fuzzy-areas-count">Number of fuzzyAreas:</label>
        <input type="text" id="variable-fuzzy-areas-count" v-model="variables.newVariable.fuzzyAreasCount">
        <br>
        <label for="fuzzy-area-range-start">Range:</label>
        <input type="number" step="any" id="fuzzy-area-range-start" v-model="variables.newVariable.start">
        <label for="fuzzy-area-range-end">Range:</label>
        <input type="number" step="any" id="fuzzy-area-range-end" v-model="variables.newVariable.end">
        <button @click="addVariable">Add variable</button>
      </form>

      <ul class="input-variables">
        <h4>Input variables: </h4>
        <li v-for="input in variables.inputs" :key="input.name">
          <p>{{input.name}} goes from <strong>{{input.start}} to {{input.end}}</strong></p>
          <p>Has fuzzyAreas: <span v-for="fuzzyArea in input.fuzzyAreas" :key="fuzzyArea.name">{{fuzzyArea.name}}, </span></p>
          <section class="add-fuzzy-area" v-if="input.fuzzyAreasCount > input.fuzzyAreas.length">
            <h5>Add new input variable fuzzyArea:</h5>
            <form v-on:submit.prevent>
              <label for="fuzzy-area-name">Name:</label>
              <input type="text" id="fuzzy-area-name" v-model="fuzzyAreas.newFuzzyArea.name">
              <br>
              <label for="fuzzy-area-type">Type:</label>
              <select id="fuzzy-area-type" v-model="fuzzyAreas.newFuzzyArea.type">
                <option v-for="fuzzyArea in fuzzyAreas.types" v-bind:value="fuzzyArea" :key="fuzzyArea.name">{{fuzzyArea.name}}</option> 
              </select>
              <label for="fuzzy-area-value">Value:</label>
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
          <section class="add-fuzzy-area" v-if="output.fuzzyAreasCount > output.fuzzyAreas.length">
            <h5>Add new output variable fuzzyArea:</h5>
            <form v-on:submit.prevent>
              <label for="fuzzy-area-name">Name:</label>
              <input type="text" id="fuzzy-area-name" v-model="fuzzyAreas.newFuzzyArea.name">
              <label for="fuzzy-area-type">Type:</label>
              <select id="fuzzy-area-type" v-model="fuzzyAreas.newFuzzyArea.type">
                <option v-for="fuzzyArea in fuzzyAreas.types" v-bind:value="fuzzyArea" :key="fuzzyArea.name">{{fuzzyArea.name}}</option> 
              </select>
              <label for="fuzzy-area-value">Value:</label>
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
          <label for="rule-name"></label>
          <input type="text" id="rule-name" v-model="rules.newRule.name">
          <span v-for="(input, index) in variables.inputs" :key="index">
            <span v-if="index" id="norm">{{rules.newRule.type}}</span>
            <select v-model="rules.newRule.fuzzyAreas.inputs[index]">
              <option v-for="(fuzzyArea, indexFuzzyArea) in input.fuzzyAreas" :key="indexFuzzyArea" v-bind:value="fuzzyArea">
                {{fuzzyArea.name}}
              </option>
            </select>
          </span>
          <span>THEN</span>
          <span v-for="(output, index) in variables.outputs" :key="index">
            <select v-model="rules.newRule.fuzzyAreas.output">
              <option v-for="(fuzzyArea, indexFuzzyArea) in output.fuzzyAreas" :key="indexFuzzyArea" v-bind:value="fuzzyArea">
                {{fuzzyArea.name}}
              </option>
            </select>
          </span>
        <button @click="createRule">Add new rule</button>
      </form>

      <ul class="rules-view">
        <li v-for="(rule, index) in rules.data" v-bind:key="rule + index">
          {{rule.name}}
        </li>
      </ul>

    </section>

  </div>
</template>

<script>

import config from '../config/MainPageConfig';

export default {
  name: 'MainPage',
  data() {
    return config;
  },
  methods: {
    createRule() {
      this.rules = {
        ...this.rules,
        data: [
          ...this.rules.data,
          {
            ...this.rules.newRule,
            fuzzyAreas: {
              ...this.rules.newRule.fuzzyAreas,
            },
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
