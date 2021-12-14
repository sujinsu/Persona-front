<template>
  <div>
    <br>
    
    <!-- <button @click="GetMyProfile">새로고침</button> -->
<div class="container  bg-light border" style="background-color: rgb(234, 233, 239)"> 
    <br><br>  
    <h5 class="bd-highlight">{{user.nickname}}님의 Profile Detail</h5>
        
      
<!-- 프로필 사진 등록 및 수정하기 -->
<!-- 프로필 사진 후보중에 고른다음 저장하기 -->

<div id="profile-img">
    <img v-if="user.image" :src="user.image" alt="" class="rounded mx-auto d-block profile-size">
    <img v-if="!user.image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMEAAADACAMAAACKwPcLAAAANlBMVEVmZmb////u8vpwb3D29vbY2NixsbGLi4vi4uKCgoLr6+vPz8+fn594eHjFxcWop6i7u7uVlZUD7tw7AAAEB0lEQVR4nO2ba5ujIAxG2wHBu+3//7MzjnhpV60kr5vBJ+fjri6cQhIE9nZLnC/pDrBRA3nUQB41kEcN5FEDedRAHjWQRw3kUQN51EAeNZBHDeRRA3nUQB41kEcN5FEDedRAHjXYxjxdld17bFa5pzmrnZMMmi6/v5F3zSlNnWJQZ+/dH8jqExo7weBZrve/p3zCm4MbNBu//zQO6LmENujsvsBPXHfYFrEGplp2tXK+6P+08K5ailXQvAQ1MHMCsm3x+ndFO0vkSAWkQTMJWLfSR+PsGQpAg3kEHhsdNI8TFHAGk0Dptx/yJVwBZzAGcbbbNzMm2wrVLsygCz1rPz3YhgdRSRVl0NiDApOCBZU2lEGYHBn62c+ADJ4hiA/FpwnhjFkjgQxCn3ay0BIffCFNYwzqUAeOPh/qAmSxjTEI32KHc7yxuEiAGDTDT+qOv+GGNxDpCGLQRQ7BNAiImgAxyI+WgpmhKOSAxhEGZpgSxecnZ4rhHcDqCGEwFAMb95JFlQSEgaMs1arY4N8CYVBRopKkvQbCIIupxyMeVREQBjY+kMdQjgyeNRAGQ1r5P2/9ixr0qAEPnEHKkZx+NiWV1z9V0dJfVaS/skt/dZ3+F84FvjLT/9JPf7flAjte6e86XmDnN/3d9wucgKR/CnWBk8ALnMamfyK+VEj0VsIFboZc4HbOLf0bUrcL3FL7UWh3BSK3lT6DNvDVXv97yhp7eRZr4D9MoRAJa7mWDNKgONT/Xwfg1VngquLx2svs0fmwvvC+e7zZ4eIBZuCXN33Lx8rXi3cvd7EB23W/oAzcYoq8l+OZxi089xexh8EYmHmOfArTenawkJmE2S/aX9K9MTtAAhphUEwriepQwTXzlAMoAAwmAXt486HIcQp8g/Eb/55HrHhMC1NgG0zfBG1caqlR4cw2GLNQ1N57z6TATKpcg7EQE+rTqMDc+WIaeOoI9NR0+wU8g3EHlCQwK7BCgWcQ5hD5MKkFzCOWQZhD9B3QMZFxUirLIOQhxi56wc9HHIMwjVk7oI4dzByDkjmHekIuYAwCw8AjcuE4kPRIYBjEHmBuMAwC/UyNbhB/iLxOzawJdAOHGYJxEIhFkWPAbHgm/BTU18kGBWBBMBCmY+QdsQmyQccMwAU5K6DIBkMmOnwPYQ/HWhyRDXhD/0IoLMS3qQYFq9U3WL8G1aDmL4tnMk5Zpho4XBiMnxnEUKYakP7XxBYdZ0CpBqR7vluw7v9SDXK8AbG2UA2QqYj3r6kBBgmDv4MayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogz9c3668W/KAjNpwAAAAASUVORK5CYII=" 
      alt=""
      class="rounded mx-auto d-block profile-size"
    >    
  
  <div class="btn-group">
    <v-btn 
      color="deep-purple darken3 white--text"
      class="btn btn-lg dropdown-toggle me-1" 
      type="button" 
      data-bs-toggle="dropdown" 
      aria-expanded="false"
    >
      프로필 고르기
    </v-btn>

    <v-btn 
      color="deep-purple darken3 white--text"
      @click="saveImage"
      class="me-1"
    >
      등록
    </v-btn>
    
    <v-btn 
      color="deep-purple darken3 white--text"
      @click="removeImage"
    >
      기본이미지
    </v-btn>
  

  
  <ul class="dropdown-menu">
  
    <li>
      <img class="rounded mx-auto d-block profile-size" 
        src="https://i.pinimg.com/474x/93/ff/82/93ff82add0a65ce3b24f2aa0b639cb50.jpg"
        @click="click1"
      >
    <li>
      <img class="rounded mx-auto d-block profile-size" 
      src="https://i.pinimg.com/474x/86/d6/c0/86d6c09a65657cee4337698735222853.jpg" alt=""
      @click="click2"
    ></li>
    <li>
      <img class="rounded mx-auto d-block profile-size" 
      src="https://i.pinimg.com/474x/3c/7a/01/3c7a01c69d2180b760b896a730bc222d.jpg" 
      @click="click3"
      alt=""
    >
    </li>
    <li>
      <img class="rounded mx-auto d-block profile-size" 
      src="https://i.pinimg.com/474x/bc/d8/1d/bcd81d69eb87744fb9a639f152b5dc7d.jpg" 
      alt=""
      @click="click4"
    >
    </li>
    <li>
      <img class="rounded mx-auto d-block profile-size" 
      src="https://i.pinimg.com/474x/2e/b2/15/2eb21582c38bb881a153f4545bd96d84.jpg" 
      alt=""
      @click="click5"
    >
    </li>
    <li>
      <img class="rounded mx-auto d-block profile-size" 
      src="https://i.pinimg.com/474x/ab/86/0d/ab860d72bba01d7245e9c87677fad313.jpg" 
      alt=""
      @click="click6"
    >
    </li>
  </ul>
