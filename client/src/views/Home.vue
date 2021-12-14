<template>
  <div class="container">
    <h1 class="fw-bold text-left">인기 영화</h1>
    <popular-movies></popular-movies>
    
    <balance-game></balance-game>

    <h1 class="fw-bold text-left my-5">영화 추천</h1>
    <h4>오늘의 기분에 맞는 영화를 선택해주세요!</h4>
    <movie-recommendation></movie-recommendation>


    <!-- <h1 class="fw-bold text-left">개봉 예정작</h1>
    <upcoming-movies></upcoming-movies> -->
  </div>
</template>

<script>
import BalanceGame from '@/components/home/BalanceGame'
import PopularMovies from '@/components/home/PopularMovies'
// import UpcomingMovies from '@/components/home/UpcomingMovies'
import MovieRecommendation from '@/components/home/MovieRecommendation'

export default {
  name:'Home',
  components:{
    BalanceGame,
    PopularMovies,
    // UpcomingMovies,
    MovieRecommendation,

  },
  methods: {
  }
}
</script>

<style>

</style>