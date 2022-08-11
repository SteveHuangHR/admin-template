import Vue from 'vue'
Vue.directive('imgerror', {
  inserted(el, options) {
    if (!el.src) {
      el.src = options.value
    }
    el.onerror = function() {
      this.src = options.value
    }
  },
  update(el, options) {
    if (!el.src) {
      el.src = options.value
    }
  }
})

