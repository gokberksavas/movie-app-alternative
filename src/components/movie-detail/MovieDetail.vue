<script setup>
import Utils from '@/helpers/Utils';
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';
import movieEndpoint from '@/helpers/movie-endpoint'

const route = useRoute();
const id = route.params.id;
const movie = ref({});

onMounted(() => {
  movieEndpoint.getMovieById(id)
    .then((res) => { movie.value = res; });
});
</script>

<template>
  <div class="movie-detail-wrapper">
    <div class="movie-poster-wrapper">
      <img :src="Utils.getFullImageUrl(342, movie.poster_path)">
    </div>
  </div>
</template>

<style lang="sass" scoped>
</style>