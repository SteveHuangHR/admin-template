import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params
  })
}
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
export function delRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
export function getRoleId(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'get'
  })
}
export function updataRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}
