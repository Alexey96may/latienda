<template>
  <div class="v-catalog">
    <div class="v-catalog__list">
      <transition-group name="catalog_item_animation">
        <v-catalog-item
          v-for="product in this.sortererProducts"
          :key="product.article"
          :product_data="product"
          @addToCart="addToCart"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import vCatalogItem from '@/components/v-catalog-item.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'v-catalog',
  components: {
    vCatalogItem
  },
  props: {
    sortererProducts: {
      type: Array,
      default() {
        return this.PRODUCTS
      }
    }
  },
  data( ) {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS', 
      'CART',
    ])
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART'
    ]),
    addToCart(data) {
      this.ADD_TO_CART(data)
    }
  }
}
</script>

<style lang="scss">
.v-catalog {
  transition: 0.5s;
  margin: 26px 0;
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    transition: 0.5s;
  }
  .catalog_item_animation-enter-active, .catalog_item_animation-leave-active{
    transition: all 0.5s ease;
  }
  .catalog_item_animation-enter-from, .catalog_item_animation-leave-to {
    opacity: 0;
    transform:scale(50%) rotate(-360deg);
  }
}
</style>