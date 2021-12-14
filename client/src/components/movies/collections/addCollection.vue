<template>
  <div class="container">
    <h1 class="py-3">MY COLLECTION 생성</h1>

    <form class="container">
      <div class="mb-3">
        <label for="title" class="form-label">컬렉션 이름</label>
        <input v-model="title" type="text" class="form-control" id="title">
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">컬렉션 소개</label>
        <textarea v-model="content" type="text" class="form-control" id="content"></textarea>
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
          @keyup.enter="addTag" 
          type="text" 
          class="form-control" 
          id="tag"
          v-model="inputValue"
        >
      </div>
      <div class="mb-3">
        <span v-for="(selectedMovie, index) in selectedMovies" :key="index">
          <span class="mx-2"># {{ selectedMovie }}</span>
          <v-icon @click="deleteMovie(index)" color="red">mdi-close</v-icon>
        </span>
      </div>
      <div class="mb-3">
        <label for="movie" class="form-label">컬렉션 영화</label>
        <input 
          @keyup.enter="addMovie" 
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
        <span class="col-8 col-sm-4 col-md-2" v-for="(movie, index ) in movies" :key="index">
          <span class="card" style="width: 8rem; height: 15rem">
            <img
              @click="selectMovie(movie)" width="8rem"
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
        @click="createCollection"
        type="button" 
        class="my-3 btn btn-primary"
      >만들기</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'addCollection',
  data: function (){
    return {
      title: null,
      content: null,
      movies: [],
      tags: [],
      inputValue: null,
      inputMovie: null,
      selectedMovies: [],
      selectedMovieIds: [],
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
    addTag: function (){
      if (this.tags.indexOf(this.inputValue)<0){
        this.tags.push(this.inputValue)
        this.inputValue = null
      }
    },
    deleteTag: function (index){
      this.tags.splice(index, 1)
    },
    addMovie: function (){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/search/${this.inputMovie}`,
      })
      .then(res => {
        console.log(res)
        this.movies = res.data
        document.getElementById('movieBtn').click();
        // if (res.data == ''){
        //   console.log('해당 하는 영화가 없습니다.')
        // }
      })
      .catch(err => {
        console.log(err)
      })
    },
    selectMovie: function (movie) {
      if (this.selectedMovies.indexOf(movie.title)<0){
        this.selectedMovies.push(movie.title)
        this.selectedMovieIds.push(movie.id)
      }
    },
    deleteMovie: function (index){
      this.selectedMovies.splice(index, 1)
    },
    createCollection: function () {
      const collectionInfo = {
        title: this.title,
        content: this.content,
        movies: this.selectedMovieIds,
        tags: this.tags,
      }
      
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/movies/collection/0/',
        data: collectionInfo,
        headers: this.setToken(),
      })
      .then(res => {
        console.log(res)
        this.$router.push({name: 'Movies'}).catch(()=>{})
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
}
</script>

<style>

</style>