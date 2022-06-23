<script setup>
import { ref } from 'vue'
import SearchBar from './SearchBar.vue';

const emit = defineEmits(['togglesidebar']);
const sideBarStatus = ref(false);

const toggleSideBar = () => {
  sideBarStatus.value = !sideBarStatus.value;

  emit('togglesidebar', sideBarStatus.value);
};
</script>

<template>
  <div class="header">
    <div class="header-content">
      <FontAwesomeIcon
        icon="fa-solid fa-align-justify"
        class="sidebar-btn"
        :class="{'sidebar-active': sideBarStatus}"
        @click="toggleSideBar"
      />
      <SearchBar />
      <div class="header-text">
        The Movie App
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.header
  height: 110px
  padding: 10px
  background-color: $darkblue
  color: $icy-white
  z-index: 3
  position: sticky
  top: 0
  font-size: 2.5rem

  .header-content
    display: flex
    align-items: center
    height: 100%

    .sidebar-btn
      transition: transform 0.3s linear
      transform: rotateY(0deg)
      font-size: 1.5rem
      padding: 10px
      cursor: pointer

      &:hover
        color: $lightblue

      &.sidebar-active
        transform: rotateY(180deg)

    .header-text
      flex: 1
      text-align: center
      font-weight: 500
</style>