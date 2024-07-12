<template>
  <div class="v-cart-item">
    <img class="v-cart-item__img" :src="require('../assets/images/' + cart_item_data.image)" alt="img">
    <div class="v-cart-item__in">
      <router-link :to = "{name: 'catalog_item', params: { id: cart_item_data.article } }">
        <p><strong>{{ cart_item_data.name }}</strong></p>
      </router-link>
      <p class="green"><strong>{{toFix}}</strong></p>
      <p>{{ cart_item_data.article }}</p>
    </div>
    <div class="v-cart-item__quantity">
      <p>Quantity:</p>
      <span class="v-cart-item__span">
        <span @click="decrementQuantity">&lt;</span>
        {{ cart_item_data.quantity }}
        <span @click="incrementQuantity">&gt;</span>
      </span>
    </div>
    <button class="v-cart-item__btn" @click="deleteFromCart">
      Delete
    </button>
  </div>
</template>

<script>

export default {
  name: 'v-cart-item',
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    this.cart_item_data.quantity = 1
  },
  methods: {
    deleteFromCart() {
      this.$emit('deleteFromCart')
    },
    decrementQuantity() {
      this.$emit('decrement')
    },
    incrementQuantity() {
      this.$emit('increment')
    }
  },
  computed: {
    toFix() {
      this.cart_item_data.price = parseFloat(this.cart_item_data.price);
      return this.cart_item_data.price.toFixed(2) + '$'
    }
  }
}
</script>

<style lang="scss">
  .v-cart-item{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-self: center;
    box-shadow: 0px 0px 8px 0px gray;
    padding: $padding*2;
    transition: 0.4s;
    a {
    color:#100c22;
    transition: 0.4s;
    font-size: 110%;
    }
    a:hover {
      color:#183b23;
    }
    &__img {
      max-width: 50px;
    }
    &__btn {
      padding: 6px;
      border: 1px solid #7c2f2f;
      border-radius: 5px;
      cursor: pointer;
      background-color: #fcfcfc;
      box-shadow: 0px 0px 2px 0px #2c1111;
      color: #0d241a;
      min-width: 80px;
      transition: 0.4s;
      &:hover {
        background-color: #e2c4c4;
      }
    }
    &__span span {
      padding: 6px 3px;
      box-shadow: 0px 0px 3px #0d241a;
      border: #0d241a;
      transition: 0.4s;
      cursor: pointer;
      margin: 0 3px;
      user-select: none;
      &:hover {
        box-shadow: 0px 0px 1px #0d241a;
      }
    }
  }
</style>