<template>
  <div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <popular-movie-item class="col-2"
          v-for="popularMovie in popularMovies"
          :key="popularMovie.id"
          :popularMovie="popularMovie"
        >

        </popular-movie-item>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PopularMovieItem from '@/components/home/PopularMovieItem'
// 일단 인기영화 20개 가져옴(매일 업데이트)
const API_KEY = "33c92174424e6041356c6c55bacd64e2"
const API_URL = "https://api.themoviedb.org/3/movie/popular"

export default {
  name: 'PopularMovies',
  components: {
    PopularMovieItem
  },
  data: function() {
    return {
      popularMovies: null,
    }
  },
  methods: {
    getPopulatMovies: function(){
      const params = {
        api_key: API_KEY,
        language: 'ko-KR',
      }
      axios({
        method: 'get',
        url: API_URL,
        params,
      })
      .then(res =>{
        this.popularMovies = res.data.results
        // console.log(res)
        console.log(res.data.results)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created: function (){
    this.getPopulatMovies()
  }
}
</script>

<style>
  .container-fluid {
    width: 100%;
    height: 120%;
    overflow: auto;
  }
  .container-fluid::-webkit-scrollbar {
    width: 10px;
  }
  .container-fluid::-webkit-scrollbar-thumb {
    background-color: rgb(97, 75, 133);
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  .container-fluid::-webkit-scrollbar-track {
    background-color: rgb(169, 162, 206);
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
</style>
