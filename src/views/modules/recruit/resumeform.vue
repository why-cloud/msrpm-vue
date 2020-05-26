<template>
  <div class="app-container">
    <el-form label-width="120px">
         <el-form-item label="ID">
        <el-input-number v-model="resume.id" />
      </el-form-item>
        <el-form-item label="姓名">
        <el-input v-model="resume.rname" />
      </el-form-item>
      
      <el-form-item label="性别">
       <el-input v-model="resume.gender" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="resume.age" />
      </el-form-item>
      <el-form-item label="最高学历">
        <el-select v-model="resume.tiptopDegree" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"/>
        </el-select>

      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="resume.phone" controls-position="right"/>
      </el-form-item>
      <el-form-item label="应聘职位">
        <el-select v-model="resume.appliPosid" clearable placeholder="请选择">
          <el-option :value="29" label="技术总监"/>
          <el-option :value="30" label="运营总监"/>
          <el-option :value="31" label="市场总监"/>
          <el-option :value="33" label="研发工程师"/>
          <el-option :value="30" label="运维工程师"/>
          <el-option :value="30" label="Java研发经理"/>
        </el-select>
      </el-form-item>
     

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import resume from '@/api/recruit/resume'
const defaultForm = {
  id: '',
  rname: '',
  tiptopDegree: '',
  phone: '',
  appliPosid: '',
  age: '',
  gender: ''

}
// const options = {0: '博士', 1: '硕士'}
export default {
  data () {
    return {
      options: [
        {value: '博士', label: '博士'},
        {value: '硕士', label: '硕士'},
        {value: '本科', label: '本科'},
        {value: '大专', label: '大专'},
        {value: '高中', label: '高中'},
        {value: '初中', label: '初中'},
        {value: '小学', label: '小学'},
        {value: '其他', label: '其他'}

      ],
      resume: defaultForm,
      saveBtnDisabled: false // 保存按钮是否禁用

    }
  },
  watch: {
    $route (to, from) {
      console.log('watch $route')
      this.init()
    }
  },

  created () {
    this.init()
    console.log('created')
  },
  methods: {

    saveOrUpdate () {
      this.saveBtnDisabled = true
      this.updateData()
    },

    // saveOrUpdate () {
    //   this.saveBtnDisabled = true
    //   if (this.resume.id) {
    //     this.updateData()
    //   }
    //   if (!resume.id) {
    //     this.saveData()
    //   }
    // },

    init () {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // 使用对象拓展运算符，拷贝对象，而不是引用，
        // 否则新增一条记录后，defaultForm就变成了之前新增的值
        this.resume = { ...defaultForm }
      }
    },
    // 保存
    saveData () {
      resume.save(this.resume).then(response => {
        return this.$message({
          type: 'success',
          message: '成功!'
        })
      }).then(response => {
        this.$router.push({ path: '/recruit/resume' })
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      })
    },

    // 根据id查询记录
    fetchDataById (id) {
      resume.getById(id).then(response => {
        this.resume = response.data.resume
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
      resume.updateById(this.resume).then(response => {
        return this.$message({
          type: 'success',
          message: '更新成功'
        })
      }).then(response => {
        this.$router.push({ path: '/recruit/resume' })
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: '更新失败'
        })
      })
    }
  }
}
</script>
