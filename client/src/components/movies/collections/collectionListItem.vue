<template>
  <!-- <span class="m-3">
    <div @click="showCollectionDetail" class="card" style="width: 16rem; height: 28rem;">
      <div class="card-img-top">
        <span 
          v-for="movie in randomMovies"
          :key="movie.id">
          <img 
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="poster_img" width=127>
        </span>
      </div>
      <div class="card-body">
        <p class="card-text fw-bold fs-4">{{ collection.title }}</p>
      </div>
    </div>
  </span> -->

  <v-slide-item>
    <v-card
      class="ma-4" rounded-xl
      height="500" width="350"
      @click="showCollectionDetail"
    >
      <span 
        v-for="movie in randomMovies"
        :key="movie.id">
        <img 
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="poster_img" width=175>
      </span>
      <!-- <v-title>
        {{collection.title}}
      </v-title> -->
    </v-card>
  </v-slide-item>


</template>

<script>
import _ from 'lodash'

export default {
  name: 'collectionListItem',
  props: {
    collection: Object,
  },
  data: function (){
    return {
      randomMovies: null,
    }
  },
  methods: {
    randomMovieImg: function (){
      this.randomMovies = _.sampleSize(this.collection.movies, 4)
      // console.log(this.randomMovies)    
    },
    showCollectionDetail: function (){
      this.$store.dispatch('showCollectionDetail', this.collection)
      // console.log(this.collection) -> dict
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