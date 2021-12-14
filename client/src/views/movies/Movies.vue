<template>
  <div class="container">
    <span class="d-flex justify-content-between">
      <span class="fw-bold fs-2 text-left">COLLECTION</span>
      <span>
        <span class="mx-2">나만의 컬렉션 만들기</span>
        <v-btn  @click="addCollection" color="indigo" dark fab x-small>
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </span>
    </span>
    
    <collection-list></collection-list>

    <br>
    <hr>

    <span class="fw-bold fs-2 text-left my-3">MOVIES</span>
    <select @change="sortMovies" class="form-select my-3" aria-label="Default select example" 
      id="movie_select" style="background-color: rgb(234, 233, 239)"
    >
      <option selected value="1">최신 등록순</option>
      <option value="2">인기순</option>
      <option value="3">조회순</option>
    </select>


    <b-card-group class="d-flex justify-content-center row" deck width="200">
      <sorted-movie-item
        v-for="movie in sortedMovies"
        :key="movie.id"
        :movie="movie"
        :movieNum="movieNum"  
      >
      
      </sorted-movie-item>
    </b-card-group>

  </diV>
</template>

<script>
import collectionList from '@/components/movies/collections/collectionList'
import sortedMovieItem from '@/components/movies/sortedMovies/sortedMovieItem'
import axios from 'axios'

export default {
  name: 'Movies',
  data: function () {
    return {
      sortedMovies: null,
      val: null,
      movieNum: null,
    }
  },
  components: {
    collectionList,
    sortedMovieItem,
  },
  methods: {
    addCollection: function () {
      this.$router.push({name: 'addCollection'})
    },
    sortMovies: function () {
      const val = document.querySelector('#movie_select').value
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${val}/`,
      })
      .then(res => {
        this.sortedMovies = res.data
        this.val = val
        this.movieNum = this.sortedMovies.length
      })
      .catch(err => {
        console.log(err)
      })
    },
    defaultSortedMovies: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/1/`,
      })
      .then(res => {
        this.sortedMovies = res.data
        this.val = 1
        this.movieNum = this.sortedMovies.length
        console.log(this.movieNum)
        // console.log(this.sortedMovies)
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  created: function (){
    this.defaultSortedMovies()
    // console.log(this.sortedMovies)
  }
}
</script>

<style>
</style>