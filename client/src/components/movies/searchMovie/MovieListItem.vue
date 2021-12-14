<template>
  <div>
    <!-- <span>
      <img 
        :src="`https://image.tmdb.org/t/p/w500${api_movie.poster_path}`" 
        alt="poster_img"
        @click="showDetail"
        width=200
      >
    </span>
    <span>{{ api_movie.title }}</span>
    <hr> -->

  <div class="card" style="width: 14rem;" @click="showDetail">
    <img class="card-img-top" width="100%" :src="`https://image.tmdb.org/t/p/w500${api_movie.poster_path}`" alt="poster image">
    <div class="card-body">
      <h5 class="card-title">{{ api_movie.title }}</h5>
      <p class="card-text">{{ api_movie.overview }}}</p>
    </div>
  </div>



    <button v-show="false" type="button" :id="`btn${api_movie.id}`"
      class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="`#movie${api_movie.id}`">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" :id="`movie${api_movie.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{api_movie.title}} (은)는 없는 영화입니다.</h5>
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
  name: 'MovieListItem',
  data: function(){
    return {
      requested_movie: null,
    }
  },
  props: {
    api_movie: Object,
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
        url: `http://127.0.0.1:8000/movies/detail/${this.api_movie.id}/`,
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
    addForm: function () {
      const movie = {
        api_id: this.api_movie.id,
        title: this.api_movie.title,
        overview: this.api_movie.overview,
        poster_path: this.api_movie.poster_path,
        release_date: this.api_movie.release_date,
        vote_average: this.api_movie.vote_average,
        vote_count: this.api_movie.vote_count,
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
  },
}
</script>

<style>

</style>

