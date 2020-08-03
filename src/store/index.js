import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    superheroes: [],
    error: null,
    titleCards: [ 
      { title: "Marvel", slug: 'marvel', background: { src: require('@/assets/logos/marvel.svg'), width: 240 } },
      { title: "DC Comics", slug: 'dc-comics', background: { src: require('@/assets/logos/dc.svg'), width: 240 } },
      { title: "Dark Horse", slug: 'dark-horse', background: { src: require('@/assets/logos/dark-horse.svg'), width: 220 } },
      { title: "Star Wars", slug: 'star-wars', background: { src: require('@/assets/logos/star-wars-2.svg'), width: 220 } },
      { title: "Star Trek", slug: 'star-trek', background: { src: require('@/assets/logos/star-trek.svg'), width: 200 } },
      { title: "Image Comics", slug: 'image-comics', background: { src: require('@/assets/logos/image.svg'), width: 200 } }
    ]
  },
  actions: {
    loadSuperheroes({commit}) {
      const URL = 'https://akabab.github.io/superhero-api/api/all.json'
      Axios
        .get(URL)
        .then(response => {
          commit('updateSuperheroes', response.data)
        })
        .catch(error => commit('setError', error))
    }
  },
  mutations: {
    updateSuperheroes(state, heroes) {
      // Remove the one with no picture
      state.superheroes = heroes.filter(hero => hero.id !== 538)
    },
    setError(state, error) {
      state.loading = false
      state.error = error.message
    }
  }
  // modules: {}
})
