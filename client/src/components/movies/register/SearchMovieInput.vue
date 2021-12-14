<template>
  <div>
    <input 
      @keyup.enter="onInputMovie"
      type="text"
      v-model.trim="inputValue" 
      style="outline-color: black" 
    >
    <button @click="onInputMovie">search</button>
    
  </div>
</template>

<script>
export default {
  name: 'SearchMovieInput',
  data: function (){
    return {
      inputValue: null,
    }
  },
  methods: {
    onInputMovie: function () {
      this.$emit('input-change', this.inputValue)
    },
  }
}
</script>

<style>

</style>