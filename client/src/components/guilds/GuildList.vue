<template>
  <div class="box2 container row align-items-start">
    <br>
    <h5 class="font-weight-bold">전체 길드 목록</h5>
    <br>
      <guild-item
        v-for="guild in guilds"
        :key="guild.id"
        :guild="guild"
      >
      </guild-item>
  </div>
</template>

<script>
import axios from'axios'
import GuildItem from '@/components/guilds/GuildItem'
export default {
  name:'GuildList',
  components:{
    GuildItem,
  },
  data: function () {
    return {
      guilds : null,
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
    getGuilds: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/guilds/',
        headers:this.setToken() // JWT token
      })
        .then(res => {
          // console.log(res.data)
          this.guilds = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    
  },
  created: function () {
    if (localStorage.getItem('jwt')){
      this.getGuilds()
    }else{
      this.$router.push({name:'Login'})
    }
  }
}
</script>

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.box1 {
    width: 500px;
    border-width: 2px;
    border-style: dashed;
    border-color: black;
    padding-left: 50px;
    margin-bottom: 30px;
  }

.box2 {
  /* width: 500px; */
  /* border: 2px solid black; */
  padding: 20px 30px;
  margin: 0 auto;
}
</style>