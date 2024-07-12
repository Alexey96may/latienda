<template>
  <div class="v-catalog-item">
    <img class="v-catalog-item__img" :src="require('../assets/images/' + product_data.image)" alt="img">
    <router-link :to = "{name: 'catalog_item', params: { id: product_data.article } }">
      <p><strong>{{ product_data.name }}</strong></p>
    </router-link>
    <p class="green"><strong>{{ toFix }}</strong></p>
    <p>{{ product_data.category }}</p>
    <transition-group name="transition_button">
      <button 
        class="v-catalog-item__btn"
        @click="addToCart"
        :class="getButtonClass(product_data.textButton)"
        >{{ product_data.textButton }}
      </button>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'v-catalog-item',
  data () {
    return {
    }
  },
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    computeTextButton() {
      return product_data.textButton
    },
    toFix() {
      this.product_data.price = parseFloat(this.product_data.price);
      return this.product_data.price.toFixed(2) + '$'
    }
  },
  methods: {
    addToCart() {
      this.$emit('addToCart', this.product_data) 
    },
    getButtonClass(textButton) {
      if (textButton === 'Added') {
        return 'btn_disabled'
      } else {
        return 'btn_unabled'
      }
    }
  }
}
</script>

<style lang="scss">
.v-catalog-item {
  flex-basis: 25%;
  box-shadow: 0px 0px 8px 0px gray;
  padding: $padding*2;
  margin-bottom: $margin*2;
  transition: 0.5s;
  a {
    color:#100c22;
    transition: 0.4s;
    font-size: 110%;
  }
  a:hover {
    color:#183b23;
  }
  &__img {
    width: 100px;
  }
  &__btn {
    padding: 6px;
    border: 1px solid #2f7c5b;
    border-radius: 5px;
    cursor: pointer;
    background-color: #fcfcfc;
    box-shadow: 0px 0px 2px 0px #112c20;
    color: #0d241a;
    min-width: 80px;
    transition: 0.4s;
    &:hover {
      background-color: #c4e2d5;
    }
  }
}
.btn_disabled {
  background-color: #c4e2d5;
}
.btn_unabled {
  background-color: #fcfcfc;
}

.transition_button-enter-active, .transition_button-leave-active{
  transition: all 0.5s ease;
}
.transition_button-enter-from, .transition_button-leave-to {
  opacity: 0;
  transform:scale(50%) rotate(-360deg);
}
</style>