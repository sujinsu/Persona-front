<template>
  <div>
    <span>
      <img 
        :src="`https://image.tmdb.org/t/p/w500${upcomingMovie.poster_path}`" 
        alt="poster_img"
        @click="showDetail"
        width=200
      >
    </span>
    <span>{{ upcomingMovie.title }}</span>
    <hr>


    <button v-show="false" type="button" :id="`btn${upcomingMovie.id}`"
      class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="`#movie${upcomingMovie.id}`">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" :id="`movie${upcomingMovie.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{upcomingMovie.title}} (은)는 없는 영화입니다.</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            해당 영화를 등록 요청하시겠습니까?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
              @click="addForm"
            >등록 요청</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UpcomingMovieItem',
  props: {
    upcomingMovie: Object,
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    showDetail: function (){
      axios ({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/detail/${this.upcomingMovie.id}/`,
      })
        .then(res => {
          if (res.data.title){
            this.$store.dispatch('showDetail', res)
            this.$router.push({name: 'MovieDetail'}).catch(()=>{})
          } else {
            document.getElementById(`btn${this.upcomingMovie.id}`).click();
            this.requested_movie = this.upcomingMovie
          }
        })
        .catch((err) => {
          console.log(err)
        }) 
    },
    addForm: function () {
      const movie = {
        api_id: this.upcomingMovie.id,
        title: this.upcomingMovie.title,
        overview: this.upcomingMovie.overview,
        poster_path: this.upcomingMovie.poster_path,
        release_date: this.upcomingMovie.release_date,
        vote_average: this.upcomingMovie.vote_average,
        vote_count: this.upcomingMovie.vote_count,
      }  
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/movies/request/',
        data: movie,
        headers: this.setToken()
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