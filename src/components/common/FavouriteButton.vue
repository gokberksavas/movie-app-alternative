<script setup>
import favourite from '@/helpers/favourite'
import { ref, computed, watch, inject } from 'vue'

const props = defineProps({
  movieData: {
      type: Object,
      default: () => {}
  }
});

const emit = defineEmits(['movieunfavourited', 'moviefavourited']);

const isFavourite = ref(favourite.isFavourite(props.movieData.id));
const favouriteState = computed(() => favourite.isFavourite(props.movieData.id));
const favouriteToast = inject('favouriteToast');
const unfavouriteToast = inject('unfavouriteToast');

const handleFavourite = () => {
  if (isFavourite.value) {
    favourite.removeFromFavourites(props.movieData.id);
    
    emit('movieunfavourited');

    unfavouriteToast.value.showNotification();
  } else {
    favourite.addToFavourite(props.movieData);

    favouriteToast.value.showNotification();
  }

  isFavourite.value = favourite.isFavourite(props.movieData.id);
};

watch(favouriteState, () => {
  isFavourite.value = favouriteState.value;
});
</script>

<template>
  <FontAwesomeIcon 
    class="star-icon"
    :class="{'favourited': isFavourite }" 
    icon="fa-solid fa-star"
    @click="handleFavourite"
  />
</template>

<style lang="sass" scoped>
.star-icon
  position: absolute
  right: 10px
  top: 10px
  stroke: #999999
  stroke-width: 30px
  color: #ffffff
  transition: transform 0.4s ease
  cursor: pointer

  &:hover
    transform: scale(1.25)

.star-icon.favourited
  stroke: $pinkish-red
  stroke-width: 30px
  color: $pinkish-red
</style>