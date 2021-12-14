<template>

  <div class="border">
    <!-- 투표상황 보여주기 -->
    <div class="container">
      <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" :style="`width: ${(gamedata.vote1/all_vote)*100}%`" :aria-valuenow="`${(gamedata.vote1/all_vote)*100}`" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="progress">
          <div class="progress-bar bg-warning" role="progressbar" :style="`width: ${(gamedata.vote2/all_vote)*100}%`" :aria-valuenow="`${(gamedata.vote2/all_vote)*100}`" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="progress">
          <div class="progress-bar bg-danger" role="progressbar" :style="`width: ${(gamedata.vote3/all_vote)*100}%`" :aria-valuenow="`${(gamedata.vote3/all_vote)*100}`" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>
    
    <!-- 질문 -->
    <div>
      <div @click="isLogin" class="row justify-content-center">
        <h5>Q. {{gamedata.title}}</h5>
        <div @click="click1" class="col-2">
          <h5>1. {{gamedata.option1}}</h5>
          <img class="rounded img-size" :src="gamedata.img1" alt="">
        </div>
        <div @click="click2" class="col-2">
          <h5>2. {{gamedata.option2}}</h5>
          <img class="rounded img-size" :src="gamedata.img2" alt="">
        </div>
        <div @click="click3" class="col-2">
          <h5>3. {{gamedata.option3}}</h5>
          <img class="rounded img-size" :src="gamedata.img3" alt="">
        </div>
      </div>
      <br><br>

      <div v-if="!canVote" class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>투표하고싶으면 로그인!</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>

    </div>
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  name:'BalanceGame',
  data:function(){
    return {
      canVote:true,
      gamedata:{},
      vote_data:null,
      all_vote:null,    
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
    isLogin:function(){
      const token = localStorage.getItem('jwt')
      if(!token){
        this.canVote=false
      }
    },
    // 현재 질문의 결과를 그대로 다시 업데이트
    getUpdate:function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/balancegame/vote_update/${this.gamedata.id}/`,
        // headers:this.setToken() // JWT token
      })
        .then(res => {
          console.log(res.data)
          this.gamedata = res.data
          this.all_vote=res.data.vote1+res.data.vote2+res.data.vote3
        })
        .catch(err => {
          console.log(err)
        })
    },
    getGame:function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/balancegame/`,
        // headers:this.setToken() // JWT token
      })
        .then(res => {
          console.log(res.data)
          this.gamedata = res.data
          this.all_vote=res.data.vote1+res.data.vote2+res.data.vote3
        })
        .catch(err => {
          console.log(err)
        })
    },
    click1:function(){
      this.vote(1)
    },
    click2:function(){
      this.vote(2)
    },
    click3:function(){
      this.vote(3)
    },
    vote:function(num){
      if (num==1){
        this.vote_data = {
          ...this.gamedata,
          vote1:this.gamedata.vote1+1,
       }
      }else if(num==2){
        this.vote_data = {
          ...this.gamedata,
          vote2:this.gamedata.vote2+1,
        }
      }else{
        this.vote_data = {
          ...this.gamedata,
          vote3:this.gamedata.vote3+1,
        }
      }
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/balancegame/vote/`,
        data: this.vote_data,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.getUpdate()
          // this.$router.push({name:'Guilds'})
        })
        .catch(err=>{
          console.log(err)
        })
      },
    },

  created:function(){
    this.getGame()
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


.img-size{
  width:100px;
  height: 100px;
}
</style>