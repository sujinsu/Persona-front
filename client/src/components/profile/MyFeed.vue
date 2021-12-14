<template>
  <div>
    <!--  활동 내역 보기 : 길드 작성 게시글 -->
    <hr>
    <!-- <p @click="getArticles">새로고침</p> -->
    <my-feed-item
      v-for="article in articles"
      :key="article.guild_id"
      :article="article"
    ></my-feed-item>
  </div>
</template>

<script>

import MyFeedItem from '@/components/profile/MyFeedItem'

export default {
  name:'MyFeed',
  props:{
    articles:{
      type:Array
    }
  },
  components:{
    MyFeedItem
  },
  
}
</script>

<style>

</style>