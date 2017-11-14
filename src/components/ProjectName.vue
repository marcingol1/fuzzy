<template>
    <section class="project-data">
      <h3>Project data</h3>
      <label for="project-name">Enter name of your project:</label>
      <input type="text" id="project-name" v-model="projectName">
      <br>
      <h2><strong>{{ projectName }}</strong></h2>
    </section>
<template>

<script>
export default {
  name: 'ProjectName'
}
</script>


<style scoped>

</style>
