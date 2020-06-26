<template>
  <section class="home">
    <div v-if="loading">
      <p>... loading</p>
    </div>

    <div v-else>
      <input 
        v-model="search"
        type="text" 
        placeholder="Search superheroes">

      <ul>
        <li 
          v-for="hero in filteredSuperheroes"
          :key="hero.id">
          <p>{{ hero.name }}</p>
          <img :src="hero.images.sm" @alt="`An image of ${hero.name}`">
        </li>
      </ul>
    </div>

    <div v-if="error">
      <p>{{ error }}</p>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      search: null
    }
  },
  computed: {
    ...mapState(['superheroes', 'error', 'loading']),
    filteredSuperheroes() {
      let results = this.superheroes

      if(!this.search) {
        return results
      } else {
        results = results.filter(hero => hero.name.toLowerCase().includes(this.search.toLowerCase()))
      }

      return results
    }
  },
  mounted() {
    this.$store.dispatch('loadSuperheroes')
  }
}
</script>
