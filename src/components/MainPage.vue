<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Enter fuzzy logic data</h2>
    <ul>
      <br>
      <label for="start">Start of range:</label>
      <input type="number" id="start" v-model="start">
      <br>
      <label for="end">End of range:</label>
      <input type="number" id="end"v-model="end">
      <br>
      <router-link to="/chart">Show chart </router-link>
      <router-view> </router-view>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      start: 10,
      end: 100,
      msg: 'Welcome to Your Vue.js App, traveller',
    };
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
