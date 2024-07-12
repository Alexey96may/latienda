import { createStore } from 'vuex'

import commonActions from '@/store/actions/actions'
import apiRequests from '@/store/actions/api-requests'
import mutations from '@/store/mutations/mutations'
import getters from '@/store/getters/getters'

const actions = {...commonActions, ...apiRequests}

export default createStore({
  state: {
    products: [],
    cart: []
  },
  getters,
  mutations,
  actions,
  modules: {
  }
})
