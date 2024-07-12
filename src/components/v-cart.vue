<template>
  <div class="v-cart">
    <transition-group name="cart_animation">
      <div class="v-cart__popup" v-if="CART.length">
        <transition-group name="cart_item_animation">
          <v-cart-item 
            v-for="(item, index) in this.CART"
            :key="item.article"
            :cart_item_data="item"
            @decrement="decrementQuantity(index)"
            @increment="incrementQuantity(index)"
            @deleteFromCart="deleteFromCart(index)"
          />
        </transition-group>
      </div>
      <div v-else>
        <p>There is nothing in the cart</p>
      </div>
    </transition-group>
      <div class="v-cart__total">
        <p class="total_name">Total:</p>
        <p class="total_value">{{cartTotalCost + '$'}}</p>
      </div>
  </div>
</template>

<script>
import vCartItem from '@/components/v-cart-item.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    vCartItem
  },
  name: 'v-cart',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'CART'
    ]),
    cartTotalCost() {
      let result = [0]

      this.CART.forEach(element => {
        result.push(element.price * element.quantity)
      })

      return result.reduce((sum, el) => sum + el)
    }
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
      'DECREMENT_QUANTITY',
      'INCREMENT_QUANTITY'
    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index)
    },
    decrementQuantity(index) {
      this.DECREMENT_QUANTITY(index)
    },
    incrementQuantity(index) {
      this.INCREMENT_QUANTITY(index)
    }
  }
}
</script>

<style lang="scss">
.v-cart{
  transition: 0.4s;
  margin: 26px 0;
  &__total{
    position: fixed;
    bottom: 0;
    right: 0;
    background: #b7e0ce;
    padding: $padding $padding*1.5;
    display: flex;
    justify-items: center;
    border-radius: 5px;
    font-weight: bold;
  }
  .total_name {
    margin-right: $margin;
    color: rgb(49, 49, 49);
  }
  .total_value{
    color: rgb(143, 10, 10);
  }
  .cart_item_animation-enter-active, .cart_item_animation-leave-active{
    transition: all 0.5s ease;
  }
  .cart_item_animation-enter-from, .cart_item_animation-leave-to {
    opacity: 0;
    transform:translateX(100px)
  }
}
.cart_animation-enter-active, .cart_animation-leave-active{
  transition: all 0.5s ease;
}
.cart_animation-enter-from, .cart_animation-leave-to {
  opacity: 0;
  transform:translateY(-50px)
}
</style>