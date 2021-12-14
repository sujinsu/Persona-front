<template>
  <div class="container">
    <br>
    <h5>My Feed</h5>
    <my-feed
      :articles="articles"
    ></my-feed>
  </div>
</template>

<script>
import axios from 'axios'
import MyFeed from'@/components/profile/MyFeed'
export default {
  name:'MyFeedPlace',
  components:{
    MyFeed,
  },
  data:function(){
    return {
      articles:null,
    }
  },
  methods: {
    setToken:function(){
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization:`JWT ${token}`
      }
      return config
    },
    getArticles: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/user_article/`,
        headers:this.setToken() // JWT token
      })
        .then(res => {
          console.log(res)
          this.articles = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created:function(){
    this.getArticles()
  }
}
</script>

<style scope>
.container {
  margin: 10px auto;
  padding: 20px auto;
  width:60%;
  /* border: 10px solid yellow; */
}
</style>