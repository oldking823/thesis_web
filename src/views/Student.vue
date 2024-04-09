<template>
  <el-container class="home_container">
    <el-header class="home_header">
      <div class="home_title">高校论文管理系统-学生查询</div>
      <div class="home_userinfoContainer">
        <el-dropdown-item @click.native="logout">返回主页</el-dropdown-item>

      </div>
    </el-header>
    <el-container>

      <el-aside class="home_aside" width="200px">

        <el-menu router>


          <el-submenu index="1">
            <template slot="title"><i class="el-icon-user-solid"></i>学生模块</template>
            <el-menu-item index="/studentSearch" :class="$route.path=='/studentSearch'?'is-active':''">
              <i class="el-icon-search"></i>个人信息
            </el-menu-item>


          </el-submenu>

          <el-submenu index="5">
            <template slot="title"><i class="el-icon-s-release"></i>我的论文</template>
            <el-menu-item index="/thesisManager">
              <i class="el-icon-folder-add"></i>论文管理
            </el-menu-item>
            <el-menu-item index="/thesisUpload">
              <i class="el-icon-folder-add"></i>论文提交
            </el-menu-item>

          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-s-release"></i>我的导师</template>
            <el-menu-item index="/myTeacher">
              <i class="el-icon-folder-add"></i>选择导师
            </el-menu-item>


          </el-submenu>








        </el-menu>

      </el-aside>

      <el-container>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/student' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
        <el-footer class="home_footer">2023 © HIST-Thesis</el-footer>
      </el-container>

    </el-container>

  </el-container>
</template>
<script>
export default{
  methods: {
    logout(){
      let _this = this;
      this.$confirm('注销登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        localStorage.removeItem('systemAdmin')
        _this.$router.replace({path: '/login'})
      })
    }
  },
  data(){
    return {
      admin:''
    }
  }
}
</script>
<style>
.home_container {
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}

.home_header {
  background-color: #2B2B2B;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home_title {
  color: #C2C2C2;
  font-size: 22px;
  display: inline;
}

.home_userinfo {
  color: #fff;
  cursor: pointer;
}

.home_userinfoContainer {
  display: inline;
  margin-right: 20px;
}

.home_aside {
  background-color: #FFFFFF;
}

.home_footer {
  background-color: #FFFFFF;
  color: #000000;
  font-size: 18px;
  line-height: 60px;
  text-align: center;
}
</style>
