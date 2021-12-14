<template>
  <div>

    <v-banner>
    <v-btn
      class="font-weight-bold"
      text
      color="deep-purple accent-4"    
    >
    [My Articles]
    </v-btn>
    </v-banner>
    <my-guild-article-list
      :articles="articles"
      @deleteArticle="getArticles"
    >
    
    </my-guild-article-list>

  </div>
</template>

<script>
import MyGuildArticleList from '@/components/guilds/GuildDetail/MyGuildArticleList'
import axios from'axios'
export default {
  name:'MyGuildArticle',
  data: function () {
    return {
      articles : null,
    }
  },
  components:{
    MyGuildArticleList,
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
        url: `http://127.0.0.1:8000/guilds/${this.$route.params.id}/myarticle/`,
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