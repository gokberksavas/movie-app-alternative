<script setup>
import Utils from '@/helpers/Utils';
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue';
import movieEndpoint from '@/helpers/movie-endpoint'
import CollapsableText from './components/CollapsableText.vue';

const route = useRoute();
const movie = ref({});

onMounted(() => {
  movieEndpoint.getMovieById(route.params.id)
    .then((res) => { movie.value = res; });
});

watch(() => route.params.id, () => {
  movieEndpoint.getMovieById(route.params.id)
    .then((res) => { movie.value = res; });
});
</script>

<template>
  <div class="movie-detail-wrapper">
    <div class="movie-poster-wrapper">
      <img :src="Utils.getFullImageUrl(342, movie.poster_path)">
    </div>
    <div class="movie-detail">
      <div class="movie-title">
        {{ movie.title }}
      </div>
      <div class="movie-tag-line">
        {{ movie.tagline }}
      </div>
      <CollapsableText
        :block-title="'Overview'"
        :text-content="movie.overview"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.movie-detail-wrapper
  margin: 1rem auto 0 auto
  display: grid
  grid-template-columns: 365px auto
  width: 90%
  max-width: 1440px
  min-width: 720px

  .movie-tag-line
    color: $text-black
    font-size: 0.8rem
    font-style: italic
    margin-bottom: 0.5rem

  .movie-poster-wrapper > img
    border: 1px solid $darkblue
    border-radius: 10px

  .movie-title
    font-weight: 600
    font-size: 1.5rem
    margin: 0 0 0.5rem -3px
</style>