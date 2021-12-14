<template>
  <div>
    <movie-list></movie-list>
  </div>
</template>

<script>
import MovieList from '@/components/movies/searchMovie/MovieList'
import { mapState } from 'vuex'

export default {
  name:'Movies',
  components: {
    MovieList,
  },
  computed: {
    ...mapState([
      'isLogin',
      'superuser',
    ])
  }
}
</script>

<style>

</style>