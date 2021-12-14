<template>
  <div class="container">
    <my-guild-article-item
      v-for="article in articles"
      :key="article.id"
      :article="article"
      @deleteArticle="deleteArticle"
    >
    </my-guild-article-item>
  </div>
</template>

<script>
import MyGuildArticleItem from '@/components/guilds/GuildDetail/MyGuildArticleItem'

export default {
  name:'MyGuildArticleList',
  props:{
    articles:{
      type:Array,
    }
  },
  components:{
    MyGuildArticleItem
  },
  methods:{
    deleteArticle:function(){
      this.$emit('deleteArticle')
    }
  }
}
</script>

<style>

</style>