<template>
  <div class="container">
    <v-pp>
      <p>{{ review.content }}</p>

      <span>작성인: {{ username }}</span> | 
      <span>작성일: {{ review.created_at | moment('YYYY-MM-DD') }}</span>

      <v-btn
        class="m-3" 
        fab 
        dark 
        x-small 
        color="pink" 
        v-if="isLiked"
        @click="reviewLike"
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
        @click="reviewLike"
      >
        <v-icon dark>
          mdi-heart
        </v-icon>
      </v-btn>
      <span>좋아요 {{user_cnt}}</span>
      <hr>
    </v-pp>
  </div>
</template>

<script>
import Vue from 'vue' 
import vueMoment from 'vue-moment'
import axios from 'axios'
import { mapState } from 'vuex'

Vue.use(vueMoment)

export default {
  name: 'ReviewItem',
  data: function() {
    return {
      username: null,
      user_id: null,
      isLiked: null,
      user_cnt: 0,
    }
  },
  props: {
    review: Object,
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    reviewUser: function (){
      axios({
        method:'get',
        url:`http://127.0.0.1:8000/movies/${this.review.id}/review/user/`
      })
      .then(res=>{
        this.username = res.data.username
        this.user_id = res.data.user_id
      })
      .catch(err=>{
        console.log(err)
      })
    },
    reviewLike: function (){
      axios({
        method: 'POST',
        url: `http://127.0.0.1:8000/movies/${this.review.id}/review/like/`,
        headers: this.setToken(),
      })
      .then(res=>{
        this.isLiked = res.data.isReviewLiked
        this.likeUserCnt()
      })
      .catch(err=>{
        console.log(err)
      })
    },
    checkLike: function (){
      axios({
        method:'post',
        url: `http://127.0.0.1:8000/movies/${this.review.id}/review/isLiked/`,
        headers: this.setToken(),
      })
      .then(res=>{
        this.isLiked = res.data.isReviewLiked
      })
      .catch(err=>{
        console.log(err)
      })
    },
    likeUserCnt: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${this.review.id}/review/like/`
      })
      .then(res => {
        this.user_cnt = res.data.user_cnt
      })
    }
  },
  created: function() {
    this.reviewUser()
    this.checkLike()
    this.likeUserCnt()
  },
  computed: {
    ...mapState([
      'movieDetail',
    ])
  }
}
</script>

<style>

</style>