<template>
<div class="col-3 align-items-start">
    <br>
    <div class="">
   
      <v-btn
        class="font-weight-bold"
        color="purple darken-1 white--text"
      >{{guild.name}}</v-btn>

    <v-card @click="selectGuild">
      <br>
      <img v-if="guild.guild_image" :src="imgSrc" alt="" class="rounded img-size">
      <img v-if="!guild.guild_image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMEAAADACAMAAACKwPcLAAAANlBMVEVmZmb////u8vpwb3D29vbY2NixsbGLi4vi4uKCgoLr6+vPz8+fn594eHjFxcWop6i7u7uVlZUD7tw7AAAEB0lEQVR4nO2ba5ujIAxG2wHBu+3//7MzjnhpV60kr5vBJ+fjri6cQhIE9nZLnC/pDrBRA3nUQB41kEcN5FEDedRAHjWQRw3kUQN51EAeNZBHDeRRA3nUQB41kEcN5FEDedRAHjXYxjxdld17bFa5pzmrnZMMmi6/v5F3zSlNnWJQZ+/dH8jqExo7weBZrve/p3zCm4MbNBu//zQO6LmENujsvsBPXHfYFrEGplp2tXK+6P+08K5ailXQvAQ1MHMCsm3x+ndFO0vkSAWkQTMJWLfSR+PsGQpAg3kEHhsdNI8TFHAGk0Dptx/yJVwBZzAGcbbbNzMm2wrVLsygCz1rPz3YhgdRSRVl0NiDApOCBZU2lEGYHBn62c+ADJ4hiA/FpwnhjFkjgQxCn3ay0BIffCFNYwzqUAeOPh/qAmSxjTEI32KHc7yxuEiAGDTDT+qOv+GGNxDpCGLQRQ7BNAiImgAxyI+WgpmhKOSAxhEGZpgSxecnZ4rhHcDqCGEwFAMb95JFlQSEgaMs1arY4N8CYVBRopKkvQbCIIupxyMeVREQBjY+kMdQjgyeNRAGQ1r5P2/9ixr0qAEPnEHKkZx+NiWV1z9V0dJfVaS/skt/dZ3+F84FvjLT/9JPf7flAjte6e86XmDnN/3d9wucgKR/CnWBk8ALnMamfyK+VEj0VsIFboZc4HbOLf0bUrcL3FL7UWh3BSK3lT6DNvDVXv97yhp7eRZr4D9MoRAJa7mWDNKgONT/Xwfg1VngquLx2svs0fmwvvC+e7zZ4eIBZuCXN33Lx8rXi3cvd7EB23W/oAzcYoq8l+OZxi089xexh8EYmHmOfArTenawkJmE2S/aX9K9MTtAAhphUEwriepQwTXzlAMoAAwmAXt486HIcQp8g/Eb/55HrHhMC1NgG0zfBG1caqlR4cw2GLNQ1N57z6TATKpcg7EQE+rTqMDc+WIaeOoI9NR0+wU8g3EHlCQwK7BCgWcQ5hD5MKkFzCOWQZhD9B3QMZFxUirLIOQhxi56wc9HHIMwjVk7oI4dzByDkjmHekIuYAwCw8AjcuE4kPRIYBjEHmBuMAwC/UyNbhB/iLxOzawJdAOHGYJxEIhFkWPAbHgm/BTU18kGBWBBMBCmY+QdsQmyQccMwAU5K6DIBkMmOnwPYQ/HWhyRDXhD/0IoLMS3qQYFq9U3WL8G1aDmL4tnMk5Zpho4XBiMnxnEUKYakP7XxBYdZ0CpBqR7vluw7v9SDXK8AbG2UA2QqYj3r6kBBgmDv4MayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogz9c3668W/KAjNpwAAAAASUVORK5CYII=" 
        alt=""
        class="rounded img-size"
      >
       <br>
      <!-- 태그 -->
       <guild-tag-item
        v-for="tag in myTags"
        :key="tag.id"
        :tag="tag"
      ></guild-tag-item>
        <br><br>
    </v-card>
    </div>
    <br>
</div>
</template>

<script>
import axios from 'axios'
import GuildTagItem from '@/components/guilds/GuildDetail/GuildTagItem'
export default {
 
  name:'GuildItem',
  components:{
    GuildTagItem
  },
  props:{
    guild:{
      type:Object,
    }
  },
  data:function(){
    return{
      imgSrc:`http://127.0.0.1:8000${this.guild.guild_image}`,
      myTags:[]
    }
  },
  methods:{
    selectGuild:function(){
      // console.log(this.guild)
      this.$store.dispatch('selectGuild',this.guild)
      this.$router.push({name:'GuildDetail', params:{id:this.guild.id}})
    },
    setToken:function(){
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization:`JWT ${token}`
      }
      return config
    },
    // 해당 길드의 태그 조회
    myTag:function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/${this.guild.id}/guildtag_list_update/`,
        // data:{keyword:this.input},
        headers:this.setToken() // JWT token
      })
        .then(res => {
          this.myTags = []
          console.log('태그'+res.data)
          res.data.forEach(tag=>{
            this.myTags.push(tag)
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created:function(){
    this.myTag()
  }
}
</script>

<style scoped>
.img-size{
  width:100px;
  height: 100px;
}
</style>