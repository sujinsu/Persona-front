<template>
  <div>
    <b-card
      rounded
      @click="showDetail"
      :title= popularMovie.title
      :img-src="`https://image.tmdb.org/t/p/w500${popularMovie.poster_path}`" 
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem; height: 22.5rem"
      class="mb-2"
    >
      <b-card-text>
        <p>{{popularMovie.release_date}} | 평점 {{popularMovie.vote_average}}</p>
      </b-card-text>
    </b-card>

    <button v-show="false" type="button" :id="`btn${popularMovie.id}`"
      class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="`#movie${popularMovie.id}`">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" :id="`movie${popularMovie.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{popularMovie.title}} (은)는 없는 영화입니다.</h5>
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
  name: 'PopularMovieItem',
  props: {
    popularMovie: Object,
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
        url: `http://127.0.0.1:8000/movies/detail/${this.popularMovie.id}/`,
      })
        .then(res => {
          if (res.data.title){
            this.$store.dispatch('showDetail', res)
            this.$router.push({name: 'MovieDetail'}).catch(()=>{})
          } else {
            document.getElementById(`btn${this.popularMovie.id}`).click();
            this.requested_movie = this.popularMovie
          }
        })
        .catch((err) => {
          console.log(err)
        }) 
    },
    addForm: function () {
      const movie = {
        api_id: this.popularMovie.id,
        title: this.popularMovie.title,
        overview: this.popularMovie.overview,
        poster_path: this.popularMovie.poster_path,
        release_date: this.popularMovie.release_date,
        vote_average: this.popularMovie.vote_average,
        vote_count: this.popularMovie.vote_count,
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
.card-block {
    min-height: 300px;
}

h4.card-title {
    font-size: 1.2rem;
    font-weight: bold;
}

img.card-img-top{
  height: 14rem;
}

div.card-body{
  height: 10rem;
}
</style>
