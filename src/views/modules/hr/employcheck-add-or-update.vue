<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="员工编号" prop="eid">
      <el-input v-model="dataForm.eid" placeholder="员工编号"></el-input>
    </el-form-item>
    <el-form-item label="本月天数" prop="daysMonth">
      <el-input v-model="dataForm.daysMonth" placeholder="本月天数"></el-input>
    </el-form-item>
    <el-form-item label="公休假天数" prop="daysHolidays">
      <el-input v-model="dataForm.daysHolidays" placeholder="公休假天数"></el-input>
    </el-form-item>
    <el-form-item label="应出勤天数" prop="daysDuty">
      <el-input v-model="dataForm.daysDuty" placeholder="应出勤天数"></el-input>
    </el-form-item>
    <el-form-item label="请假天数" prop="daysLeave">
      <el-input v-model="dataForm.daysLeave" placeholder="请假天数"></el-input>
    </el-form-item>
    <el-form-item label="节假日加班" prop="holidayOvertime">
      <el-input v-model="dataForm.holidayOvertime" placeholder="节假日加班"></el-input>
    </el-form-item>
    <el-form-item label="日常加班" prop="dailyOvertime">
      <el-input v-model="dataForm.dailyOvertime" placeholder="日常加班"></el-input>
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
          daysMonth: '',
          daysHolidays: '',
          daysDuty: '',
          daysLeave: '',
          holidayOvertime: '',
          dailyOvertime: ''
          // isDeleted: '',
          // gmtCreate: '',
          // gmtModified: ''
        },
        dataRule: {
          eid: [
            { required: true, message: '员工编号不能为空', trigger: 'blur' }
          ],
          daysMonth: [
            { required: true, message: '本月天数不能为空', trigger: 'blur' }
          ],
          daysHolidays: [
            { required: true, message: '公休假天数不能为空', trigger: 'blur' }
          ],
          daysDuty: [
            { required: true, message: '应出勤天数不能为空', trigger: 'blur' }
          ],
          daysLeave: [
            { required: true, message: '请假天数不能为空', trigger: 'blur' }
          ],
          holidayOvertime: [
            { required: true, message: '节假日加班不能为空', trigger: 'blur' }
          ],
          dailyOvertime: [
            { required: true, message: '日常加班不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/hr/employcheck/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.eid = data.employcheck.eid
                this.dataForm.daysMonth = data.employcheck.daysMonth
                this.dataForm.daysHolidays = data.employcheck.daysHolidays
                this.dataForm.daysDuty = data.employcheck.daysDuty
                this.dataForm.daysLeave = data.employcheck.daysLeave
                this.dataForm.holidayOvertime = data.employcheck.holidayOvertime
                this.dataForm.dailyOvertime = data.employcheck.dailyOvertime
                // this.dataForm.isDeleted = data.employcheck.isDeleted
                // this.dataForm.gmtCreate = data.employcheck.gmtCreate
                // this.dataForm.gmtModified = data.employcheck.gmtModified
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
              url: this.$http.adornUrl(`/hr/employcheck/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'eid': this.dataForm.eid,
                'daysMonth': this.dataForm.daysMonth,
                'daysHolidays': this.dataForm.daysHolidays,
                'daysDuty': this.dataForm.daysDuty,
                'daysLeave': this.dataForm.daysLeave,
                'holidayOvertime': this.dataForm.holidayOvertime,
                'dailyOvertime': this.dataForm.dailyOvertime
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