</div>
</div>

<div class="btn-group">
  
</div>


<!-- ## 닉네임## -->
  <div class="justify-content-center">
    <div class="col">
      <span class="text-start me-5" >ID </span>
      <span>{{user.username}}</span>
    </div>
    <div class="col">
      <span  class="text-start me-5">닉네임</span>
      <span>{{user.nickname}}</span>
    </div>
      <v-btn
        color="deep-purple darken3 white--text"
        data-bs-toggle="modal" data-bs-target="#username"
        class="m-3"
      >
      닉네임변경
      </v-btn>
   
 </div>

  <!-- 닉네임 변경 모달 -->
  <div class="modal fade" id="username" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Username</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">닉네임 </label>
                <input type="text" class="form-control" id="message-text" v-model="inputUsername">
                <!-- <ㅑ class="form-control" id="message-text" v-model="inputContent"></ㅑ> -->
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <v-btn color="deep-purple darken3 white--text" data-bs-dismiss="modal" @click="usernameUpdate">Submit</v-btn>
            <v-btn color="deep-purple darken3 white--text" outlined data-bs-dismiss="modal">Close</v-btn>
          </div>
        </div>
      </div>
    </div>

  <!-- ###### 소개글 입력받기 ###### -->
  <br>
  <span>자기소개</span>
  <div>
  <div class="">
    <div class="vstack gap-3">
      <br>
      <span class="border p-3" v-if="user.profile_content">{{user.profile_content}}</span>
      <span class="border p-3 fw-light" v-else>아직 소개글이 작성되지 않았습니다.</span>
      <br>
    </div>

    
    <v-btn
        v-if="user.profile_content"
        color="deep-purple darken3 white--text"
        data-bs-toggle="modal" data-bs-target="#content"
        class="mt-5"
      >
      소개글 수정하기
      </v-btn>
    
    <v-btn
        v-if="!user.profile_content"
        color="deep-purple darken3 white--text"
        data-bs-toggle="modal" data-bs-target="#content"
      >
      소개글 작성하기
      </v-btn>
  
  <!-- 소개글 작성 모달 -->
  <div class="modal fade" id="content" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Profile Content</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">자기소개 :</label>
              <textarea class="form-control" id="message-text" v-model="inputContent"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <v-btn color="deep-purple darken3 white--text" data-bs-dismiss="modal" @click="userDataUpdate">Submit</v-btn>
          <v-btn color="deep-purple darken3 white--text" outlined data-bs-dismiss="modal">Close</v-btn>
        </div>
      </div>
    </div>
  </div>
  </div> 

  </div>


<!-- ### 회원 탈퇴 ###  -->
 <div class="m-3">
    <v-btn
        color="deep-purple darken3 white--text"
        data-bs-toggle="modal" data-bs-target="#deleteUser"
      >
      탈퇴
      </v-btn>
  </div>

<!-- 회원 탈퇴 모달 -->
<div class="modal fade" id="deleteUser" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">탈퇴</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <p> 탈퇴 하시겠습니까? </p>
      </div>
      <div class="modal-footer">
        <v-btn color="deep-purple darken3 white--text" data-bs-dismiss="modal" @click="deleteUser">Yes</v-btn>
        <v-btn color="deep-purple darken3 white--text" outlined data-bs-dismiss="modal">No</v-btn>
      </div>
    </div>
  </div>
</div>
  
</div>
<br>
</div>
</template>

