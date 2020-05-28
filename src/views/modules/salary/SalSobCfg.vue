
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
      v-loading="listLoading"
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
          
          <el-table-column type="selection" align="left" width="55"></el-table-column>
                <el-table-column prop="employee.name" label="姓名" fixed width="120" align="left"></el-table-column>
                <el-table-column prop="employee.workID" label="工号" width="120" align="left"></el-table-column>
                <el-table-column prop="employee.email" label="电子邮件" width="200" align="left"></el-table-column>
                <el-table-column prop="employee.phone" label="电话号码" width="120" align="left"></el-table-column>
                <el-table-column prop="department.name" label="所属部门" width="120" align="left"></el-table-column>
                <el-table-column prop="salary.name" label="工资账套" align="center"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                      <router-link :to="'/edit01/'+scope.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                      </router-link>                       
                    <!-- <el-button type="danger" @click="removeById(scope.row.id)">删除</el-button>                          -->
                    </template>
                </el-table-column>
          </el-table-column>      
        
                
                
       
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
  </div>
</template>
<script>
import empsalary from '@/api/empsalary'
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
  created () { // 当页面加载时获取数据
    this.fetchData()
    console.log('111111')
     // this.initSalaryList()
  },

  methods: {

    resetData () {
      this.searchObj = {}
      this.fetchData()
    },

    fetchData (page = 1) { // 调用api层获取数据库中的数据
      console.log('加载列表')
      this.page = page
      this.listLoading = true
      empsalary.getPageList(this.page, this.limit, this.searchObj).then(response => {
        // debugger 设置断点调试

        if (response.success === true) {
          this.list = response.data.rows
          this.total = response.data.total

          console.log(this.list)
          console.log(this.total)
        }
        this.listLoading = false
      })
    }

    // editSalary (salaryId) {
    //  // this.dialogVideoFormVisible = true
    //   salary.getSalaryInfoById(salaryId).then(response => {
    //     this.salary = response.data.item
    //     this.fileList = [{ 'name': this.salary.salaryName }]
    //   })
    // },
    // removeById (id) { // 1
    //   this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //      // api中的removeById
    //     return salary.removeById(id)
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
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: '删除失败'
    //       })
    //     }
    //   })
    // }

  }

}
</script>

<style scoped>

</style>