import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    superheroes: [],
    loading: true,
    error: ''
  },
  actions: {
    loadSuperheroes({commit}) {
      const URL = 'https://akabab.github.io/superhero-api/api/all.json'
      Axios
        .get(URL)
        .then(response => {
          commit('updateSuperheroes', response.data)
          commit('setLoading')
        })
        .catch(error => commit('setError', error))
    }
  },
  mutations: {
    updateSuperheroes(state, heroes) {
      state.superheroes = heroes
    },
    setLoading(state) {
      state.loading = false
    },
    setError(state, error) {
      state.loading = false
      state.error = error.message
    }
  }
  // modules: {}
})
 