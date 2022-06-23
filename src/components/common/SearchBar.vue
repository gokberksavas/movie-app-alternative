<script setup>
import Utils from '@/helpers/Utils'
import movieEndpoint from '@/helpers/movie-endpoint'
import { ref } from 'vue'
import SearchResultList from './SearchResultList.vue'

const lastQuery = ref('');
const lastQueryPage = ref();
const searchResults = ref([]);

const getSearchResults = Utils.debounce(async (e) => {
  let searchQuery = e.target.value;

  if (searchQuery.length < 3) {
    searchResults.value = [];

    return false;
  }

  lastQuery.value = searchQuery;
  lastQueryPage.value = 1;
  

  if (searchQuery.length >= 3) {
    const data = await movieEndpoint.searchMovies(lastQuery.value, lastQueryPage.value);

    searchResults.value = data.results;
  }
}, 500);

const getNextSearchResults = async () => {
  lastQueryPage.value++;

  const data = await movieEndpoint.searchMovies(lastQuery.value, lastQueryPage.value);
  const shownMovies = searchResults.value;

  searchResults.value = shownMovies.concat(data.results);
};

const resetSearch = () => {
  searchResults.value = [];
  lastQuery.value = '';
  lastQueryPage.value = 1;
}

const handleClickOutside = (e, el) => {
  if (!e.path.includes(el)) {
    return resetSearch;
  } else {
    return () => {};
  }
}

const vClickOutside = {
  mounted: (el) => {
    document.body.addEventListener('click', (e) => handleClickOutside(e, el)());
  },
  unmounted: () => {
    // eslint-disable-next-line no-debugger
    debugger
    document.body.removeEventListener('click', resetSearch);
  }
}
</script>

<template>
  <div 
    v-click-outside="resetSearch"
    class="search-bar-wrapper"
  >
    <div class="input-wrapper">
      <FontAwesomeIcon
        class="search-icon"
        icon="fa-solid fa-magnifying-glass"
      />
      <input
        v-model="lastQuery"
        type="text"
        placeholder="Search for movies..."
        @input="getSearchResults"
      >
    </div>
    <SearchResultList
      v-if="searchResults.length > 0"
      :movie-array="searchResults"
    >
      <template #showmore>
        <button @click="getNextSearchResults">
          Show more
        </button>
      </template>
    </SearchResultList>
  </div>
</template>

<style lang="sass" scoped>
.search-bar-wrapper
  display: block
  font-size: 1rem
  margin-left: 1.2rem
  padding: 5px
  position: relative

  .search-icon
    margin-right: 0.5rem
</style>