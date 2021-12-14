<template>
  <div class="container">
    <h1>collection 수정</h1>

    <form class="container">
      <div class="mb-3">
        <label for="title" class="form-label">컬렉션 이름</label>
        <input :placeholder="collectionDetail.title" @input="changeTitle" type="text" class="form-control" id="title">
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">컬렉션 소개</label>
        <textarea :placeholder="collectionDetail.content" @input="changeContent" type="text" class="form-control" id="content"></textarea>
      </div>
      <div class="mb-3">
        <span v-for="(tag, index) in tags" :key="index">
          <span class="mx-2"># {{ tag }}</span>
          <v-icon @click="deleteTag(index)" color="red">mdi-close</v-icon>
        </span>
      </div>
      <div class="mb-3">
        <label for="tag" class="form-label">컬렉션 태그</label>
        <input 
          :placeholder="tagErr"
          @keyup.enter="addTag" 
          type="text" 
          class="form-control" 
          id="tag"
          v-model="inputTag"
        >
      </div>
      <div class="mb-3">
        <span v-for="(movie, index) in selectedMovies" :key="index">
          <span class="mx-2"># {{ movie.title }}</span>
          <v-icon @click="deleteMovie(index)" color="red">mdi-close</v-icon>
        </span>
      </div>
      <div class="mb-3">
        <label for="movie" class="form-label">컬렉션 영화</label>
        <input 
          @keyup.enter="searchMovie" 
          type="text" 
          class="form-control" 
          id="movie"
          v-model="inputMovie"
        >
      </div>
      <p v-show="false">
        <button id="movieBtn" class="btn btn-primary" type="button" data-bs-toggle="collapse" 
          data-bs-target="#showMovies" aria-expanded="false" 
          aria-controls="collapseExample">
          Button with data-bs-target
        </button>
      </p>
      <div class="collapse row g-5" id="showMovies">
        <span class="col-12 col-sm-6 col-md-4" v-for="(movie, index ) in movies" :key="index">
          <span class="card" style="width: 15rem;">
            <img
              @click="selectMovie(movie)" 
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
              class="card-img-top" 
              alt="poster_img">
            <div class="card-body">
              <p class="card-text">{{ movie.title }}</p>
            </div>
          </span>
        </span>
      </div>


      <button 
        @click="updateCollect"
        type="button" 
        class="my-3 btn btn-primary"
      >수정</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'updateCollection',
  data: function () {
    return {
      movies: null,
      selectedMovies: [],
      inputMovie: null,
      tags: [],
      inputTag: null,

      title: null,
      content: null,
      tagErr: null,
      isin: false,
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
    deleteMovie: function (index){
      this.selectedMovies.splice(index, 1)
    },
    searchMovie: function (){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/search/${this.inputMovie}`,
      })
      .then(res => {
        console.log(res)
        if (res.data.length == 0) {
          alert('해당 하는 영화가 없습니다.')
        } else {
          document.getElementById('movieBtn').click();
          console.log('dlj')
          this.movies = res.data
          console.log(res)
        }
      })
    },
    selectMovie: function (movie) {
      if (this.selectedMovies.indexOf(movie)<0){
        this.selectedMovies.push(movie)
      }
    },
    getMovies: function () {
      for (var movie in this.collectionDetail.movies){
        this.selectedMovies.push(this.collectionDetail.movies[movie])
      }
      console.log(this.selectedMovies)
      console.log(this.collectionDetail.movies)
    },
    getTags: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/collection/${this.collectionDetail.id}/tags/`
      })
      .then(res=> {
        for (var i = 0; res.data.length; i++) {
          this.tags.push(res.data[i].tag)
        }
        // console.log(this.tags)
      })
    },
    addTag: function (){
      if (this.tags.indexOf(this.inputTag)<0){
        this.tags.push(this.inputTag)
        this.inputTag = null
      }
    },
    deleteTag: function (index){
      this.tags.splice(index, 1)
    },
    changeTitle: function (event){
      this.title = event.target.value
    },
    changeContent: function (event){
      this.content = event.target.value
    },
    updateCollect: function (){
      const data = {
        title: this.title,
        content: this.content,
        movies: this.selectedMovies,
        tags: this.tags
      }
      if (!(data.title) || !(data.content) || !(data.movies) || !(data.tags)){
        alert('빈값이 있어서는 안됩니다.')
      }
      else {
        axios({
          method: 'put',
          url: `http://127.0.0.1:8000/movies/collection/change/${this.collectionDetail.id}/`,
          headers: this.setToken(),
          data: data
        })
        .then((res) => {
          // console.log(res.data)
          this.$store.dispatch('showCollectionDetail', res.data)
          this.$router.push({name:'collectionDetail'}).catch(()=>{})
        })
      }
    },    
  },
  created: function() {
    this.getTags()
    this.getMovies()
  },
  computed: {
    ...mapState([
      'collectionDetail',
    ])
  }
}
</script>

<style>

</style>