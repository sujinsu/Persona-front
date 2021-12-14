<template>
  <div>
    <input class="border m-2" type="text" v-model="input" @keyup.enter="getGuilds">
    <v-btn @click="getGuilds" color="purple darken-3 white--text" >검색
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <!-- <b-button variant="outline-dark" @click="getGuilds">검색</b-button> -->
      <div v-if="isClick">
        <p class="m-2">{{new Date() |moment('YYYY-MM-DD HH:mm:ss') }}기준</p>
        <div>{{resultCount}}개의 길드가 검색되었습니다.</div>
        <br>
      </div>
  
    <search-guild-list v-if="isClick" :search_guilds="SearchGuilds"></search-guild-list>
  </div>
</template>

<script>
import axios from'axios'
import SearchGuildList from '@/components/guilds/SearchGuild/SearchGuildList'
export default {
  name:'SearchGuild',
  components:{
    SearchGuildList
  },
  data:function(){
    return{
      isClick:false,
      input:null,
      guilds:null,
      SearchGuilds:[],
      resultCount:null,
    }
  },
  methods:{
    setToken:function(){
      const token = localStorage.getItem('jwt')
      // console.log(token)
      const config = {
        Authorization:`JWT ${token}`
      }
      return config
    },
    // 길드 조회
    getGuilds: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/guilds/',
        headers:this.setToken() // JWT token
      })
        .then(res => {
          // console.log(res.data)
          this.guilds = res.data
          this.search()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 해당 키워드가 들어있는 길드 조회
    search:function(){    
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/search/${this.input}`,
        // data:{keyword:this.input},
        headers:this.setToken() // JWT token
      })
        .then(res => {
          console.log(res.data)
          this.SearchGuilds=[]
          this.guilds.forEach((guild)=>{
            res.data.forEach(data=>{
              if(data.guild == guild.id){
                // 이미 있는 길드면 pass
                if(!(this.SearchGuilds.includes(guild))){
                  this.SearchGuilds.push(guild)
                }
              }
            })
          })
          this.isClick = true
          this.resultCount = this.SearchGuilds.length
        })
        .catch(err => {
          console.log(err)
        })
    },
   
  
  },  
}
</script>

<style>

</style>