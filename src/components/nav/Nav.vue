<template>
  <header>
    <div class="nav-bar-container">
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
    </div>

    <transition 
      enter-active-class="animated slideInRight faster" 
      leave-active-class="animated slideOutRight faster">
      <div 
        v-if="active" 
        v-on-clickaway="closeNav"
        class="nav-container">
        <nav>
          <router-link 
            :to="{ name: 'Home' }" 
            exact 
            @click.native="closeNav"
            class="animated fadeInRight">
            Home
          </router-link>

          <router-link 
            :to="{ name: 'Collections' }" 
            exact 
            @click.native="closeNav"
            class="animated fadeInRight">
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
    },
    closeNav() {
      this.active = false
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

.nav-bar-container {
  position: fixed;
  width: 100vw;
  padding: 16px 7.5%;
  background: transparent;
  z-index: 10;
  transition: 0.6s;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1300px;
  margin: auto;
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

a:hover {
  text-decoration: none;
}

/* RIGHT NAV DRAWER */

.nav-container {
  height: 100vh;
  width: 75%;
  max-width: 400px;
  background: #484f6b;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 20;
}

nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 100px 0 0 32px;
}

nav a {
  font-size: 20px;
  line-height: 50px;
  font-weight: 700;
  animation-duration: 0.4s;
  animation-timing-function: ease-out;
}

nav a:nth-of-type(1) {
  animation-delay: 0.2s;
}

nav a:nth-of-type(2) {
  animation-delay: 0.3s;
}

nav a:nth-of-type(3) {
  animation-delay: 0.4s;
}

nav .router-link-active:nth-of-type(1) {
  color: #ffb2ab;
}
nav .router-link-active:nth-of-type(2) {
  color: #e0bce6;
}
nav .router-link-active:nth-of-type(3) {
  color: #a9e3eb;
}

/* TABLET + */

@media screen and (min-width: 1000px){
  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
  }

  nav a {
    margin-left: 32px;
    font-size: 16px;
  }
}
</style>
