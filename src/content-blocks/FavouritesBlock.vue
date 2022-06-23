<script setup>
import MovieList from '@/components/movie-list/MovieList.vue';
</script>

<template>
  <MovieList
    :block-title="'Favourite Movies'" 
    :endpoint="'favourites'"
  />
</template>