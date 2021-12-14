<template>
  <div class="col-2 m-3">
    <b-card @click="showDetail" :title="movie.title" 
      :img-src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" img-alt="Image" img-top>
      <b-card-text>
        {{movie.overview}}
      </b-card-text>
      <template #footer>
        <small class="text-muted">개봉일 : {{movie.release_date}}</small>
      </template>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'sortedMovieItem',
  props: {
    movie: Object,
    movieNum: Number,
  },
  methods: {
    showDetail: function (){
      console.log(this.movie)
      axios ({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/detail/${this.movie.api_id}/`,
      })
        .then(res => {
          this.$store.dispatch('showDetail', res)
          if (res.data.title){
            this.$router.push({name: 'MovieDetail'})
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getLoopNum: function(){

    }
  },
  created: function (){

  }
}
</script>

<style>
.card-text {
  overflow: hidden; 
  text-overflow: ellipsis; 
  display: -webkit-box; 
  -webkit-line-clamp: 3;  
  -webkit-box-orient: vertical; 
}
</style>