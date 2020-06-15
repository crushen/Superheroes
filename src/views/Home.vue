<template>
  <section class="home">
    <div v-if="loading">
      <p>... loading</p>
    </div>

    <div v-else>
      <ul>
        <li 
          v-for="hero in superheroes"
          :key="hero.id">
          {{ hero.name }}
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
  computed: {
    ...mapState(['superheroes', 'error', 'loading'])
  },
  mounted() {
    this.$store.dispatch('loadSuperheroes')
  }
}
</script>
