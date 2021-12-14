<template>
  <div id="app">
    <v-app>

      <Header></Header>

        <router-view class="container"/>

      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
import Footer from './components/common/Footer'
import Header from './components/common/Header'

export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
}
</script>

<style>

.container{
  width:75%;
  margin-right: auto;
  margin-left: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>