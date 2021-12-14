<template>
  <div>
    <v-card class="p-3 mb-1">
      
      <span>사용자 '{{data.user}}'님이 '{{ data.guildname }}' 길드에 가입신청을 하였습니다.</span>
      <v-btn class="ms-5 me-1" color="deep-purple darken3 white--text" @click="getUser">수락</v-btn>
      <v-btn color="deep-purple darken3 white--text" @click="deleteSignup">거절</v-btn>
    </v-card>
    <br>
  </div>
</template>

<script>
import axios from'axios'
export default {
  name:'MyAlramSignupItem',
  props:{
    data:{
      type:Object
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
    // 가입신청 수락
    getUser:function(){
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/guilds/${this.data.guild}/signup_admit_delete/${this.data.user}/`,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.$emit('deleteSignup')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 가입신청 거절
    deleteSignup:function(){
    
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/guilds/${this.data.guild}/signup_admit_delete/${this.data.user}/`,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.$emit('deleteSignup')
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

<style scoped>

</style>