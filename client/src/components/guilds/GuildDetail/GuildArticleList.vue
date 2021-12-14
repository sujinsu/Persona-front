<template>
  <div>
    <guild-article-item
      v-for="article in articles"
      :key="article.id"
      :article="article"
      :user="user"
      :nickname="nickname"
      :isMember="isMember"
      @recomment="recomment"
    >

    </guild-article-item>
  </div>
</template>

<script>
import GuildArticleItem from '@/components/guilds/GuildDetail/GuildArticleItem'

export default {
  name:'GuildArticleList',
  components:{
    GuildArticleItem
  },
  props:{
    articles:{
      type:Array,
    },
    user:{
      type:Number
    },
    nickname:{
      type:String
    },
    isMember:{
      type:Boolean
    }
  },
  methods:{
    recomment:function(article){
      this.$emit('recomment',article)
    }
  }

}
</script>

<style>

</style>