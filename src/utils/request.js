import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store/index.js'
import router from '@/router/index.js'
const request = axios.create({
  // baseURL: 'http://ihrm-java.itheima.net/api'
  baseURL: process.env.VUE_APP_BASE_API
})
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (store.state.user.token) {
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // Do something before response is sent
    const {
      data: { success, message, data }
    } = response
    if (success) {
      return data
    } else {
      Message.error(message)
      // 主动产生一个错误
      // throw new Error(message)
      // 返回一个失败的promise
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // Do something with response error
    console.dir(error)
    if (error.response.status === 401 && error.response) {
      store.dispatch('user/logout')
      router.push('/login')
    }
    Message.error('服务器报错')
    return Promise.reject(error)
  }
)
export default request
