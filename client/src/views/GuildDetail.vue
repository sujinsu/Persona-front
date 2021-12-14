<template>
  <div class="container bg-light border rounded">
    <div>
      <br>
      <h4 class="font-weight-bold">{{selectGuild.name}}</h4>
      <br>
    <div class="bg-white border">
      <br>

      <div class="d-flex justify-content-center align-items-start">
        <img v-if="selectGuild.guild_image" 
          :src="`http://127.0.0.1:8000${this.selectGuild.guild_image}`" alt="" 
          class="rounded img-size">
        <img v-if="!selectGuild.guild_image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMEAAADACAMAAACKwPcLAAAANlBMVEVmZmb////u8vpwb3D29vbY2NixsbGLi4vi4uKCgoLr6+vPz8+fn594eHjFxcWop6i7u7uVlZUD7tw7AAAEB0lEQVR4nO2ba5ujIAxG2wHBu+3//7MzjnhpV60kr5vBJ+fjri6cQhIE9nZLnC/pDrBRA3nUQB41kEcN5FEDedRAHjWQRw3kUQN51EAeNZBHDeRRA3nUQB41kEcN5FEDedRAHjXYxjxdld17bFa5pzmrnZMMmi6/v5F3zSlNnWJQZ+/dH8jqExo7weBZrve/p3zCm4MbNBu//zQO6LmENujsvsBPXHfYFrEGplp2tXK+6P+08K5ailXQvAQ1MHMCsm3x+ndFO0vkSAWkQTMJWLfSR+PsGQpAg3kEHhsdNI8TFHAGk0Dptx/yJVwBZzAGcbbbNzMm2wrVLsygCz1rPz3YhgdRSRVl0NiDApOCBZU2lEGYHBn62c+ADJ4hiA/FpwnhjFkjgQxCn3ay0BIffCFNYwzqUAeOPh/qAmSxjTEI32KHc7yxuEiAGDTDT+qOv+GGNxDpCGLQRQ7BNAiImgAxyI+WgpmhKOSAxhEGZpgSxecnZ4rhHcDqCGEwFAMb95JFlQSEgaMs1arY4N8CYVBRopKkvQbCIIupxyMeVREQBjY+kMdQjgyeNRAGQ1r5P2/9ixr0qAEPnEHKkZx+NiWV1z9V0dJfVaS/skt/dZ3+F84FvjLT/9JPf7flAjte6e86XmDnN/3d9wucgKR/CnWBk8ALnMamfyK+VEj0VsIFboZc4HbOLf0bUrcL3FL7UWh3BSK3lT6DNvDVXv97yhp7eRZr4D9MoRAJa7mWDNKgONT/Xwfg1VngquLx2svs0fmwvvC+e7zZ4eIBZuCXN33Lx8rXi3cvd7EB23W/oAzcYoq8l+OZxi089xexh8EYmHmOfArTenawkJmE2S/aX9K9MTtAAhphUEwriepQwTXzlAMoAAwmAXt486HIcQp8g/Eb/55HrHhMC1NgG0zfBG1caqlR4cw2GLNQ1N57z6TATKpcg7EQE+rTqMDc+WIaeOoI9NR0+wU8g3EHlCQwK7BCgWcQ5hD5MKkFzCOWQZhD9B3QMZFxUirLIOQhxi56wc9HHIMwjVk7oI4dzByDkjmHekIuYAwCw8AjcuE4kPRIYBjEHmBuMAwC/UyNbhB/iLxOzawJdAOHGYJxEIhFkWPAbHgm/BTU18kGBWBBMBCmY+QdsQmyQccMwAU5K6DIBkMmOnwPYQ/HWhyRDXhD/0IoLMS3qQYFq9U3WL8G1aDmL4tnMk5Zpho4XBiMnxnEUKYakP7XxBYdZ0CpBqR7vluw7v9SDXK8AbG2UA2QqYj3r6kBBgmDv4MayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogz9c3668W/KAjNpwAAAAASUVORK5CYII=" 
          alt=""
          class="rounded img-size"
        >
        <v-icon v-if="isManager" @click="deleteImg" color="red">mdi-close</v-icon>
        <br>
        <br>
      </div>

      

  <blockquote class="blockquote">
    <p>{{selectGuild.profile_content}}</p>
  </blockquote>
 
 <!-- 태그 조회 및 삭제 :삭제 권한 매니저 -->
    <div class="mb-3">
      <span v-for="tag in myTags" :key="tag.id">
        <v-card class="mx-2 d-inline p-2"># {{ tag.tag }}</v-card>
        <v-icon v-if="isManager" @click="deleteTag(tag.id)" color="red">mdi-close</v-icon>
      </span>
    </div>
  <br><br>
  </div>

<span>Since {{selectGuild.created_at|moment('YYYY-MM-DD HH:mm:ss') }}</span><br>
  <!-- 길드 회원이 아닐 때 가입 신청 버튼 -->
  <div v-if="!isMember">
    <v-btn    
      color="deep-purple white--text" 
      v-if="!isSignup"
       data-bs-toggle="modal" data-bs-target="#staticBackdrop"
      >
      Guild Signup
      </v-btn>
  </div>


