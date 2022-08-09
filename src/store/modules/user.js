import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true, // 模块锁
  state: {
    // 定义数据
    token: getToken()
  },
  mutations: {
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
    // 定义异步方法发请求
    async login(context, data) {
      const token = await login(data)
      context.commit('setToken', token)
    }
  }
}
