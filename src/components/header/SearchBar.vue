<script setup>
import Utils from '@/helpers/Utils'
import movieEndpoint from '@/helpers/movie-endpoint'
import { ref } from 'vue'
import SearchResultList from './SearchResultList.vue'

const showInput = ref(false);
const searchResults = ref([]);
const searchQuery = ref('');
const queryPage = ref(1);
const maxPageCount = ref(1);

const getSearchResults = async (query, page) => {
  if (query.length < 3) {
    resetResultsAndPage();

    return false;
  }

  const data = await movieEndpoint.searchMovies(query, page);

  if (page === 1) {
    searchResults.value = data.results;
  } else if (page > 1) {
    searchResults.value = searchResults.value.concat(data.results);
  }

  queryPage.value = data.page;
  maxPageCount.value = data.total_pages;
};

const resetResultsAndPage = () => {
  searchResults.value = [];
  queryPage.value = 1;
};

const handleInput = Utils.debounce(() => {
  resetResultsAndPage();

  getSearchResults(searchQuery.value, 1);
}, 500);

const handleClickOutside = () => {
  showInput.value = false;
  searchQuery.value = '';
  searchResults.value = [];
  queryPage.value = 1;
};
</script>

<template>
  <div
    v-clickoutside="handleClickOutside"
    class="search-bar-wrapper"
  >
    <div 
      class="input-wrapper"
      :class="{'input-hidden': !showInput}"
    >
      <FontAwesomeIcon
        class="search-icon"
        icon="fa-solid fa-magnifying-glass"
        @click="showInput = !showInput"
      />
      <input
        v-model="searchQuery"
        class="search-input"
        type="text"
        placeholder="Search for movies..."
        @input="handleInput"
      >
    </div>
    <SearchResultList
      v-if="searchResults.length > 0 && showInput"
      :movie-array="searchResults"
      :show-button="maxPageCount !== queryPage"
      @showmoreresults="getSearchResults(searchQuery, queryPage + 1)"
    />
  </div>
</template>

<style lang="sass" scoped>
.search-bar-wrapper
  display: block
  margin-left: 0.5rem
  padding: 10px 0
  position: relative
  width: 26%

  .input-wrapper
    display: flex
    align-items: center
    width: 100%
    transition: width 0.3s ease

    &.input-hidden
      width: 30px
      overflow: hidden

    .search-input
      flex: 1
      height: 35px
      border-radius: 5px
      padding: 0
      border: none
      padding: 2px 10px
      min-width: 0 

      &:focus-visible
        outline: none 
 
    .search-icon
      display: block
      margin-right: 0.5rem
      font-size: 1.4rem
      cursor: pointer
      min-width: 30px

      &:hover
       color: $lightblue 
</style>