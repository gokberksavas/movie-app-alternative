<script setup>
import common from '@/helpers/common';

const props = defineProps({
  movieData: {
    type: Object,
    default: () => ({})
  }
});

const getFullImageUrl = (size, posterPath) => {
  return `${common.IMG_BASE_URL}${common.POSTER_SIZES[size]}${posterPath}`;
};
</script>

<template>
  <div class="movie-wrapper">
    <img 
      class="poster" 
      :src="getFullImageUrl(92, movieData.poster_path)"
    >
    <div class="movie-info">
      <div class="title">
        {{ movieData.title }}
      </div>
      <div class="overview">
        {{ movieData.overview }}
      </div>
      <span class="release-date">{{ movieData.release_date.split('-')[0] }}</span>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.movie-wrapper
  display: flex
  align-items: center
  padding: 5px
  border-width: 1px
  border-style: solid
  border-color: #666666
  border-radius: 5px
  box-shadow: -4px 3px 6px 2px #cccccc

  .poster
    margin-right: 10px

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