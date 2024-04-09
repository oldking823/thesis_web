<template>
  <div style="margin-top: 60px;margin-left:330px;width: 300px;height: 500px;border: 0px solid red;" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="教职工号" prop="tnum">
        <el-input v-model="ruleForm.tnum"></el-input>
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
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
      ruleForm: {
        tnum: '',
        tname: '',
        dep:'',
        email:'',
        phone:'',

      },
      teacherList: '',
      rules: {
        tnum: [
          { required: true, message: '请输入教职工编号', trigger: 'blur' }
        ],
        tname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        dep: [
          { required: true, message: '请输入专业', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],


      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8181/teacher',_this.ruleForm).then(function (resp) {
            if(resp.data.code == 200){
              _this.$alert(_this.ruleForm.tname+'添加成功', '', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/teacherManager')
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
  }

}
</script>
