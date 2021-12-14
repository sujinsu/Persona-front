<template>
  <div @click="getGuilds">
    <div  v-if="article.parent_article">
      <span>'{{article.guild_name}}' 길드에서 '{{article.parent_username}}'님의 글에</span><br>
      <br>
        <p>[{{article.content}}] 라고 Recomment 남겼습니다.</p>
        {{article.created_at|moment('from', 'now') }}
        <hr>
    </div>
    <div v-else>
        <span>'{{article.guild_name}}' 길드에서</span><br>
        <p>[{{article.content}}] 라고 작성하였습니다.</p>
        {{article.created_at|moment('from', 'now') }}
        <hr>
    </div>
  </div>
</template>

<script>
import axios from'axios'
export default {
  name:'MyFeedItem',
  props:{
    article:{
      type:Object,
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
    // 길드 조회
    getGuilds: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/${this.article.guild_id}/`,
        headers:this.setToken() // JWT token
      })
        .then(res => {
          // console.log(res.data)
          this.moveToGuild(res.data)
          
        })
        .catch(err => {
          console.log(err)
        })
    },
    moveToGuild:function(guild){
      this.$store.dispatch('selectGuild',guild)
      this.$router.push({name:'GuildDetail', params:{id:this.article.guild_id}})
      // this.$router.push({name:'Guilds'})
      // this.$router.push({name:'GuildDetail',params:{id:this.article.guild_id}})
    }
  }
}
</script>

<style>

</style>