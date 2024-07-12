<template>
  <div class="v-main-wrapper">
    <v-navigation />
    <hr>
    <router-view/>
  </div>
</template>

<script>
import vNavigation from '@/components/v-navigation.vue'
import {mapActions} from 'vuex'

export default {
  name: 'v-main-wrapper',
  components: {
    vNavigation
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_IP'
    ])
  },
  mounted () {
    this.GET_PRODUCTS_FROM_IP()
    .then((response) => {
      if (response.data) {
        console.log('Success')
      }
    })
  }
}
</script>

<style lang="scss">
.v-main-wrapper {
  max-width: 960px;
  position: relative;
  margin: 0 auto;
  .v-cart__div{
    box-shadow: 0px 0px 2px 0px #112c20;
    padding: 10px;
    border: 1px solid #2f7c5b;
    border-radius: 5px;
    cursor: pointer;
    background-color: #fcfcfc;
    width: 20px;
    float: right;
    transition: 0.4s;
    &:hover{
      background-color: #b7e0ce;
    }
    img {
      width: 100%;
    }
  }
}
</style>