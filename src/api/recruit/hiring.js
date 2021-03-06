import request from '@/utils/request'
const apiName = '/rm/employeehiring'
export default{
    // 查询所有
  getList () {
    return request({
      url: `${apiName}/list`,
      method: 'get'
    })
  },
       // 分页查询
  getPageList (page, size, searchObj) {
    return request({
      url: `${apiName}/${page}/${size}`,
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
  save (employeehiring) {
    return request({
      url: `${apiName}/save`,
      method: 'post',
      data: employeehiring
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
  updateById (employeehiring) {
    return request({
      url: `${apiName}/${employeehiring.id}`,
      method: 'put',
      data: employeehiring
    })
  }

}