<!-- ##################  가입 신청 모달 ####################### -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Guild Signup</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <p>{{selectGuild.name}} 길드에 가입신청 하시겠습니까? </p>
      </div>
      <div class="modal-footer">
        <v-btn color="deep-purple white-text" data-bs-dismiss="modal" @click="guildSignup">Yes</v-btn>
        <v-btn color="deep-purple white-text" outlined data-bs-dismiss="modal">No</v-btn>
      </div>
    </div>
  </div>
</div>

<!-- ##################  태그 추가 모달 ####################### -->

  <v-btn
    outlined
    color="deep-purple"
    v-if="isManager"
    data-bs-toggle="modal" data-bs-target="#tag"
  >
  Tag 추가하기
  </v-btn>

 
<div class="modal fade" id="tag" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Tag 추가</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">추가할 태그:</label>
            <textarea class="form-control" id="message-text" v-model="inputTag"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <v-btn color="deep-purple white--text" data-bs-dismiss="modal" @click="guildTagUpdate">Submit</v-btn>
        <v-btn color="deep-purple white--text" outlined data-bs-dismiss="modal">Close</v-btn>
      </div>
    </div>
  </div>
</div>

<!-- 매니저일때 해당 길드 정보 수정 or 삭제 버튼 -->

    <v-btn
        outlined
        color="deep-purple darken3"
        @click="moveToUpdate" 
        v-if="isManager"
        title="길드 content update"
      >
      Update
      </v-btn>


    <v-btn 
      v-if="isManager"
      outlined
      color="deep-purple darken3 white--text" 
      data-bs-toggle="modal" 
      data-bs-target="#deleteGuild1">
      Delete
    </v-btn>

<!-- Modal -->
<div class="modal fade" id="deleteGuild1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">길드 삭제</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        해당 길드를 삭제하시겠습니까?
      </div>
      <div class="modal-footer">
        <v-btn color="deep-purple white--text" data-bs-dismiss="modal"
          @click="deleteGuild(selectGuild)"
        >Yes</v-btn>
        <v-btn color="deep-purple white--text" outlined data-bs-dismiss="modal">No</v-btn>
      </div>
    </div>
  </div>
