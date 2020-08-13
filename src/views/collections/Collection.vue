<template>
  <div>
    <transition name="fade">
      <loader v-if="loading" />
    </transition>

    <header class="content padding-top">
      <h1>{{ collection }}</h1>
    </header>
    
    <section class="content padding-bottom">
      <ul>
        <li 
          v-for="hero in loadedSuperheroes"
          :key="hero.id"
          class="hero-card">
          <hero-card :hero="hero" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import heroCard from '@/components/cards/HeroCard'
import loader from '@/components/loaders/Dots'

export default {
  components: {
    heroCard,
    loader
  },
  data() {
    return {
      slug: this.$route.params.name,
      cards: 10,
      loading: false
    }
  },
  computed: {
    ...mapState(['superheroes', 'titleCards']),
    collection() {
      const array = []
      this.superheroes.forEach(hero => {
        if(typeof hero.biography.publisher === 'string') {
          const slug = this.$route.params.name.replace(/-/g, '')
          const publisher = hero.biography.publisher.replace(/ /g, '').replace(/-/g, '').replace(/\./g,'').toLowerCase()
          if(slug === publisher) {
            array.push(hero)
          }
        }
      })
      return array[0].biography.publisher
    },
    collectionHeroes() {
      return this.superheroes.filter(hero => hero.biography.publisher === this.collection)
    },
    loadedSuperheroes() {
      return this.collectionHeroes.slice(0, this.cards)
    }
  },
  methods: {
    scroll() {
      window.addEventListener('scroll', () => {
        const currentScroll = document.documentElement.scrollTop + window.innerHeight + 1,
              pageHeight = document.documentElement.offsetHeight,
              bottomOfWindow = currentScroll >= pageHeight;

        // Only add more to cards if user has reached bottom & there are more heroes left in filtered array
        if(bottomOfWindow && this.collectionHeroes.length > this.loadedSuperheroes.length) {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.cards += 10
          }, 800)
        }
      }) 
    }
  },
  mounted() {
    this.$store.dispatch('loadSuperheroes')
    this.scroll()
  }
}
</script>

<style lang="scss" scoped>

</style>
