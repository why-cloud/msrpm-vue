/* eslint-disable camelcase */
import request from '@/utils/request'

const api_name = '/es/salary'

export default {
  saveSalaryInfo (salary) {
    return request({
      url: `${api_name}/save-salary-info`,
      method: 'post',
      data: salary
    })
  },
  getById (id) {
    return request({
      url: `${api_name}/salary-info/${id}`,
      method: 'get'
    })
  },
  updateSalaryInfoById (salary) {
    return request({
      url: `${api_name}/update-salary-info/${salary.id}`,
      method: 'put',
      data: salary
    })
  },
//   getCoursePublishInfoById(id) {
//     return request({
//       url: `${api_name}/course-publish-info/${id}`,
//       method: 'get'
//     })
//   },
//   publishCourse(id) {
//     return request({
//       url: `${api_name}/publish-course/${id}`,
//       method: 'put'
//     })
//   },
  getPageList (page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  getList () {
    return request({
      url: `${api_name}/list`,
      method: 'get'
    })
  },
  removeById (id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  }
}
