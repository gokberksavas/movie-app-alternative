/* eslint-disable no-debugger */
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

export default Utils;