<script setup>
import { computed } from 'vue'

const props = defineProps({
  movieArray: {
    type: Array,
    default: () => [],
  },
  showButton: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['showmoreresults']);

const movies = computed(() => props.movieArray);
</script>

<template>
  <div class="search-results-wrapper">
    <div class="title">
      Search Results
    </div>
    <div class="search-results-list">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="search-result"
      >
        <router-link :to="`/movie/${movie.id}`">
          {{ movie.title }}
        </router-link>
      </div>
      <button
        v-if="props.showButton"
        class="show-more-btn" 
        @click="emit('showmoreresults')"
      >
        Show more
      </button>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.search-results-wrapper
  position: absolute
  margin-top: 15px
  left: 35px
  background-color: white
  border-radius: 5px
  border: 1px solid $darkblue
  color: $text-black
  padding: 10px
  width: calc(100% - 35px)

  a
    text-decoration: none
    color: $darkblue
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis

  .title
    font-size: 1.1rem
    font-weight: 700
    margin-bottom: 20px

  .search-results-list
    overflow-y: scroll
    scroll-behavior: smooth
    height: 350px

    &::-webkit-scrollbar
      background-color: #dddddd
      width: 6px

    &::-webkit-scrollbar-thumb
      background: $pinkish-red
      border-radius: 10px

    .search-result
      display: flex
      align-items: center
      padding: 0 0.5rem
      line-height: 1.4
      height: 50px
      font-size: 0.9rem
      font-weight: 500
      border: 1px solid $darkblue
      border-radius: 5px
      margin: 0 0.5rem 0.5rem 0
      
      &:hover
        background-color: $icy-white

    .show-more-btn
      display: block
      margin: 0 auto
      background-color: $pinkish-red
      color: $icy-white
      height: 35px
      border-radius: 5px
      outline: none
      border: 1px solid $icy-white
      cursor: pointer

      &:hover
        background-color: #a32731
</style>