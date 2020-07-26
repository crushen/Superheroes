<template>
  <div>
  <!-- <section class="home">
    <div v-if="loading">
      <p>... loading</p>
    </div>

    <div v-else>
      <div 
        :style="{backgroundImage: `url(${featuredSuperhero.images.md})`}"
        class="card">
        <div class="overlay"></div>
        <div class="body">
          <div class="name">
            <p>{{ featuredSuperhero.name }}</p>
          </div>
        </div>
      </div>

      <input 
        v-model="search"
        type="text" 
        placeholder="Search superheroes">

      <ul v-if="search">
        <li 
          v-for="hero in filteredSuperheroes"
          :key="hero.id">
          <p>{{ hero.name }}</p>
          <img :src="hero.images.sm" :alt="`An image of ${hero.name}`">
        </li>
      </ul>
    </div>

    <div v-if="error">
      <p>{{ error }}</p>
    </div>
  </section> -->

  <header class="content padding-top">
    <h1 class="heading one">Superhero <span>Database</span></h1>
    <h2 class="heading four">All superheroes from all <br>of the universes in one place</h2>
  </header>

  <section class="content">
    <div id="hero-search">
      <label for="search">Search for your favorite hero to <br>find out their stats and background</label>
      <div class="input">
        <img src="@/assets/icons/search.svg" alt="">
        <input id="search" type="search" autocomplete="off">
      </div>
    </div>
  </section>

  <section class="cards content padding-bottom">
    <title-card
      v-for="card in titleCards"
      :key="card.title"
      :card="card"
      class="title-card" />
  </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import titleCard from '@/components/cards/TitleCard'

export default {
  components: {
    titleCard
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
    //margin-left: 40px;
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

.cards {
  margin-top: 48px;

  .title-card {
    background: $body-med;

    &:nth-of-type(even) {
      background: $body-light;
    }

    &:not(:first-of-type) {
      margin-top: 16px;
    }
  }
}








// .home {
//   width: 90%;
//   margin: auto;
// }
// .card {
//   min-height: 400px;
//   position: relative;
//   border-radius: 16px;
//   background-position: center;

//   .overlay {
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     z-index: 0;
//     background: rgba($color: #031126, $alpha: 0.6);
//     border-radius: 16px;
//   }

//   .body {
//     min-height: 400px;
//     display: flex;
//     align-items: flex-end;
//     padding: 16px;
//     position: relative;
//     z-index: 5;

//     .name {
//       font-size: 50px;
//       margin: 0;
//       letter-spacing: 2px;
//       color: white;
//       font-family: 'Bangers', cursive;
//     }
//   }
// }
</style>
