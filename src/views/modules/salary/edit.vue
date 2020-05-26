<template>
  <div class="app-container">
    <template>
      <div class="app-container">
        <el-form label-width="120px">
          <el-form-item label="账套名称">
            <el-input v-model="salary.name"/>
          </el-form-item>
          <el-form-item label="基本工资">
            <el-input-number v-model="salary.basicSalary" :min="0" controls-position="right"/>
          </el-form-item>
          <el-form-item label="交通补助">
            <el-input-number v-model="salary.trafficSalary" :min="0" controls-position="right"/>
          </el-form-item>
          <el-form-item label="午餐补助">
             <el-input-number v-model="salary.lunchSalary" :min="0" controls-position="right"/>
          </el-form-item>
          <el-form-item label="奖金">
             <el-input-number v-model="salary.bonus" :min="0" controls-position="right"/>
          </el-form-item>
          
          <el-form-item label="启用时间">
             <el-input-number v-model="salary.createDate" :min="0" controls-position="right"/>
          </el-form-item>

          <el-form-item label="养老金">
             <el-input-number label="比率" v-model="salary.pensionPer" :min="0" controls-position="right"/>
             <el-input-number label="基数" v-model="salary.pensionBase" :min="0" controls-position="right"/>
          </el-form-item>
          
         <el-form-item label="医疗保险">
             <el-input-number label="比率" v-model="salary.medicalPer" :min="0" controls-position="right"/>
             <el-input-number label="基数" v-model="salary.medicalBase" :min="0" controls-position="right"/>
          </el-form-item>

          <el-form-item label="公积金">
             <el-input-number label="比率" v-model="salary.accumulationFundPer" :min="0" controls-position="right"/>
             <el-input-number label="基数" v-model="salary.accumulationFundBase" :min="0" controls-position="right"/>
          </el-form-item>
         

          <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>

 <script>
   import salary from '@/api/salary'
//  import ImageCropper from '@/components/ImageCropper'
//  import PanThumb from '@/components/PanThumb'
const defaultForm = {
  basicSalary: 0,
     trafficSalary: 0,
     lunchSalary: 0,
     bonus: 0,
     createDate: 0,
     pensionPer: 0,
     pensionBase: 0,
     medicalPer: 0,
     medicalBase: 0,
     accumulationFundPer: 0,
     accumulationFundBase: 0,
     name: ''

}
export default {

  data () {
       return {
         salary: defaultForm,
    //   BASE_API: process.env.BASE_API,
    //    imagecropperShow: false, // 是否显示上传组件
    //    imagecropperKey: 0, // 上传组件id
    //   salary: {},
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
           this.salary = { ...defaultForm }
         }
       },

    // // 上传成功后的回调函数
    // cropSuccess(data) {
    //   console.log(data)
    //   this.imagecropperShow = false
    //   //this.teacher.avatar = data.url
    //   // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
    //   this.imagecropperKey = this.imagecropperKey + 1
    // },
    // // 关闭上传组件
    // close() {
    //   this.imagecropperShow = false
    //   // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
    //   this.imagecropperKey = this.imagecropperKey + 1
    // },
       saveOrUpdate () {
         this.saveBtnDisabled = true
         if (!this.salary.id) {
           this.saveData()
         } else {
           this.updateData()
         }
       },

    // 保存
    // 保存
       saveData () {
         salary.saveSalaryInfo(this.salary).then(response => {
           return this.$message({
             type: 'success',
             message: '保存成功!'
           })
         }).then(response => {
           this.$router.push({ path: '/salary/SalSob' })
         }).catch((response) => {
           this.$message({
             type: 'error',
             message: '保存失败'
           })
         })
       },

    // 根据id查询记录
       fetchDataById (id) {
         salary.getById(id).then(response => {
           this.salary = response.data.salary
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
         salary.updateSalaryInfoById(this.salary).then(response => {
           return this.$message({
             type: 'success',
             message: '修改成功!'
           })
         }).then(resposne => {
           this.$router.push({ path: '/salary/SalSob' })
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