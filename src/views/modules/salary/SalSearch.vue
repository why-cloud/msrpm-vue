
<template>
  <div class="app-container">  
    <el-form :inline="true" class="demo-form-inline">
     
      <el-form-item>
        
         <el-input  style="width: 350px;margin-right: 10px" v-model="searchObj.name" placeholder="请输入员工姓名进行搜索，可以直接回车搜索..."/>
      </el-form-item>
      

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>      
    </el-form>

    <!-- 表格 -->
    <el-table
    
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
<el-table-column
        label="ID"
        width="70"
        align="center">
        //template:插槽
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      

      <el-table-column type="selection" width="55">
                <el-table-column prop="employee.name" label="姓名" fixed width="120" align="left"></el-table-column>
                <el-table-column prop="employee.workID" label="工号" width="120" align="left"></el-table-column>
                <el-table-column prop="employee.email" label="电子邮件" width="200" align="left"></el-table-column>
                <el-table-column prop="employee.phone" label="电话号码" width="120" align="left"></el-table-column>
                <el-table-column prop="department.name" label="所属部门" width="120" align="left"></el-table-column>
                <el-table-column prop="salary.name" label="工资账套" align="center"></el-table-column>
       </el-table-column>      
    </el-table>
  
  </div>
</template>





<script>
 import employee from '@/api/employee'
export default {
   data () {
     return {
 
       listLoading: true, // 是否显示loading信息
       list: null, // 数据列表
       total: 0, // 总记录数
       page: 1, // 页码
       limit: 5, // 每页记录数
       searchObj: {} // 查询条件
     }
   },

   methods: {
    //  getByName (name) {
    //    employee.getByName(name).then(response => {
    //      console.log(response.data.employee)
    //      this.employee = response.data.employee
    //    })
    //  },
     resetData () {
       this.searchObj = {}
       this.fetchData()
     },
     fetchData (page = 1) { // 调用api层获取数据库中的数据
       console.log('加载列表')
      // 当点击分页组件的切换按钮的时候，会传输一个当前页码的参数page
      // 解决分页无效问题
       this.page = page
       this.listLoading = true
       employee.getName(this.page, this.limit, this.searchObj).then(response => {
         console.log(response.data.rows)
        // debugger 设置断点调试
         if (response.success === true) {
           this.list = response.data.rows
           this.total = response.data.total
         }
         this.listLoading = false
       })
       console.log('66666666')
     }
 
   }
}
</script>

