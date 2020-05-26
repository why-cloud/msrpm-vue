import request from '@/utils/request'

const apiName = '/ei/employee'
export default {
  getGenderCountOfEmp () {
    return request({
      url: `${apiName}/gender`,
      method: 'get'
    })
  },
  getDeCountOfEmp () {
    return request({
      url: `${apiName}/department`,
      method: 'get'
    })
  },
  getDegreeCountOfEmp () {
    return request({
      url: `${apiName}/degree`,
      method: 'get'
    })
  },
  getPositionCountOfEmp () {
    return request({
      url: `${apiName}/positionCount`,
      method: 'get'
    })
  },
  getGenderCountOfDepartment () {
    return request({
      url: `${apiName}/depGender`,
      method: 'get'
    })
  },
  getPositionGenderCountOfEmp () {
    return request({
      url: `${apiName}/posGender`,
      method: 'get'
    })
  }
}
