<template>
    <div class="login-container">
        <el-form :model="ruleForm" :rules="rules"
                 status-icon
                 ref="ruleForm"
                 label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page">
            <h3 class="title" style="text-align: center">高校论文管理系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text"
                          v-model="ruleForm.username"
                          placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"
                          v-model="ruleForm.password"
                          placeholder="密码"
                ></el-input>
            </el-form-item>

            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:45%;" @click="clean" :loading="logining">重置</el-button>
              <el-button type="primary" style="width:45%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                logining: false,
                ruleForm: {
                    username: '',
                    password: '123456'
                },
                type: 'systemAdmin',
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }
        },
        methods: {
          clean(){
            this.ruleForm.username='';
            this.ruleForm.password='';
          },


            handleSubmit(){
                this.$refs.ruleForm.validate((valid) => {
                    if(valid){
                        this.logining = true
                        let _this = this


                            axios.get('http://localhost:8181/admin/login', {params:_this.ruleForm}).then(function (resp) {
                                _this.logining = false
                                if(resp.data.code == -1){
                                    _this.$alert('用户名不存在', '提示', {
                                        confirmButtonText: '确定'
                                    })
                                }
                                if(resp.data.code == -2){
                                    _this.$alert('密码错误', '提示', {
                                        confirmButtonText: '确定'
                                    })
                                }
                              if(resp.data.code == 400){
                                _this.$alert('密码错误', '提示', {
                                  confirmButtonText: '确定'
                                })
                              }
                                if(resp.data.code == 200){
                                    //跳转到SystemAdmin
                                    //展示当前登录用户信息
                                    localStorage.setItem('systemAdmin', JSON.stringify(resp.data.data));
                                    _this.$router.replace({path: '/systemAdmin'})
                                }
                              if(resp.data.code == 201){
                                //跳转到SystemAdmin
                                //展示当前登录用户信息
                                localStorage.setItem('teacher', JSON.stringify(resp.data.data));
                                _this.$router.replace({path: '/teacherAdmin'})
                              }
                              if(resp.data.code == 202){
                                //跳转到SystemAdmin
                                //展示当前登录用户信息
                                localStorage.setItem('student', JSON.stringify(resp.data.data));
                                _this.$router.replace({path: '/student'})
                              }
                            })
                        }

                })
            }
        }
    };
</script>

<style scoped>
    .login-container {
        width: 100%;
        height: 100%;
    }
    .login-page {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    label.el-checkbox.rememberme {
        margin: 0px 0px 15px;
        text-align: left;
    }
</style>