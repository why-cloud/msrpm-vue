<template >

  <div class="app-container">
    <el-button type="text" icon="el-icon-edit"  @click="dialogAuditionFormVisible = true" >添加面试安排</el-button>
        <el-dialog :visible.sync="dialogAuditionFormVisible" title="添加面试安排">

      <el-form :model="audition" label-width="120px">
          <!-- <el-form-item label="ID">
        <el-input-number v-model="audition.id" />
      </el-form-item> -->
        <el-form-item label="姓名">
          <el-input v-model="audition.name"/>
        </el-form-item>
         <el-form-item label="面试时间">
        <el-date-picker
          v-model="audition.auditionTime"
          type="datetime"
          placeholder="选择面试时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
        <el-form-item label="面试职位">
          <el-select v-model="audition.appliPosid" clearable placeholder="请选择">
          <el-option :value="29" label="技术总监"/>
          <el-option :value="30" label="运营总监"/>
          <el-option :value="31" label="市场总监"/>
          <el-option :value="33" label="研发工程师"/>
          <el-option :value="30" label="运维工程师"/>
          <el-option :value="30" label="Java研发经理"/>
        </el-select>
        </el-form-item>

        <el-form-item label="面试伦次">
        <el-select v-model="audition.auditionNum" clearable placeholder="请选择">
          <el-option v-for="item in numOptions" :key="item.value" :value="item.value" :label="item.label"/>
         </el-select>
      </el-form-item>

        <el-form-item label="面试官">
          <el-input v-model="audition.auditionPer" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="面试结果">
        <el-select v-model="audition.result" clearable placeholder="请选择">
          <el-option v-for="item in resOptions" :key="item.value" :value="item.value" :label="item.label"/>
         </el-select>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAuditionFormVisible = false">取 消</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveData">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogEditFormVisible" title="修改面试安排">

      <el-form :model="audition" label-width="120px">
          <!-- <el-form-item label="ID">
        <el-input-number v-model="audition.id" />
      </el-form-item> -->
        <el-form-item label="姓名">
          <el-input v-model="audition.name"/>
        </el-form-item>
         <el-form-item label="面试时间">
        <el-date-picker
          v-model="audition.auditionTime"
          type="datetime"
          placeholder="选择面试时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
        <el-form-item label="面试职位">
          <el-select v-model="audition.appliPosid" clearable placeholder="请选择">
          <el-option :value="29" label="技术总监"/>
          <el-option :value="30" label="运营总监"/>
          <el-option :value="31" label="市场总监"/>
          <el-option :value="33" label="研发工程师"/>
          <el-option :value="30" label="运维工程师"/>
          <el-option :value="30" label="Java研发经理"/>
        </el-select>
        </el-form-item>

        <el-form-item label="面试伦次">
        <el-select v-model="audition.auditionNum" clearable placeholder="请选择">
          <el-option v-for="item in numOptions" :key="item.value" :value="item.value" :label="item.label"/>
         </el-select>
      </el-form-item>

        <el-form-item label="面试官">
          <el-input v-model="audition.auditionPer" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="面试结果">
        <el-select v-model="audition.result" clearable placeholder="请选择">
          <el-option v-for="item in resOptions" :key="item.value" :value="item.value" :label="item.label"/>
         </el-select>
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

      <el-table-column prop="position.name" label="应聘职位" width="80" />

      <el-table-column prop="auditionTime" label="面试时间" width="80" />

      <el-table-column prop="auditionNum" label="面试伦次" width="80" />
      <el-table-column prop="auditionPer" label="面试官" width="80" />

      <el-table-column prop="result" label="面试结果" width="80" />

      <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">

        <el-button type="primary" @click="editAudition(scope.row.id)" size="mini" icon="el-icon-edit">修改</el-button>
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
import audition from '@/api/recruit/audition'
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
      numOptions: [
        {value: '一次面试', label: '一次面试'},
        {value: '二次面试', label: '二次面试'}
      ],
      resOptions: [
        {value: '合格', label: '合格'},
        {value: '不合格', label: '不合格'}
      ],
     // auditionId: '',
      dialogEditFormVisible: false,
      dialogAuditionFormVisible: false,
      saveBtnDisabled: false,
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      audition: {
        id: '',
        name: '',
        auditionTime: '',
        appliPosid: '',
        auditionNum: '',
        auditionPer: '',
        result: ''
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
      audition.save(this.audition).then(response => {
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
      audition.updateById(this.audition).then(response => {
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
      audition.getPageList(this.page, this.limit).then(response => {
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
    init () {
      if (this.$route.params && this.$route.params.id) {
        this.audition.id = this.$route.params.id
        this.fetchDataById(audition.id)
      }
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

    editAudition (id) {
      this.dialogEditFormVisible = true
      audition.getById(id).then(response => {
        this.audition = response.data.audition
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
      this.audition.id = 0
      this.audition.name = ''
      this.audition.auditionTime = ''
      this.audition.appliPosid = ''
      this.audition.auditionNum = ''
      this.audition.auditionPer = ''
      this.audition.result = ''
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
        return audition.removeById(id)
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
