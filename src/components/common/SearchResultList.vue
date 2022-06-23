<script setup>
import { computed } from 'vue'

const props = defineProps({
  movieArray: {
    type: Array,
    default: () => [],
  }
});

const movies = computed(() => props.movieArray);
</script>

<template>
  <div class="search-results-wrapper">
    <div
      v-for="movie in movies"
      :key="movie.id"
      class="search-result"
    >
      {{ movie.title }}
    </div>
    <slot name="showmore" />
  </div>
</template>

<style lang="sass">
.search-results-wrapper
  position: absolute
  height: 300px
  overflow-y: scroll
  background-color: white
  color: black

  .search-result
    height: 60px
</style>