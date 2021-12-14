<template>

    <div class="m-3 card" style="width: 13rem; height:22rem;">
      <img :src="`https://image.tmdb.org/t/p/w500${movieForm.poster_path}`"  class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ movieForm.title }}</h5>
        <p class="card-text">{{ movieForm.content }}</p>
        <v-btn @click="[createMovie(), removeForm()]"
          fab dark x-small color="indigo"
        ><v-icon>mdi-plus</v-icon></v-btn>
        <v-btn
          class="mx-2" dark x-small
          fab @click="removeForm"
          color="pink"
        >
          <v-icon dark>
            mdi-minus
          </v-icon>
        </v-btn>
        
      </div>
    </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'MovieForm',
  props: {
    movieForm: Object,
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },    
    createMovie: function () {
      const movie = {
        api_id: this.movieForm.api_id,
        title: this.movieForm.title,
        overview: this.movieForm.overview,
        poster_path: this.movieForm.poster_path,
        release_date: this.movieForm.release_date,
        vote_average: this.movieForm.vote_average,
        vote_count: this.movieForm.vote_count,
      }
      if (movie.api_id) {
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/movies/0/',
          data: movie,
          headers: this.setToken()
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }      
    },
    removeForm: function () {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/movies/request/${this.movieForm.id}/`,
        headers: this.setToken()
      })
      .then(res=> {
        console.log(res)
        this.$emit('movieFormChange')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>