<template>
  <div >
    <br>
    <h5>My Guild</h5>
    <div class="container row align-items-end" style="background-color: rgb(234, 233, 239)">

      <my-guild-detail
        v-for="guild in myguilds"
        :key="guild.id"
        :guild="guild"
        @deleteGuild="getGuilds"
        
      >
      </my-guild-detail>
      <br>
    </div>
    <br>
  </div>
</template>

<script>
import axios from'axios'
import MyGuildDetail from '@/components/profile/MyGuildDetail'
export default {
  name:"MyGuild",
  data:function(){
    return {
      guilds:null,
      myguilds:[],
    }
  },
  components:{
    MyGuildDetail
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
          // response >> 해당 유저의 길드의 아이디만 들어오기 때문에
          // 2중foreach로 길드들에서 유저 가입 길드를 찾아낸다
          this.myguilds = [] //초기화
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
    console.log('길드가져와')
    this.getGuilds()
  }
}
</script>

<style scoped>
.container {
  margin: 10px auto;
  padding: 20px auto;
  width:60%;
  /* border: 10px solid yellow; */
}

</style>