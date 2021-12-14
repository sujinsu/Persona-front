<template>
  <div>
    <div class="container box2 row bg-white border" style="background-color: rgb(234, 233, 239)">
      <h4 class="font-weight-bold">My Guild</h4>
      <br><br>
        <user-guild-item
        v-for="guild in myguilds"
        :key="guild.id"
        :guild="guild"
      >
    </user-guild-item>
    </div>
    
  </div>
</template>

<script>
import axios from'axios'
import UserGuildItem from '@/components/guilds/UserGuildItem'
export default {
  name:"UserGuildList",
  data:function(){
    return {
      guilds:null,
      myguilds:[],
    }
  },
  components:{
    UserGuildItem,
  },
  methods:{
    setToken:function(){
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization:`JWT ${token}`
      }
      return config
    },
    getMyGuild:function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/myguild/`,
        headers:this.setToken() // JWT token
      })
        .then(res => {
          // console.log(res.data)
          // console.log(this.guilds)
          // this.articles = res.data
          this.guilds.forEach((guild)=>{
            res.data.forEach(data=>{
              if(data.guild == guild.id){
                this.myguilds.push(guild)
              }
            })
          })
          // this.myguilds = my_guild
          console.log(this.myguilds)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getGuilds: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/guilds/',
        headers:this.setToken() // JWT token
      })
        .then(res => {
          // console.log(res.data)
          this.guilds = res.data
          this.getMyGuild()
        })
        .catch(err => {
          console.log(err)
        })
    },

  },
  created:function(){
    this.getGuilds()
  }
}
</script>

<style scoped>
.box2 {
  /* width: 500px; */
  /* border: 2px solid black; */
  padding: 20px 30px;
  margin: 0 auto;
}

</style>