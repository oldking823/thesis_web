<template>
  <div style="margin-top: 60px;margin-left:80px;border: 0px solid red;" >
    <el-form style="margin-left: -40px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="字段：" prop="key">
        <el-select v-model="ruleForm.key" style="width: 160px;float: left" placeholder="请选择字段">
          <el-option label="学号" value="number"></el-option>
          <el-option label="姓名" value="name"></el-option>
        </el-select>
      </el-form-item>
      <div style="border: 0px solid red;width: 400px;height: 60px;position: relative;top: -64px;left: 270px">
        <el-form-item label="值：">
          <el-input v-model="ruleForm.value" placeholder="请输入关键字" style="width: 160px;"></el-input>
          <el-button type="primary" icon="el-icon-search" style="position: relative;left: 10px;" @click="submitForm('ruleForm')">搜索</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%;position: relative;top:-30px">

      <el-table-column
          prop="tnum"
          label="教职工号"
          width="130">
      </el-table-column>
      <el-table-column
          prop="tname"
          label="姓名"
          width="130">
      </el-table-column>
      <el-table-column
          prop="dep"
          label="专业"
          width="130">
      </el-table-column>
      <el-table-column
          prop="email"
          label="电子邮箱"
          width="190">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号码"
          width="130">
      </el-table-column>
      <el-table-column
          prop="available"
          label="可报人数"
          width="160">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="edit(scope.row)">选择导师</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 20px;float: right"
                   background
                   layout="prev, pager, next"
                   :page-size="pageSize"
                   :total="total"
                   :current-page.sync="currentPage"
                   @current-change="page">
    </el-pagination>
  </div>

</template>

<script>
export default {
  data() {
    return {
      tableData: null,
      currentPage: 1,
      pageSize: 5,
      total: null,
      key: '',
      value: '',
      ruleForm: {
        key: '',
        value: '',
        page: '',
        size: 5
      },
      rules: {
        key: [
          { required: true, message: '请选择字段', trigger: 'change' }
        ]
      }
    }
  },
  methods:{
    submitForm(formName) {
      const _this = this
      //让翻页复原
      _this.currentPage = 1
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          _this.ruleForm.page = _this.currentPage
          let admin = JSON.parse(window.localStorage.getItem('student'))
          _this.ruleForm.dep = admin.dep
          axios.get('http://localhost:8181/teacher/search',{params:_this.ruleForm}).then(function (resp) {
            _this.tableData = resp.data.data.records
            _this.total = resp.data.data.total
          })
        }
      });

    },
    page(currentPage){
      const _this = this
      let admin = JSON.parse(window.localStorage.getItem('student'))
      if(_this.ruleForm.value == ''){
        axios.get('http://localhost:8181/teacher/mypage/'+currentPage+'/'+_this.pageSize,{params:{
          dep:admin.dep
          }}).then(function (resp) {
          _this.tableData = resp.data.data.records
          _this.total = resp.data.data.total
        })
      } else {
        _this.ruleForm.page = _this.currentPage
        axios.get('http://localhost:8181/teacher/search',{params:_this.ruleForm}).then(function (resp) {
          _this.tableData = resp.data.data.records
          _this.total = resp.data.data.total
        })
      }

    },
    edit(row){

      let admin = JSON.parse(window.localStorage.getItem('student'))
      let teacherData = {}
      teacherData.newTid = row.id
      teacherData.studentId = admin.id
      if (row.available <= 0 ){
        alert("可选人数不足")
        return
      }
      if (row.id == admin.teacherId){

        alert("重复选择")
        return
      }
      if (typeof admin.teacherId === 'undefined' || admin.teacherId === null){
        teacherData.oldTid = 0
      }else {
        teacherData.oldTid =admin.teacherId
      }
      let _this =this;

      axios.post("http://localhost:8181/teacher/select",teacherData).then(function (resp){
        console.log("提交成功")
        if (resp.data.code == 0){

          localStorage.setItem('student', JSON.stringify(resp.data.data))

          _this.$alert('修改成功', '', {
            confirmButtonText: '确定',
            callback: action => {
              _this.$router.push('/thesisUpload')
            }
          });
        }
      })
    }

    },
  created() {
    const _this = this
    let admin = JSON.parse(window.localStorage.getItem('student'))
    axios.get('http://localhost:8181/teacher/mypage/1/'+_this.pageSize,{params:{
        dep:admin.dep
      }}).then(function (resp) {
      _this.tableData = resp.data.data.records
      _this.total = resp.data.data.total
    })
  }
}
</script>