<template>
  <div>
     <v-banner>
      <v-btn
        class="font-weight-bold"
        text
        color="deep-purple accent-4"    
      >
      [My Recomments]
      </v-btn>
    </v-banner>
    <br>
    <br>
    <guild-recomment-list
      
      :articles="articles"
    >
    </guild-recomment-list>

  </div>
</template>

<script>
import axios from'axios'
import GuildRecommentList from '@/components/guilds/GuildDetail/GuildRecommentList'
export default {
  name:'GuildRecomment',
  components:{
    GuildRecommentList,
  },
  data: function () {
    return {
      articles : null,
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
        url: `http://127.0.0.1:8000/guilds/${this.$route.params.id}/myarticle/`,
        headers:this.setToken() // JWT token
      })
        .then(res => {
          console.log(res.data)
          const allArticles = res.data
          const guildArticles = allArticles.filter(article=>{
            return article.parent_article
          })
          this.articles = guildArticles
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