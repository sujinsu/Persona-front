<template>
<div>
  <div v-if="isValue" class="container bg-white border p-2 rounded row justify-content-around">  
    <search-guild-item
      v-for="guild in search_guilds"
      :key="guild.id"
      :guild="guild"
    >
    <br>
    </search-guild-item>
  </div>
  <!-- <div v-else>검색 결과가 없습니다</div> -->
</div>
  
</template>

<script>
import SearchGuildItem from '@/components/guilds/SearchGuild/SearchGuildItem'

export default {
  name:'SearchGuildList',
  props:{
    search_guilds:{
      type:Array
    }
  },
  components:{
    SearchGuildItem
  },
  data:function(){
    return {
      isValue:true
    }
  },
  
}
</script>

<style>

</style>