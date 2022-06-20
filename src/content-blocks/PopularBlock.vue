<script setup>
import MovieList from '@/components/movie-list/MovieList.vue'
</script>

<template>
  <MovieList
    :block-title="'Popular Movies'" 
    :algorithm="'popular'"
  />
</template>