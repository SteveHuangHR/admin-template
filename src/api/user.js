import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {

}
/**
 *  获取用户的基本资料
 *
 * **/
export function getUserBaseInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 获取员工的基本信息
export function getEmplyeeBaseInfo(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}
export function logout() {

}
