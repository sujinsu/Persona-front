<template>
  <div>
    <b-navbar toggleable="lg" type="dark" style="background-color: rgb(86, 61, 124)">
      <b-navbar-brand @click="goHome">
        <img class="mx-4" src="../../assets/persona.png" alt="Kitten" width=70>
        <router-link to="/" style="color: white; text-decoration: none"
          class="fs-2"
        >PERSONA</router-link>
      </b-navbar-brand>


      <b-navbar-nav>
        <b-nav-item>
          <router-link to="/" class="fs-5" style="color: white; text-decoration: none;">Home</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link :to="{ name: 'Movies' }" class="fs-5" style="color: white; text-decoration: none;">Movie</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link :to="{ name: 'Guilds' }" class="fs-5" style="color: white; text-decoration: none;">Guild</router-link>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto mx-1">
        <b-nav-item>
          <select @change="select" id="searchNavbar" class="form-select-sm form-select fw-bold py-0"
            style="color: rgb(86, 61, 124); outline: 0.15rem solid ; border-radius: 0.15rem; background-color: rgb(234, 233, 239)"
          >
              <option class="fw-bold" selected value="">분류</option>
              <option class="fw-bold" value="1">영화</option>
              <option class="fw-bold" value="2">컬렉션</option>
          </select>
        </b-nav-item>

        <b-nav-item>
          <input size="sm" class="flex-fill mr-sm-2 mx-2 fw-bold px-2" placeholder="Search" @keyup.enter="search" type="text" v-model.trim="inputValue"
            style="color: rgb(86, 61, 124); outline: 0.15rem solid ; border-radius: 0.15rem; background-color: rgb(234, 233, 239)"
          >
          <v-icon @click="search" medium style="color: rgb(234, 233, 239)">mdi-magnify</v-icon>
        </b-nav-item>
      


        <b-nav-item-dropdown dropleft class="mx-3">
          <!-- Using 'button-content' slot -->
          <div class="contain">

          </div>
          <template #button-content>
            <v-icon medium style="color: rgb(234, 233, 239)">mdi-account-circle-outline</v-icon>
          </template>
          <!-- superuser일 때 -->
          <div v-if="superuser">
            <b-dropdown-item>
              <router-link :to="{ name: 'AddMovie' }" class="fw-bold" style="text-decoration: none; color: rgb(86, 61, 124)">영화 등록</router-link>
            </b-dropdown-item>
          </div>

          <!-- 로그인했을 때 -->
          <div v-if="isLogin">
            <b-dropdown-item>
              <router-link :to="{ name: 'ProfileDetail' }" class="fw-bold" style="text-decoration: none; color: rgb(86, 61, 124)">Profile</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link @click.native="logout" to='#' class="fw-bold" style="text-decoration: none; color: rgb(86, 61, 124)">Logout</router-link>
            </b-dropdown-item>
          </div>
          
          <!-- 로그아웃 했을 때 -->
          <div v-else>
            <b-dropdown-item> 
              <router-link :to="{ name: 'Signup' }" class="fw-bold" style="text-decoration: none; color: rgb(86, 61, 124)">Signup</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="{ name: 'Login' }" class="fw-bold" style="text-decoration: none; color: rgb(86, 61, 124)">Login</router-link> 
            </b-dropdown-item>
          </div>

        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

const API_KEY = '33c92174424e6041356c6c55bacd64e2'
const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie'

export default {
  name: 'header',
  data: function () {
    return {

      inputValue: null,
      selected: null,
      collection_ids: null,
      collection_list: [],

    }
  },
  methods: {
    goHome: function (){
      this.$router.push({name: 'Home'}).catch(()=>{})
    },
    logout:function(){
      this.$store.dispatch('logout')
      localStorage.removeItem('jwt')
      localStorage.removeItem('nickname')
      localStorage.removeItem('superuser')
      this.$router.push({name:'Login'}).catch(()=>{})
    },
    select: function() {
      this.selected = document.querySelector('#searchNavbar').value
      // console.log(this.selected)
    },
    search: function(){
      if (this.selected == 1){
        const params = {
          api_key: API_KEY,
          language: 'ko-KR',
          query: this.inputValue
        }
        axios({
          method: 'get',
          url: SEARCH_API_URL,
          params,
        })
          .then(res => {
            // console.log(res.data.results)
            this.$store.dispatch('searchMovie', res.data.results)
            if (this.$route.name != 'SearchMovies'){
              this.$router.push({name: 'SearchMovies'}).catch(()=>{})
            }
            this.inputValue = null
          })
          .catch(err => {
            console.log(err)
          })
      }
      else if (this.selected == 2){
        axios({ 
          method: 'get',
          url: `http://127.0.0.1:8000/movies/search/collection/${this.inputValue}/tag/`,
        })
        .then(res => {
          console.log(res.data)
          this.$store.dispatch('searchCollection', res.data)
          if (this.$route.name != 'searchCollection'){
            this.$router.push({name: 'searchCollection'}).catch(()=>{})
          }
          this.inputValue = null
        })
      }
      else {
        alert('분류를 선택해주세요.')
      }
    }
  },
  created: function () {
    const token = localStorage.getItem('jwt')
    const superuser = localStorage.getItem('superuser')

    if (token){
      this.$store.dispatch('login')

    }
    if (superuser){
      this.$store.dispatch('isSuperuser', superuser)

    }
  },
  computed: {
    ...mapState([
      'isLogin',

      'superuser',

    ])
  }
}
</script>

<style>
.navbar-nav .dropdown-menu {
  background-color: rgb(234, 233, 239);
}

.form-select {
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    padding-left: 0.1rem;
    font-size: .875rem;
    border-radius: 0.2rem;
    padding-right: 1rem;
}
</style>