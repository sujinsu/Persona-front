<template>
  <div>
    <guild-recomment-item
      v-for="article in articles"
      :key="article.id"
      :article="article"
    >
    </guild-recomment-item>
  </div>
</template>

<script>
import GuildRecommentItem from '@/components/guilds/GuildDetail/GuildRecommentItem'

export default {
  name:'GuildRecommentList',
  props:{
    articles:{
      type:Array
    }
  },
  components:{
    GuildRecommentItem
  }
}
</script>

<style>

</style>