<script setup>
import MovieList from '@/components/movie-list/MovieList.vue'
</script>

<template>
  <MovieList
    :block-title="'Trending Movies'" 
    :algorithm="'trending'"
  />
</template>