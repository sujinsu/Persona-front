<template>
  <div>
   <v-card>
     <br>
      <p>해당 길드의 {{article.article_num}}번째 글입니다.</p>
      <!-- 작성자 프로필 사진 -->
      <!-- <img v-if="article.profile_img" :src="article.profile_img" alt="" class="rounded mx-auto d-block img-size">
        <img v-if="!article.profile_img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMEAAADACAMAAACKwPcLAAAANlBMVEVmZmb////u8vpwb3D29vbY2NixsbGLi4vi4uKCgoLr6+vPz8+fn594eHjFxcWop6i7u7uVlZUD7tw7AAAEB0lEQVR4nO2ba5ujIAxG2wHBu+3//7MzjnhpV60kr5vBJ+fjri6cQhIE9nZLnC/pDrBRA3nUQB41kEcN5FEDedRAHjWQRw3kUQN51EAeNZBHDeRRA3nUQB41kEcN5FEDedRAHjXYxjxdld17bFa5pzmrnZMMmi6/v5F3zSlNnWJQZ+/dH8jqExo7weBZrve/p3zCm4MbNBu//zQO6LmENujsvsBPXHfYFrEGplp2tXK+6P+08K5ailXQvAQ1MHMCsm3x+ndFO0vkSAWkQTMJWLfSR+PsGQpAg3kEHhsdNI8TFHAGk0Dptx/yJVwBZzAGcbbbNzMm2wrVLsygCz1rPz3YhgdRSRVl0NiDApOCBZU2lEGYHBn62c+ADJ4hiA/FpwnhjFkjgQxCn3ay0BIffCFNYwzqUAeOPh/qAmSxjTEI32KHc7yxuEiAGDTDT+qOv+GGNxDpCGLQRQ7BNAiImgAxyI+WgpmhKOSAxhEGZpgSxecnZ4rhHcDqCGEwFAMb95JFlQSEgaMs1arY4N8CYVBRopKkvQbCIIupxyMeVREQBjY+kMdQjgyeNRAGQ1r5P2/9ixr0qAEPnEHKkZx+NiWV1z9V0dJfVaS/skt/dZ3+F84FvjLT/9JPf7flAjte6e86XmDnN/3d9wucgKR/CnWBk8ALnMamfyK+VEj0VsIFboZc4HbOLf0bUrcL3FL7UWh3BSK3lT6DNvDVXv97yhp7eRZr4D9MoRAJa7mWDNKgONT/Xwfg1VngquLx2svs0fmwvvC+e7zZ4eIBZuCXN33Lx8rXi3cvd7EB23W/oAzcYoq8l+OZxi089xexh8EYmHmOfArTenawkJmE2S/aX9K9MTtAAhphUEwriepQwTXzlAMoAAwmAXt486HIcQp8g/Eb/55HrHhMC1NgG0zfBG1caqlR4cw2GLNQ1N57z6TATKpcg7EQE+rTqMDc+WIaeOoI9NR0+wU8g3EHlCQwK7BCgWcQ5hD5MKkFzCOWQZhD9B3QMZFxUirLIOQhxi56wc9HHIMwjVk7oI4dzByDkjmHekIuYAwCw8AjcuE4kPRIYBjEHmBuMAwC/UyNbhB/iLxOzawJdAOHGYJxEIhFkWPAbHgm/BTU18kGBWBBMBCmY+QdsQmyQccMwAU5K6DIBkMmOnwPYQ/HWhyRDXhD/0IoLMS3qQYFq9U3WL8G1aDmL4tnMk5Zpho4XBiMnxnEUKYakP7XxBYdZ0CpBqR7vluw7v9SDXK8AbG2UA2QqYj3r6kBBgmDv4MayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogz9c3668W/KAjNpwAAAAASUVORK5CYII=" 
          alt=""
          class="rounded mx-auto d-block img-size"
        > -->
      <v-avatar
        size="100"
      >
          <img v-if="article.profile_img"
            :src="article.profile_img"
          >
          <img v-if="!article.profile_img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMEAAADACAMAAACKwPcLAAAANlBMVEVmZmb////u8vpwb3D29vbY2NixsbGLi4vi4uKCgoLr6+vPz8+fn594eHjFxcWop6i7u7uVlZUD7tw7AAAEB0lEQVR4nO2ba5ujIAxG2wHBu+3//7MzjnhpV60kr5vBJ+fjri6cQhIE9nZLnC/pDrBRA3nUQB41kEcN5FEDedRAHjWQRw3kUQN51EAeNZBHDeRRA3nUQB41kEcN5FEDedRAHjXYxjxdld17bFa5pzmrnZMMmi6/v5F3zSlNnWJQZ+/dH8jqExo7weBZrve/p3zCm4MbNBu//zQO6LmENujsvsBPXHfYFrEGplp2tXK+6P+08K5ailXQvAQ1MHMCsm3x+ndFO0vkSAWkQTMJWLfSR+PsGQpAg3kEHhsdNI8TFHAGk0Dptx/yJVwBZzAGcbbbNzMm2wrVLsygCz1rPz3YhgdRSRVl0NiDApOCBZU2lEGYHBn62c+ADJ4hiA/FpwnhjFkjgQxCn3ay0BIffCFNYwzqUAeOPh/qAmSxjTEI32KHc7yxuEiAGDTDT+qOv+GGNxDpCGLQRQ7BNAiImgAxyI+WgpmhKOSAxhEGZpgSxecnZ4rhHcDqCGEwFAMb95JFlQSEgaMs1arY4N8CYVBRopKkvQbCIIupxyMeVREQBjY+kMdQjgyeNRAGQ1r5P2/9ixr0qAEPnEHKkZx+NiWV1z9V0dJfVaS/skt/dZ3+F84FvjLT/9JPf7flAjte6e86XmDnN/3d9wucgKR/CnWBk8ALnMamfyK+VEj0VsIFboZc4HbOLf0bUrcL3FL7UWh3BSK3lT6DNvDVXv97yhp7eRZr4D9MoRAJa7mWDNKgONT/Xwfg1VngquLx2svs0fmwvvC+e7zZ4eIBZuCXN33Lx8rXi3cvd7EB23W/oAzcYoq8l+OZxi089xexh8EYmHmOfArTenawkJmE2S/aX9K9MTtAAhphUEwriepQwTXzlAMoAAwmAXt486HIcQp8g/Eb/55HrHhMC1NgG0zfBG1caqlR4cw2GLNQ1N57z6TATKpcg7EQE+rTqMDc+WIaeOoI9NR0+wU8g3EHlCQwK7BCgWcQ5hD5MKkFzCOWQZhD9B3QMZFxUirLIOQhxi56wc9HHIMwjVk7oI4dzByDkjmHekIuYAwCw8AjcuE4kPRIYBjEHmBuMAwC/UyNbhB/iLxOzawJdAOHGYJxEIhFkWPAbHgm/BTU18kGBWBBMBCmY+QdsQmyQccMwAU5K6DIBkMmOnwPYQ/HWhyRDXhD/0IoLMS3qQYFq9U3WL8G1aDmL4tnMk5Zpho4XBiMnxnEUKYakP7XxBYdZ0CpBqR7vluw7v9SDXK8AbG2UA2QqYj3r6kBBgmDv4MayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogz9c3668W/KAjNpwAAAAASUVORK5CYII="
          >
      </v-avatar>

      <h4 class="m-2">{{article.nickname}}</h4>
      <br>
      <img v-if="article.img" width=200 :src="imgSrc" alt="" 
      class="rounded mx-auto d-block img-size">
       <br>
       <div class="container">
        <p class="border p-2">{{article.content}}</p>
      </div>
      <br>
      <p>{{article.created_at|moment('YYYY-MM-DD HH:mm:ss') }}</p>
      <!-- 참조글 있다면 -->
      
      <div v-if="article.parent_article">
        <v-btn color="deep-purple" outlined><v-icon>mdi-share-outline</v-icon></v-btn>
        {{article.parent_article}}번째 글을 리트윗 하는 글입니다.</div>
      
      <!-- 좋아요 사람 수 & 좋아요 동작 -->
      <br>
      <span>{{likeUserCount}}명이 좋아하는 글입니다.</span>
      <v-btn 
          outlined
         color="deep-purple"
          v-if="isLike"
          class="ms-2" 
          @click="[like(),deleteLikeAlram()]">
          <span>좋아요 취소</span>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn  
          outlined
          color="deep-purple"
          class="ms-2" 
          v-if="!isLike" @click="[like(),likeAlram()]">
          <span>좋아요</span>
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
      <!-- <button v-if="isLike" class="btn btn-secondary" @click="like">좋아요 취소</button>
      <button v-else class="btn btn-secondary" @click="like">좋아요</button> -->

      <!-- 해당 글을 recomment : 회원만 -->
        <v-btn
          v-if="isMember"
          @click="recomment" 
          color="deep-purple white--text"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal" 
          data-bs-placement="top" 
          title="이 글에 대해 코멘트 남기기"
          >
          RECOMMENT
        </v-btn>    
      <hr>
    </v-card>
  </div>
