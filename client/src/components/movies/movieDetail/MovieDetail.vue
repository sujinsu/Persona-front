<template>
  <div class="container">
    <v-app-bar>
      <h3 class="fw-bold my-auto">
        {{ movieDetail.data.title }}
      </h3>
    </v-app-bar>
    <v-app>
      <div>
        <b-card no-body class="overflow-hidden" style="max-width: 100%;">
          <b-row no-gutters>
            <b-col md="3">
              <b-card-img :src="`https://image.tmdb.org/t/p/w500${movieDetail.data.poster_path}`" alt="poster image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="9">
              <b-card-body>
                <b-card-text>
                  <div style="text-align: left">
                    <span v-if="isSame">
                      <v-btn
                        class="mx-3"
                        color="danger"
                        fab
                        x-small
                        dark
                        @click="deleteCollection"
                      >
                        <v-icon>mdi-trash-can</v-icon>
                      </v-btn>

                      <v-btn
                        color="primary"
                        fab
                        x-small
                        dark
                        @click="updateCollection"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </span>

                    <v-btn
                      color="indigo"
                      dark
                        fab 
                        data-bs-toggle="modal" 
                        data-bs-target="#ReviewModal"
                        x-small
                        class="mx-3"
                      >
                        <v-icon dark>
                          mdi-pencil
                        </v-icon>
                      </v-btn>


                    <!-- 좋아요 버튼 /좋아요 수 -->
                    <v-btn
                      class="m-3" 
                      fab 
                      dark 
                      x-small 
                      color="pink" 
                      v-if="isLiked"
                      @click="like"
                    >
                      <v-icon dark>
                        mdi-heart
                      </v-icon>
                    </v-btn>

                    <v-btn
                      class="m-3" 
                      fab 
                      dark 
                      x-small 
                      color="danger" 
                      v-else
                      @click="like"
                    >
                      <v-icon dark>
                        mdi-heart
                      </v-icon>
                    </v-btn>

                    <span>좋아요 {{user_cnt}}</span>                    
                  </div>
                </b-card-text>


                <b-card-text>
                  <div style="text-align: left" class="mx-2">
                    <span>개봉일 : {{ movieDetail.data.release_date}}</span> |
                    <span>평점 : {{ movieDetail.data.vote_average }}</span>
                  </div>
                  <!-- <v-rating
                    style="text-align: left"
                    value = {{ this.cur }}
                    background-color="purple lighten-3"
                    color="purple"
                    large
                    half-increments
                  ></v-rating> -->
                </b-card-text>
                <hr>
                <b-card-text>
                  {{movieDetail.data.overview}}
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>

      <!--리뷰 작성 -->
      <div class="modal fade" id="ReviewModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="ModalLabel">리뷰 작성</h5>
              <button type="button" class="btn-close" @click="selectClose"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="needs-validation" novalidate>
                <div class="mb-3">
                  <v-rating
                    v-model="rating"
                    style="text-align: center"
                    background-color="indigo lighten-3"
                    color="indigo"
                    large
                    hover
                    empty-icon="$ratingFull"
                    half-increments
                  ></v-rating>
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">Review</label>
                  <textarea 
                    class="form-control" 
                    id="message-text"
                    v-model.trim="message"
                    required
                  ></textarea>
                  <div :errMsg="errMsg" class="form-text">
                    {{ errMsg }}
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <v-btn @click="selectClose" id="closeBtn"
                depressed data-bs-dismiss="modal"
              >닫기</v-btn>
              <v-btn @click="addReview" type="submit"  color="indigo" style="color: white">리뷰 등록</v-btn>
            </div>
          </div>
        </div>
      </div>


      <div>
        <!-- Using modifiers -->
        <v-btn v-b-toggle.collapse-2 class="m-1" color="indigo" style="color: white">REVIEW</v-btn>

        <!-- Element to collapse -->
        <b-collapse id="collapse-2">
          <b-card>
            <review :reviews="reviews"></review>
          </b-card>
        </b-collapse>
      </div>
    </v-app>

</div>
</template>

<script>
import Review from '@/components/movies/movieReview/Review'

import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'MovieDetail',
  components: {
    Review,
  },
  data: function () {
    return {
      isLiked: null,
      inputMsg: null,
      inputTitle: null,
      rating: 0,
      message: null,
      errMsg: null,
      reviews: [],
      user_cnt: 0,
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
    form: function () {
      const form = {
        movie_title: this.inputTitle,
        message: this.inputMsg,
      }

      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/movies/request/',
        headers: this.setToken(),
        data: form,
      })
      .then(()=> {
        // console.log(res)
        this.$router.push({name: 'Movies'})
      })
      .catch(err => {
        console.log(err)
      })
    },
    like: function () {
      axios ({
        method: 'post',
        url: `http://127.0.0.1:8000/movies/${this.movieDetail.data.id}/like/`,
        headers: this.setToken(),
      })
      .then(res => {
        // console.log(res)
        this.isLiked = res.data.isLiked
        this.likeUserCnt()
      })
      .catch(err => {
        console.log(err)
      })
    },
    addReview: function () {
      const review = {
        movie: this.movieDetail.data.id,
        content: this.message,
        rating: this.rating * 2
      }
      if (review.content){
        // this.isClosed = true
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/movies/${this.movieDetail.data.id}/review/`,
          data: review,
          headers: this.setToken(),
        })
        .then(()=>{
          // console.log(res)
          this.message = null
          this.rating = 0
          this.errMsg = null
          this.getReviews()
          document.getElementById('closeBtn').click();
        })
        .catch(err=>{
          console.log(err)
        })
      } 
      else{
        this.errMsg = '리뷰를 작성해주세요.'
        }
    },
    selectClose: function () {
      this.errMsg = null
    },
    checkLike: function () {
      if (this.movieDetail.data.id){
        axios({
          method: 'post',
          url:  `http://127.0.0.1:8000/movies/${this.movieDetail.data.id}/isLiked/`,
          headers: this.setToken(),
        })
        .then(res =>{
          // console.log(res)
          this.isLiked = res.data.isLiked
        })
        .catch(err =>{
          console.log(err)
        })
      }
    },
    getReviews: function () {
      axios({
        method:'get',
        url: `http://127.0.0.1:8000/movies/${this.movieDetail.data.id}/review/`,
        headers: this.setToken(),
      })
      .then(res=>{
        if (res.data == ""){
          this.reviews = []
        }
        else{
          this.reviews = res.data
        }
      })
    },
    likeUserCnt: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${this.movieDetail.data.id}/like/`
      })
      .then(res => {
        this.user_cnt = res.data.user_cnt
      })
    }
  },
  computed: {
    ...mapState([
      'movieDetail',
    ])
  },
  created: function() {
      this.checkLike()
      this.getReviews()
      this.likeUserCnt()
  }
}
</script>

<style>

</style>