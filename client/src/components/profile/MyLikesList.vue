<template>
  <div>
    <div v-if="result.poster_path" @click="showDetail" 
      class="card my-3 rounded" style="width: 13rem;">
      <img 
        :src="`https://image.tmdb.org/t/p/w500${result.poster_path}`" 
        alt="poster_img" class="card-img-top"
      >
      <div class="card-body" style="height:4rem;">
        <h5 class="card-title fw-bold">{{result.title}}</h5>
      </div>
    </div>

    <div v-else @click="showCollectionDetail" class="card my-3" style="width: 16rem;">
      <div class="card-img-top">
        <span 
          v-for="movie in randomMovies"
          :key="movie.id">
          <img 
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="poster_img" width=127>
        </span>
      </div>
      <div class="card-body" style="height:4rem;">
        <p class="card-text fw-bold">{{ result.title }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'MyLikesList',
  data: function(){
    return {
      randomMovies: null,
    }
  },
  props: {
    result: Object,
  },
  methods: {
    randomMovieImg: function (){
      this.randomMovies = _.sampleSize(this.result.movies, 4)   
    },
    showDetail: function (){
      axios ({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/detail/${this.result.api_id}/`,
      })
        .then(res => {
          if (res.data.title){
            this.$store.dispatch('showDetail', res)
            // console.log(this.$route.name)
            this.$router.push({name: 'MovieDetail'}).catch(()=>{})
          } else {
            document.getElementById(`btn${this.api_movie.id}`).click();
            this.requested_movie = this.api_movie
          }
        })
        .catch((err) => {
          console.log(err)
        }) 
    },
    showCollectionDetail: function (){
      this.$store.dispatch('showCollectionDetail', this.result)
      this.$router.push({name: 'collectionDetail'}).catch(()=>{})
    }
  },
  created: function (){
    this.randomMovieImg()
  }
}
</script>

<style>

</style>