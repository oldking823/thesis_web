<template>
  <div style="margin-top: 60px;margin-left:330px;width: 300px;height: 500px;border: 0px solid red;" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
      ruleForm: {
        tnum: '',
        tname: '',
        dep:'',
        email:'',
        phone:'',
      },
      rules: {
        buildingId: [
          { required: true, message: '请选择楼宇', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择几人间', trigger: 'change' }
        ]
      }
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
  },
  created() {
    const _this = this
    axios.get('http://localhost:8181/teacher/'+_this.$route.query.id).then(function (resp) {
      _this.ruleForm = resp.data.data
    })
  }
}
</script>
