import { constantRoutes, asyncRoutes } from '@/router/index.js'
export default {
  namespaced: true,
  state: {
    routes: []
  },
  mutations: {
    setRoutes(state, filterRoutes) {
      state.routes = [...constantRoutes, ...filterRoutes]
    },
    removeRoutes(state) {
      state.routes = [...constantRoutes]
    }
  },
  actions: {
    generateRoutes(context, menus) {
      const filterRoutes = asyncRoutes.filter(t =>
        menus.includes(t.children[0].name))
      // TODO:记得上线删除
      // const filterRoutes = asyncRoutes
      context.commit('setRoutes', filterRoutes)
      return filterRoutes
    }
  }
}
