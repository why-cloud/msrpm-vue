<template>
  <div class="app-container">
    
    
    
    <router-link :to="{path:'/Salarycreate'}">
    <el-button icon="el-icon-plus" type="primary" >添加工资账套</el-button>
    </router-link> 
    <!-- <el-button icon="el-icon-refresh" type="success" ></el-button> -->
    
    
    
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

      <el-table-column type="selection" width="55"></el-table-column>      
        
                <el-table-column width="120" prop="name" label="账套名称"></el-table-column>
                <el-table-column width="70" prop="basicSalary" label="基本工资"></el-table-column>
                <el-table-column width="70" prop="trafficSalary" label="交通补助"></el-table-column>
                <el-table-column width="70" prop="lunchSalary" label="午餐补助"></el-table-column>
                <el-table-column width="70" prop="bonus" label="奖金"></el-table-column>
                <!-- <el-table-column width="100" prop="createDate" label="启用时间"></el-table-column> -->
                <el-table-column label="养老金" align="center">
                    <el-table-column width="70" prop="pensionPer" label="比率"></el-table-column>
                    <el-table-column width="70" prop="pensionBase" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column label="医疗保险" align="center">
                    <el-table-column width="70" prop="medicalPer" label="比率"></el-table-column>
                    <el-table-column width="70" prop="medicalBase" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column label="公积金" align="center">
                    <el-table-column width="70" prop="accumulationFundPer" label="比率"></el-table-column>
                    <el-table-column width="70" prop="accumulationFundBase" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                      <router-link :to="'/edit02/'+scope.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                      </router-link>
                        
                    <el-button type="danger" size="mini" @click="removeById(scope.row.id)">删除</el-button>
                         
                    </template>
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
import salary from '@/api/salary'
export default {
 // name: 'SalSob',
  data () {
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 2, // 每页记录数
      searchObj: {} // 查询条件

    }
  },
  created () { // 当页面加载时获取数据
    this.fetchData()
    console.log('111111')
     // this.initSalaryList()
  },

  methods: {

    fetchData (page = 1) { // 调用api层获取数据库中的数据
      console.log('加载列表')
      this.page = page
      this.listLoading = true
      salary.getPageList(this.page, this.limit, this.searchObj).then(response => {
        // debugger 设置断点调试
        if (response.success === true) {
          this.list = response.data.rows
          this.total = response.data.total

          console.log(this.list)
          console.log(this.total)
        }
        this.listLoading = false
      })
    },

    // initSalaryList () {
    //   salary.getPageList().then(response => {
    //     this.salaryList = response.data.item
    //   })
    // },

    // saveSalary () {
    //   // this.video.courseId = this.courseId
    //   // this.video.chapterId = this.chapterId
    //   salary.saveSalaryInfo(this.salary).then(response => {
    //     this.$message({
    //       type: 'success',
    //       message: '保存成功!'
    //     })
    //     // this.helpSaveVideo()
    //   })
    // },
    editSalary (salaryId) {
     // this.dialogVideoFormVisible = true
      salary.getSalaryInfoById(salaryId).then(response => {
        this.salary = response.data.item
        this.fileList = [{ 'name': this.salary.salaryName }]
      })
    },
    removeById (id) { // 1
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         // api中的removeById
        return salary.removeById(id)
      }).then(() => {
        this.fetchData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    }

  }
}
</script>

<style scoped>

</style>