<template>
    <div style="margin-top: 60px;margin-left:330px;width: 300px;height: 500px;border: 0px solid red;" >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="学号" prop="studentId">
            <el-input v-model="ruleForm.studentId"></el-input>
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

<!--            <el-form-item label="宿舍" prop="teacherId">-->
<!--                <el-select v-model="ruleForm.teacherId" placeholder="请选择宿舍">-->
<!--                    <el-option v-for="item in teacherList" :label="item.name" :value="item.id"></el-option>-->
<!--                </el-select>-->
<!--            </el-form-item>-->
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
                  studentId: '',
                  dep:'',
                  sname: '',
                  spwd:'123456',
                  sclass:'',
                  role:'student'
                },
                teacherList: '',
                rules: {
                  studentId: [
                        { required: true, message: '请输入学号', trigger: 'blur' }
                    ],
                  dep:[
                    { required: true, message: '请输入专业', trigger: 'blur' }
                   ],
                    sname: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],

                    sclass: [
                        { required: true, message: '请输入班级', trigger: 'blur' }
                    ],

                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost:8181/student',_this.ruleForm).then(function (resp) {
                            if(resp.data.code == 0){
                                _this.$alert(_this.ruleForm.sname+'添加成功', '', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/studentManager')
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
        // created() {
        //     const _this = this
        //     axios.get('http://localhost:8181/teacher/availableList').then(function (resp) {
        //         _this.teacherList = resp.data.data
        //     })
        // }
    }
</script>
