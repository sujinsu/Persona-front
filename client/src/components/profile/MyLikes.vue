<template>
  <div class="container row">
    <div>
      <select @change="select" class="form-select" aria-label="Default select example" id="likelist">
        <option selected value="2">MOVIES</option>
        <option value="3">COLLECTIONS</option>
      </select>
    </div>
    <my-likes-list
      class="col-6 d-flex justify-content-center"
      v-for="result in results"
      :key="result.id"
      :result="result"
    ></my-likes-list>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import MyLikesList from '@/components/profile/MyLikesList'

export default {
  name: 'MyLikes',
  data: function () {
    return {
      results: [],
      path: null,
    }
  },
  components: {
    MyLikesList,
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    select: function(){
      const val = document.querySelector('#likelist').value
      if (val == 2){
        this.path = 'http://127.0.0.1:8000/movies/get/mylikes/2/'
      } else {
        this.path = 'http://127.0.0.1:8000/movies/get/mylikes/3/'
      }
      axios({
        method: 'get',
        url: this.path,
        headers: this.setToken()
      })
      .then(res => {
        // console.log(res.data)
        this.results = res.data
      })
      .catch(err =>{
        console.log(err)
      })
    },
    defaultList: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/get/mylikes/2/',
        headers: this.setToken()
      })
      .then(res => {
        console.log(res.data)
        this.results = res.data
      })
      .catch(err =>{
        console.log(err)
      })
    }
  },
  created: function(){
    this.defaultList()
  },
  computed: {
    ...mapState([
      'user',
    ])
  }
}
</script>

<style>

</style>