<template>
  <div>
<!-- ############  글 작성 ############# -->
    <br >
     <v-banner>
    <v-btn
      text
      class="font-weight-bold"
      color="deep-purple accent-4"
      data-bs-toggle="modal" 
      data-bs-target="#exampleModal"
      @click="notRe"
      v-if="isMember"
    >[Create Article]
    <v-icon>mdi-square-edit-outline</v-icon>
    </v-btn>
    </v-banner>
    <br>
    
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New Guild Article</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- <form id="myForm" enctype="multipart/form-data"> -->
            <form @submit.prevent="formSubmit" method="post">
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Message:</label>
                <textarea class="form-control" id="message-text" v-model="article.content"></textarea>
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Media:</label>
                <!-- <input type="file" class="form-control" id="recipient-name" accept="image/*" > -->
                <input type="file" ref="selectFile" @change="previewFile" />
                
                <img v-if="previewImgUrl" :src="previewImgUrl" />
                <button type="submit" :disabled="isUploading" class="btn btn-secondary" data-bs-dismiss="modal"
                 >Upload</button>
              </div>
              <div>
               
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>


    <!-- 해당 길드의 글 보여주기 -->
    <guild-article-list
         
      :articles="articles"
      :user="user"
      :nickname="nickname"
      :isMember="isMember"
      @recomment="recomment"
    >

    </guild-article-list>

  </div>
</template>

<script>
import axios from'axios'
import http from "@/http"
// import{mapState} from'vuex'
import GuildArticleList from '@/components/guilds/GuildDetail/GuildArticleList'
export default {
  name:'GuildArticle',
  components:{
    GuildArticleList,
  },
  data: function () {
    return {
      selectGuild:null,

      isMember:false, // 해당 길드의 멤버인지

      articles : null,  // list에 넘겨줄 글 모음
      isClick:false,

      user:null, // 현재 유저의 id 
      user_image:null, // 작성자 프로필 사진
      recomment_article_num:null, // 참조되는 글의 순서
      article_cnt:null, // 지금 생성하려는 글의 순서
      nickname:null,

      article:{
        content:null,
        guild_id:this.$route.params.id,
        guild_name:null,
        parent_username:null,
      },
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
    // 그냥 맨처음에 새로고침 누르고싶어지게...
    loading:function(){
      this.isClick = true
    },
    // 글 목록 조회
    getArticles: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/${this.$route.params.id}/article/`,
        headers:this.setToken() // JWT token
      })
        .then(res => {
          console.log('해당길드에 작성된 글들은(at getArticles)')
          console.log(res.data)
          const allArticles = res.data
          const guildArticles = allArticles.filter(article=>{
            return article.guild_id == this.$route.params.id
          })
          this.articles = guildArticles
         
          // this.$store.dispatch('resetUpdate')
        })
        .catch(err => {
          console.log(err)
        })
    },
    memberCheck:function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/${this.selectGuild.id}/is_member/`,
        headers:this.setToken()
      })
        .then(res => {
          // console.log(res)
          this.isMember = res.data.isMember
    
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 리코멘트 글 아니면 일단 리셋
    notRe:function(){
      this.$store.dispatch('reset')
      this.countGuildArticle()
    },
    // 리코멘트 글이면 
    recomment:function(article){
      console.log('recomment로 진행, 참조글 순서는'+article.article_num)
      this.$store.dispatch('abc',article)
      this.recomment_article_num = article.article_num // 참조(선택받은) 글의 순서 저장
      this.article.guild_name = article.guild_name
      this.article.parent_username = article.parent_username
      this.countGuildArticle()
    },
    // 해당 길드 작성된 글 개수 찾아오기
    countGuildArticle:function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/guilds/${this.$route.params.id}/guild_article_cnt/`,
        headers:this.setToken()
      })
        .then(res => {
      
          this.article_cnt = res.data.cnt
          console.log('article_cnt(지금작성하는 글의 순서)는'+ this.article_cnt)
        })
        .catch(err => {
          console.log(err)
        })
    },
     // 해당 유저의 상세 정보 조회
    GetMyProfile:function(){
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/accounts/profile/',
        headers:this.setToken() // JWT token
      })
      .then(res => {
        console.log('현재유저의 정보는')
        console.log(res.data)
        
        this.user == res.data[0].id
        this.user_image = res.data[0].image
        this.nickname = res.data[0].nickname
        console.log('현재 유저의 프로필 사진은')
        console.log(this.user_image)
      })
      .catch(err => {
        console.log(err)
      })
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
        // if (this.selectFile) {
          // Form 필드 생성
          let form = new FormData()
          if (this.selectFile){
            form.append("img", this.selectFile) // api file name
          }
          // 입력 댓글 담고 >> 초기화
          form.append("content",this.article.content)
          this.article.content = null

          // 글을 작성한 길드id와 이름
          form.append("guild_id",this.$route.params.id)
          form.append("guild_name",this.selectGuild.name)

          // 닉네임 입력
          form.append("nickname",this.nickname)

          //  작성자 이미지 저장
          if (this.user_image){
            form.append("profile_img",this.user_image)
          }
          
          // 참조하는 글이 있다면, 참조하는 글의 길드내 글번호와 글 작성자 저장
          if (this.$store.state.recomment.article_num){
            form.append("parent_article",this.$store.state.recomment.article_num)

            form.append("parent_username",this.$store.state.recomment.parent_username)
          } 
        

          form.append("article_num",this.article_cnt) // 생성글 순서          
          this.isUploading = true
          const token = localStorage.getItem('jwt')
            http
          .post(`http://127.0.0.1:8000/guilds/${this.$route.params.id}/article/`,form, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization":`JWT ${token}`
            },
          })
          .then(res => {
            this.response = res
            // this.$store.dispatch('updateArticle')
            console.log('글작성했습니다')
            this.selectFile = null
            this.article.content=null
            this.getArticles()
            this.isUploading = false
          })
          .catch(error => {
            this.response = error
            this.isUploading = false
          })
            

        return true
      },
      
    },
    // 로그인 안된 상태면 로그인 창으로 보내기 
    created: function () {
      if (localStorage.getItem('jwt')){
        this.selectGuild = this.$store.state.selectGuild
        this.getArticles()
        this.GetMyProfile()
        this.memberCheck()
      }else{
        this.$router.push({name:'Login'})
      }
      
    }
}
</script>

<style>

</style>