</template>

<script>
import axios from'axios'

export default {
  name:'GuildArticleItem',
  props:{
    article:{
      type:Object,
    },
    user:{
      type:Number
    },
    nickname:{
      type:String
    },
    isMember:{
      type:Boolean
    }
  },
  data:function(){
    return {
      isMine:false,
      

      isLike:null,
      likeUserCount:null,
      re_article:{
        content:null,
      },
      imgSrc:`http://127.0.0.1:8000${this.article.img}`,
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
    
    // 특정 글 click >> 리트윗과 같이 참조하며 글 작성 
    recomment:function(){
      // this.$store.dispatch('recomment',{nickname:this.article.nickname,article_num:this.article.article_num})
      this.$emit('recomment',
      {article_num:this.article.article_num,
      guild_name:this.article.guild_name,
      parent_username:this.article.nickname
      })
    },
    // 좋아요 버튼 초기 정보대로 조회
    isLikeCheck:function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/${this.$route.params.id}/article/${this.article.id}/like/`,
        headers:this.setToken()
      })
        .then(res => {
          // console.log(res)
          this.isLike = res.data.isLike
          this.likeUserCount = res.data.likeUserCount
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 좋아요 버튼 click >> DB 반영 및 상태 업데이트
    like:function(){
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/guilds/${this.$route.params.id}/article/${this.article.id}/like/`,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.isLike = res.data.isLike
          this.likeUserCount = res.data.likeUserCount
        })
        .catch(err => {
          console.log(err)
        })
    },
    likeAlram:function(){
      const likeData = {
        // likefrom_id:this.user,
        likefrom : this.nickname,
        liked_article:this.article.id,
        liked_content:this.article.content,
        guild:this.article.guild_id,
        guildname:this.article.guild_name,
        liketo:this.article.user,
      }
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/guilds/like_alram/${this.article.id}/`,
        data:likeData,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteLikeAlram:function(){
       axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/guilds/like_alram/${this.article.id}/`,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created:function(){
    this.isLikeCheck()
    // 현재 유저(GuildeArticleList에서 props로 받은) 값과 비교
    if(this.user== this.article.user){
      this.isMine = true
    }
  },
}
</script>

<style scoped>
.img-size{
  width:150px;
  height: 150px;
}
.container{
  width:60%;
  /* padding:10px; */
  margin-right: auto;
  margin-left: auto;
}
</style>
