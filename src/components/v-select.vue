<template>
  <div class='v-select'>
    <p
      class="title"
      @click="areOptionsVisible = !areOptionsVisible"
    >{{selected}}</p>
    <div
      class="options"
      v-if="areOptionsVisible"
    >
      <p
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{option.name}}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "v-select",
    props: {
      options: {
        type: Array,
        default() {
          return []
        }
      },
      selected: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        areOptionsVisible: false
      }
    },
    methods: {
      selectOption(option) {
        this.$emit('select', option)
        this.areOptionsVisible = false;
      },
      hideSelect() {
        this.areOptionsVisible = false;
      }
    },
    mounted() {
      document.addEventListener('click', this.hideSelect.bind(this), true)
    },
    beforeDestroy() {
      document.removeEventListener('click', this.hideSelect)
    }
  }
</script>

<style lang="scss">
  .v-select {
    position: relative;
    width: 200px;
    cursor: pointer;
    & p {
      transition: 0.4s;
    }
    & p:hover {
      background: #b7e0ce;
    }
    .title {
      border-radius: 5px;
      padding: $padding;
      box-shadow: 0px 0px 2px #0e2219;
    }
  }
  .options {
    border: 1px solid #2f7c5b;
    background: #ffffff;
    border-radius: 5px;
    position: absolute;
    box-shadow: 0px 0px 3px #0e2219;
    top: 0;
    left: 0;
    width: 99%;
    padding: 0;
    margin: 0;
    transition: 0.4s;
    p {
      margin: 0;
      padding: $padding;
    }
    & p {
      border-bottom: 1px solid #2f7c5b71;
      transition: 0.4s;
    }
    & p:last-child {
      border-bottom: none;
    }
    & p:hover {
    background: #b7e0ce;
    }
  }
</style>