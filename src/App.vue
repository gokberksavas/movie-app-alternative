<script setup>
import CommonLayout from './layouts/CommonLayout.vue'
import ToastNotification from './components/common/ToastNotification.vue'
import { provide, ref } from 'vue'

const favouriteToast = ref(null);
const unfavouriteToast = ref(null);

provide('favouriteToast', favouriteToast);
provide('unfavouriteToast', unfavouriteToast);
</script>

<template>
  <CommonLayout>
    <template #page-content>
      <router-view />
    </template>
  </CommonLayout>
  <ToastNotification
    ref="favouriteToast"
    :notification-text="'You\'ve added the movie to your favourites!'"
  />
  <ToastNotification
    ref="unfavouriteToast"
    :notification-text="'You\'ve removed the movie from your favourites :('"
    :notification-icon="'fa-solid fa-circle-exclamation'"
    :notification-bg-color="'#fad464'"
    :notification-text-color="'#5c4913'"
  />
</template>