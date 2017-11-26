<template>
    <h4 @click="updateType()">
      <span v-if="variables.variableType === 'input'">Input</span>
      <span v-if="variables.variableType === 'output'">Output</span> 
      variables (swap added type on click)
    </h4>
</template>

<script>
export default {
  name: 'VariableType',
  props: ['variables'],
  methods: {
    updateType() {
      if (this.variables.variableType === 'input') {
        this.$emit('input', 'output');
      }
    },
  },
};
</script>
