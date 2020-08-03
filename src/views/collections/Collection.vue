<template>
  <div>
    <transition name="fade">
      <loader v-if="loading" />
    </transition>

    <header class="content padding-top">
      <h1>{{ collection.title }}</h1>
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
      return this.titleCards.find(item => item.slug === this.slug)
    },
    collectionHeroes() {
      let array = []

      if(this.collection.title === 'Marvel') {
        array = this.superheroes.filter(hero => hero.biography.publisher === 'Marvel Comics')
      } else if(this.collection.title === 'DC Comics') {
        array = this.superheroes.filter(hero => hero.biography.publisher === 'DC Comics')
      } else if(this.collection.title === 'Dark Horse') {
        array = this.superheroes.filter(hero => hero.biography.publisher === 'Dark Horse Comics')
      } else if(this.collection.title === 'Star Wars') {
        array = this.superheroes.filter(hero => hero.biography.publisher === 'George Lucas' && hero.name !== 'Indiana Jones')
      } else if(this.collection.title === 'Image Comics') {
        array = this.superheroes.filter(hero => hero.biography.publisher === 'Image Comics')
      } else if(this.collection.title === 'Star Trek') {
        array = this.superheroes.filter(hero => hero.biography.publisher === 'Star Trek')
      }

      return array
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
