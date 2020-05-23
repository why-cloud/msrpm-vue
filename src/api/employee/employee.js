import request from '@/utils/request'
const apiName = '/ei/employee'
export default{
    // 查询所有员工
  getList () {
    return request({
      url: `${apiName}/alllist`,
      method: 'get'
    })
  },
  // 职称列表
  getJobLevel () {
    return request({
      url: `${apiName}/joblevels`,
      method: 'get'
    })
  },
  // 职位列表
  getPositions () {
    return request({
      url: `${apiName}/position`,
      method: 'get'
    })
  },
  // 民族列表
  getNations () {
    return request({
      url: `${apiName}/nations`,
      method: 'get'
    })
  },
  // 部门列表
  getDepartment () {
    return request({
      url: `${apiName}/deps`,
      method: 'get'
    })
  },
  // 合同形式列表
  getEngage () {
    return request({
      url: `${apiName}/form`,
      method: 'get'
    })
  },
  // 最高学历列表
  getTopDegree () {
    return request({
      url: `${apiName}/topdegree`,
      method: 'get'
    })
  },
  // 所有在职状态列表
  getWorkStates () {
    return request({
      url: `${apiName}/workstate`,
      method: 'get'
    })
  },
  // 所有政治面貌列表
  getPoliticsStatus () {
    return request({
      url: `${apiName}/politicsstatus`,
      method: 'get'
    })
  },

    // 分页查询
  getPageList (page, limit, searchObj) {
    return request({
      url: `${apiName}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  // 删除
  removeById (id) {
    return request({
      url: `${apiName}/${id}`,
      method: 'delete'
    })
  },
  // 新增
  save (employee) {
    return request({
      url: `${apiName}/save`,
      method: 'post',
      data: employee
    })
  },
  // 根据id查询
  getById (id) {
    return request({
      url: `${apiName}/${id}`,
      method: 'get'
    })
  },
  // 修改
  updateById (employee) {
    return request({
      url: `${apiName}/${employee.id}`,
      method: 'put',
      data: employee
    })
  },
  getDepList () {
    return request({
      url: `${apiName}/deplist`,
      method: 'get'
    })
  }

}
