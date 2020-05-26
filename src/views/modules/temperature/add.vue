<template>
  <div class="app-container">
    <el-form label-width="120px">
      
      <el-form-item label="员工姓名">
       <el-input v-model="temperature.name" />
      </el-form-item>

      <el-form-item label="员工ID">
       <el-input v-model="temperature.id" />
      </el-form-item>

      <el-form-item label="所属部门">
        <el-select v-model="temperature.departmentId" clearable placeholder="请选择">
          <el-option :value="1" label="股东会"/>
          <el-option :value="4" label="董事会"/>
          <el-option :value="5" label="总办"/>
          <el-option :value="7" label="人事部"/>
          <el-option :value="8" label="财务部"/>
          <el-option :value="78" label="市场部"/>
          <el-option :value="81" label="华北市场部"/>
          <el-option :value="82" label="华南市场部"/>
          <el-option :value="86" label="石家庄市场部"/>
          <el-option :value="87" label="西北市场部"/>
          <el-option :value="91" label="技术部"/>
          <el-option :value="92" label="运维部"/>
        </el-select>
      </el-form-item>

      <el-form-item label="请填写今日体温">
        <el-input v-model="temperature.temperature" />
      </el-form-item>


      <el-form-item label="有无异常">
        <el-select v-model="temperature.isUnusual" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option v-for="item in Options" :key="item.value" :value="item.value" :label="item.label"/>
        </el-select>
  </el-form-item>
  <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import temperature from '@/api/temperature/temperature'
const defaultForm = {
  id: '',
  name: '',
  department: '',
  temperature: '',
  isUnusual: ''
}
export default {
  data () {
    return {
      temperature: defaultForm,
      saveBtnDisabled: false,
      Options: [
        {value: '正常', label: '正常'},
        {value: '不正常', label: '不正常'}
      ]// 保存按钮是否禁用
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
    saveOrUpdate () {
      this.saveBtnDisabled = true
      if (this.temperature.id) {
        this.updateData()
      } else {
        this.saveData()
      }
      // this.updateData()
    },
    init () {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // 使用对象拓展运算符，拷贝对象，而不是引用，
        // 否则新增一条记录后，defaultForm就变成了之前新增的值
        this.temperature = { ...defaultForm }
      }
    },
    // 保存
    saveData () {
      temperature.save(this.temperature).then(response => {
        return this.$message({
          type: 'success',
          message: '成功!'
        })
      }).then(response => {
        this.$router.push({ path: '/temperature/temperature' })
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      })
    },

    // 根据id查询记录
    fetchDataById (id) {
      temperature.getById(id).then(response => {
        this.temperature = response.data.temperature
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
      temperature.updateById(this.temperature).then(response => {
        return this.$message({
          type: 'success',
          message: '成功'
        })
      }).then(response => {
        this.$router.push({ path: '/temperature/temperature' })
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      })
    }
  }
}
</script>
