<script setup>
import CommonLayout from './layouts/CommonLayout.vue';
</script>

<template>
  <CommonLayout>
    <template #page-content>
      <router-view />
    </template>
  </CommonLayout>
</template>