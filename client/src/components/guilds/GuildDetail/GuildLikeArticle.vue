<template>
  <div>
     <v-banner>
      <v-btn
      class="font-weight-bold"
        text
        color="deep-purple accent-4"
      >[My Likes:좋아요]</v-btn>
    </v-banner>
    <br>
    <br>
    <guild-like-article-list    
      :articles="articles"
    >
    </guild-like-article-list>

  </div>
</template>

<script>
import GuildLikeArticleList from '@/components/guilds/GuildDetail/GuildLikeArticleList'
import axios from'axios'
export default {
  name:'GuildLikeArticle',
  data: function () {
    return {
      articles : null,
    }
  },
  components:{
    GuildLikeArticleList,
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
        url: `http://127.0.0.1:8000/guilds/${this.$route.params.id}/mylikearticle/`,
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
    created: function () {
      if (localStorage.getItem('jwt')){
         this.getArticles()
      }else{
        this.$router.push({name:'Login'})
      }
     
    }
}
</script>

<style>

</style>