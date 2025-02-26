import axios from 'axios'

export default {
  GET_PRODUCTS_FROM_IP({commit}) {
    return axios('http://localhost:3000/products', {
      method: 'GET'
    })
      .then((products) => {
        commit('PUT_PRODUCTS_TO_STATE', products.data)
        return products
      })
      .catch((error) => {
        console.log('Error name: ' + error.name + ' Error message: ' + error.message)
        return error
      })
  }
}