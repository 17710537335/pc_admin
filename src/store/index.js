import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user.js'
import permission from './modules/permission.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    //   拆分的多个部分
    permission,
    user
  },
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  }
})
