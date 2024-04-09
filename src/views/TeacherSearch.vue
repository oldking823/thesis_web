<template>
  <div style="margin-top: 60px;margin-left:330px;width: 300px;height: 500px;border: 0px solid red;" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="教职工号" prop="tnum">
        <el-input v-model="ruleForm.tnum"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="tpwd">
        <el-input :type="passw" v-model="ruleForm.tpwd"></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="tname">
        <el-input v-model="ruleForm.tname"></el-input>
      </el-form-item>
      <el-form-item label="专业" prop="dep">
        <el-input v-model="ruleForm.dep"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="phone" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
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
        tnum: '',
        tpwd:'',
        tname: '',
        dep:'',
        email:'',
        phone: ''

      },
      teacherList:'',
      // rules: {
      //   tnum: [
      //     { required: true, message: '请输入教职工号', trigger: 'blur' }
      //   ],
      //   spwd: [
      //     { required: true, message: '请输入密码', trigger: 'blur' }
      //   ],
      //   tname: [
      //     { required: true, message: '请输入姓名', trigger: 'blur' }
      //   ],
      //   dep: [
      //     { required: true, message: '请输入专业名', trigger: 'blur' }
      //   ],
      //   email:[
      //     { required: true, message: '请输入邮箱', trigger: 'blur' }
      //   ],
      //   phone:[
      //     { required: true, message: '请输入手机号码', trigger: 'blur' }
      //   ]
      //
      // }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('http://localhost:8181/teacher',_this.ruleForm).then(function (resp) {
            if(resp.data.code == 0){

              _this.$alert(_this.ruleForm.tname+'修改成功', '', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/teacherSearch')
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
    let admin = JSON.parse(window.localStorage.getItem('teacher'))

    axios.get('http://localhost:8181/teacher/'+admin.id).then(function (resp) {
      _this.ruleForm = resp.data.data
    })
  }
}
</script>
