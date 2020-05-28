<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input size="small" v-model="searchObj.name" placeholder="员工姓名"/>
      </el-form-item>

      <el-form-item>
        <el-input size="small" v-model="searchObj.WorkID" placeholder="员工工号"/>
      </el-form-item>

      <el-button type="primary" size="small" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" size="small" @click="resetData()">清空</el-button>
      <el-button type="primary" size="small" icon="el-icon-download" @click="exportData()">下载员工资料</el-button>
    </el-form>
  
    <el-form >
      <el-form-item>
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/ei/employee/addEmp'"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取Excel文件导入员工数据</el-button>
          <el-button
            icon="el-icon-upload"
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">{{ fileUploadBtnText }}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
    height="500"
    ref="multipleTable"
    style="width: 100%"
    @selection-change="selectionChangeHandle"
    v-loading="listLoading"
    :data="list"
    element-loading-text="数据加载中"
    border
     >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        label="序号"
        width="50"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="员工编号" width="50" align="center" />
      <el-table-column prop="name" label="姓名" width="80" align="center"/>
      <el-table-column prop="workID" label="工号" width="90" align="center"/>
      <el-table-column prop="gender" label="性别" width="50" align="center"/>
      <el-table-column :formatter="department" prop="departmentId" label="所属部门" align="center"/>
      <el-table-column prop="birthday" label="出生日期" width="100" align="center"/>
      <el-table-column prop="idCard" label="身份证号码" width="170" align="center"/>
      <el-table-column prop="wedlock" label="婚姻状况" width="50" align="center"/>
      <el-table-column prop="nativePlace" label="籍贯" width="50" align="center"/>
      <el-table-column :formatter="nation" prop="nationId" label="民族" width="50" align="center"/>
      <el-table-column :formatter="politic" prop="politicId" label="政治面貌" align="center"/>
      <el-table-column prop="email" label="邮箱" width="140" align="center"/>
      <el-table-column prop="phone" label="电话号码" width="120" align="center"/>
      <el-table-column prop="address" label="联系地址" align="center"/>
      <el-table-column :formatter="jobLevel" prop="jobLevelId" label="职称" width="100" align="center"/>
      <el-table-column :formatter="position" prop="posId" label="职位" width="100" align="center"/>
      <el-table-column :formatter="engageForm" prop="formId" label="聘用形式" align="center"/>
      <el-table-column :formatter="topdegree" prop="degreeId" label="最高学历" width="50" align="center"/>
      <el-table-column prop="specialty" label="所属专业" align="center"/>
      <el-table-column prop="school" label="毕业院校" align="center"/>
      <el-table-column prop="beginDate" label="入职日期" width="100" align="center"/>
      <el-table-column :formatter="workstate" prop="stateIId" label="在职状态" width="50" align="center"/>
      <el-table-column prop="contractTerm" label="合同期限" width="50" align="center"/>
      <el-table-column prop="conversionTime" label="转正日期" width="100" align="center"/>
      <el-table-column prop="notWorkDate" label="离职日期" width="100" align="center"/>
      <el-table-column prop="beginContract" label="合同起始日期" width="100" align="center"/>
      <el-table-column prop="endContract" label="合同终止日期" width="100" align="center"/>
      <el-table-column prop="workAge" label="工龄" width="50" align="center"/>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
      <div style="margin-top: 20px">
        <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
<el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 20px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
      />
  </div>
</template>
<script>
import employee from '@/api/employee/employee'

