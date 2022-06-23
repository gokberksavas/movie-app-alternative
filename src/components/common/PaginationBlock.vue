<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  maxPageCount: {
    type: Number,
    default: 1
  }
});

const route = useRoute();
const router = useRouter();

const page = computed(() => route.query.page || 1);

const goPrevPage = () => {
  page.value > 1 && router.push({ query: { page: parseInt(page.value) - 1 } });
};

const goNextPage = () => {
  router.push({ query: { page: parseInt(page.value) + 1 } });
};
</script>

<template>
  <div
    v-if="page <= props.maxPageCount"
    class="pagination"
  >
    <FontAwesomeIcon
      v-if="page > 1"
      icon="fa-solid fa-arrow-left" 
      class="arrow-prev"
      @click="goPrevPage"
    />
    <div class="current-page">
      {{ page }}
    </div>
    <FontAwesomeIcon
      v-if="page < props.maxPageCount"
      icon="fa-solid fa-arrow-right" 
      class="arrow-next"
      @click="goNextPage"
    />
  </div>
</template>

<style lang="sass" scoped>
.pagination
  display: flex
  justify-content: center
  align-items: center
  margin: 20px 0

  .arrow-next,
  .arrow-prev
    cursor: pointer
    font-size: 1.2rem

    &:hover
      color: $pinkish-red

  div
    padding: 0
    margin: 0 10px
    font-size: 1.2rem
    color: $darkblue 
</style>