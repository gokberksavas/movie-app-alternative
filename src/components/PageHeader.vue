<script setup>
const emit = defineEmits(['togglesidebar']);
</script>

<template>
  <div class="header">
    <div class="header-content">
      <div
        class="show-sidebar-btn"
        @click="emit('togglesidebar', true)"
      >
        SHOW SIDEBAR
      </div>
      <div class="header-text">
        HEADER
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

  .header-content
    display: flex

    .header-text
      flex: 1
      text-align: center
</style>