<script>
import axios from 'axios'
// import http from "@/http"
export default {
  name:'ProfileDetail',
  components:{

  },
  data:function(){
    return{
      // isSelectImg1:false,
      // isSelectImg2:false,
      // isSelectImg3:false,
      // isSelectImg4:false,

      inputUsername:null,
      inputContent:null,
      user:{
        id:null,
        username:null,
        nickname:null,
        // img:null,
        image:null,
        profile_content:null,
      },
      selectFile: null, // 파일 객체
      previewImgUrl: null, // 미리보기 이미지 URL
      isUploading: false, // 파일 업로드 체크
      response: null, // 파일 업로드후 응답값
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
    // 프로필 사진 고르기
    click1:function(){
      this.user.image = 'https://i.pinimg.com/474x/93/ff/82/93ff82add0a65ce3b24f2aa0b639cb50.jpg'
    },
    click2:function(){
      this.user.image = 'https://i.pinimg.com/474x/86/d6/c0/86d6c09a65657cee4337698735222853.jpg'
    },
    click3:function(){
      this.user.image = "https://i.pinimg.com/474x/3c/7a/01/3c7a01c69d2180b760b896a730bc222d.jpg" 
    },
    click4:function(){
      this.user.image = "https://i.pinimg.com/474x/bc/d8/1d/bcd81d69eb87744fb9a639f152b5dc7d.jpg" 
    },
    click5:function(){
      this.user.image = "https://i.pinimg.com/474x/2e/b2/15/2eb21582c38bb881a153f4545bd96d84.jpg" 
    },
    click6:function(){
      this.user.image = "https://i.pinimg.com/474x/ab/86/0d/ab860d72bba01d7245e9c87677fad313.jpg" 
    },

    // 현재 이미지 등록
    saveImage:function(){
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/accounts/profile_image_upload/`,
        data: {image:this.user.image},
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.GetMyProfile()
        })
        .catch(err=>{
          console.log(err)
        })
    },
    // 기본이미지로 
    removeImage:function(){
      this.user.image = null
      this.saveImage()
    },
    // 해당 유저의 상세 정보 조회
    GetMyProfile:function(){
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/accounts/profile/',
        headers:this.setToken() // JWT token
      })
      .then(res => {
        console.log(res.data)
        this.$store.dispatch('getUserProfile',res.data)
        this.user.id = res.data[0].id
        this.user.username = res.data[0].username
        this.user.nickname = res.data[0].nickname
        this.user.image = res.data[0].image
        this.user.profile_content = res.data[0].profile_content
        this.inputContent = res.data[0].profile_content
        console.log(this.user)
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 해당 유저이름 변경
    usernameUpdate:function(){
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/accounts/profile_username_upload/`,
        data: {nickname:this.inputUsername},
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)

          this.GetMyProfile()
        })
        .catch(err=>{
          console.log(err)
        })
    },
    // 해당 유저 자기소개 내용 업데이트
    userDataUpdate:function(){
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/accounts/profile/`,
        data: {profile_content:this.inputContent},
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          this.GetMyProfile()
        })
        .catch(err=>{
          console.log(err)
        })
    },
    // 해당 유저 탈퇴 처리
    deleteUser:function(){
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/accounts/profile/`,
        headers:this.setToken()
      })
        .then(res => {
          console.log(res)
          localStorage.removeItem('jwt')
          localStorage.removeItem('nickname')
          this.$store.dispatch('logout')
          this.$router.push({name:'Signup'})
        })
        .catch(err=>{
          console.log(err)
        })
    },  
  },
  created:function(){
    this.username = localStorage.getItem('username')
    this.GetMyProfile()
  },
 
}
</script>

<style scoped>

.container {
  margin: 10px auto;
  padding: 20px auto;
  /* border: 10px solid yellow; */
}

.img-size{
  width:100px;
  height: 100px;
}

.profile-size{
  width:200px;
  height: 200px;
  /* clip-path: circle(6rem at 12rem 8rem); */
}

#profile-img{
  padding: 20px 10px;
  /* border: 10px solid white; */
  font-size: 50px;
  text-align: center;
  /* background: orange; */
}

.profile-text{
  justify-self: center; 
  width: 50%;
}
body {
  margin: 5rem auto;
  background-color: darkslategray;
  /* color: white; */
}

.container {
  margin: 10px auto;
  padding: 20px auto;
  width:60%;
  /* border: 10px solid yellow; */
}

.container h1 {
  text-transform: uppercase;
}

.text-box{
  width: 150px;
  padding: 20px;
  border: 1px solid black;
}

.row {
  border: 10px solid lightblue;
}

.container > .row > div {
  padding: 20px 10px;
  /* border: 10px solid white; */
  font-size: 50px;
  text-align: center;
}

/* .container > .row > div:nth-child(odd) {
  background: orange;
} */

.container > .row > div:nth-child(even) {
  background: green;
}

.row-vh {
  height: 500px;
}

</style>