<template>
  <div>
    <upcoming-movie-item
      v-for="upcomingMovie in upcomingMovies"
      :key="upcomingMovie.id"
      :upcomingMovie="upcomingMovie"
    >

    </upcoming-movie-item>
  </div>
</template>

<script>
import axios from 'axios'
import UpcomingMovieItem from '@/components/home/UpcomingMovieItem'

const API_KEY = "33c92174424e6041356c6c55bacd64e2"
const API_URL = "https://api.themoviedb.org/3/movie/upcoming"


export default {
  name: 'UpcomingMovies',
  components: {
    UpcomingMovieItem,
  },
  data: function (){
    return {
      upcomingMovies: null,
    }
  },
  methods: {
    getUpcomingMovies: function (){
      const params = {
        api_key: API_KEY,
        language: 'ko-KR',
        region: 'KR'
      }
      axios({
        method: 'get',
        url: API_URL,
        params
      })
      .then(res => {
        // console.log(res)
        this.upcomingMovies = res.data.results
      })
      .catch(err =>{
        console.log(err)
      })
    }
  },
  created: function (){
    this.getUpcomingMovies()
  }
}
</script>

<style>

</style>