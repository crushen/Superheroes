<template>
  <div>
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
          v-for="hero in filteredSuperheroes"
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

export default {
  components: {
    titleCard,
    heroCard
  },
  data() {
    return {
      search: null,
      titleCards: [ 
        { title: "Marvel", background: { src: require('@/assets/logos/marvel.svg'), width: 240 } },
        { title: "DC Comics", background: { src: require('@/assets/logos/dc.svg'), width: 240 } },
        { title: "Dark Horse", background: { src: require('@/assets/logos/dark-horse.svg'), width: 220 } },
        { title: "Star Wars", background: { src: require('@/assets/logos/star-wars-2.svg'), width: 220 } },
        { title: "Star Trek", background: { src: require('@/assets/logos/star-trek.svg'), width: 200 } },
        { title: "Image Comics", background: { src: require('@/assets/logos/image.svg'), width: 200 } }
      ]
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
    },
    featuredSuperhero() {
      return this.superheroes[Math.floor(Math.random() * this.superheroes.length)];
    }
  },
  mounted() {
    this.$store.dispatch('loadSuperheroes')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

header {
  text-align: center;
}

h1 {
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
