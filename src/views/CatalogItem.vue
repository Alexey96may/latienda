<template>
  <div class="catalog_item_page">
    <div class="catalog_item_page__flex">
      <div class="catalog_item_page__flex__left_div">
        <div class="photo_left" v-if="product.image">
          <img class="photo_left__img" :src="getImg(product.image)" alt="img">
        </div>
        <div class="details_perc">
          <p><strong>Price: <span class="green">{{toFix}}</span></strong></p>
          <p><strong>Article:</strong> {{product.article}}</p>
        </div>
        <button 
            class="v-catalog-item__btn" 
            @click="addToCart" 
            :class="getButtonClass(product.textButton)"
          >{{ product.textButton }}
        </button>
      </div>
      <div class="catalog_item_page__flex__right_div">
        <h1>{{product.name}}</h1>
        <p>{{product.description}}</p>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      product: {},
      imageSrc: '../assets/images/'
    }
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_IP', 'ADD_TO_CART'
    ]),
    getImg(url) {
      return require(`@/assets/images/${url}`);
    },
    addToCart() {
      this.ADD_TO_CART(this.product)
    },
    getButtonClass(textButton) {
      if (textButton === 'Added') {
        return 'btn_disabled'
      } else {
        return 'btn_unabled'
      }
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS'
    ]),
    setProduct_data() {
      return this.product = this.PRODUCTS.find((item) => item.article === this.id)
    },
    toFix() {
      this.product.price = parseFloat(this.product.price);
      return this.product.price.toFixed(2) + '$'
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_IP()
      .then(() => {
        this.product = this.PRODUCTS.find((item) => {
        return item.article === this.id
        })
      })
  }
}
</script>

<style lang="scss">
  .catalog_item_page {
    h1 {
      margin-bottom: $margin*3;
    }
    &__flex {
      display: flex;
      justify-content: space-between;
      margin: 40px 0;
      &__left_div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: $margin*4;
        .details_perc {
          margin: $margin 0;
        }
        & p {
          padding: $padding;
          margin: 0;
        }
      }
      &__right_div {
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
      }
    }
  }
  .photo_left {
    max-width: 600px;
    &__img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
</style>