export default {
  ADD_TO_CART({commit}, data){
    commit('SET_CART', data)
  },
  DELETE_FROM_CART({commit}, index){
    commit('REMOVE_FROM_CART', index)
  },
  DECREMENT_QUANTITY({commit}, index) {
    commit('DECREMENT_QUANTITY', index)
  },
  INCREMENT_QUANTITY({commit}, index) {
    commit('INCREMENT_QUANTITY', index)
  }
}