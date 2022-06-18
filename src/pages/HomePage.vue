<script setup>
import CommonLayout from '@/layouts/CommonLayout.vue'
import MovieList from '@/components/movie-list/MovieList.vue'
</script>

<template>
  <CommonLayout>
    <template #page-content>
      <MovieList
        :block-title="'Trending Movies'" 
        :algorithm="'trending'"
      />
    </template>
  </CommonLayout>
</template>