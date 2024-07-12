export default {
  PUT_PRODUCTS_TO_STATE: (state, products) => {
    if (!state.products.length) {
      state.products = products
      state.products.forEach(element => {
        element.textButton = 'Add'
      })
    }
  },
  SET_CART: (state, data) => {

    state.products.forEach((product) => {
      if (product.article === data.article) {
        if (product.textButton === 'Added') {
          state.cart.splice(product, 1)
          product.textButton = 'Add'
        } else {
          state.cart.push(data)
          product.textButton = 'Added'
        }
      }
    })

  },
  REMOVE_FROM_CART: (state, index) => {
    state.products.forEach((product) => {
      if (state.cart[index].article === product.article) {
        product.textButton = 'Add'
      }
    })
    state.cart.splice(index, 1)
  },
  DECREMENT_QUANTITY: (state, index) => {
    if (state.cart[index].quantity > 1) {
      state.cart[index].quantity--
    }
  },
  INCREMENT_QUANTITY: (state, index) => {
    state.cart[index].quantity++
  }
}