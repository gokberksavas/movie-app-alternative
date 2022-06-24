<script setup>
import movieEndpoint from '../../helpers/movie-endpoint'
import { ref, onMounted, watch, computed, onUpdated } from 'vue'
import MovieCard from '@/components/movie-list/components/MovieCard.vue'
import { useRoute } from 'vue-router'
import favourite from '@/helpers/favourite'
import FilterInput from '@/components/movie-list/components/FilterInput.vue'
import PaginationBlock from '@/components/common/PaginationBlock.vue'

const props = defineProps({
  blockTitle: {
    type: String,
    default: 'Block Title',
  },
  endpoint: {
    type: String,
    default: 'popular',
  }
});

//initializing the state
const movies = ref([]);
const timeWindow = ref('week');
const route = useRoute();
const maxPageCount = ref(1);

const page = computed(() => {
  return route.query.page || 1;
});
 
const getMovies = async (endpoint) => {
  if (endpoint === 'favourites') {
    movies.value = favourite.getFavourites();
  } else if (endpoint === 'trending' || endpoint === 'popular') {
    const data = await movieEndpoint.getMovies(endpoint, page.value, timeWindow.value);

    movies.value = data.results;
    maxPageCount.value = data.total_pages;
  }
};

const changeTimeWindow = (event) => {
  const selectedTimeWindow = String(event.target.value).toLowerCase();

  timeWindow.value = selectedTimeWindow;
};

const handleUnfavourite = () => {
  if (props.endpoint === 'favourites') {
    getMovies(props.endpoint);
  }
};

const removeAllFavourites = () => {
  favourite.removeAll();
  getMovies(props.endpoint);
};

onMounted(() => getMovies(props.endpoint));
watch([page, timeWindow], () => getMovies(props.endpoint));
</script>

<template>
  <div 
    v-if="movies.length > 0"
    class="movie-list-wrapper"
  >
    <div class="block-header">
      <h2>{{ blockTitle }}</h2>
      <FilterInput 
        v-if="props.endpoint === 'trending'" 
        :options="['Week', 'Day']"
        @dropdownchanged="changeTimeWindow($event)"
      />
      <div
        v-if="props.endpoint === 'favourites'" 
        class="remove-all"
        @click="removeAllFavourites"
      >
        <FontAwesomeIcon icon="fa-solid fa-trash-can" />
      </div>
    </div>
    <div
      v-if="movies.length > 0"  
      class="movie-list"
    >
      <MovieCard
        v-for="movie in movies" 
        :key="movie.id"
        :movie-data="movie"
        @movieunfavourited="handleUnfavourite"
      />
    </div>
    <PaginationBlock
      v-if="movies.length > 0"
      :max-page-count="maxPageCount"
    />
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

    .remove-all
      background-color: $pinkish-red
      color: $icy-white
      padding: 7.5px 12px
      font-size: 0.8rem
      border-radius: 5px
      user-select: none

      &:active
       box-shadow: inset 0px 0px 5px 2px #8f0813


  .movie-list
    display: grid
    grid-template-columns: repeat(2, calc(50% - 20px))
    gap: 20px

    @media screen and (min-width: 1440px)
      grid-template-columns: repeat(3, calc(100%/3 - 20px))
</style>