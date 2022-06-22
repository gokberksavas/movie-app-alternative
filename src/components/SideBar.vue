<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({
  status: Boolean
});

const buttonConfig = [
  { path: '/', text: 'Home' },
  { path: '/popular', text: 'Popular'},
  { path: '/trending', text: 'Trending'},
  { path: '/favourites', text: 'Favourites' }
];

const route = useRoute();
const router = useRouter();

const currentPath = ref(route.path);

router.afterEach(() => {
  currentPath.value = route.path;
});
</script>


<template>
  <div
    class="sidebar"
    :class="{ 'sidebar-hidden': !props.status }"
  >
    <div class="sidebar-content">
      <h1>Menu</h1>
      <div
        v-for="button in buttonConfig"
        :key="button.text + Math.random()"
        class="sidebar-btn"
        :class="{'path-active': button.path === currentPath}"
      >
        <router-link :to="button.path">
          {{ button.text }}
        </router-link>
      </div>
    </div>
  </div>
</template>


<style lang="sass" scoped>
.sidebar.sidebar-hidden
  width: 0

  .sidebar-content
    transform: translateX(-200px)


.sidebar
  position: relative
  width: 20%
  max-width: 275px
  background-color: #eeeeee
  transition: all 0.2s linear
  min-height: 100vh

  .sidebar-content
    position: sticky
    top: 0
    padding: 8px
    display: flex
    flex-direction: column
    align-items: center
    transform: translateX(0)
    transition: transform 0.1s linear

    .sidebar-btn
      width: 90%
      display: flex
      align-items: center
      background-color: white
      margin: 5px 0
      border-radius: 10px
      cursor: pointer
      color: #000000

      &.path-active
        background-color: pink

      a
        height: 40px
        padding: 10px
        width: 100%
        height: 100%
        text-transform: none
        text-decoration: none
        color: inherit

        &:active
          color: inherit
        
      
</style>