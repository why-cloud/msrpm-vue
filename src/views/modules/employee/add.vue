<template>
  <div class="app-container">
    <el-form >
       <el-row >
        <el-col :span="6">
        <el-form-item label="姓名" >
        <el-input justify=start placeholder="请输入员工姓名" size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="employee.name"/>
        </el-form-item>
        </el-col>
      <el-col :span="5">
        <el-form-item label="性别">
          <el-radio-group v-model="employee.gender">
             <el-radio label="男">男</el-radio>
             <el-radio label="女">女</el-radio>
             </el-radio-group>
       </el-form-item>
      </el-col>
     <el-col :span="6">
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="employee.birthday"
          size="mini"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 150px;"
          placeholder="出生日期">
        </el-date-picker>
      </el-form-item>
   </el-col>
    <el-col :span="7">
      <el-form-item label="政治面貌"  prop="politicId">
        <el-select v-model="employee.politicId" placeholder="请选择政治面貌" size="mini" style="width: 200px;">
          <el-option
            v-for="item in politicsstatus"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
<el-row>
  <el-col :span="6">
      <el-form-item label="民族">
        <el-select v-model="employee.nationId" placeholder="民族" size="mini" style="width: 150px;">
          <el-option
             v-for="item in nations"
             :key="item.id"
             :label="item.name"
             :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
  </el-col>
      <el-col :span="5">
      <el-form-item label="籍贯">
        <el-input size="mini" prefix-icon="el-icon-edit" placeholder="请选择籍贯"
         style="width: 150px" v-model="employee.nativePlace"/>
      </el-form-item>
      </el-col>
      <el-col :span="6">
      <el-form-item label="电子邮箱">
        <el-input size="mini" prefix-icon="el-icon-edit" placeholder="请输入邮箱" style="width: 150px" v-model="employee.email"/>
      </el-form-item>
      </el-col>
      <el-col :span="7">
      <el-form-item label="联系地址">
        <el-input size="mini" placeholder="请输入联系地址" prefix-icon="el-icon-edit" style="width: 200px" v-model="employee.address"/>
      </el-form-item>
      </el-col>
</el-row>
      <el-row>
     <el-col :span="6"> 
      <el-form-item label="职位">
        <el-select placeholder="请选择职位" v-model="employee.posId" size="mini" style="width: 150px;">
          <el-option
            v-for="item in positions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
           </el-option>
        </el-select>
      </el-form-item>
     </el-col>
     <el-col :span="5">
      <el-form-item label="职称">
        <el-select v-model="employee.jobLevelId" placeholder="请选择职称" size="mini" style="width: 150px;">
          <el-option
            v-for="item in joblevels"
            :key="item.id"
            :label="item.name"
            :value="item.id">
           </el-option>
        </el-select>
      </el-form-item>
     </el-col>
     <el-col :span="6">
      <el-form-item label="所属部门" >
        <el-select v-model="employee.departmentId" placeholder="所属部门" size="mini" style="width: 150px;">
          <el-option
            v-for="item in departments"
            :key="item.id"
            :label="item.name"
            :value="item.id">
           </el-option>
        </el-select>
      </el-form-item>
     </el-col>
      <el-col :span="7">
      <el-form-item label="电话号码">
        <el-input size="mini" style="width: 200px" placeholder="电话号码" prefix-icon="el-icon-phone" v-model="employee.phone"/>
      </el-form-item>
      </el-col>
</el-row>
<el-row>
        <el-col :span="6">
      <el-form-item label="专业">
        <el-input size="mini" style="width: 150px;" prefix-icon="el-icon-edit" placeholder="请输入专业名称" v-model="employee.specialty"/>
      </el-form-item>
        </el-col>
      <el-col :span="5">
      <el-form-item label="工龄">
        <el-input size="mini" style="width: 150px;" prefix-icon="el-icon-edit" v-model="employee.workAge" placeholder="请输入工龄"/>
      </el-form-item>
     </el-col>
      <el-col :span="6">
      <el-form-item label="最高学历">
        <el-select v-model="employee.degreeId" placeholder="请选择最高学历" size="mini" style="width: 150px;">
          <el-option
            v-for="item in topdegree"
            :key="item.id"
            :label="item.name"
            :value="item.id">
           </el-option>
        </el-select>
      </el-form-item>
      </el-col>
      <el-col :span="7">
      <el-form-item label="毕业院校">
        <el-input placeholder="毕业院校名称" size="mini" style="width: 200px;" v-model="employee.school"/>
      </el-form-item>
      </el-col>
