<template>
<div>
  <select  style="width:250px;height:35px; background-color: rgb(234, 233, 239);" 
    @change="sortCollection" class="form-select" 
    aria-label="Default select example" id="collection_select">
    <option selected value="1">업데이트순</option>
    <option value="2">인기순</option>
  </select>

  <v-slide-group class="pa-4" show-arrows>
    <collection-list-item
      v-for="collection in collections"
      :key="collection.id"
      :collection="collection"
    ></collection-list-item>
  </v-slide-group>
</div>
</template>

<script>
import collectionListItem from '@/components/movies/collections/collectionListItem'
import axios from 'axios'

export default {
  name: 'collectionList',
  data: function () {
    return {
      collections: null,
      model: null,
    }
  },
  components: {
    collectionListItem,
  },
  methods: {
    sortCollection: function () {
      const val = document.querySelector('#collection_select').value
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/collection/${val}/`,
      })
      .then(res => {
        this.collections = res.data
        this.val = val
      })
      .catch(err => {
        console.log(err)
      })
    },
    defaultSortedCollections: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/collection/1/`,
      })
      .then(res => {
        console.log(res)
        this.collections = res.data
        this.val = 1
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  created: function(){
    this.defaultSortedCollections()
    console.log(this.collections)
  }
}
</script>

<style>
</style>