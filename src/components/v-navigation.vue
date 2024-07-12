<template>
  <div class="v-navigation">
    <nav>
      <router-link to="/"><strong>Catalog</strong></router-link>
      <router-link :to="{ name: 'cart' }">
        <div class="number_stuff">{{CART.length}}</div>
        <div class="v-cart__div">
          <img class="v-cart__img" src="../assets/images/cart_icon.png" alt="cart">
        </div>
      </router-link>
    </nav>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'v-navigation',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'CART'
    ])
  }
}
</script>

<style lang="scss">
nav {
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  strong {
    font-size: 140%;
  }

  .number_stuff{
    position: absolute;
    top: 27px;
    left: 29px;
    border: 1px solid #2f7c5b;
    border-radius: 50%;
    background-color: rgb(199, 250, 193, 0.8);
    padding: 3px 7px;
    margin: 0 auto;
    color: rgb(143, 10, 10);
    box-shadow: inset 0px 0px 3px 0px #0e2219;
    transition: 0.4s;
    &:hover {
      background-color: #b7e0ce;
    }
  }

  a {
    font-weight: bold;
    color: #131a22;
    transition: 0.4s;
    position: relative;
    &:hover {
      color: #2f7c5b;
    }
    &:hover div {
      background-color: #b7e0ce;
    }
    &.router-link-exact-active {
      color: #2f7c5b;
      cursor: initial;
    }
    &.router-link-exact-active .v-cart__div, &.router-link-exact-active .number_stuff{
      background-color: #b7e0ce;
      cursor: initial;
    }
  }
}
</style>