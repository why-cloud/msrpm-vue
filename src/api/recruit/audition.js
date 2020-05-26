import request from '@/utils/request'
const apiName = '/rm/audition'
export default{
    // 查询所有
  getList () {
    return request({
      url: `${apiName}/list`,
      method: 'get'
    })
  },
    // 分页查询
  getPageList (page, size) {
    return request({
      url: `${apiName}/${page}/${size}`,
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
  save (audition) {
    return request({
      url: `${apiName}/save`,
      method: 'post',
      data: audition
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
  updateById (audition) {
    return request({
      url: `${apiName}/${audition.id}`,
      method: 'put',
      data: audition
    })
  }

}