</el-row>
<el-row>
   <el-col :span="6">
    <el-form-item label="工号">
      <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" placeholder="工号" v-model="employee.workID"/>
      </el-form-item>
      </el-col>
      <el-col :span="5">
      <el-form-item label="在职状态">
        <el-select v-model="employee.stateIId" size="mini" style="width: 130px;" placeholder="在职状态">
          <el-option
            v-for="item in workstate"
            :key="item.id"
            :label="item.name"
            :value="item.id">
           </el-option>
        </el-select>
      </el-form-item>
      </el-col>
      <el-col :span="6">
      <el-form-item label="合同期限">
        <el-input size="mini" style="width: 150px;" v-model="employee.contractTerm" prefix-icon="el-icon-edit" placeholder="请输入合同期限"/>
      </el-form-item>
      </el-col>
      <el-col :span="7">
      <el-form-item label="聘用形式">
        <el-select v-model="employee.formId" size="mini" style="width: 200px;" placeholder="请选择聘用形式">
          <el-option
            v-for="item in engage"
            :key="item.id"
            :label="item.name"
            :value="item.id">
           </el-option>
        </el-select>
      </el-form-item>
</el-col>
</el-row>
<el-row>
        <el-col :span="6">
      <el-form-item label="入职日期">
        <el-date-picker
          v-model="employee.beginDate"
          size="mini"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 160px;"
          placeholder="入职日期">
      </el-date-picker>
      </el-form-item>
      </el-col>
      <el-col :span="5">
      <el-form-item label="转正日期" >
        <el-date-picker
          v-model="employee.conversionTime"
          size="mini"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 130px;"
          placeholder="转正日期">
        </el-date-picker>
      </el-form-item>
</el-col>
      <el-col :span="6">
      <el-form-item label="合同起始日期">
        <el-date-picker
          v-model="employee.beginContract"
          size="mini"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 140px;"
          placeholder="合同起始日期">
        </el-date-picker>
      </el-form-item>
      </el-col>
     <el-col :span="7">
      <el-form-item label="合同终止日期" >
        <el-date-picker
          v-model="employee.endContract"
          size="mini"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 170px;"
          placeholder="合同终止日期">
          </el-date-picker>
      </el-form-item>
     </el-col>
 </el-row>

<el-row>
  <el-col :span="6">
      <el-form-item label="离职日期">
        <el-date-picker
          v-model="employee.notWorkDate"
          size="mini"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 160px;"
          placeholder="离职日期">
        </el-date-picker>
      </el-form-item>
      </el-col>
        
       <el-col :span="8">
        <el-form-item label="身份证号码" >
          <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
            v-model="employee.idCard" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
      </el-col>
      
      <el-col :span="8">
        <el-form-item label="婚姻状况">
          <el-radio-group v-model="employee.wedlock">
             <el-radio label="已婚">已婚</el-radio>
             <el-radio label="未婚">未婚</el-radio>
             <el-radio label="离异">离异</el-radio>
             </el-radio-group>
        </el-form-item>
        </el-col>
</el-row>
     
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
        <el-button type="default" @click="resetData()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>       
