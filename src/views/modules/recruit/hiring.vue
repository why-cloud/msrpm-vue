<template >

  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="姓名"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!--查询表单结束-->

    <el-button type="primary" icon="el-icon-edit"  @click="dialogAuditionFormVisible = true" >新增</el-button>
        <el-dialog :visible.sync="dialogAuditionFormVisible" title="新增录用人员">

      <el-form :model="employeehiring" label-width="120px">
          <!-- <el-form-item label="ID">
        <el-input-number v-model="employeehiring.id" />
      </el-form-item> -->
        <el-form-item label="姓名">
          <el-input v-model="employeehiring.name"/>
        </el-form-item>
         <el-form-item label="入职时间">
        <el-date-picker
          v-model="employeehiring.entryTime"
          type="datetime"
          placeholder="选择入职时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
        <el-form-item label="职位">
          <el-select v-model="employeehiring.posId" clearable placeholder="请选择">
          <el-option :value="29" label="技术总监"/>
          <el-option :value="30" label="运营总监"/>
          <el-option :value="31" label="市场总监"/>
          <el-option :value="33" label="研发工程师"/>
          <el-option :value="30" label="运维工程师"/>
          <el-option :value="30" label="Java研发经理"/>
        </el-select>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="employeehiring.phone" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAuditionFormVisible = false">取 消</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveData">确 定</el-button>
      </div>
    </el-dialog>

<!--修改弹窗-->
    <el-dialog :visible.sync="dialogEditFormVisible" title="修改录用人员">

      <el-form :model="employeehiring" label-width="120px">
          <!-- <el-form-item label="ID">
        <el-input-number v-model="employeehiring.id" />
      </el-form-item> -->
        <el-form-item label="姓名">
          <el-input v-model="employeehiring.name"/>
        </el-form-item>
         <el-form-item label="入职时间">
        <el-date-picker
          v-model="employeehiring.entryTime"
          type="datetime"
          placeholder="选择入职时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
        <el-form-item label="职位">
          <el-select v-model="employeehiring.posId" clearable placeholder="请选择">
          <el-option :value="29" label="技术总监"/>
          <el-option :value="30" label="运营总监"/>
          <el-option :value="31" label="市场总监"/>
          <el-option :value="33" label="研发工程师"/>
          <el-option :value="30" label="运维工程师"/>
          <el-option :value="30" label="Java研发经理"/>
        </el-select>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="employeehiring.phone" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>

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
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="姓名" width="80" />

      <el-table-column prop="entryTime" label="入职时间" width="80" />

      <el-table-column prop="phone" label="电话" width="80" />

      <el-table-column prop="position.name" label="职位" width="80" />

      <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">

        <el-button type="primary" @click="editHiring(scope.row.id)" size="mini" icon="el-icon-edit">修改</el-button>
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
import hiring from '@/api/recruit/hiring'
// const defaultForm = {
//   id: '',
//   name: '',
//   auditionTime: '',
//   appliPosid: '',
//   auditionNum: '',
//   auditionPer: '',
//   result: ''

// }
export default {
  data () {
    return {
      searchObj: {},
      dialogEditFormVisible: false,
      dialogAuditionFormVisible: false,
      saveBtnDisabled: false,
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 5, // 每页记录数
      employeehiring: {
        id: '',
        name: '',
        entryTime: '',
        posId: '',
        phone: ''
      }
    }
  },
  created () { // 当页面加载时获取数据
    this.fetchData()
    console.log('created')
  },
  methods: {
    // saveOrUpdate () {
    //   this.saveBtnDisabled = true
    //   if (!this.audition.id) {
    //     this.saveData()
    //   } else {
    //     this.updateData()
    //   }
    // },
    saveData () {
      // this.init()
      this.saveBtnDisabled = true
      // this.dialogAuditionFormVisible = true
      hiring.save(this.employeehiring).then(response => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.helpSave()
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: '添加失败'
        })
      })
    },
    updateData () {
      this.saveBtnDisabled = true
      hiring.updateById(this.employeehiring).then(response => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        this.helpSave()
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      })
    },

    fetchData (page = 1) { // 调用api层获取数据库中的数据
      console.log('加载列表')
      this.page = page
      this.listLoading = true
      hiring.getPageList(this.page, this.limit, this.searchObj).then(response => {
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
    // init () {
    //   if (this.$route.params && this.$route.params.id) {
    //     const id = this.$route.params.id
    //     this.fetchDataById(id)
    //   } else {
    //     // 使用对象拓展运算符，拷贝对象，而不是引用，
    //     // 否则新增一条记录后，defaultForm就变成了之前新增的值
    //     this.resume = { ...defaultForm }
    //   }
    // },
     // 清空
    resetData () {
      this.searchObj = {}
      this.fetchData()
    },

    editHiring (id) {
      this.dialogEditFormVisible = true
      hiring.getById(id).then(response => {
        this.employeehiring = response.data.employeehiring
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: '获取数据失败'
        })
      })
    },
    helpSave () {
      this.dialogEditFormVisible = false
      this.dialogAuditionFormVisible = false// 如果保存成功则关闭对话框
      this.fetchData() // 刷新列表
      this.employeehiring.id = 0
      this.employeehiring.name = ''
      this.employeehiring.entryTime = ''
      this.employeehiring.posId = ''
      this.employeehiring.phone = ''
      this.saveBtnDisabled = false
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
        return hiring.removeById(id)
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
