<script setup>
import movieEndpoint from '../../helpers/movie-endpoint';
import { ref, onMounted, computed, watch } from 'vue';
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

onMounted(getMovies);

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
    <div class="pagination">
      <div 
        class="prev-page"
        @click="page > 1 && page--"
      >
        &lt;
      </div>
      <div class="current-page">
        {{ page }}
      </div>
      <div 
        class="next-page"
        @click="page++"
      >
        &gt;
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.movie-list-wrapper
  padding: 5px 30px
  
  .movie-list
    display: grid
    grid-template-columns: repeat(2, calc(50% - 20px))
    gap: 20px

    @media screen and (min-width: 1440px)
      grid-template-columns: repeat(3, calc(100%/3 - 20px))

  .pagination
    display: flex
    justify-content: center
    padding: 10px 0
  
    div
      padding: 5px
</style>