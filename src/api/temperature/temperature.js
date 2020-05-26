import request from '@/utils/request'
const apiName = '/tm/temperature'
export default{
    // 查询所有简历
  getList () {
    return request({
      url: `${apiName}/list`,
      method: 'get'
    })
  },
    // 分页查询
  getPageList (page, limit) {
    return request({
      url: `${apiName}/${page}/${limit}`,
      method: 'get'
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
  save (temperature) {
    return request({
      url: `${apiName}/save`,
      method: 'post',
      data: temperature
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
  updateById (temperature) {
    return request({
      url: `${apiName}/${temperature.id}`,
      method: 'put',
      data: temperature
    })
  }
}
