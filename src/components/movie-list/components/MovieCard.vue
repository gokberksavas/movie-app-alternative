<script setup>
import Utils from '@/helpers/Utils';
import { computed } from 'vue'
import FavouriteButton from '@/components/common/FavouriteButton.vue';

const props = defineProps({
  movieData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['movieunfavourited', 'moviefavourited']);

const movie = computed(() => props.movieData);
const  { id, release_date: release, poster_path: poster, title, overview, ...rest} = movie.value;
</script>

<template>
  <div class="movie-wrapper">
    <FavouriteButton
      :movie-data="movie"
      @movieunfavourited="emit('movieunfavourited')"
    />
    <img 
      class="poster" 
      :src="Utils.getFullImageUrl(92, poster)"
    >
    <div class="movie-info">
      <router-link :to="`/movie/${movie.id}`">
        <div class="title">
          {{ title }}
        </div>
      </router-link>
      <div class="overview">
        {{ overview }}
      </div>
      <span class="release-date">{{ release.split('-')[0] }}</span>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.movie-wrapper
  position: relative
  display: flex
  align-items: center
  padding: 5px
  border-width: 1px
  border-style: solid
  border-color: #dddddd
  border-radius: 5px
  box-shadow: -4px 3px 6px 2px #cccccc
  transition: transform 0.2s linear

  &:hover
    transform: scale(1.02)

  .poster
    margin-right: 10px

  .movie-info
    box-sizing: border-box
    display: flex
    height: 100%
    flex-direction: column
    justify-content: flex-start
    padding: 10px 0

    a
      text-decoration: none !important

    .title
      margin-bottom: 10px
      font-weight: 700
      width: 90%
      text-overflow: ellipsis
      font-size: 0.8rem
      cursor: pointer
      color: $text-black

      &:hover
        color: $pinkish-red
      
    .overview
      display: -webkit-box
      -webkit-box-orient: vertical
      overflow: hidden
      -webkit-line-clamp: 2
      font-size: 0.8rem
      font-style: italic
    
    .release-date
      font-weight: 700
      font-style: italic
      font-size: 0.8rem
      margin-top: auto
</style>