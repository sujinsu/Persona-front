<template>
  <div>
    <h4>{{ movie.title }}</h4>
    <p>{{ movie.release_date }}</p>
    <img 
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
      alt="poster_img"
      width=200
    >

    <span v-if="isDB">
      <v-btn
        @click="isInDB" class="mx-3"
        fab dark x-small color="primary"
        :data-bs-target="`#updateMovie${movie.id}`" 
        data-bs-toggle="modal"
        data-bs-whatever="@getbootstrap"  
      >
        <v-icon dark>
          mdi-pencil
        </v-icon>
      </v-btn>

      <v-btn
        class="mx-3" @click="deleteMovie()" dark x-small
        fab color="pink"
      >
        <v-icon dark>
          mdi-minus
        </v-icon>
      </v-btn>
    </span>
    
    <v-btn v-else @click="createMovie"
          fab dark x-small color="indigo" class="mx-3"
        ><v-icon>mdi-plus</v-icon></v-btn>
    <hr>

    <!-- Modal -->
    <div class="modal fade" :id="`updateMovie${movie.id}`" tabindex="-1" 
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">영화 [{{ movie.title }}] 수정</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">제목</label>
                <input v-model="title" type="text" class="form-control" id="recipient-name">
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">줄거리</label>
                <textarea v-model="overview" class="form-control" id="message-text"></textarea>
              </div>
              <div class="mb-3">
                <label for="poster-path" class="col-form-label">포스터 이미지 경로</label>
                <input v-model="poster_path" type="text" class="form-control" id="poster-path">
              </div>
              <div class="mb-3">
                <label for="date" class="col-form-label">개봉일</label>
                <input v-model="release_date" type="date" class="form-control" id="date">
              </div>
            </form>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button @click="updateMovie"
              type="button" class="btn btn-primary" data-bs-dismiss="modal"
            >수정</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SearchMovieListItem',
  data: function () {
    return {
      isDB: null,
      title: this.movie.title,
      overview: this.movie.overview,
      poster_path: this.movie.poster_path,
      release_date: this.movie.release_date,
    }
  },
  props: {
    movie: Object,
  },
  methods:{
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    createMovie: function () {
      const movie = {
        api_id: this.movie.id,
        title: this.movie.title,
        overview: this.movie.overview,
        poster_path: this.movie.poster_path,
        release_date: this.movie.release_date,
        vote_average: this.movie.vote_average,
        vote_count: this.movie.vote_count,
      }
      if (movie.api_id) {
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/movies/0/',
          data: movie,
          headers: this.setToken()
        })
          .then(res => {
            if (res.data == ""){
              alert('이미 등록된 영화입니다.')
            }
            this.isInDB()
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    isInDB: function() {
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/movies/${this.movie.id}/check/`
      })
      .then(res => {
        this.isDB = res.data.isInDB
      })
    },
    deleteMovie: function(){
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/movies/change/${this.movie.id}/`,
        headers: this.setToken()
      })
      .then(() =>{
        this.isInDB()
      })
    },
    updateMovie: function () {
      const updatedData = {
        title: this.title,
        overview: this.overview,
        poster_path: this.poster_path,
        release_date: this.release_date,
      }
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/movies/change/${this.movie.id}/`,
        data: updatedData,
        headers: this.setToken(),
      })
      // .then(res => {
      //   console.log(res)
      // })
      .catch(err =>{
        console.log(err)
      })
    }
  },
  created: function () {
    this.isInDB()
  }
}
</script>
<style>

</style>