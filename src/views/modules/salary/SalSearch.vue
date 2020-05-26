
<template>
  <div class="app-container">  
    <el-form :inline="true" class="demo-form-inline">
     
      <el-form-item>
        
         <el-input  style="width: 350px;margin-right: 10px" v-model="name" placeholder="请输入员工姓名进行搜索，可以直接回车搜索..."/>
      </el-form-item>
      

      <el-button type="primary" icon="el-icon-search" @click="getByName(name)">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>      
    </el-form>

  <!-- <el-form :model="employee" label-width="120px">
          <el-form-item label="姓名" prop="employee.name"></el-form-item>
          <el-form-item label="工号" prop="employee.workID"></el-form-item>
          <el-form-item label="邮箱" prop="employee.email"></el-form-item>
          <el-form-item label="电话" prop="employee.phone"></el-form-item>

        
      </el-form> -->




    <!-- 表格 -->
    <el-table>

      <el-table-column  width="55">
                <el-table-column prop="name" label="姓名" fixed width="120" align="left"></el-table-column>
                <el-table-column prop="workID" label="工号" width="120" align="left"></el-table-column>
                <el-table-column prop="email" label="电子邮件" width="200" align="left"></el-table-column>
                <el-table-column prop="phone" label="电话号码" width="120" align="left"></el-table-column>
                <el-table-column prop="dname" label="所属部门" width="120" align="left"></el-table-column>
                <el-table-column prop="sname" label="工资账套" align="center"></el-table-column>
       </el-table-column>      
    </el-table>
  
  </div>
</template>





<script>
 import employee from '@/api/employee'
export default {
   data () {
     return {
       employee: null,
      //  employee: {
      //    name: '',
      //    workID: '',
      //    email: '',
      //    phone: ''
 
      //  },
       listLoading: true, // 是否显示loading信息
       list: null // 数据列表
    //    employee:
    //    [
    //  {name: ''},
    //  {workID: ''},
    //  {email: ''},
    //  {phone: ''}
    //    ]

     }
   },

   methods: {
     getByName (name) {
       employee.getByName(name).then(response => {
         console.log(response.data.employee)
         this.employee = response.data.employee
       })
     },
     resetData () {
       this.getByName()
     }
    //  fetchData (page = 1) { // 调用api层获取数据库中的数据
    //    console.log('加载列表')
    //   // 当点击分页组件的切换按钮的时候，会传输一个当前页码的参数page
    //   // 解决分页无效问题
    //    this.page = page
    //    this.listLoading = true
    //    employee.getByName(this.page, this.limit, this.searchObj).then(response => {
    //      console.log(response.data.rows)
    //     // debugger 设置断点调试
    //      if (response.success === true) {
    //        this.list = response.data.rows
    //        this.total = response.data.total
    //      }
    //      this.listLoading = false
    //    })
    //  },

    //  resetData () {
    //    this.searchObj = {}
    //   // this.subSubjectList = [] // 二级分类列表
    //    this.fetchData()
    //  }
    // removeDataById(id) {
    //   this.$confirm('此操作将永久删除该课程，以及该课程下的章节和视频，是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     return course.removeById(id)
    //   }).then(() => {
    //     this.fetchData()
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功!'
    //     })
    //   }).catch((response) => { // 失败
    //     if (response === 'cancel') {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     }
    //   })
    // }
   }
}
</script>

