<template>
  <div class="col" >
    <h4>{{guild.name}}</h4>
      <v-avatar
        @click="moveToGuild"
        size="100"
      >
        <img v-if="guild.guild_image"
          :src="`http://127.0.0.1:8000${this.guild.guild_image}`"
        >
        <img v-if="!guild.guild_image"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMEAAADACAMAAACKwPcLAAAANlBMVEVmZmb////u8vpwb3D29vbY2NixsbGLi4vi4uKCgoLr6+vPz8+fn594eHjFxcWop6i7u7uVlZUD7tw7AAAEB0lEQVR4nO2ba5ujIAxG2wHBu+3//7MzjnhpV60kr5vBJ+fjri6cQhIE9nZLnC/pDrBRA3nUQB41kEcN5FEDedRAHjWQRw3kUQN51EAeNZBHDeRRA3nUQB41kEcN5FEDedRAHjXYxjxdld17bFa5pzmrnZMMmi6/v5F3zSlNnWJQZ+/dH8jqExo7weBZrve/p3zCm4MbNBu//zQO6LmENujsvsBPXHfYFrEGplp2tXK+6P+08K5ailXQvAQ1MHMCsm3x+ndFO0vkSAWkQTMJWLfSR+PsGQpAg3kEHhsdNI8TFHAGk0Dptx/yJVwBZzAGcbbbNzMm2wrVLsygCz1rPz3YhgdRSRVl0NiDApOCBZU2lEGYHBn62c+ADJ4hiA/FpwnhjFkjgQxCn3ay0BIffCFNYwzqUAeOPh/qAmSxjTEI32KHc7yxuEiAGDTDT+qOv+GGNxDpCGLQRQ7BNAiImgAxyI+WgpmhKOSAxhEGZpgSxecnZ4rhHcDqCGEwFAMb95JFlQSEgaMs1arY4N8CYVBRopKkvQbCIIupxyMeVREQBjY+kMdQjgyeNRAGQ1r5P2/9ixr0qAEPnEHKkZx+NiWV1z9V0dJfVaS/skt/dZ3+F84FvjLT/9JPf7flAjte6e86XmDnN/3d9wucgKR/CnWBk8ALnMamfyK+VEj0VsIFboZc4HbOLf0bUrcL3FL7UWh3BSK3lT6DNvDVXv97yhp7eRZr4D9MoRAJa7mWDNKgONT/Xwfg1VngquLx2svs0fmwvvC+e7zZ4eIBZuCXN33Lx8rXi3cvd7EB23W/oAzcYoq8l+OZxi089xexh8EYmHmOfArTenawkJmE2S/aX9K9MTtAAhphUEwriepQwTXzlAMoAAwmAXt486HIcQp8g/Eb/55HrHhMC1NgG0zfBG1caqlR4cw2GLNQ1N57z6TATKpcg7EQE+rTqMDc+WIaeOoI9NR0+wU8g3EHlCQwK7BCgWcQ5hD5MKkFzCOWQZhD9B3QMZFxUirLIOQhxi56wc9HHIMwjVk7oI4dzByDkjmHekIuYAwCw8AjcuE4kPRIYBjEHmBuMAwC/UyNbhB/iLxOzawJdAOHGYJxEIhFkWPAbHgm/BTU18kGBWBBMBCmY+QdsQmyQccMwAU5K6DIBkMmOnwPYQ/HWhyRDXhD/0IoLMS3qQYFq9U3WL8G1aDmL4tnMk5Zpho4XBiMnxnEUKYakP7XxBYdZ0CpBqR7vluw7v9SDXK8AbG2UA2QqYj3r6kBBgmDv4MayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogz9c3668W/KAjNpwAAAAASUVORK5CYII="
        >
      </v-avatar><br>

      <!-- Button trigger modal -->
<!-- <v-btn class="m-2" color="deep-purple darken3 white--text" data-bs-toggle="modal" data-bs-target="#deleteGuild">
  탈퇴
</v-btn> -->

<v-btn class="m-2" color="deep-purple darken3 white--text" @click="deleteGuild" >
  탈퇴
</v-btn>

<!-- Modal -->
<div class="modal fade" id="deleteGuild" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">회원 탈퇴</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        해당 길드를 탈퇴하시겠습니까?
      </div>
      <div class="modal-footer">
        <v-btn color="deep-purple white-text" data-bs-dismiss="modal"
          @click.native="deleteGuild"
        >Yes</v-btn>
        <v-btn color="deep-purple white-text" outlined data-bs-dismiss="modal">No</v-btn>
      </div>
    </div>
  </div>
</div>
      <!-- <button v-if="isManager" class="btn btn-primary" @click="deleteGuild">길드 삭제</button> -->
  </div>
</template>

<script>
import axios from'axios'
export default {
  name:'MyGuildDetail',
  props:{
    guild:{
      type:Object,
    }
  },
  data:function(){
    return {
      isManager:null,
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
    moveToGuild:function(){
      this.$store.dispatch('selectGuild',this.guild)
      this.$router.push({name:'GuildDetail', params:{id:this.guild.id}})
    },
    deleteGuild: function () {
      // 해당 유저가 매니저면 길드 삭제, 아니면 탈퇴
        axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/${this.guild.id}/is_manager/`,
        headers:this.setToken()
        })
        .then(res => {
          console.log(res)
          return res.data.is_manager
        })
        .then(res =>{
          // 매니저면 길드 삭제
          if(res){
            axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/guilds/${this.guild.id}/`,
            headers:this.setToken()
            })
            .then(res => {
              console.log(res)
              this.$emit('deleteGuild')
        
            })
            .catch(err => {
              console.log(err)
            })

          // 회원이면 탈퇴
          }else{
            axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/guilds/${this.guild.id}/is_member/`,
            headers:this.setToken()
            })
            .then(res => {
              console.log(res)
              this.$emit('deleteGuild')
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
  }
}
</script>

<style>
.img-size{
  width:100px;
  height: 100px;
}
</style>