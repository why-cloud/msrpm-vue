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
      <!-- <el-input v-model="dataForm.departmentId" placeholder="所属部门编号"></el-input> -->
    </el-form-item>
    <el-form-item label="培训日期" prop="traindate">
      <el-date-picker
      value-format="yyyy-MM-dd HH:mm:ss" 
      type="datetime" 
      v-model="dataForm.trainDate" 
      placeholder="培训日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="培训内容" prop="traincontent">
      <el-input v-model="dataForm.trainContent" placeholder="培训内容"></el-input>
    </el-form-item>
    <el-form-item label="培训结果" prop="trainresult">
      <el-input v-model="dataForm.trainResult" placeholder="培训结果"></el-input>
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
          // depName: '',
          trainDate: '',
          trainContent: '',
          trainResult: '',
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
          trainDate: [
            { required: true, message: '培训日期不能为空', trigger: 'blur' }
          ],
          trainContent: [
            { required: true, message: '培训内容不能为空', trigger: 'blur' }
          ],
          trainResult: [
            { required: true, message: '培训结果不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/hr/employeetrain/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.eid = data.employeetrain.eid
                this.dataForm.departmentId = data.employeetrain.departmentId
                // this.dataForm.depName = data.employeetrain.depName
                this.dataForm.trainDate = data.employeetrain.trainDate
                this.dataForm.trainContent = data.employeetrain.trainContent
                this.dataForm.trainResult = data.employeetrain.trainResult
                this.dataForm.remark = data.employeetrain.remark
                // this.dataForm.isDeleted = data.employeetrain.isDeleted
                // this.dataForm.gmtCreate = data.employeetrain.gmtCreate
                // this.dataForm.gmtModified = data.employeetrain.gmtModified
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
              url: this.$http.adornUrl(`/hr/employeetrain/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'eid': this.dataForm.eid,
                'departmentId': this.dataForm.departmentId,
                // 'depName': this.dataForm.depName,
                'trainDate': this.dataForm.trainDate,
                'trainContent': this.dataForm.trainContent,
                'trainResult': this.dataForm.trainResult,
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
