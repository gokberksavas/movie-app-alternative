<script setup>
const props = defineProps({
  options: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['dropdownchanged']);
</script>

<template>
  <div class="filter-dropdown">
    <span>Show Trending Movies of the:&nbsp;</span>
    <select @change="emit('dropdownchanged', $event)">
      <option 
        v-for="option in props.options"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>