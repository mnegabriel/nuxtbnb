<template>
  <article>
      <h1>{{ home.title }}</h1>
      <nuxt-link to="/">Back to home</nuxt-link>
  </article>
</template>

<script>
import homes from '@/data/homes'

export default {
    data() {
        return {
            home: null,
        }
    },
    created() {
        this.home = homes.find( home => home.objectID === this.$route.params.id )
    }
}
</script>

<style scoped>

</style>