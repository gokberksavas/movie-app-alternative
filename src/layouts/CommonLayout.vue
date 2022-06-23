<script setup>
import SideBar from '@/components/common/SideBar.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import { ref } from '@vue/reactivity'

const showSideBar = ref(false);

const toggleSideBar = (status) => {
    showSideBar.value = status;
}
</script>

<template>
  <div class="common-layout">
    <SideBar :status="showSideBar" />
    <div class="layout-inner">
      <PageHeader @togglesidebar="toggleSideBar($event)" />
      <slot name="page-content" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.common-layout
  width: 100%
  display: flex

  .layout-inner
    flex: 1
</style>