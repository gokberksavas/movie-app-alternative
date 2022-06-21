<script setup>
import common from '@/helpers/common';
import { ref, computed } from 'vue'
import favourite from '@/helpers/favourite'
const props = defineProps({
  movieData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['movieunfavourited']);

const movie = computed(() => props.movieData);
const  { id, release_date: release, poster_path: poster, title, overview, ...rest} = movie.value;

const isFavourite = ref(favourite.isFavourite(id));

const getFullImageUrl = (size, posterPath) => {
  return `${common.IMG_BASE_URL}${common.POSTER_SIZES[size]}${posterPath}`;
};

const handleFavourite = () => {
  if (isFavourite.value) {
    favourite.removeFromFavourites(id);
    emit('movieunfavourited');
  } else {
    favourite.addToFavourite(movie.value);
  }

  isFavourite.value = favourite.isFavourite(id);
};
</script>

<template>
  <div class="movie-wrapper">
    <FontAwesomeIcon 
      class="star-icon"
      :class="{'favourited': isFavourite }" 
      icon="fa-solid fa-star"
      @click="handleFavourite"
    />
    <img 
      class="poster" 
      :src="getFullImageUrl(92, poster)"
    >
    <div class="movie-info">
      <div class="title">
        {{ title }}
      </div>
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
  cursor: pointer

  &:hover
    transform: scale(1.02)

  .poster
    margin-right: 10px

  .star-icon
    position: absolute
    right: 15px
    top: 10px
    stroke: #999999
    stroke-width: 30px
    color: #ffffff
  
  .star-icon.favourited
    stroke: #e8bb07
    stroke-width: 30px
    color: #e8bb07

  .movie-info
    box-sizing: border-box
    display: flex
    height: 100%
    flex-direction: column
    justify-content: flex-start
    padding: 15px 0

    .title
      margin-bottom: 5px
      font-weight: 700
      width: 90%
      text-overflow: ellipsis

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