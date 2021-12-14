<template>
  <div>
    <br>
    <h2 class="font-weight-bold m-4">Guild</h2>
    <div class="container bg-light border rounded" style="background-color: rgb(234, 233, 239)">

      <div class="d-flex row justify-content-center m-5">
        <div class="justify-self-center">
          <search-guild ></search-guild>
        </div>
       
        <div class="justify-self-end m-4">
          <v-btn 
            color="deep-purple white--text" 
            id="createBtn" 
            outlined 
            @click="moveToCreate" 
            class="mt-1"
          > CREATE My Guild 
            <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
        </div>

      </div>

      <div class="justify-content-around">
        <div class="row">
          <user-guild-list ></user-guild-list>
        </div><br><br>
        <div class="row border m-2">
          <guild-list></guild-list>
        </div>
      </div>
          

        
    </div>
  </div>
  
</template>

<script>
import GuildList from '@/components/guilds/GuildList'
import UserGuildList from '@/components/guilds/UserGuildList'
import SearchGuild from '@/components/guilds/SearchGuild/SearchGuild'

export default {
  name:'Guilds',
  components:{
    GuildList,
    UserGuildList,
    SearchGuild
  },
  methods:{
    moveToCreate:function(){
      this.$router.push('/create_guild')
    },
  }
}
</script>

<style scoped>



body {
  margin: 5rem auto;
  background-color: darkslategray;
  color: white;
}

.container {
  margin: 10px auto;
  padding: 20px auto;
  width:85%;
}

/* .container h1 {
  text-transform: uppercase;
}
.row {
  border: 10px solid lightblue;
} */

/* .container > .row > div {
  padding: 20px 10px;
  border: 10px solid white;
  font-size: 50px;
  text-align: center;
} */

/* .container > .row > div:nth-child(odd) {
  background: orange;
}
container > .row > div:nth-child(even) {
  background: green;
}

.row-vh {
  height: 500px;
} */
</style>
