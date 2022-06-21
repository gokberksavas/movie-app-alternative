<script setup>
import MovieCard from './components/MovieCard.vue';
import { ref, onMounted } from 'vue'
import favourite from '@/helpers/favourite';

const favouriteMovies = ref(favourite.getFavourites());

const handleUnFavourite = () => {
  favouriteMovies.value = favourite.getFavourites();
};
</script>

<template>
  <div class="movie-list-wrapper">
    <div class="block-header">
      <h2>{{ favouriteMovies.length > 0 ? 'Your Favourite Movies' : 'There are no favourite movies right now :(' }}</h2>
    </div>
    <div class="movie-list">
      <MovieCard
        v-for="movie in favouriteMovies" 
        :key="movie.id"
        :movie-data="movie"
        @movieunfavourited="handleUnFavourite"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.movie-list-wrapper
  padding: 5px 30px 20px 30px
  
  .block-header
    display: flex
    align-items: center
    padding-right: 20px

    h2
      flex: 1

  .movie-list
    display: grid
    grid-template-columns: repeat(2, calc(50% - 20px))
    gap: 20px

    @media screen and (min-width: 1440px)
      grid-template-columns: repeat(3, calc(100%/3 - 20px))
</style>