</div>


    <hr>
    <!-- 공개 길드면 바로 탭을 보여주고 좋아요 가능 -->
    <div v-if="selectGuild.is_open">
     
      <v-banner
      color="deep-purple"
     
      >   
       <v-bottom-navigation
     
        color="primary"
        background-color="deep-purple"
      >

       <v-btn color="deep-purple white--text" @click="moveToGuildArticle">
        <div>All Articles</div>
        <v-icon class="m-2">mdi-home</v-icon>
      </v-btn>
       <v-btn color="deep-purple white--text" @click="moveToRecomment">
        <div>Recomments</div>
        <v-icon class="m-2">mdi-pencil</v-icon>
      </v-btn>
       <v-btn color="deep-purple white--text" @click="moveTomyGuildArticle">
        <span>MyArticles</span>
        <v-icon class="m-2">mdi-history</v-icon>
      </v-btn>
      <v-btn color="deep-purple white--text" @click="moveToGuildLikeArticle">
        <span>Favorites</span>
        <v-icon class="m-2">mdi-heart</v-icon>
      </v-btn>
      </v-bottom-navigation>
    </v-banner>
      <!-- <router-link :to="{ name: 'GuildLikeArticle' }">GuildLikeArticle</router-link>  -->
    </div>
    <!-- 아니면 멤버일때만 보여줌 -->
   
    <div  v-if="!selectGuild.is_open">
      <div v-if="isMember">
          <v-banner
        color="deep-purple"
     
         >   
        <v-bottom-navigation
          background-color="deep-purple"
      
          color="primary"
        >
        <v-btn color="deep-purple white--text" @click="moveToGuildArticle">
          <span>All Articles</span>
          <v-icon class="m-2">home</v-icon>
        </v-btn>
        <v-btn color="deep-purple lighten4 white--text" @click="moveToRecomment">
          <span>Recomments</span>
          <v-icon class="m-2">mdi-pencil</v-icon>
        </v-btn>
        <v-btn color="deep-purple white--text" @click="moveTomyGuildArticle">
          <span>MyArticles</span>
          <v-icon class="m-2">mdi-history</v-icon>
        </v-btn>
        <v-btn color="deep-purple white--text" @click="moveToGuildLikeArticle">
          <span>Favorites</span>
          <v-icon class="m-2">mdi-heart</v-icon>
        </v-btn>

      </v-bottom-navigation>
      </v-banner>
      </div>
      
      <div v-if="!isMember">
        회원만 열람 가능합니다
      </div>
    </div>

      <!-- <router-view @recomment="createArticle"></router-view> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'GuildDetail',
  data:function(){
   
    return {
     
      inputTag:null,  // 입력받은 태그
      myTags:[],      // 현재 길드의 태그

      selectGuild:{
        "id": null, 
         "name":null, 
         "guild_image":null, 
         "profile_content": null, 
         "created_at":null, 
         "is_open": null
      },
      // imgSrc:`http://127.0.0.1:8000${this.selectGuild.guild_image}`,

      isManager:null,
      isMember:null,
      isSignup:null,

      selectFile: null, // 파일 객체
      previewImgUrl: null, // 미리보기 이미지 URL
      isUploading: false, // 파일 업로드 체크
      response: null, // 파일 업로드후 응답값
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
    // 이동
    moveToGuildArticle:function(){
      this.$router.push({name:'GuildArticle',params:{id:this.$route.params.id}})
    },
    moveToRecomment:function(){
      this.$router.push({name:'GuildRecomment',params:{id:this.$route.params.id}})
    },
    moveToGuildLikeArticle:function(){
      this.$router.push({name:'GuildLikeArticle',params:{id:this.$route.params.id}})
    },
    moveTomyGuildArticle:function(){
      this.$router.push({name:'MyGuildArticle',params:{id:this.$route.params.id}})
    },
    // 이미지 삭제 : 매니저
    deleteImg:function(){
      const guildData = {
        ...this.selectGuild,
        guild_image:null,
      }
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/guilds/${this.selectGuild.id}/`,
        data:guildData,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.getGuild()
          this.$router.push({name:'GuildDetail', params:{id:this.$route.params.id}})
        })
        .catch(err=>{
          console.log(err)
        })
    },
    // 태그 삭제 : 매니저
     deleteTag:function(id){
    
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/guilds/delete_tag/${id}/`,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          //  this.$store.dispatch('selectGuild',this.guild)
          this.myTag()
          this.$router.push({name:'GuildDetail', params:{id:this.$route.params.id}})
        })
        .catch(err=>{
          console.log(err)
        })
    },
    // 해당 길드 유저 아닌 회원 가입 신청
    guildSignup:function(){
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/guilds/${this.selectGuild.id}/guild_signup/`,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.signupCheck()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 해당 길드의 태그 조회
    myTag:function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/${this.selectGuild.id}/guildtag_list_update/`,
        // data:{keyword:this.input},
        headers:this.setToken() // JWT token
      })
        .then(res => {
          this.myTags = []
          console.log(res.data)
          res.data.forEach(tag=>{
            this.myTags.push(tag)
          })
          console.log(this.myTags)
        })
        .catch(err => {
          console.log(err)
        })
    },
   
    // 해당 길드의 태그 추가 
    guildTagUpdate:function(){
      axios({
          method: 'post',
          url: `http://127.0.0.1:8000/guilds/${this.selectGuild.id}/guildtag_list_update/`,
          data: {tag:this.inputTag},
          headers:this.setToken()
        })
          .then(res => {
            console.log('태그 좀지우자!')
            console.log(res)
            this.myTag()
            this.inputTag = null
          })
          .catch(err => {
            console.log(err)
          })
    },
    // 비회원이지만 회원가입 신청 상태면 가입신청 안보여주기 위해 체크
    signupCheck:function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/${this.selectGuild.id}/guild_signup/`,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.isSignup = res.data.isSignup
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 해당길드의 유저인지 체크
    memberCheck:function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/${this.selectGuild.id}/is_member/`,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.isMember = res.data.isMember
    
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 현재 유저의 해당 길드 매니저 여부 확인
    managerCheck:function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/${this.selectGuild.id}/is_manager/`,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.isManager = res.data.is_manager
    
        })
        .catch(err => {
          console.log(err)
        })
    } ,
    // 길드 삭제
    deleteGuild: function (selectGuild) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/guilds/${selectGuild.id}/`,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.$router.push({name:'Guilds'})
    
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 길드 수정 (매니저)
    moveToUpdate:function(){
      this.$router.push({name:'GuildDetailUpdate'})
    },
    
    // 길드 조회
    getGuild: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/${this.selectGuild.id}/`,
        headers:this.setToken() // JWT token
      })
        .then(res => {
          // console.log(res.data)
          // this.moveToGuild(res.data)
          this.selectGuild.name = res.data.name
          this.selectGuild.guild_image = res.data.guild_image
          this.selectGuild.profile_content = res.data.profile_content
          this.selectGuild.is_open = res.data.is_open          
        })
        .catch(err => {
          console.log(err)
        })
    },
    },
  created: function (){
    this.selectGuild = this.$store.state.selectGuild
    this.myTag()
    this.managerCheck()
    this.memberCheck()
    this.signupCheck()
    this.getGuild()
   }, 

}

</script>

<style scoped>
.container{
  width:45%;
  /* padding:10px; */
  margin-right: auto;
  margin-left: auto;
}

.img-size{
  width:150px;
  height: 150px;
}

.v-item-group.v-bottom-navigation .v-btn {

  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  flex: 0 1 auto;
  font-size: 1rem;
  height: inherit;
  max-width:600px;
  min-width :80px;
}


</style>
