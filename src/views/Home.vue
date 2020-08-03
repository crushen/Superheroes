<template>
  <div>
    <transition name="fade">
      <loader v-if="loading" />
    </transition>

    <header class="content padding-top">
      <h1 class="heading one">Superhero <span>Database</span></h1>
      <h2 class="heading four">All superheroes from all <br>of the universes in one place</h2>
    </header>

    <section class="content">
      <div id="hero-search">
        <label for="search">Search for your favorite hero to <br>find out their stats and background</label>
        <div class="input">
          <img src="@/assets/icons/search.svg" alt="">
          <input
            v-model="search"
            id="search"
            type="search"
            autocomplete="off">
        </div>
      </div>
    </section>

    <section v-if="!search" class="title-cards content padding-bottom">
      <title-card
        v-for="card in titleCards"
        :key="card.title"
        :card="card"
        class="card" />
    </section>

    <section v-else class="content padding-bottom">
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
import titleCard from '@/components/cards/TitleCard'
import heroCard from '@/components/cards/HeroCard'
import loader from '@/components/loaders/Dots'

export default {
  components: {
    titleCard,
    heroCard,
    loader
  },
  data() {
    return {
      search: null,
      cards: 10,
      filteredLength: null,
      loading: false
    }
  },
  computed: {
    ...mapState(['superheroes', 'titleCards']),
    // Filter heroes by search input
    filteredSuperheroes() {
      return this.superheroes.filter(hero => hero.name.toLowerCase().includes(this.search.toLowerCase()))
    },
    // Only load 10 heroes at a time
    loadedSuperheroes() {
      return this.filteredSuperheroes.slice(0, this.cards)
    }
  },
  watch: {
    // Reset number of cards when new search
    search() {
      this.cards = 10
    }
  },
  methods: {
    // Infinite / Lazy scroll - When user hits bottom of page, add 10 more cards
    scroll() {
      window.addEventListener('scroll', () => {
        const currentScroll = document.documentElement.scrollTop + window.innerHeight + 1,
              pageHeight = document.documentElement.offsetHeight,
              bottomOfWindow = currentScroll >= pageHeight;

        // Only add more to cards if user has reached bottom & there are more heroes left in filtered array
        if(bottomOfWindow && this.search && this.filteredSuperheroes.length > this.loadedSuperheroes.length) {
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
@import '@/assets/styles/variables.scss';

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.2s;
}

header {
  text-align: center;
}

.heading.one {
  font-size: 56px;
  font-family: 'Bangers', 'Montserrat', sans-serif;
  letter-spacing: 3px;

  span {
    display: block;
  }
}

h2 {
  margin-top: 24px;
}

#hero-search {
  margin-top: 74px;

  label {
    width: 100%;
    text-align: center;
  }

  .input {
    position: relative;
    margin-top: 16px;
  }

  img {
    width: 24px;
    position: absolute;
    top: 6px;
    left: 6px;
  }

  input {
    padding: 10px 16px 10px 40px;
    box-sizing: border-box;
  }
}

.title-cards {
  margin-top: 48px;

  .card {
    background: $body-med;

    &:nth-of-type(even) {
      background: $body-light;
    }

    &:not(:first-of-type) {
      margin-top: 16px;
    }
  }
}

.hero-card {
  margin-top: 24px;
}
</style>
