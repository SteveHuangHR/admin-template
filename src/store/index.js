import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)
const test = {
  namespaced: true, // 模块锁
  state: {
    num: 0
  },
  mutations: {
    addNum(state, num) {
      state.num += num
      console.log('杜甫')
    }
  },
  actions: {
    addNumSync(context, data) {
      setInterval(() => {
        // const num = 10
        context.commit('addNum', data)
      }, 100)
    }
  }
}
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    test
  },
  // 放数据
  state: {
    count: 0,
    age: 15,
    name: '李白'
  },
  // 放同步方法
  mutations: {
    add(state) {
      state.age++
    },
    addNum(state, num) {
      state.age += num
      console.log('李白')
    }
  },
  // 放异步方法
  actions: {
    addSync(context) {
      setInterval(() => {
        context.commit('add')
      }, 1000)
    },
    addSyncN(context, num) {
      setInterval(() => {
        context.commit('addN', num)
      }, 1000)
    }
  },
  // 计算属性
  getters: {
    ...getters,
    showCount(state) {
      return 'count=' + state.age
    }
  }
})

export default store
