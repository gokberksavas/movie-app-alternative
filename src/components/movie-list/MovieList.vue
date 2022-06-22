<script setup>
import movieEndpoint from '../../helpers/movie-endpoint';
import { ref, onMounted, watch, computed, onUpdated } from 'vue';
import MovieCard from '@/components/movie-list/components/MovieCard.vue';
import { useRouter, useRoute } from 'vue-router';
import FilterInput from '@/components/FilterInput.vue'

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
const timeWindow = ref('week');
 
const getMovies = async () => {
  movies.value = await movieEndpoint.getMovies(props.algorithm, page.value, timeWindow.value);
};

const changeTimeWindow = (event) => {
  const selectedTimeWindow = String(event.target.value).toLowerCase();

  timeWindow.value = selectedTimeWindow;
};

onMounted(getMovies);

//pagination with url parameters
const router = useRouter();
const route = useRoute();

const page = computed(() => {
  return route.query.page || 1;
});

const goPrevPage = () => {
  page.value > 1 && router.push({ query: { page: parseInt(page.value) - 1 } });
};

const goNextPage = () => {
  router.push({ query: { page: parseInt(page.value) + 1 } });
};

watch([page, timeWindow], getMovies);
</script>

<template>
  <div class="movie-list-wrapper">
    <div class="block-header">
      <h2>{{ blockTitle }}</h2>
      <FilterInput 
        v-if="props.algorithm === 'trending'" 
        :options="['Week', 'Day']"
        @dropdownchanged="changeTimeWindow($event)"
      />
    </div>
    <div class="movie-list">
      <MovieCard
        v-for="movie in movies" 
        :key="movie.id"
        :movie-data="movie"
      />
    </div>
    <div class="pagination">
      <FontAwesomeIcon
        icon="fa-solid fa-arrow-left" 
        class="arrow-prev"
        @click="goPrevPage"
      />
      <div class="current-page">
        {{ page }}
      </div>
      <FontAwesomeIcon
        icon="fa-solid fa-arrow-right" 
        class="arrow-next"
        @click="goNextPage"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.movie-list-wrapper
  padding: 5px 30px
  
  .block-header
    display: flex
    align-items: center
    padding-right: 20px

    h2
      flex: 1
      font-size: 1.1rem

  .movie-list
    display: grid
    grid-template-columns: repeat(2, calc(50% - 20px))
    gap: 20px

    @media screen and (min-width: 1440px)
      grid-template-columns: repeat(3, calc(100%/3 - 20px))

  .pagination
    display: flex
    justify-content: center
    align-items: center
    margin: 20px 0

    .arrow-next,
    .arrow-prev
      cursor: pointer
      font-size: 1.2rem

      &:hover
        color: $pinkish-red

    div
      padding: 0
      margin: 0 10px
      font-size: 1.2rem
      color: $darkblue
</style>