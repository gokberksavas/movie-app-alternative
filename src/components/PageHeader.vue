<script setup>
import { ref } from 'vue'

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
        icon="fa-solid fa-right-from-bracket"
        class="sidebar-btn"
        :class="{'sidebar-active': sideBarStatus}"
        @click="toggleSideBar"
      />
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
  background-color: cadetblue
  z-index: 3
  position: sticky
  top: 0
  font-size: 3rem

  .header-content
    display: flex
    align-items: center
    height: 100%

    .sidebar-btn
      transition: transform 0.3s linear
      transform: rotateY(0deg)
      font-size: 1.5rem
      padding: 10px

      &:hover
        color: #ffffff

      &.sidebar-active
        transform: rotateY(180deg)

    .header-text
      flex: 1
      text-align: center
</style>