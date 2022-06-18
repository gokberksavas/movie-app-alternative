<script setup>
const props = defineProps({
  movieData: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <div>{{ movieData.title }}</div>
</template>