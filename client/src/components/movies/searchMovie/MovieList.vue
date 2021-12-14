<template>
  <div class="container row">
    <h1 class="fw-bold fs-2 my-3">영화 검색 결과</h1>
    <movie-list-item
      class="col-3 d-flex"
      v-for="api_movie in api_movies"
      :key="api_movie.id"
      :api_movie="api_movie"
    >

    </movie-list-item>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MovieListItem from '@/components/movies/searchMovie/MovieListItem'

export default {
  name: 'MovieList',
  data: function(){
    return {

    }
  },
  components: {
    MovieListItem
  },
  methods: {
  },
  computed: {
    ...mapState([
      'api_movies',
    ])
  },
  created: function() {
  }
}
</script>

<style>

</style>