<template>
  <div class="catalog">
    <h1>Catalog</h1>
    <hr>
    <div class="v-catalog__filters">
      <div class="w_200px">
        <div class="v-search_div">
          <v-search v-model="searchValue" />
        </div>
        <v-select 
          class="v-select"
          :options="options"
          :selected="selected"
          @select="sortByCategory"
        />
      </div>
      <div>
        <div class="v-range">
          <span><strong>{{ minPrice }}$</strong></span>
          <div class="v-range__inputs">
            <input 
              type="range"
              min="0"
              max="250"
              step="5"
              v-model.number="minPrice"
              @change="setRangeSlider">
            <input type="range"
              min="0"
              max="250"
              step="5"
              v-model.number="maxPrice"
              @change="setRangeSlider">
          </div>
            <span><strong>{{ maxPrice }}$</strong></span>
        </div>
        <div>
          <label for="SortByPrice">Sort by price </label>
          <input v-model="sortByPrice" @change="setRangeSlider" id="SortByPrice" type="checkbox">
        </div>
      </div>
    </div>
    <hr>
    <transition-group name="disappearBlock">
      <div class="div_appearBlock" v-show="contentVis">
        <v-catalog
          :sortererProducts="sortingByPrice"
        />  
      </div>
      <div class="div_disappearBlock" v-show="!contentVis">
        <p>There is nothing to show!</p> 
      </div>
    </transition-group>
    <hr>
  </div>
</template>

<script>
import vCatalog from '@/components/v-catalog.vue'
import vSelect from '@/components/v-select.vue'
import vSearch from '@/components/v-search.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    vCatalog, vSelect, vSearch
  },
  data () {
    return {
      options: [
        {name: 'All categories', value: 'A'},
        {name: 'Male', value: 'M'},
        {name: 'Female', value: 'F'}
      ],
      selected: 'All categories',
      sortedProducts: [],
      minPrice: 0,
      maxPrice: 250,
      contentVis: true,
      tmpSelected: undefined,
      count: 0,
      searchValue: '',
      sortByPrice: false
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS'
    ]),
    sortererProducts() {
      if (this.sortedProducts.length) {
        return this.sortedProducts
      } else {
        return this.PRODUCTS
      }
    },
    postsSortedAndFound () {
      return this.sortererProducts.filter(post => post.name.trim().toLowerCase().includes(this.searchValue.trim().toLowerCase()))
    },
    sortingByPrice () {
      if (this.sortByPrice) {
        console.log(this.sortByPrice)
        return this.postsSortedAndFound.sort((post1, post2) => {
          return post1.price > post2.price ? 1 : post1.price === post2.price ? 0 : -1;
        })
      } else {
        return this.postsSortedAndFound
      }
    }
  },
  methods: {
    ...mapActions([
      'ADD_BUTTON_TEXT', 'GET_PRODUCTS_FROM_IP'
    ]),
    sortByCategory(category) {
      let vm = this
      this.contentVis = true
      this.sortedProducts = [...this.PRODUCTS]
      this.sortedProducts = this.sortedProducts.filter(function (item) {
        return item.price >= vm.minPrice && item.price <= vm.maxPrice
      })
      if (category) {
        if (category.name !== 'All categories') {
          this.sortedProducts = this.sortedProducts.filter(function (e) {
          return e.category === category.name
          })
        }
        this.tmpSelected = category
        this.selected = category.name
        console.log(this.selected)
      }
      if (!this.sortedProducts.length) {
        this.contentVis = false
      }
    },
    setRangeSlider() {
      if (this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice
        this.maxPrice = this.minPrice
        this.minPrice = tmp
      }
      this.sortByCategory(this.tmpSelected)
    }
  },
  async mounted() {
    await this.GET_PRODUCTS_FROM_IP()
    this.sortByCategory()
  }
}
</script>

<style lang="scss">
/*Chrome*/
hr{
  margin: 10px 0;
}
.w_200px {
  max-width: 200px;
}
.v-search_div {
  margin: 16px 0;
  width: 100%;
}
input[type='range'] {
    -webkit-appearance: none;
    &:focus {
        outline: none;
    }
    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 1px;
        cursor: pointer;
        box-shadow: none;
        background: #ffffff;
        border-radius: 0px;
        border: 0px solid #010101;
    }
    &::-moz-range-track {
        width: 100%;
        height: 1px;
        cursor: pointer;
        box-shadow: none;
        background: #ffffff;
        border-radius: 0px;
        border: 0px solid #010101;
    }
  
    &::-webkit-slider-thumb {
        box-shadow: none;
        border: 0px solid #ffffff;
        box-shadow: 0px 10px 10px rgba(0,0,0,0.25);
        height: 42px;
        width: 22px;
        border-radius: 22px;
        background: rgba(255,255,255,1);
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -20px;
    }
  &::-moz-range-thumb{
        box-shadow: none;
        border: 0px solid #ffffff;
        box-shadow: 0px 10px 10px rgba(0,0,0,0.25);
        height: 42px;
        width: 22px;
        border-radius: 22px;
        background: rgba(255,255,255,1);
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -20px;
  }
  &::-moz-focus-outer {
    border: 0;
    }
}
  .v-catalog__filters {
    margin-bottom: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  @media (max-width: 992px) {
  .v-catalog__filters{
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .v-range__inputs {
    max-width: 130px;
  }
}
  .mb {
    margin-bottom: 40px;
  }
  .v-range {
    span  {
      display: inline-block;
      position: static;
      margin: $margin*2;
      strong {
        color: rgb(95, 95, 95);
      }
    }
    &__inputs {
      position: relative;
      width: 200px;
      text-align: center;
      min-height: 10px;
      display: inline-block;
    }
  svg, input[type='range'] {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    cursor: pointer;
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent; /* Скрывает слайдер, чтобы можно было добавить собственные стили. */
    border-color: transparent;
    color: transparent;
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    position: relative;
    z-index: 2;
    margin-top: -7px;
    -webkit-appearance: none;
    border: 1px solid #2f7c5b;
    width: 8px;
    height: 20px;
    border-radius: 5px;
    background: #b7e0ce;
    cursor: pointer;
    margin-top: -4px; /* Вам нужно указать значение для поля в Chrome, но в Firefox и IE это происходит автоматически */
    box-shadow: 1px 1px 1px #112c20, 0px 0px 1px #112c20;
  }
  input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #112c20, 0px 0px 1px #112c20;
  background: #b7e0ce;
  border-radius: 5px;
  border: 0.2px solid #2f7c5b;
  }
}
.catalog {
  .div_appearBlock {
    transition: 0.5s;
  }
  .div_disappearBlock {
    transition: 0.5s;
  }
  .disappearBlock-enter-active, .disappearBlock-leave-active{
    transition: all 0.5s ease;
  }
  .disappearBlock-enter-from, .disappearBlock-leave-to {
    opacity: 0;
    transform:scale(50%) rotate(-360deg);
  }
}
</style>
