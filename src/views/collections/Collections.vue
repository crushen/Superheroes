<template>
  <div>
    <section class="content padding-top">
      <h1 class="heading one cursive">Collections</h1> 

      <h2 class="heading four">A list of all the major superhero groups, publications and authors.</h2>
    </section>

    <section class="content padding-bottom">
      <ul class="collection-wrapper">
        <li
          v-for="collection in sortedCollections"
          :key="collection.letter"
          class="collection">
          <h3>{{ collection.letter }}</h3>
          <ul class="inner">
            <li
              v-for="item in collection.collections"
              :key="item">
              <router-link :to="{ name: 'Collection', params: { name: slugify(item) }}">
                {{ item }}
                <img class="icon" src="@/assets/icons/arrow-right.svg" alt="">
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['superheroes']),
    collections() {
      const all = []
      // push all publishers to array
      this.superheroes.forEach(hero => {
        all.push(hero.biography.publisher)
      })
      // remove duplicates
      const removeDups = [... new Set(all)]
      // filter any nulls or empty strings and sort
      return removeDups.filter(item => item).sort()
    },
    sortedCollections() {
      const array = [...this.collections],
            sorted = [];
      while(array.length) {
        // remove first item from array and get first letter
        const firstCollection = array.shift(),
              letter = firstCollection.slice(0, 1);
        // add first object to sorted array
        if(!sorted.length) {
          sorted.push({
            letter: letter,
            collections: [firstCollection]
          })
        } else {
          // get most recent sorted array item to compare
          const pushedCollection = sorted[sorted.length - 1]
          // if letters match, puch to that objects collections
          if(letter === pushedCollection.letter) {
            pushedCollection.collections.push(firstCollection)
            // if not, add new object to sorted array
          } else {
            sorted.push({
              letter: letter,
              collections: [firstCollection]
            })
          }
        }
      }
      return sorted
    }
  },
  methods: {
    slugify(str) {
      str = str.replace(/^\s+|\s+$/g, '')
      // Make the string lowercase
      str = str.toLowerCase()
      // Remove accents, swap ñ for n, etc
      var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;"
      var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------"
      for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
      }
      // Remove invalid chars
      str = str.replace(/[^a-z0-9 -]/g, '') 
      // Collapse whitespace and replace by -
      .replace(/\s+/g, '-') 
      // Collapse dashes
      .replace(/-+/g, '-')

      return str
    }
  },
  mounted() {
    this.$store.dispatch('loadSuperheroes')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

h1 {
  margin-bottom: 16px;
}

.collection-wrapper {
  margin-top: 54px;
}

.collection {
  border: 6px solid lighten($color: $background, $amount: 7%);
  border-radius: $border-radius;

  &:not(:first-of-type) {
    margin-top: 24px;
  }

  h3 {
    padding: 8px;
    background: lighten($color: $background, $amount: 7%);
  }

  .inner {
    padding: 8px;

    li {
      padding: 2px;

      &:not(:first-of-type) {
        margin-top: 8px;
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid lighten($color: $background, $amount: 7%);
        padding: 2px 2px 10px 2px;
      }

      a {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .icon {
        width: 10px;
      }
    }
  }
}
</style>
