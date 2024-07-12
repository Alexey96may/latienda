<template>
  <div class="v-search">
    <input 
      @input="updateInput" 
      :value="modelValue"
      type="text" 
      placeholder="Search"
    >
  </div>
</template>

<script>
export default {
  name: 'v-search',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput (event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style lang="scss">
  .v-search {
    input {
      border-radius: 5px;
      border: 1px solid #2f7c5b;
      padding: 8px;
      transition: 0.2s;
      width: 183px;
      outline: #2f7c5b;
      &:focus {
        box-shadow: inset 0px 0px 2px 1px #0e2219;
        outline:#2f7c5b;
      }
    }
  }
</style>