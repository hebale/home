export const toDateFormat = (value) => {
  return String(value).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
};

export const throttle = (callback, delay) => {
  let timeout = null;
  
  return function(...args) {
    if (!timeout) {
      timeout= setTimeout(() => {
        callback.apply(this, args);
        timeout = null;
      }, delay);
    }
  }
};

export const debounce = (callback, delay) => {
  let timeout = null;
  
  return function(...args) {
    clearTimeout(timeout);
    timeout= setTimeout(() => {
      callback.apply(this, args);
    }, delay)
  }
};