<template>
  <div class="container">
    <!-- 해당 유저 알림 : 길드매니저 >> 가입신청처리, 일반 유저 >> 작성글 관련 알림 -->
    <br>
    <h5>My Alram</h5>
    <!-- <button @click="managerCheck">새로고침</button> -->
    <my-alram-list
     :requestData="requestData"
     :likeAlrams="likeAlrams"
     @deleteSignup="managerCheck"
     @deleteAlram="deleteAlram"
    >
    </my-alram-list>
  </div>
</template>

<script>
import axios from'axios'
import MyAlramList from '@/components/profile/MyAlarmList.vue'
export default {
  name:'MyAlram',
  components:{
    MyAlramList,
  },
  data:function(){
    return{
      managedGuild:null,
      requestData:[],
      likeAlrams:null
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
    // 작성글에 달린 좋아요 알림 조회
     getLikeAlram:function(){
       axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/like_alram_list/`,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.likeAlrams = res.data
        })
        .catch(err => {
          console.log(err)
        })
        
    },
    deleteAlram:function(){
      this.getLikeAlram()
    },
    // 매니저라면 >> 새로운 GuildSignup  >> GuildUser에 넣기 or 요청 삭제
    managerCheck:function(){
      // 초기화 후 다시 
      this.requestData = []
      // 현재 유저가 길드 매니저인 길드 조회
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/user_manager/`,
        headers:this.setToken()
      })
        .then(res => {
          
          this.managedGuild = res.data
          return res.data
        })
        .then(res=>{
          
          // 매니저인 길드가 있다면 새로운 Signup 확인  
          if(res){
            axios({
              method: 'get',
              url: `http://127.0.0.1:8000/guilds/guild_signup_list/`,
              headers:this.setToken() // JWT token
            })
              .then(res => {
                console.log(this.managedGuild)
                console.log(res)
                // 관리해야할 길드의 가입신청을 발견하면
                this.managedGuild.forEach((guild)=>{
                  res.data.forEach((data)=>{
                    if(data.guild == guild.id){
                      const temp = {
                        user: data.user,
                        guild:data.guild,
                        guildname:guild.name
                      }
                    if (!(temp in this.requestData)){
                      this.requestData.push(temp)
                    }
                      
                    }
                  })
                })
                console.log(this.requestData)
              })
              .catch(err => {
                console.log(err)
              }) 
         
          }
          
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created:function(){
    this.managerCheck()
    this.getLikeAlram()
  }
}

</script>

<style>

</style>