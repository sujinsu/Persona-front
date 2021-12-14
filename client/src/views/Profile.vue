<template>
  <div>
    <div class="container p-2">

      <!-- <h2>Profile</h2> -->
      <br>
      <v-card>
      <v-tabs
        v-model="tab"
        background-color="deep-purple darken3"
        centered
        dark
        icons-and-text
        shift
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1" @click="moveToProfile">
          Profile
          <v-icon right>mdi-account</v-icon>
        </v-tab>

        <v-tab href="#tab-2" @click="moveToMyFeed">
          My Feed
          <v-icon right>mdi-feature-search-outline</v-icon>
        </v-tab>

        <v-tab href="#tab-3"  @click="moveToMyAlram">
          My Alram
          <v-icon right>mdi-comment-check-outline</v-icon>
        </v-tab>

        <v-tab href="#tab-4"  @click="moveToMyLikes">
          My Likes
          <v-icon right>mdi-heart</v-icon>
        </v-tab>

        <v-tab href="#tab-5"  @click="moveToMyGuilds">
          My Guilds
          <v-icon right>mdi-account-box</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="i in 5"
          :key="i"
          :value="'tab-' + i"
        >
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <router-view></router-view>
    </v-card>
        

    </div>
  </div>
</template>

<script>
export default {
  name:'Profile',
  methods:{
    moveToProfile:function(){
      this.$router.push({name:'ProfileDetail'})
    },
    moveToMyFeed:function(){
      this.$router.push({name:'MyFeedPlace'})
    },
    moveToMyAlram:function(){
      this.$router.push({name:'MyAlram'})
    },
    moveToMyLikes:function(){
      this.$router.push({name:'MyLikes'})
    },
    moveToMyGuilds:function(){
      this.$router.push({name:'MyGuilds'})
    }
  }
  
}
</script>

<style scoped>
.container{
  width:80%;
  /* padding:10px; */
  margin-right: auto;
  margin-left: auto;
}

</style>