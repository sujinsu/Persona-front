<template>
  <div class="container">
    <div v-if="reviews.length">
      <review-item
        v-for="review in reviews"
        :key="review.id"
        :review="review"
      ></review-item>
    </div>
    <div v-else>
      <h4>작성된 리뷰가 없습니다.</h4>
    </div>

    
  </div>
</template>

<script>
import ReviewItem from '@/components/movies/movieReview/ReviewItem/'

export default {
  name: 'Review',
  props: {
    reviews: Array,
  },
  components: {
    ReviewItem
  },
}
</script>

<style>

</style>