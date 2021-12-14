<template>
   <div>
      <!-- <span  @click="deleteTag" class="font-weight-bold m-3 fs-5 bd-highlight"> </span> -->
    
    <v-btn class="font-weight-bold m-3 fs-5 bd-highlight">
      #{{tag.tag}}
    </v-btn>


    
    
    </div> 
</template>

<script>

export default {
  name:'GuildTagItem',
  props:{
    tag:{
      type:Object
    }
  },
}
</script>

<style>

</style>