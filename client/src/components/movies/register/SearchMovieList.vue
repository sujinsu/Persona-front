<template>
  <div class="d-flex justify-content-center flex-wrap m-3">
    <search-movie-list-item
      class="m-3"
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
    >

    </search-movie-list-item>
  </div>
</template>

<script>
import SearchMovieListItem from '@/components/movies/register/SearchMovieListItem'

export default {
  name: 'SearchMovieList',
  props: {
    movies: {
      type: Array,
    }
  },
  components: {
    SearchMovieListItem,
  }
}
</script>

<style>

</style>