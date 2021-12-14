<template>
  <div>
    <br>
    <my-alram-signup-item
      v-for="(data,index) in requestData"
      :key="index"
      :data="data"
      @deleteSignup="deleteSignup"
    >
    </my-alram-signup-item>
    
    <my-alram-like-item
      v-for="alram in likeAlrams"
      :key="alram.id"
      :alram="alram"
      @deleteAlram="deleteAlram"
    >

    </my-alram-like-item>

  </div>
</template>

<script>

import MyAlramLikeItem from '@/components/profile/MyAlramLikeItem'
import MyAlramSignupItem from '@/components/profile/MyAlramSignupItem'
export default {
  name:'MyAlramList',
  props:{
    requestData:{
      type:Array,
    },
    likeAlrams:{
      type:Array
    }
  },
  components:{
    MyAlramSignupItem,
    MyAlramLikeItem
  },
  methods:{
    deleteSignup:function(){
      this.$emit('deleteSignup')
    },
    deleteAlram:function(){
      this.$emit('deleteAlram')
    }
    
  }

}
</script>

<style>

</style>