<template>
  <div>
    <br>
    <v-card  class="p-3">    
      <span><br>{{article.parent_username}}님이 작성한 글에</span>
      <br>
      <span>[{{article.content}}] 라는 글을 남겼습니다.</span>
      <br><br>
      <span>{{article.created_at|moment('YYYY-MM-DD HH:mm:ss') }}</span>
      <br>
      <p>{{article.created_at|moment('from', 'now') }}</p>
    </v-card>

  </div>
</template>

<script>
export default {
  name:'GuildRecommentItem',
  props:{
    article:{
      type:Object,
    }
  }
}
</script>

<style>

</style>