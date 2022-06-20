<script setup>
const emit = defineEmits(['togglesidebar']);
const props = defineProps({
  status: Boolean
});

const buttonConfig = [
  { path: '/', text: 'Home' },
  { path: '/popular', text: 'Popular'},
  { path: '/trending', text: 'Trending'},
  { path: '/favourites', text: 'Favourites' }
];
</script>


<template>
  <div
    class="sidebar"
    :class="{ 'sidebar-hidden': !props.status }"
  >
    <div class="sidebar-content">
      <div
        class="sidebar-close-btn"
        @click="emit('togglesidebar', false)"
      >
        CLOSE
      </div>
      <h1>Menu</h1>
      <router-link
        v-for="button in buttonConfig"
        :key="button.text + Math.random()"
        :to="button.path"
      >
        <div class="sidebar-btn">
          {{ button.text }}
        </div>
      </router-link>
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

  .sidebar-close-btn
    position: absolute
    right: 10px
    top: 3px

  .sidebar-content
    position: sticky
    top: 0
    padding: 8px
    display: flex
    flex-direction: column
    align-items: center
    transform: translateX(0)
    transition: transform 0.1s linear
</style>