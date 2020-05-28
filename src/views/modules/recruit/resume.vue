<template >

  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.rname" placeholder="姓名"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.appliPosid" clearable placeholder="应聘职位">
          <el-option :value="29" label="技术总监"/>
          <el-option :value="30" label="主管"/>
          <el-option :value="31" label="市场总监"/>
          <el-option :value="33" label="研发工程师"/>
          <el-option :value="34" label="运维工程师"/>
          <el-option :value="36" label="Java研发经理"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="searchObj.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      
          <router-link :to="{path:'/ResumeCreate'}">
            <el-button type="primary" icon="el-icon-edit">新增</el-button>
          </router-link>  

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

      <el-table-column prop="rname" label="姓名" width="80" />

      <el-table-column prop="gender" label="性别" width="60" />

      <el-table-column prop="tiptopDegree" label="最高学历" width="80" />

      <el-table-column prop="age" label="年龄" width="80" />
      <el-table-column prop="phone" label="电话" width="80" />

      <el-table-column prop="position.name" label="应聘职位" width="80">
        <!-- <template slot-scope="scope">
          {{ scope.row.appliPosid.name}}
        </template> -->
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
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
import resume from '@/api/recruit/resume'
export default {
  data () {
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {}// 查询条件
    }
  },
  created () { // 当页面加载时获取数据
    this.fetchData()
  },
  methods: {

    fetchData (page = 1) { // 调用api层获取数据库中的数据
      console.log('加载列表')
      this.page = page
      this.listLoading = true
      resume.getPageList(this.page, this.limit, this.searchObj).then(response => {
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

    // 清空
    resetData () {
      this.searchObj = {}
      this.fetchData()
    },

    // 根据id删除
    removeDataById (id) {
    // debugger
    // console.log(memberId)
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return resume.removeById(id)
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