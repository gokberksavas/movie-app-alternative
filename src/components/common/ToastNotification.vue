<script setup>
import { ref, defineExpose } from 'vue'

const props = defineProps({
  notificationText: {
    type: String,
    default: 'This is a notification'
  },
  notificationBgColor: {
    type: String,
    default: '#a0eb9d'
  },
  notificationTextColor: {
    type: String,
    default: '#294f28'
  },
  notificationIcon: {
    type: String,
    default: 'fa-solid fa-circle-check'
  }
});

const notificationActive = ref(false);

const notificationColoring = {
  backgroundColor: props.notificationBgColor,
  color: props.notificationTextColor,
  border: `2px solid ${props.notificationTextColor}`
};

const showNotification = () => {
  notificationActive.value = true;

  setTimeout(() => {
    notificationActive.value = false;
  }, 3000);
};

defineExpose({
  showNotification
});
</script>

<template>
  <Transition name="toast">
    <div
      v-if="notificationActive"
      class="toast-notification"
      :style="notificationColoring"
    >
      <div class="notification-text">
        {{ props.notificationText }}
      </div>
      <FontAwesomeIcon
        class="notification-icon"
        :icon="props.notificationIcon" 
      />
    </div>
  </Transition>
</template>

<style lang="sass" scoped>
.toast-enter-active,
.toast-leave-active
  transition: opacity 0.5s ease

.toast-enter-from,
.toast-leave-to
  opacity: 0
 
.toast-notification
  position: fixed
  width: 360px
  height: 65px
  border-radius: 10px
  display: flex
  flex-direction: row-reverse
  align-items: center
  top: 150px
  right: 0
  z-index: 999

  .notification-icon
    font-size: 1.3rem
    margin: 0 0.5rem

  .notification-text
    flex: 1
    font-size: 0.9rem
</style>