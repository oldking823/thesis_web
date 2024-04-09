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
          prop="studentId"
          label="学号"
          width="130">
      </el-table-column>
      <el-table-column
          prop="sname"
          label="姓名"
          width="130">
      </el-table-column>
      <el-table-column
          prop="dep"
          label="专业"
          width="130">
      </el-table-column>

      <el-table-column
          prop="sclass"
          label="班级"
          width="130">
      </el-table-column>
      <el-table-column
          prop="status"
          label="论文状态 "
          width="160">
      </el-table-column>


      <el-table-column
          prop="thesisName"
          label="论文题目"
          width="160">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="edit(scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="primary"
              @click="del(scope.row)">下载</el-button>
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
          axios.get('http://localhost:8181/student/search',{params:_this.ruleForm}).then(function (resp) {
            _this.tableData = resp.data.data.records
            _this.total = resp.data.data.total
          })
        }
      });

    },
    page(currentPage){
      const _this = this
      if(_this.ruleForm.value == ''){
        axios.get('http://localhost:8181/student/mypage/'+currentPage+'/'+_this.pageSize).then(function (resp) {
          _this.tableData = resp.data.data.records
          _this.total = resp.data.data.total
        })
      } else {
        _this.ruleForm.page = _this.currentPage
        axios.get('http://localhost:8181/student/search',{params:_this.ruleForm}).then(function (resp) {
          _this.tableData = resp.data.data.records
          _this.total = resp.data.data.total
        })
      }

    },
    edit(row){
      localStorage.setItem('thesisId', row.thesisId);
      this.$router.push('/mystudentUpdate')
    },
    del(row) {
      const _this = this
      this.$confirm('确认下载【'+row.sname+'】的文档吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let url = 'http://localhost:8181/thesis/download/'+row.thesisId;
        let filename = row.thesisName
        axios({
          method: 'get',
          url: url,
          responseType: 'blob' //重点！一定要设置responseType为blob
        })
            .then(res => {
              //构造blob对象，type是文件类型，详情可以参阅blob文件类型
              let blob = new Blob([res.data], { type: 'application/docx' }) //我是下载zip压缩包
              let url = window.URL.createObjectURL(blob) //生成下载链接
              const link = document.createElement('a') //创建超链接a用于文件下载
              link.href = url //赋值下载路径
              link.target = '_blank' //打开新窗口下载，不设置则为在本窗口下载
              link.download = `${filename}.docx` //下载的文件名称（不设置就会随机生成）
              link.click() //点击超链接触发下载
              URL.revokeObjectURL(url) //释放URL
              this.$message.success('下载完成')
            })
            .catch(error => this.$message.error('下载失败'))







      });
    }
  },
  created() {
    const _this = this
    let admin = JSON.parse(window.localStorage.getItem('teacher'))
    axios.get('http://localhost:8181/student/mypage/1/'+_this.pageSize,
        {params: {
            teacherId: admin.id
          }}).then(function (resp) {
      _this.tableData = resp.data.data.records
      _this.total = resp.data.data.total
    })
  }
}
</script>