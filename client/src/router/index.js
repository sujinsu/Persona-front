import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Movies from '@/views/movies/Movies.vue'
import Community from '@/views/Community.vue'

import Guilds from '@/views/Guilds.vue'
import CreateGuild from '@/components/guilds/CreateGuild'
import GuildDetail from '@/views/GuildDetail'
import GuildDetailUpdate from '@/views/GuildDetailUpdate'
import GuildArticle from '@/components/guilds/GuildDetail/GuildArticle'
import GuildRecomment from '@/components/guilds/GuildDetail/GuildRecomment'
import MyGuildArticle from '@/components/guilds/GuildDetail/MyGuildArticle'
import GuildLikeArticle from '@/components/guilds/GuildDetail/GuildLikeArticle'

import Profile from '@/views/Profile.vue'
import MyFeedPlace from '@/components/profile/MyFeedPlace'
import MyAlram from '@/components/profile/MyAlram'
import MyGuilds from '@/components/profile/MyGuilds'
import MyLikes from '@/components/profile/MyLikes'
import ProfileDetail from '@/components/profile/ProfileDetail'

import Signup from '@/views/accounts/Signup'
import Login from '@/views/accounts/Login'
import MovieDetail from '@/components/movies/movieDetail/MovieDetail'
import AddMovie from '@/views/movies/AddMovie'
import SearchMovies from '@/components/movies/searchMovie/SearchMovies'
import addCollection from '@/components/movies/collections/addCollection'
import collectionDetail from '@/components/movies/collections/collectionDetail'
import searchCollection from '@/components/movies/collections/searchCollection'
import updateCollection from '@/components/movies/collections/updateCollection'
import MovieRecommendation from '@/components/home/MovieRecommendation'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/update/collection',
    name: 'updateCollection',
    component: updateCollection
  },
  {
    path: '/movie/recommendation',
    name: 'MovieRecommendation',
    component: MovieRecommendation
  },
  {
    path: '/add/movie',
    name: 'AddMovie',
    component: AddMovie
  },
  {
    path: '/collection/results',
    name: 'searchCollection',
    component: searchCollection
  },
  {
    path: '/add/collection',
    name: 'addCollection',
    component: addCollection
  },
  {
    path: '/add/collection/detail',
    name: 'collectionDetail',
    component: collectionDetail
  },
  {
    path: '/search/movies',
    name: 'SearchMovies',
    component: SearchMovies
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/movies/detail',
    name: 'MovieDetail',
    component: MovieDetail
  },
  {
    path: '/community',
    name: 'Community',
    component: Community
  },
  {
    path: '/guilds',
    name: 'Guilds',
    component: Guilds,
  },
  {
    path: '/create_guild',
    name: 'CreateGuild',
    component: CreateGuild
  },
  {
    path: '/guild_detail/:id',
    name: 'GuildDetail',
    component: GuildDetail,
    children:[
      { path: '',name:'GuildArticle', component: GuildArticle },
				
      { path: 'recomment', name: 'GuildRecomment', component: GuildRecomment },

      { path: 'my_article', name: 'MyGuildArticle', component: MyGuildArticle },

      { path: 'like_article', name:'GuildLikeArticle', component: GuildLikeArticle }
    ]
  },

  {
    path: '/guild_detail_update',
    name: 'GuildDetailUpdate',
    component: GuildDetailUpdate
  },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    children:[
      { path: 'detail',name:'ProfileDetail', component: ProfileDetail },
				
      { path: 'myfeedplace', name: 'MyFeedPlace', component: MyFeedPlace },

      { path: 'myalram', name: 'MyAlram', component: MyAlram },

      { path: 'mylikes', name:'MyLikes', component: MyLikes },

      { path: 'myguilds', name:'MyGuilds', component: MyGuilds }
    ]
  },

  {
    path: '/accounts/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/accounts/login',
    name: 'Login',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
