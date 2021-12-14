<template>
  <div>
    <h1>영화 등록(Admin 권한)</h1>
    <div v-if="superuser">

      <div v-if="isIt">
        <h3 class="text-left">등록 요청된 영화</h3>
        <div class="container d-flex flex-wrap justify-content-center">
          <movie-form 
            v-for="movieForm in movieForms"
            :key="movieForm.id"
            :movieForm="movieForm"
            @movieFormChange="getForm"
          >
          </movie-form>
        </div>
      </div>
      <div v-else>
        <h3>등록 요청 온 영화가 없습니다. </h3>
      </div>
      
      <search-movie-input @input-change="onInputChange"></search-movie-input>
      
      <search-movie-list :movies="movies"></search-movie-list>
    </div>
  </div>
</template>

<script>
import SearchMovieInput from '@/components/movies/register/SearchMovieInput' 
import SearchMovieList from '@/components/movies/register/SearchMovieList'
import MovieForm from '@/components/movies/register/MovieForm'

import { mapState } from 'vuex'
import axios from 'axios'

const API_KEY = '33c92174424e6041356c6c55bacd64e2'
const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie'

export default {
  name: 'AddMovie',
  components: {
    MovieForm,
    SearchMovieInput,
    SearchMovieList
  },
  data: function (){
    return {
      inputValue: null,
      movies: [],
      movieForms: null,
      isIt: null,
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    onInputChange: function (inputValue){
      this.inputValue = inputValue

      const params = {
        api_key: API_KEY,
        language: 'ko-KR',
        query: this.inputValue
      }

      axios({
        method: 'get',
        url: SEARCH_API_URL,
        params,
      })
        .then(res => {
          console.log(res)
          this.movies = res.data.results
          console.log(this.movies)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getForm: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/request/',
        headers: this.setToken()
      })
      .then(res=>{
        // console.log(res)
        this.movieForms = res.data
        this.isIt = this.movieForms.length 
        // console.log(this.movieForms.length)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'superuser',
    ])
  },
  created: function (){
    this.getForm()
  }
}
</script>

<style>

</style>