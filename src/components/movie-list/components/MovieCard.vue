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
    <img :src="getFullImageUrl(92, movieData.poster_path)">
    <div>
      {{ movieData.title }}
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
  border-color: gray

  img
    margin-right: 10px
</style>