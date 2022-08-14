import request from '@/utils/request'

export function getDepartments() {
  return request({
    url: '/company/department',
    method: 'get'
  })
}
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'

  })
}
export function getDepartmentById(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'get'
  })
}
export function updateDepartmentById(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
