<template>
    <section class="project-data">
      <h2><strong>{{ projectName }}</strong></h2>
      <label for="project-name">Enter name of your project:</label>
      <input v-on:input="updateInput($event.target.value)">
    </section>
</template>

<script>
export default {
  name: 'ProjectName',
  props: ['projectName'],
  methods: {
    updateInput: function updateInputFunction(value) {
      this.$emit('input', value);
    },
  },
};
</script>
