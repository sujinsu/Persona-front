<template>
  <div>
     <v-card >
        <div>
          '{{ alram.guildname }}' 길드에서 '{{alram.likefrom}}' 님이 
        </div>
        <div class="mx-2 d-inline p-2">
          회원님의 [ {{alram.liked_content}} ] 글을 좋아요 했습니다
        </div>
        <v-icon class="mb-5 me-3 float-right" color="red" @click="deleteAlram">mdi-close</v-icon>
          <p>{{alram.created_at|moment('from', 'now') }}</p>
      </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'MyAlramLikeItem',
  props:{
    alram:{
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
    deleteAlram:function(){
       axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/guilds/like_alram/${this.alram.liked_article}/`,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.$emit('deleteAlram')
          this.$router.push({name:'MyAlram'})
        })
        .catch(err => {
          console.log(err)
        })
      }
  }
}
</script>

<style>

</style>