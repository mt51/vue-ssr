import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      keyword: ''
    },
    actions: {
      fetchKeyword ({commit}, keyword) {
        commit('setKeyword', keyword)
      }
    },
    mutations: {
      setKeyword (state, keyword) {
        state.keyword = keyword
      }
    }
  })
}
