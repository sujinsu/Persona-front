<template>
  <div>
    <v-card class="p-3">
      <br>
      <span>길드 사용자 ' {{article.nickname}} ' 님의 글에 좋아요 했습니다.</span>
      <br>
      <span class="font-weight-thin">{{article.content}}</span>
      <br><br>
    </v-card>
    <br>
  </div>
</template>

<script>
export default {
  name:'GuildLikeArticleItem',
  props:{
    article:{
      type:Object,
    }
  }
}
</script>

<style>

</style>