import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import '@/directives'
// import '@/filters'
// 单个注册
// import { formatDate } from '@/filters/index.js'
// Vue.filter('formatDate', formatDate)
import * as filters from '@/filters/index.js'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
// import '@/components'
import Ui from '@/components/index.js'
Vue.use(Ui)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// 模拟数据
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
// 只在开放阶段使用测试语句
if (process.env.NODE_ENV === 'development') {
  require('../mock/rzzt')
}
// import '../mock/rzzt'
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false
// 解决公共方法
// 1.原型链
// Vue.prototype.checkPermission = function(key) {
//   return !this.$store.state.user.userInfo.roles.points.includes(key)
// }
// 2.混入
Vue.mixin({
  methods: {
    checkPermission: function(key) {
      // return !this.$store.state.user.userInfo.roles.points.includes(key)
      // 防止公共代码报错,使用内有数值的数据
      try {
        return !this.$store.state.user.userInfo.roles.points.includes(key)
      } catch (e) {
        return false
      }
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

const date = new Date()
console.log(filters.formatDate(date))
