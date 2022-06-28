/* eslint-disable no-debugger */
import common from '@/helpers/common'

let Utils = {};

Utils.debounce = (callback, time) => {
  let debounceTimeout = null;

  return (...args) => {
    window.clearTimeout(debounceTimeout);
    
    debounceTimeout = window.setTimeout(() => {
      callback.apply(null, args);
    }, time);
  };
};

Utils.getFullImageUrl = (size, posterPath) => {
  return `${common.IMG_BASE_URL}${common.POSTER_SIZES[size]}${posterPath}`;
};

Utils.getFullBackdropUrl = (size, backdropPath) => {
  return `${common.IMG_BASE_URL}${common.BACKDROP_SIZES[size]}${backdropPath}`;
}

export default Utils;