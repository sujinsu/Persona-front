<template>

  <div id="app">
    <v-app id="inspire">
      <v-sheet
        class="mx-auto"
        elevation="0"
        max-width="100%"
      >
        <v-slide-group
          class="pa-4"
          show-arrows
        >
          <v-slide-item
            v-for="(movie, idx) in randomMovies"
            :key="idx"
          >
            <v-card
              rounded-lg
              class="ma-4"
              height="290"
              width="200"
              @click="selectMovie(movie)"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <img width="100%"
                    :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
                    alt="poster_img">
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      
      <span
        v-for="(title, idx) in selectedMovieTitle"
        :key="idx"
      >
      # {{ title }}
      <v-icon @click="deleteMovie(idx)" color="red">mdi-close</v-icon>
      </span>


      <v-dialog
        v-model="dialog"
        width="400"
        height="800"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            style="background-color: rgb(86, 61, 124); color: white"
            dark
            v-bind="attrs"
            v-on="on"
            @click="getRecommendation"
          >
            추천 영화
          </v-btn>
        </template>
  
        <v-card v-if="recommended.title">
          <v-card-title class="text-h5 grey lighten-2" 
            style="background-color: rgb(234, 233, 239); color: rgb(86, 61, 124);">
            {{recommended.title}}
          </v-card-title>

          <v-img
            m-auto
            :src="`https://image.tmdb.org/t/p/w500${recommended.poster_path}`"
            width="400"
            height="400"

          ></v-img>
  
          <v-card-text class="my-4">
           {{recommended.overview}}
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="pink"
              text
              @click="getRecommendation"
            >
              다시 추천 받기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-app>
  </div>

</template>

<script>
import axios from 'axios'
import _ from 'lodash'

const API_KEY = '33c92174424e6041356c6c55bacd64e2'

export default {
  name: 'MovieRecommendation',
  data: function() {
    return {
      randomMovies : null,
      selectedMovies: [],
      selectedMovieTitle: [],
      randomNum: null,
      recommended: "",
      dialog:false,
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
    getRandomMovies: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/recommendations/',
        headers: this.setToken()
      })
      .then(res => {
        this.randomMovies = res.data
      })
      .catch(err =>{
        console.log(err)
      })
    },
    selectMovie: function (movie){
      if (this.selectedMovies.indexOf(movie.api_id)<0){
        this.selectedMovies.push(movie.api_id)
        this.selectedMovieTitle.push(movie.title)
        // console.log(this.selectedMovieTitle)
      }
    },
    deleteMovie: function (idx){
      this.selectedMovieTitle.splice(idx, 1)
      this.selectedMovies.splice(idx, 1)
      console.log(this.selectedMovieTitle)
    },
    getRecommendation: function(){
      if (this.selectedMovies.length) {
        this.randomNum = _.sample(this.selectedMovies, 1)
        console.log(this.randomNum)
        const params = {
          api_key: API_KEY,
          language: 'ko-KR',
        }
        axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/movie/${this.randomNum}/recommendations`,
          params: params,
        })
        .then(res => {
          this.recommended = _.sample(res.data.results)
          console.log(this.recommended)
        })
      }
      else{
        this.dialog = false
        alert('영화를 추천받으려면 영화를 선택해주세요!')
        this.recommended.title = ""
      }
    }
  },
  created: function () {
    this.getRandomMovies()
  }
}
</script>

<style>

</style>