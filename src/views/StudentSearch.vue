<template>
  <div style="margin-top: 60px;margin-left:330px;width: 300px;height: 500px;border: 0px solid red;" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="学号" prop="studentId">
        <el-input v-model="ruleForm.studentId"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="spwd">
        <el-input :type="passw" v-model="ruleForm.spwd"  ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="sname">
        <el-input v-model="ruleForm.sname"></el-input>
      </el-form-item>
      <el-form-item label="专业" prop="dep">
        <el-input v-model="ruleForm.dep"></el-input>
      </el-form-item>

      <el-form-item label="班级" prop="sclass">
        <el-input v-model="ruleForm.sclass"></el-input>
      </el-form-item>
      <el-form-item label="指导老师" prop="teacherId">
        <el-select v-model="ruleForm.teacherId" placeholder="请选择指导老师" :disabled="true">
          <el-option v-for="item in teacherList" :label="item.tname" :value="item.id"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  data() {
    return {
      category:null,
      passw:"password",
      ruleForm: {
        studentId: '',
        dep:'',
        sname: '',
        spwd:'',
        sclass:'',
        teacherId: ''




      },
      teacherList:'',
      rules: {
        studentId: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        spwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        sname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        dep: [
          { required: true, message: '请输入专业名', trigger: 'blur' }
        ],
        sclass:[
          { required: true, message: '请输入班级', trigger: 'blur' }
        ],
        thesisName:[
          { required: true, message: '请输入文论题目', trigger: 'blur' }
        ]

      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {

        if (valid) {
          axios.put('http://localhost:8181/student',_this.ruleForm).then(function (resp) {
            if(resp.data.code == 0){
              var studentData = JSON.parse(localStorage.getItem('student'));
              studentData.teacherId = _this.ruleForm.teacherId;
              localStorage.setItem('student', JSON.stringify(studentData));





              _this.$alert(_this.ruleForm.sname+'修改成功', '', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/StudentSearch')
                }
              });
            }
          })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    const _this = this
    let admin = JSON.parse(window.localStorage.getItem('student'))

    axios.get('http://localhost:8181/teacher/availableList',{
      params: {
        dep: admin.dep
      }
    }).then(function (resp) {
        _this.teacherList = resp.data.data
    })

    axios.get('http://localhost:8181/student/'+admin.id).then(function (resp) {
      _this.ruleForm = resp.data.data
    })
  }
}
</script>
