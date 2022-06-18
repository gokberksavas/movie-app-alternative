<script setup>
import movieEndpoint from '../../helpers/movie-endpoint';
import { ref, onBeforeMount, computed, watch } from 'vue';
import MovieCard from '@/components/movie-list/components/MovieCard.vue';

const props = defineProps({
  blockTitle: {
    type: String,
    default: 'Block Title',
  },
  algorithm: {
    type: String,
    default: 'popular',
  }
});

//initializing the state and getting initial movies
const movies = ref([]);
const page = ref(1);
const timeWindow = ref('week');

  
const getMovies = () => {
  movieEndpoint.getMovies(props.algorithm, page.value, timeWindow.value)
    .then(results => movies.value = results)
};

onBeforeMount(getMovies);

watch(page, () => {
  getMovies();
});
</script>

<template>
  <div class="movie-list-wrapper">
    <h2>{{ blockTitle }}</h2>
    <div class="movie-list">
      <MovieCard
        v-for="movie in movies" 
        :key="movie.id"
        :movie-data="movie"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
  
</style>