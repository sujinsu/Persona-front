<template>
  <div>
    <v-app-bar>
      <h3 class="fw-bold my-auto">
        {{ collectionDetail.title }}
      </h3>
    </v-app-bar>
      
    <v-app id="inspire">
      <v-sheet
        class="mx-auto"
        elevation="0"
        max-width="100%"
      >

        <v-content class="py-3 mx-3">
          <span class="fw-bold m-3 fs-5" v-for="tag in tags" :key="tag.id">
            # {{ tag.tag }} 
          </span>
          <br>
          <div class="mt-2" style="display: flex; justify-content: space-between;">  
            <!-- 좋아요 버튼 /좋아요 수 -->
            <span>
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

            </span>
            <!-- ------------------------------------------------------------------------------ -->

            <span class="m-3" style="align-item: center;">
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
            </span>
          </div>
          <hr>

          <p class="m-3">{{ collectionDetail.content }}</p>
        </v-content>

        <v-slide-group
          v-model="model"
          class="pa-4"
          show-arrows
        >
          <v-slide-item
            v-for="movie in collectionDetail.movies"
            :key="movie.id"
          >
            <v-card
              class="ma-4"
              height="500"
              width="350"
              @click="showDetail(movie)"
            >
              <img width="100%"
                :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
                alt="poster_img">
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>

    </v-app> 

  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'collectionDetail',
  data: function() {
    return {
      isLiked: null, 
      isSame: null,
      tags: null,
      user_cnt: 0,

      model: null,
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
    showDetail: function (movie){
      axios ({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/detail/${movie.api_id}/`,
      })
        .then(res => {
          this.$store.dispatch('showDetail', res)
          if (res.data.title){
            this.$router.push({name: 'MovieDetail'}).catch(()=>{})
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    like: function () {
      axios ({
        method: 'post',
        url: `http://127.0.0.1:8000/movies/${this.collectionDetail.id}/collection/like/`,
        headers: this.setToken(),
      })
      .then(res => {
        this.isLiked = res.data.isCollectionLiked
        this.likeUserCnt()
      })
      .catch(err => {
        console.log(err)
      })
    },
    checkLike: function () {
      if (this.collectionDetail.id){
        axios({
          method: 'post',
          url:  `http://127.0.0.1:8000/movies/${this.collectionDetail.id}/collection/isLiked/`,
          headers: this.setToken(),
        })
        .then(res =>{
          this.isLiked = res.data.isCollectionLiked
        })
        .catch(err =>{
          console.log(err)
        })
      }
    },
    checkUser: function () {
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/movies/collection/user/${this.collectionDetail.id}/`,
        headers: this.setToken()
      })
      .then(res => {
        this.isSame = res.data.isSame
      })
    },
    updateCollection: function () {
      this.$router.push({name: 'updateCollection'})
    },
    getTags: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/collection/${this.collectionDetail.id}/tags/`
      })
      .then(res=> {
        this.tags = res.data
        console.log(this.tags)
      })
    },
    deleteCollection: function () {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/movies/collection/change/${this.collectionDetail.id}/`,
        headers: this.setToken(),
      })
      .then(() =>{
        this.$router.push({name: 'Movies'})
      })
    },
    likeUserCnt: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${this.collectionDetail.id}/collection/like/`
      })
      .then(res => {
        this.user_cnt = res.data.user_cnt
      })
    }
  },
  created: function() {
    this.checkLike()
    this.checkUser()
    this.getTags()
    this.likeUserCnt()
  },
  computed: {
    ...mapState([
      'collectionDetail',
    ])
  },

}
</script>

<style>

</style>