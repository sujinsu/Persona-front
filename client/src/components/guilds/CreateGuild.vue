<template>
  <div class="container">
    <br>
    <br>
    <h2>CreateGuild</h2>
    <br>
    <div class="container bg-light border">
      <v-card>
        <div class="file-upload">
        <form @submit.prevent="formSubmit" method="post">
          <br>
          <div class="m-2">
            <div > Guild Name </div>
              <input type="text" class="border m-2"
                v-model.trim="guildData.name"
              >
          </div>
          <br>

        <div class="m-2">
          <div>Guild Profile Content</div>
              <input type="text"  class="border m-2"
                v-model.trim="guildData.profileContent"
              >
        </div>
        <br>
        <div class="m-2">
          <div>Guild Tag : 길드를 표현할 하나의 해시태그를 입력해주세요</div>
              <input type="text"  class="border m-2"
                v-model.trim="guildData.tagData"
              >
        </div>
        <br>
        <div class="m-2">
          <div>Guild Open : 길드를 공개 여부를 골라주세요</div>
          <label><input type="radio" name="true" value="true" v-model.trim="guildData.isOpen" checked> Yes</label>
          <label class="m-5"><input type="radio" name="false" value="false" v-model.trim="guildData.isOpen"> No</label>
          <br>
        </div>
        <br>

        <div class="m-2"> 
        <div>Guild Profile Image</div>
        <br>
          <input type="file" ref="selectFile" @change="previewFile" />
          
          <img v-if="previewImgUrl" :src="previewImgUrl" />
        </div>

          <v-btn color="deep-purple white--text" class="m-2" outlined type="submit" :disabled="isUploading">Upload</v-btn>

          <div>
            <hr>
            <!-- response : {{ response }} -->
          </div>
        </form>
      </div>
      
      </v-card>
    </div>
  </div>
</template>

<script>
import http from "@/http"
import axios from'axios'
export default {
  name:'CreateGuild',
  data:function(){
    return {
      guildData:{
        name:null,
        guild_image:null,
        profileContent:null,
        isOpen:null,
        tagData:null,
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
      console.log(token)
      const config = {
        Authorization:`JWT ${token}`
      }
      return config
    },
    previewFile() {
        // 선택된 파일이 있는가?
        if (0 < this.$refs.selectFile.files.length) {
          // 0 번째 파일을 가져 온다.
          this.selectFile = this.$refs.selectFile.files[0]
          // 마지막 . 위치를 찾고 + 1 하여 확장자 명을 가져온다.
          let fileExt = this.selectFile.name.substring(
            this.selectFile.name.lastIndexOf(".") + 1
          )
          // 소문자로 변환
          fileExt = fileExt.toLowerCase()
          // 이미지 확장자 체크, 1메가 바이트 이하 인지 체크
          if (
            ["jpeg", "png", "gif", "bmp"].includes(fileExt) &&
            this.selectFile.size <= 1048576
          ) {
            // FileReader 를 활용하여 파일을 읽는다
            var reader = new FileReader()
            reader.onload = e => {
              // base64
              this.previewImgUrl = e.target.result
            }
            reader.readAsDataURL(this.selectFile)
          } else if (this.selectFile.size <= 1048576) {
            // 이미지외 파일
            this.previewImgUrl = null
          } else {
            alert("파일을 다시 선택해 주세요.")
            this.selectFile = null
            this.previewImgUrl = null
          }
        } else {
          // 파일을 선택하지 않았을때
          this.selectFile = null
          this.previewImgUrl = null
        }
        console.log(this.selectFile)
      },

      async formSubmit() {
        let form = new FormData()
        if (this.selectFile) {
          // Form 필드 생성
          form.append("guild_image", this.selectFile) // api file name
          this.isUploading = true
        }
          form.append("name",this.guildData.name)
          form.append("profile_content",this.guildData.profileContent)
          form.append("is_open",this.guildData.isOpen)
          form.append("tag",this.guildData.tagData)

          const token = localStorage.getItem('jwt')
          http
            .post("http://127.0.0.1:8000/guilds/", form, {
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization":`JWT ${token}`
              },
            })
            .then(res => {
              this.response = res
              this.$router.push({ name: 'Guilds' })
              this.isUploading = false
            })
            .catch(error => {
              this.response = error
              this.isUploading = false
            })
        //  else {
        //   alert("파일을 선택해 주세요.")
        // }

        return true
      },
    },
    createGuild: function () {
      const guildItem = {
        name: this.guildData.name,
        guild_img:this.guildData.guild_img,
        profile_content:this.guildData.profileContent,
        is_open:this.guildData.isOpen,
        tag:this.guildData.tagData
      }

      if (guildItem.name) {
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/guilds/',
          data: guildItem,
          headers:this.setToken()
        })
          .then(res => {
            console.log(res)
            this.$router.push({ name: 'Guilds' })
          })
          .catch(err => {
            console.log(err)
          })
        }
    },
  }

</script>

<style scoped>
.container {
  margin: 10px auto;
  padding: 20px auto;
  width:75%;
}
</style>