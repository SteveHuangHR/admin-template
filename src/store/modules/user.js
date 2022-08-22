import { login, getUserBaseInfo, getEmplyeeBaseInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true, // 模块锁
  state: {
    // 定义数据
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    removeUserInfo(state) {
      state.userInfo = {}
    },
    // 定义同步方法和清除token
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = undefined
      removeToken()
    }
  },
  actions: {
    logout(context) {
      context.commit('removeToken')
      context.commit('removeUserInfo')
    },
    async getUserInfo(context) {
      const u = await getUserBaseInfo()
      const e = await getEmplyeeBaseInfo(u.userId)
      context.commit('setUserInfo', { ...u, ...e })
      return u
    },
    // 定义异步方法发请求
    async login(context, data) {
      const token = await login(data)
      context.commit('setToken', token)
    }
  }
}
