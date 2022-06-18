<script setup>
import movieEndpoint from '../../helpers/movie-endpoint';
import { reactive, onMounted, computed, toRefs, watch } from 'vue';
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
const state = reactive({
  movies: [],
  timeWindow: 'week',
  currentPage: 1
});

const stateRef = toRefs(state);
const algorithm = computed(() => props.algorithm);
const page = computed({
  get: () => stateRef.currentPage.value,
  set: (val) => { 
    stateRef.currentPage.value = val;

    if (stateRef.currentPage.value < 1) {
      stateRef.currentPage.value = 1;
    }
  }
});

watch(page, () => {
  getMovies();
});

const getMovies = () => {
  movieEndpoint.getMovies(algorithm.value, page.value, stateRef.timeWindow.value)
    .then(results => state.movies.value = results);
};

onMounted(getMovies);
</script>

<template>
  <div class="movie-list-wrapper">
    <h2>{{ blockTitle }}</h2>
    <div>{{ page }}</div>
    <div @click="page = page + 1">
      NEXT
    </div>
    <div @click="page = page - 1">
      click
    </div>
  </div>
</template>

<style lang="sass" scoped>
  
</style>