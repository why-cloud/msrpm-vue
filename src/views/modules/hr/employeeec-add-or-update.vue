<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="员工编号" prop="eid">
      <el-input v-model="dataForm.eid" placeholder="员工编号"></el-input>
    </el-form-item>
    <el-form-item label="所属部门" prop="departmentId">
           <el-select v-model="dataForm.departmentId" placeholder="所属部门">
          <el-option
            v-for="item in depOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
      </el-select>
      <!-- <el-input v-model="dataForm.departmentId" placeholder="所属部门"></el-input> -->
    </el-form-item>
    <el-form-item label="奖罚日期" prop="ecDate">
      <el-date-picker 
      value-format="yyyy-MM-dd HH:mm:ss" 
      type="datetime" 
      v-model="dataForm.ecDate" 
      placeholder="奖罚日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="奖罚原因" prop="ecReason">
      <el-input v-model="dataForm.ecReason" placeholder="奖罚原因"></el-input>
    </el-form-item>
    <el-form-item label="奖罚分" prop="ecPoint">
      <el-input v-model="dataForm.ecPoint" placeholder="奖罚分"></el-input>
    </el-form-item>
    <el-form-item label="奖罚类别(0：奖，1：罚)" prop="ecType">
      <el-input v-model="dataForm.ecType" placeholder="奖罚类别(0：奖，1：罚)"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>
    <!-- <el-form-item label="逻辑删除 1（true）已删除， 0（false）未删除" prop="isDeleted">
      <el-input v-model="dataForm.isDeleted" placeholder="逻辑删除 1（true）已删除， 0（false）未删除"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="gmtCreate">
      <el-input v-model="dataForm.gmtCreate" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="gmtModified">
      <el-input v-model="dataForm.gmtModified" placeholder="更新时间"></el-input>
    </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        depOptions: [],
        value: '',
        visible: false,
        dataForm: {
          id: 0,
          eid: '',
          departmentId: '',
          ecDate: '',
          ecReason: '',
          ecPoint: '',
          ecType: '',
          remark: ''
          // isDeleted: '',
          // gmtCreate: '',
          // gmtModified: ''
        },
        dataRule: {
          eid: [
            { required: true, message: '员工编号不能为空', trigger: 'blur' }
          ],
          departmentId: [
            { required: true, message: '所属部门不能为空', trigger: 'blur' }
          ],
          ecDate: [
            { required: true, message: '奖罚日期不能为空', trigger: 'blur' }
          ],
          ecReason: [
            { required: true, message: '奖罚原因不能为空', trigger: 'blur' }
          ],
          ecPoint: [
            { required: true, message: '奖罚分不能为空', trigger: 'blur' }
          ],
          ecType: [
            { required: true, message: '奖罚类别，0：奖，1：罚不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ]
          // isDeleted: [
          //   { required: true, message: '逻辑删除 1（true）已删除， 0（false）未删除不能为空', trigger: 'blur' }
          // ],
          // gmtCreate: [
          //   { required: true, message: '创建时间不能为空', trigger: 'blur' }
          // ],
          // gmtModified: [
          //   { required: true, message: '更新时间不能为空', trigger: 'blur' }
          // ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        // 初始化department
        this.$http({
          url: this.$http.adornUrl(`/hr/employeeremove/deps`),
          method: 'get'
        }).then(({data}) => {
          this.depOptions = data.dep
        })
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/hr/employeeec/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.eid = data.employeeec.eid
                this.dataForm.departmentId = data.employeeec.departmentId
                this.dataForm.ecDate = data.employeeec.ecDate
                this.dataForm.ecReason = data.employeeec.ecReason
                this.dataForm.ecPoint = data.employeeec.ecPoint
                this.dataForm.ecType = data.employeeec.ecType
                this.dataForm.remark = data.employeeec.remark
                // this.dataForm.isDeleted = data.employeeec.isDeleted
                // this.dataForm.gmtCreate = data.employeeec.gmtCreate
                // this.dataForm.gmtModified = data.employeeec.gmtModified
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/hr/employeeec/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'eid': this.dataForm.eid,
                'departmentId': this.dataForm.departmentId,
                'ecDate': this.dataForm.ecDate,
                'ecReason': this.dataForm.ecReason,
                'ecPoint': this.dataForm.ecPoint,
                'ecType': this.dataForm.ecType,
                'remark': this.dataForm.remark
                // 'isDeleted': this.dataForm.isDeleted,
                // 'gmtCreate': this.dataForm.gmtCreate,
                // 'gmtModified': this.dataForm.gmtModified
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
