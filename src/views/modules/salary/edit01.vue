<template>
  <div class="app-container">
    
        <el-form label-width="120px">
                   
          <el-form-item label="账套名称">
            <el-select v-model="empsalary.sid" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"/>              
            </el-select>
          </el-form-item>
              
          <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
          </el-form-item>
        </el-form>
      
  </div>
</template>


 <script>
import empsalary from '@/api/empsalary'
const defaultForm = {
  eid: 0,
  sid: 0
}

export default {

  data () {
    return {
      empsalary: defaultForm,
      options: [
             {value: '9', label: '市场部工资账套'},
             {value: '10', label: '人事部工资账套'},
             {value: '13', label: '运维部工资账套'},
             {value: '22', label: 'msr'},
             {value: '23', label: 'msr123'},
             {value: '24', label: 'msr123456'},
             {value: '25', label: '123'}
      ],

      BASE_API: process.env.BASE_API,

      saveBtnDisabled: false // 保存按钮是否禁用,
    }
  },
  watch: {
    $route (to, from) {
      console.log('watch $route')
      this.init()
    }
  },
  created () {
    console.log('created')
    this.init()
  },

  methods: {
    init () {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // 使用对象拓展运算符，拷贝对象，而不是引用，
        // 否则新增一条记录后，defaultForm就变成了之前新增的值
        this.empsalary = { ...defaultForm }
      }
    },

//     // // 上传成功后的回调函数
//     // cropSuccess(data) {
//     //   console.log(data)
//     //   this.imagecropperShow = false
//     //   //this.teacher.avatar = data.url
//     //   // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
//     //   this.imagecropperKey = this.imagecropperKey + 1
//     // },
//     // // 关闭上传组件
//     // close() {
//     //   this.imagecropperShow = false
//     //   // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
//     //   this.imagecropperKey = this.imagecropperKey + 1
//     // },
    saveOrUpdate () {
      this.saveBtnDisabled = true
      if (!this.empsalary.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

//     // 保存
//     // 保存
    saveData () {
      empsalary.saveEmpsalaryInfo(this.empsalary).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(response => {
        this.$router.push({ path: '/salary/SalSobCfg' })
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      })
    },

    // 根据id查询记录
    fetchDataById (id) {
      empsalary.getById(id).then(response => {
        this.empsalary = response.data.empsalary
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: '获取数据失败'
        })
      })
    },
    // 根据id更新记录
    updateData () {
      this.saveBtnDisabled = true
      empsalary.updateEmpsalaryInfoById(this.empsalary).then(response => {
        return this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/salary/SalSobCfg' })
      }).catch((response) => {
        // console.log(response)
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      })
    }
  }
}
</script>