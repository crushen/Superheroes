<template>
  <div>
    <section class="content padding-top">
      <h1>Collections</h1> 
    </section>

    <section class="content padding-top padding-bottom">
      <ul>
        <li
          v-for="collection in sortedCollections"
          :key="collection.letter">
          <h2>{{ collection.letter }}</h2>
          <ul>
            <li
              v-for="item in collection.collections"
              :key="item">
              {{ item }}
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
    slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
    }
  },
  mounted() {
    this.$store.dispatch('loadSuperheroes')
  }
}
</script>