</template>
<script>
import employee from '@/api/employee/employee'
const defaultForm = {
  name: '',
  gender: '',
  birthday: '',
  idCard: '',
  wedlock: '已婚',
  nationId: '',
  nativePlace: '',
  politicId: '',
  email: '',
  phone: '',
  address: '',
  departmentId: '',
  jobLevelId: '',
  posId: '',
  formId: '',
  degreeId: '',
  specialty: '',
  school: '',
  beginDate: '',
  stateIId: '',
  contractTerm: '',
  conversionTime: '',
  notWorkDate: '',
  beginContract: '',
  endContract: '',
  workAge: ''
}
export default {

  data () {
    return {
      engage: [],
      departments: [],
      joblevels: [],
      positions: [],
      nations: [],
      politicsstatus: [],
      workstate: [],
      topdegree: [],
      value: '',
      radio: '',
      BASE_API: process.env.BASE_API, // 接口API地址
      employee: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      rules: {
        name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        gender: [{required: true, message: '请选择性别', trigger: 'blur'}],
        birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
        idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'}, {
          pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
          message: '身份证号码格式不正确',
          trigger: 'blur'
        }],
        wedlock: [{required: true, message: '请选择婚姻状况', trigger: 'blur'}],
        nationId: [{required: true, message: '请输入您组', trigger: 'blur'}],
        nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
        politicId: [{required: true, message: '请选择政治面貌', trigger: 'blur'}],
        email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}, {
          type: 'email',
          message: '邮箱格式不正确',
          trigger: 'blur'
        }],
        phone: [{required: true, message: '请输入电话号码', trigger: 'blur'}],
        address: [{required: true, message: '请输入员工地址', trigger: 'blur'}],
        departmentId: [{required: true, message: '请选择部门名称', trigger: 'blur'}],
        jobLevelId: [{required: true, message: '请选择职称', trigger: 'blur'}],
        posId: [{required: true, message: '请选择职位', trigger: 'blur'}],
        formId: [{required: true, message: '请选择聘用形式', trigger: 'blur'}],
        degreeId: [{required: true, message: '请选择最高学历', trigger: 'blur'}],
        specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
        school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
        beginDate: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
        stateIId: [{required: true, message: '请选择工作状态', trigger: 'blur'}],
        workID: [{required: true, message: '请输入工号', trigger: 'blur'}],
        contractTerm: [{required: true, message: '请输入合同期限', trigger: 'blur'}],
        conversionTime: [{required: true, message: '请输入转正日期', trigger: 'blur'}],
        notworkDate: [{required: true, message: '请输入离职日期', trigger: 'blur'}],
        beginContract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
        endContract: [{required: true, message: '请输入合同结束日期', trigger: 'blur'}],
        workAge: [{required: true, message: '请输入工龄', trigger: 'blur'}]
      }
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
    // if (this.$route.params && this.$route.params.id) {
    //   const id = this.$route.params.id
    //   this.fetchDataById(id)
    // }
    this.init()
    this.initPoliticsstatus()
    this.initworkstate()
    this.inittopdegree()
    this.initjoblevels()
    this.initnations()
    this.initpositions()
    this.initdepartments()
    this.initengage()
  },

  methods: {
    init () {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // 使用对象拓展运算符，拷贝对象，而不是引用，
        // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
        this.employee = { ...defaultForm }
      }
    },
    resetData () {
      this.fetchData()
    },
    initPoliticsstatus () {
      employee.getPoliticsStatus().then(response => {
        this.politicsstatus = response.data.politics
      })
    },
    initworkstate () {
      employee.getWorkStates().then(response => {
        this.workstate = response.data.states
      })
    },
    inittopdegree () {
      employee.getTopDegree().then(response => {
        this.topdegree = response.data.degrees
      })
    },
    initjoblevels () {
      employee.getJobLevel().then(response => {
        this.joblevels = response.data.joblevels
      })
    },
    initpositions () {
      employee.getPositions().then(response => {
        this.positions = response.data.positons
      })
    },
    initnations () {
      employee.getNations().then(response => {
        this.nations = response.data.nations
      })
    },
    initdepartments () {
      employee.getDepartment().then(response => {
        this.departments = response.data.departments
      })
    },
    initengage () {
      employee.getEngage().then(response => {
        this.engage = response.data.engageforms
      })
    },

    saveOrUpdate () {
      this.saveBtnDisabled = true
      if (!this.employee.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

    // 保存
    saveData () {
      employee.save(this.employee).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/create' })
      }).catch((response) => {
        console.log(response)
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      })
    },
    // 根据id查询记录
    fetchDataById (id) {
      employee.getById(id).then(response => {
        this.employee = response.data.employee
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
      employee.updateById(this.employee).then(response => {
        return this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/create' })
      }).catch((response) => {
        // console.log(response)
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      })
    }

  }
}
</script>
<style scoped>
</style>
