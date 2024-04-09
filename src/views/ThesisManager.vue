<template>
  <div style="margin-top: 60px;margin-left:80px;border: 0px solid red;" >


    <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%;position: relative;top:-30px">

      <el-table-column
          prop="comment"
          label="指导意见"
          width="750">
      </el-table-column>
      <el-table-column
          prop="progress"
          label="审阅结果"
          width="250">
      </el-table-column>
      <el-table-column
          prop="timestamp"
          label="日期"
          width="200">
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
      category:null,
      ruleForm: {

        comment: '',

        timestamp: ''




      },


    };
  },
  methods: {


  },
  created() {
    const _this = this

    let admin = JSON.parse(window.localStorage.getItem('student'))
    if (typeof admin.thesisId === 'undefined' || admin.thesisId === null){


    }else {
      console.log(admin)
      axios.get('http://localhost:8181/review/page/'+admin.thesisId+'/'+_this.currentPage+'/'+_this.pageSize).then(function (resp) {
        _this.tableData = resp.data.data.records
        _this.total = resp.data.data.total
      })
    }

  }
}
</script>
