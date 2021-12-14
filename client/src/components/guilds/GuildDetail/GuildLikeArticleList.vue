<template>

    <div>      
        <guild-like-article-item
          v-for="article in articles"
          :key="article.id"
          :article="article"
        >
        </guild-like-article-item>

     
    </div>
 
</template>

<script>
import GuildLikeArticleItem from '@/components/guilds/GuildDetail/GuildLikeArticleItem'

export default {
 name:'GuildLikeArticleList',
 components:{
   GuildLikeArticleItem
 },
 props:{
   articles:{
     type:Array
   }
 }
}
</script>

<style>

</style>