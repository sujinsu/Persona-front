import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api_movies: {},
    searchCollections: {},
    movieDetail: {
      data: {title: '', }
    },
    collectionDetail: null, 
    isLogin: false,
    superuser: false,
    collectionList: [],
    isUpdateArticle:null,

    selectGuild :null, // GuildItem에서 고른 길드 >> Detail 이동
    recomment:{
      parent_username:null,
      article_num:null,
    },
    user:{
      id:null,
      username:null,
      image:null,
      profile_content:null,
    },
  },
  mutations: {
    IS_SUPERUSER: function (state, check) {
      state.superuser = check
    },
    SHOW_DETAIL: function (state, movie) {
      state.movieDetail = movie
    },
    SHOW_COLLECTION_DETAIL: function (state, collection) {
      state.collectionDetail = collection
    },
    COLLECTION_LIST: function (state, collection) {
      state.collectionList.push(collection)
    },
    SELECT_GUILD:function(state,guild){
      state.selectGuild = guild
      console.log('선택된 길드는'+guild.name)
    },
    
    GET_USER_PROFILE:function(state,data){
      state.user.id = data.id
      state.user.username = data.username
      state.user.img = data.img
      state.user.profile_content = data.profile_content
    },
    SEARCH_MOVIE: function (state, movies) {
      state.api_movies = movies
    },
    SEARCH_COLLECTION: function (state, collections) {
      state.searchCollections = collections
    },
    LOGIN: function (state) {
      state.isLogin = true
    },
    LOGOUT: function (state) {
      state.isLogin = false
      state.superuser = false
    },
    UPDATE_ARTICLE:function(state){
      console.log('글 올라왔다!')
      state.isUpdateArticle = true
  
    },
    RESET_UPDATE:function(state){
      state.isUpdateArticle = false
    },
    // 리코멘트되는 글 번호 저장
    ABC:function(state,article){
      state.recomment.article_num = article.article_num
      state.recomment.parent_username = article.parent_username
    },
    // 리코멘트되는 글 번호 초기화
    RESET:function(state){
      state.recomment.article_num = null
      state.recomment.parent_username = null
    },
  },
  actions: {
    selectGuild:function({commit},guild){
      commit('SELECT_GUILD',guild)
    },
    
    getUserProfile:function({commit},data){
      commit('GET_USER_PROFILE',data)
    },
    searchMovie: function ({ commit }, movies) {
      commit('SEARCH_MOVIE', movies)
    },
    searchCollection: function ({ commit }, collections) {
      commit('SEARCH_COLLECTION', collections)
    },
    login: function ({ commit }) {
      commit('LOGIN')
    },
    logout: function ({ commit }) {
      commit('LOGOUT')
    },
    updateArticle: function({commit}){
      commit('UPDATE_ARTICLE')
    },
    resetUpdate:function({commit}){
      commit('RESET_UPDATE')
    },
    abc:function({commit},article_num){
      commit('ABC',article_num)
    },
    reset:function({commit}){
      commit('RESET')
    },
    isSuperuser: function ({ commit }, check) {
      commit('IS_SUPERUSER', check)
    },
    showDetail: function ({ commit }, movie) {
      commit('SHOW_DETAIL', movie)
    },
    showCollectionDetail: function ({ commit }, collection) {
      commit('SHOW_COLLECTION_DETAIL', collection)
    },
    collectionList: function ({ commit }, collection) {
      commit('COLLECTION_LIST', collection)
    },
  },
  modules: {
  }
})