export default {
  data () {
    // 定义数据
    return {
      loading: false,
      BASE_API: process.env.BASE_API, // 接口API地址
      fileUploadBtnText: '上传到服务器', // 按钮文字
      importBtnDisabled: false, // 按钮是否禁用,
      importDataBtnText: 'Excel导入',
      importDataBtnIcon: 'el-icon-upload2',
      dataListSelections: [], // 存放删除的数据
      listLoading: true, // 是否显示loading的信息
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {} // 查询条件
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    exportData () {
      this.$confirm('将导出员工资料列表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return employee.export()
      }).then(() => {
        this.fetchData()
        this.$message({
          type: 'success',
          message: '成功导出资料到桌面!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消导出'
          })
        } else {
          this.$message({
            type: 'error',
            message: '导出失败'
          })
        }
      })
    },
    submitUpload () {
      this.fileUploadBtnText = '正在上传'
      this.importBtnDisabled = true
      this.loading = true
      this.$refs.upload.submit()
    },

    fileUploadSuccess (response) {
      if (response.success === true) {
        this.fileUploadBtnText = '导入成功'
        this.loading = false
        this.$message({
          type: 'success',
          message: response.message
        })
      }
    },

    fileUploadError (response) {
      this.fileUploadBtnText = '导入失败'
      this.loading = false
      this.$message({
        type: 'error',
        message: '导入失败'
      })
    },
    clickFile () {
      this.$refs.file.dispatchEvent(new MouseEvent('click'))
    },
    // 多选
    selectionChangeHandle (val) {
      console.log(val)
      this.dataListSelections = val
    },
    fetchData (page = 1) { // 调用api层获取数据库中的数据
      console.log('加载列表')
      this.page = page
      this.listLoading = true
      employee.getPageList(this.page, this.limit, this.searchObj).then(response => {
        if (response.success === true) {
          this.list = response.data.rows
          this.total = response.data.total
          console.log(this.list)
          console.log(this.total)
        }
        this.listLoading = false
      })
    },
    resetData () {
      this.searchObj = {}
      this.fetchData()
    },
    // 通过ID删除
    removeDataById (id) {
    // debugger
    // console.log(memberId)
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return employee.removeById(id)
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
    },
        // 通过ID批量删除
    deleteHandle (id) {
      var idList = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      console.log(idList)
      this.$confirm('此操作将永久删除选中记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return employee.removeByIdList(idList)
      }).then(() => {
        this.fetchData()
        this.$message({
          type: 'success',
          message: '批量删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消批量删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: '批量删除失败'
          })
        }
      })
    },
    workstate: function workstate (row, column) {
      switch (row.stateIId) {
        case 1:return '在职'
        case 2:return '离职'
        case 3:return '产假'
        case 4:return '病假'
        case 5:return '年休'
        case 6:return '旷工'
        default:return '未知'
      }
    },
    topdegree: function topdegree (row, column) {
      switch (row.degreeId) {
        case 1:return '博士'
        case 2:return '硕士'
        case 3:return '本科'
        case 4:return '大专'
        case 5:return '高中'
        case 6:return '初中'
        case 7:return '小学'
        case 8:return '其它'
        default:return '未知'
      }
    },
    engageForm: function engageForm (row, column) {
      switch (row.formId) {
        case 1:return '聘用合同'
        case 2:return '劳动合同'
        case 3:return '派遣'
        case 4:return '实习'
        default:return '未知'
      }
    },
    position: function position (row, column) {
      switch (row.posId) {
        case 29:return '技术总监'
        case 30:return '主管'
        case 31:return '市场总监'
        case 33:return '研发工程师'
        case 34:return '运维工程师'
        case 36:return 'Java研发经理'
        default:return '未知'
      }
    },
    politic: function politic (row, column) {
      switch (row.politicId) {
        case 1:return '中共党员'
        case 2:return '中共预备党员'
        case 3:return '共青团员'
        case 4:return '民革党员'
        case 5:return '民盟盟员'
        case 6:return '民建会员'
        case 7:return '民进会员'
        case 8:return '农工党党员'
        case 9:return '致公党党员'
        case 10:return '九三学社社员'
        case 11:return '台盟盟员'
        case 12:return '无党派民主人士'
        case 13:return '普通公民'
        default:return '未知'
      }
    },
    jobLevel: function nation (row, column) {
      switch (row.jobLevelId) {
        case 9:return '教授'
        case 10:return '副教授'
        case 12:return '助教'
        case 13:return '讲师'
        case 14:return '初级工程师'
        case 15:return '中级工程师'
        case 16:return '高级工程师'
        case 17:return '骨灰级工程师'
        default:return '未知'
      }
    },
    nation: function nation (row, column) {
      switch (row.nationId) {
        case 1:return '汉族'
        case 2:return '蒙古族'
        case 3:return '回族'
        case 4:return '藏族'
        case 5:return '维吾尔族'
        case 6:return '苗族'
        case 7:return '彝族'
        case 8:return '壮族'
        case 9:return '布依族'
        case 10:return '朝鲜族'
        case 11:return '满足'
        case 12:return '侗族'
        case 13:return '瑶族'
        case 14:return '白族'
        case 15:return '土家族'
        case 16:return '哈尼族'
        case 17:return '哈萨克族'
        case 18:return '傣族'
        case 19:return '黎族'
        case 20:return '傈僳族'
        case 21:return '佤族'
        case 22:return '畲族'
        case 23:return '高山族'
        case 24:return '拉祜族'
        case 25:return '水族'
        case 26:return '东乡族'
        case 27:return '纳西族'
        case 28:return '景颇族'
        case 29:return '柯尔克孜族'
        case 30:return '土族'
        case 31:return '达翰尔族族'
        case 32:return '仫佬族'
        case 33:return '羌族'
        case 34:return '布朗族'
        case 35:return '撒拉族'
        case 36:return '毛难族'
        case 37:return '仡佬族'
        case 38:return '锡伯族'
        case 39:return '阿昌族'
        case 40:return '普米族'
        case 41:return '塔吉克族'
        case 42:return '怒族'
        case 43:return '乌孜别克族'
        case 44:return '俄罗斯族'
        case 45:return '鄂温克族'
        case 46:return '崩龙族'
        case 47:return '保安族'
        case 48:return '裕固族'
        case 49:return '京族'
        case 50:return '塔塔尔族'
        case 51:return '独龙族'
        case 52:return '鄂伦春族'
        case 53:return '赫哲族'
        case 54:return '门巴族'
        case 55:return '珞巴族'
        case 56:return '基诺族'
        default:return '未知'
      }
    },
    department: function department (row, column) {
      switch (row.departmentId) {
        case 1:
          return '股东会'
        case 4:
          return '董事会'
        case 5:
          return '总办'
        case 7:
          return '人事部'
        case 8:
          return '财务部'
        case 78:
          return '市场部'
        case 81:
          return '华北市场部'
        case 82:
          return '华南市场部'
        case 86:
          return '西北市场部'
        case 87:
          return '西安市场部'
        case 91:
          return '技术部'
        case 92:
          return '运维部'
        case 93:
          return '运维1部'
        default:
          return '未知'
      }
    }
  }
}
</script>
<style scoped>
</style>
