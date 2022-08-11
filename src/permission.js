import router from '@/router/index.js'
import store from '@/store/index.js'
// 通过路由守卫进行页面跳转
// 跳转之前-前置守卫
router.beforeEach(async(to, from, next) => {
  // to - 去哪里的路由信息
  // from - 从哪里来的路由信息
  // next-是否允许访问
  // 白名单里面的路由可以直接访问
  // if (to.path === '/login' || to.path === '/404') {
  //   return next()
  // }
  const { token, userId } = store.getters
  if (token && !userId) {
    await store.dispatch('user/getUserInfo')
  }

  if (['/login', '/404'].includes(to.path)) {
    return next()
  }
  if (token) {
    next()
  } else {
    next('/login')
  }
})
// 跳转之后-后置守卫
router.afterEach((to, from) => {})
