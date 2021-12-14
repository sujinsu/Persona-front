<template>
  <div>
    <br>
    <v-card class="p-3">
      <br>
      <span>{{article.content}}</span>
      <br><br>
      <!-- <p>{{article.created_at|moment('YYYY-MM-DD HH:mm:ss') }}</p> -->
      <span>{{article.created_at|moment('from', 'now',true) }}전에 작성한 글입니다.</span>
      <br>
      <span>{{likeCount}}명이 좋아요 중입니다.</span>
      <button @click="deleteArticle" class="btn btn-danger mx-3">X</button>
      <br><br>
    </v-card>   
  </div>
</template>

<script>
import axios from'axios'
export default {
  name:'MyGuildArticleItem',
  props:{
    article:{
      type:Object,
    }
  },
  data:function(){
    return{
      likeCount:this.article.like_users.length
    }
  },
  methods:{
    setToken:function(){
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization:`JWT ${token}`
      }
      return config
    },
     deleteArticle: function () {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/guilds/${this.$route.params.id}/article/${this.article.id}/`,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.$emit('deleteArticle')
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

<style>

</style>