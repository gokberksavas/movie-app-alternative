<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  blockTitle: {
    type: String,
    default: 'Block Title'
  },
  textContent: {
    type: String,
    default: 'This is collapsable text.'
  }
});

const isActive = ref(false);
const mainClass = computed(() => isActive.value ? 'collapsable-text active' : 'collapsable-text');
</script>

<template>
  <div :class="mainClass">
    <div
      class="block-title"
      @click="isActive = !isActive" 
    >
      <span>
        {{ props.blockTitle }}
      </span>
      <FontAwesomeIcon 
        icon="fa-solid fa-chevron-down"
        class="collapse-icon"
      />
    </div>
    <div class="text-content">
      {{ props.textContent }}
    </div>
  </div>
</template>

<style lang="sass" scoped>
.collapsable-text
  display: block

  .block-title
    border-bottom: 1px solid $darkblue
    display: flex
    justify-content: space-between
    cursor: pointer
    font-weight: 500
    padding: 0.5rem 0.5rem 0.5rem 0

    &:hover
      background-color: $icy-white
  
  .collapse-icon
    cursor: pointer
    color: $darkblue
    transition: transform 0.3s ease
    margin-left: auto
    font-size: 1.1rem
  
  .text-content
    height: 0
    overflow: hidden
    font-size: 0.9rem
    font-style: italic

.collapsable-text.active
  .block-title
    background-color: $icy-white

  .collapse-icon
    transform: rotate(180deg)
  
  .text-content
    height: auto
    padding: 0.5rem 0
</style>