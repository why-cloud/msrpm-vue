<template>
  <div class="app-container" employee>
    <el-form>
       <el-row >
        <el-col :span="6">
        <el-form-item label="姓名" prop="name">
        <el-input justify=start placeholder="请输入员工姓名" size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="employee.name"/>
        </el-form-item>
        </el-col>
      <el-col :span="5">
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="employee.gender">
             <el-radio label="男">男</el-radio>
             <el-radio label="女">女</el-radio>
             </el-radio-group>
       </el-form-item>
      </el-col>
     <el-col :span="6">
      <el-form-item label="出生日期" prop="birthday">
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
      <el-form-item label="民族" prop="nationId">
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
      <el-form-item label="籍贯" prop="nativePlace">
        <el-input size="mini" prefix-icon="el-icon-edit" placeholder="请选择籍贯"
         style="width: 150px" v-model="employee.nativePlace"/>
      </el-form-item>
      </el-col>
      <el-col :span="6">
      <el-form-item label="电子邮箱" prop="email">
        <el-input size="mini" prefix-icon="el-icon-edit" placeholder="请输入邮箱" style="width: 150px" v-model="employee.email"/>
      </el-form-item>
      </el-col>
      <el-col :span="7">
      <el-form-item label="联系地址" prop="address">
        <el-input size="mini" placeholder="请输入联系地址" prefix-icon="el-icon-edit" style="width: 200px" v-model="employee.address"/>
      </el-form-item>
      </el-col>
</el-row>
      <el-row>
     <el-col :span="6"> 
      <el-form-item label="职位" prop="posId">
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
      <el-form-item label="职称" prop="jobLevelId">
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
      <el-form-item label="所属部门"  prop="departmentId">
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
      <el-form-item label="电话号码" prop="phone">
        <el-input size="mini" style="width: 200px" placeholder="电话号码" prefix-icon="el-icon-phone" v-model="employee.phone"/>
      </el-form-item>
      </el-col>
</el-row>
<el-row>
        <el-col :span="6">
      <el-form-item label="专业" prop="specialty">
        <el-input size="mini" style="width: 150px;" prefix-icon="el-icon-edit" placeholder="请输入专业名称" v-model="employee.specialty"/>
      </el-form-item>
        </el-col>
      <el-col :span="5">
      <el-form-item label="工龄" prop="workAge">
        <el-input size="mini" style="width: 150px;" prefix-icon="el-icon-edit" v-model="employee.workAge" placeholder="请输入工龄"/>
      </el-form-item>
     </el-col>
      <el-col :span="6">
      <el-form-item label="最高学历" prop="degreeId">
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
      <el-form-item label="毕业院校" prop="school">
        <el-input placeholder="毕业院校名称" size="mini" style="width: 200px;" v-model="employee.school"/>
      </el-form-item>
      </el-col>
</el-row>
<el-row>
   <el-col :span="6">
    <el-form-item label="工号" prop="workID">
      <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" placeholder="工号" v-model="employee.workID"/>
      </el-form-item>
      </el-col>
      <el-col :span="5">
      <el-form-item label="在职状态" prop="stateIId">
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
      <el-form-item label="合同期限" prop="contractTerm">
        <el-input size="mini" style="width: 150px;" v-model="employee.contractTerm" prefix-icon="el-icon-edit" placeholder="请输入合同期限"/>
      </el-form-item>
      </el-col>
      <el-col :span="7">
      <el-form-item label="聘用形式" prop="formId">
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
      <el-form-item label="入职日期" prop="beginDate">
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
      <el-form-item label="转正日期" prop="conversionTime">
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
      <el-form-item label="合同起始日期" prop="beginContract">
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
      <el-form-item label="合同终止日期" prop="endContract">
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
      <el-form-item label="离职日期" prop="notWorkDate">
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
        <el-form-item label="身份证号码" prop="idCard">
          <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
            v-model="employee.idCard" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
      </el-col>
      
      <el-col :span="8">
        <el-form-item label="婚姻状况" prop="wedlock">
          <el-radio-group v-model="employee.wedlock">
             <el-radio label="已婚">已婚</el-radio>
             <el-radio label="未婚">未婚</el-radio>
             <el-radio label="离异">离异</el-radio>
             </el-radio-group>
        </el-form-item>
        </el-col>
</el-row>
     
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate ()">保存</el-button>
        <el-button type="default" @click="init()">取消</el-button>
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
      saveBtnDisabled: false
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
        this.$router.push({ path: '/edit' })
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
        this.$router.push({ path: '/edit' })
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