<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="员工编号" prop="eid">
      <el-input v-model="dataForm.eid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="调动后部门" prop="afterDepId">
       <!-- <el-select v-model="dataForm.afterDepId" placeholder="调动后部门">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
      </el-select> -->
      <el-input v-model="dataForm.afterDepId" placeholder="调动后部门编号"></el-input>
    </el-form-item>
    <el-form-item label="调动后职位" prop="afterJobId">
      <el-input v-model="dataForm.afterJobId" placeholder="调动后职位编号"></el-input>
    </el-form-item>

    <el-form-item label="调动日期" prop="removeDate">
      <el-date-picker
      value-format="yyyy-MM-dd HH:mm:ss" 
      type="datetime" 
      v-model="dataForm.removeDate" 
      placeholder="调动日期"></el-date-picker>
    </el-form-item>

    <el-form-item label="调动原因" prop="reason">
      <el-input v-model="dataForm.reason" placeholder="调动原因"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder=""></el-input>
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
    <el-form-item label="调动前部门" prop="beforeDepId">
      <el-input v-model="dataForm.beforeDepId" placeholder="调动前部门编号"></el-input>
    </el-form-item>
    <el-form-item label="调动前职位" prop="beforeJobId">
      <el-input v-model="dataForm.beforeJobId" placeholder="调动前职位编号"></el-input>
    </el-form-item>
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
        // pickerOptions: {
        //   disabledDate (time) {
        //     return time.getTime() > Date.now()
        //   }
        // },
        depOptions: [],
        jobOptions: [],
        value: '',
        visible: false,
        dataForm: {
          id: 0,
          eid: '',
          afterDepId: '',
          // afterDepName: '',
          afterJobId: '',
          removeDate: '',
          reason: '',
          remark: '',
          // isDeleted: '',
          // gmtCreate: '',
          // gmtModified: '',
          beforeDepId: '',
          beforeJobId: ''
        },
        dataRule: {
          eid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          afterDepId: [
            { required: true, message: '调动后部门不能为空', trigger: 'blur' }
          ],
          afterJobId: [
            { required: true, message: '调动后职位不能为空', trigger: 'blur' }
          ],
          removeDate: [
            { required: true, message: '调动日期不能为空', trigger: 'blur' }
          ],
          reason: [
            { required: true, message: '调动原因不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          // isDeleted: [
          //   { required: true, message: '逻辑删除 1（true）已删除， 0（false）未删除不能为空', trigger: 'blur' }
          // ],
          // gmtCreate: [
          //   { required: true, message: '创建时间不能为空', trigger: 'blur' }
          // ],
          // gmtModified: [
          //   { required: true, message: '更新时间不能为空', trigger: 'blur' }
          // ],
          beforeDepId: [
            { required: true, message: '调动前部门不能为空', trigger: 'blur' }
          ],
          beforeJobId: [
            { required: true, message: '调动前职位不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        // this.$http({
        //   url: this.$http.adornUrl(`/hr/employeeremove/list/dep`),
        //   method: 'get'
        // }).then(({data}) => {
        //   console.log(data)
        //   if (data && data.code === 0) {
        //     this.options = data.dep
        //   }
        // })
            //  this.$http({
            //   url: this.$http.adornUrl(`/hr/employeeremove/list/job`),
            //   method: 'get',
            //   // params: this.$http.adornParams()
            // }).then(({data}) => {

            // })
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/hr/employeeremove/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.eid = data.employeeremove.eid
                this.dataForm.afterDepId = data.employeeremove.afterDepId
                this.dataForm.afterJobId = data.employeeremove.afterJobId
                this.dataForm.removeDate = data.employeeremove.removeDate
                this.dataForm.reason = data.employeeremove.reason
                this.dataForm.remark = data.employeeremove.remark
                // this.dataForm.isDeleted = data.employeeremove.isDeleted
                // this.dataForm.gmtCreate = data.employeeremove.gmtCreate
                // this.dataForm.gmtModified = data.employeeremove.gmtModified
                this.dataForm.beforeDepId = data.employeeremove.beforeDepId
                this.dataForm.beforeJobId = data.employeeremove.beforeJobId
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
              url: this.$http.adornUrl(`/hr/employeeremove/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'eid': this.dataForm.eid,
                'afterDepId': this.dataForm.afterDepId,
                'afterJobId': this.dataForm.afterJobId,
                'removeDate': this.dataForm.removeDate,
                'reason': this.dataForm.reason,
                'remark': this.dataForm.remark,
                // 'isDeleted': this.dataForm.isDeleted,
                // 'gmtCreate': this.dataForm.gmtCreate,
                // 'gmtModified': this.dataForm.gmtModified,
                'beforeDepId': this.dataForm.beforeDepId,
                'beforeJobId': this.dataForm.beforeJobId
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
