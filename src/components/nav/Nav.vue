<template>
  <header>
    <div class="nav-bar">
      <button
        v-if="innerWidth < 1000"
        @click="openNav"
        class="nav-button">
        <div class="nav-line"></div>
        <div class="nav-line"></div>
        <div class="nav-line"></div>
      </button>
      <!-- <div v-else>
        <nav>
          <nuxt-link to="/" exact>Home</nuxt-link>
          <nuxt-link to="/work">Work</nuxt-link>
          <nuxt-link to="/contact">Contact</nuxt-link>
        </nav>
      </div> -->
    </div>

    <transition 
      enter-active-class="animate__animated animate__slideInLeft" 
      leave-active-class="animate__animated animate__slideOutLeft">
      <div 
        v-if="active" 
        v-on-clickaway="closeNav"
        class="nav-container">
        <nav>
          <router-link 
            :to="{ name: 'Home' }" 
            exact 
            @click.native="closeNav">
            Home
          </router-link>

          <router-link 
            :to="{ name: 'Collections' }" 
            exact 
            @click.native="closeNav">
            Collections
          </router-link>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  mixins: [ clickaway ],
  data() {
    return {
      innerWidth: null,
      active: false
    }
  },
  methods: {
    openNav() {
      this.active = true
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      document.querySelector('body').style.overflow = 'hidden'
    },
    closeNav() {
      this.active = false
      document.querySelector('body').style.overflow = 'auto'
    }
  },
  mounted() {
    this.innerWidth = window.innerWidth

    window.addEventListener('resize', () => {
      this.innerWidth = window.innerWidth
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.animate__animated {
  &.animate__slideInLeft,
  &.animate__slideOutLeft {
    --animate-duration: 0.4s;
  }
}

.nav-bar {
  width: 100%;
  position: absolute;
  padding: 24px 7.5vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.nav-button {
  background: none;
  border: none;
  height: 18px;
  width: 25px;
  cursor: pointer;
}

.nav-line {
  width: 100%;
  height: 3px;
  background: white;
}

.nav-line:not(:last-of-type) {
  margin-bottom: 4px;
}

/* RIGHT NAV DRAWER */

.nav-container {
  height: calc(100vh - 220px);
  width: 100%;
  background: $accent;
  position: fixed;
  top: 220px;
  right: 0;
  z-index: 20;
}

nav {
  margin-top: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav a {
  font-size: 18px;
  font-weight: 600;
  animation-duration: 0.4s;
  animation-timing-function: ease-out;
  text-decoration: none;
  color: $light-font;
  opacity: 0.7;

  &:not(:first-of-type) {
    margin-top: 16px;
  }
}

nav .router-link-active {
  opacity: 1;
}

/* TABLET + */

// @media screen and (min-width: 1000px){
//   nav {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     margin: 0;
//   }

//   nav a {
//     margin-left: 32px;
//     font-size: 16px;
//   }
// }
</style>
