<template>
  <h1>{{ collection.title }}</h1>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      slug: this.$route.params.name
    }
  },
  computed: {
    ...mapState(['superheroes', 'titleCards']),
    collection() {
      return this.titleCards.find(item => item.slug === this.slug)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
