<template>
  <div class="container rounded d-flex flex-wrap justify-content-center">
    <div @click="showCollectionDetail" class="card" style="width: 16rem; height:">
      <div class="card-img-top">
        <span 
          v-for="movie in randomMovies"
          :key="movie.id">
          <img 
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="poster_img" width=127>
        </span>
      </div>
      <div class="card-body" style="height:4rem;">
        <p class="card-text">{{ collection.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'searchCollectionItem',
  props: {
    collection: Object,
  },
  data: function (){
    return {
      imgUrl: 'https://w.namu.la/s/e2fc7d0abeb0154521ad9ffda580a6ee578345803a74585d1f59415e60ca0f4953d0f08abaa93eca7a1fe8fe8cf08183b370ad804630059183bb629fef31e86bc01a9a91b10797059ea5debcd407c049',
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
      // console.log(this.collection)
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