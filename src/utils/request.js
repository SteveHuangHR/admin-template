import axios from 'axios'
import { Message } from 'element-ui'
const request = axios.create({
  // baseURL: 'http://ihrm-java.itheima.net/api'
  baseURL: process.env.VUE_APP_BASE_API
})
// 请求拦截器
request.interceptors.request.use(config => {
// Do something before request is sent
  return config
}, error => {
// Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(response => {
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
}, error => {
// Do something with response error
  Message.error('服务器报错')
  return Promise.reject(error)
})
export default request
