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
      <el-input v-model="dataForm.departmentid" placeholder="所属部门"></el-input>
    </el-form-item>
    <el-form-item label="奖罚日期" prop="ecDate">
      <el-input v-model="dataForm.ecdate" placeholder="奖罚日期"></el-input>
    </el-form-item>
    <el-form-item label="奖罚原因" prop="ecReason">
      <el-input v-model="dataForm.ecreason" placeholder="奖罚原因"></el-input>
    </el-form-item>
    <el-form-item label="奖罚分" prop="ecPoint">
      <el-input v-model="dataForm.ecpoint" placeholder="奖罚分"></el-input>
    </el-form-item>
    <el-form-item label="奖罚类别，0：奖，1：罚" prop="ecType">
      <el-input v-model="dataForm.ectype" placeholder="奖罚类别，0：奖，1：罚"></el-input>
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
        visible: false,
        dataForm: {
          id: 0,
          eid: '',
          departmentid: '',
          ecdate: '',
          ecreason: '',
          ecpoint: '',
          ectype: '',
          remark: '',
          isDeleted: '',
          gmtCreate: '',
          gmtModified: ''
        },
        dataRule: {
          eid: [
            { required: true, message: '员工编号不能为空', trigger: 'blur' }
          ],
          departmentid: [
            { required: true, message: '所属部门不能为空', trigger: 'blur' }
          ],
          ecdate: [
            { required: true, message: '奖罚日期不能为空', trigger: 'blur' }
          ],
          ecreason: [
            { required: true, message: '奖罚原因不能为空', trigger: 'blur' }
          ],
          ecpoint: [
            { required: true, message: '奖罚分不能为空', trigger: 'blur' }
          ],
          ectype: [
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
                this.dataForm.departmentid = data.employeeec.departmentId
                this.dataForm.ecdate = data.employeeec.ecDate
                this.dataForm.ecreason = data.employeeec.ecReason
                this.dataForm.ecpoint = data.employeeec.ecPoint
                this.dataForm.ectype = data.employeeec.ecType
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
                'departmentId': this.dataForm.departmentid,
                'ecDate': this.dataForm.ecdate,
                'ecReason': this.dataForm.ecreason,
                'ecPoint': this.dataForm.ecpoint,
                'ecType': this.dataForm.ectype,
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
