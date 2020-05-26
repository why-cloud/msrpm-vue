/* eslint-disable camelcase */
import request from '@/utils/request'

const api_name = '/es/employee'
// const api_name = '/getByName/{name}'

export default {

  getByName (employee) {
    return request({
      url: `${api_name}/employee-info/${employee.name}`,
      method: 'get',
      params: employee
    })
  }

}
