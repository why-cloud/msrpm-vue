import request from '@/utils/request'
const apiName = '/hr/employcheck'
export default{
  // 查询所有简历
  getPageList01 (time, page, limit, key) {
    return request({
      url: `${apiName}/list`,
      method: 'get',
      params: {'t': time, 'page': page, 'limit': limit, 'key': key}
    })
  },
    // 查询所有简历
  getList () {
    return request({
      url: `${apiName}/list`,
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
  save (resume) {
    return request({
      url: `${apiName}/save`,
      method: 'post',
      data: resume
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
  updateById (resume) {
    return request({
      url: `${apiName}/${resume.id}`,
      method: 'put',
      data: resume
    })
  }

}
