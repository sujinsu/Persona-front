<template>
  <div class="container">
    <h1 class="fw-bold fs-2 my-3">컬렉션 검색 결과</h1>
    <div class="row">
      <search-collection-item
       class="col-3"
        v-for="collection in searchCollections"
        :key="collection.id"
        :collection="collection"
      >
      </search-collection-item>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import searchCollectionItem from '@/components/movies/collections/searchCollectionItem'

export default {
  name: 'searchCollection',
  components: {
    searchCollectionItem,
  },
  computed: {
    ...mapState([
      'searchCollections',
    ])
  },
}
</script>

<style>

</style>