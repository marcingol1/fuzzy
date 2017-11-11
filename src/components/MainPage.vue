<template>
  <div class="container">
    <h2>Enter fuzzy logic data</h2>
    <br>
    <label for="ruleName">Name of variable:</label>
    <input type="text" id="ruleName" v-model="newRuleData.name">
    <label for="ruleValue">Value of variable:</label>
    <input type="number" id="ruleValue" v-model="newRuleData.value">
    <button @click="addRule">Add Rule</button>
    <br>
    <h4>Data of new rule: </h4>
    <p> Name: {{newRuleData.name}}, value: {{newRuleData.value}}</p>
    <ul>
      <li></li>
      </ul>
    <bar-chart 
      :chart-data="chartData"
      :options="options"
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
      newRuleData: {
        name: 'Name',
        value: '123',
      },
      chartData: {
        labels: ['Cold', 'Good', 'Hot'],
        datasets: [{
          label: 'MF',
          backgroundColor: '#f87979',
          data: [-5, 10, 30],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.2,
          },
        },
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
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
