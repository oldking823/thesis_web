<template>
  <div>
    <el-button @click="goPreview">点击预览word文件</el-button>
<!--    <el-button @click="downLoad">点击下载word文件</el-button>-->

    <div class="docWrap">
      <!-- 预览文件的地方（用于渲染） -->
      <div ref="file"></div>

    </div>
    <div class="text" >请修改状态并给出意见
      <select id="status">

        <option value ="已通过" selected>已通过</option>
        <option value="待修改">待修改</option>

      </select>


      <button @click="updata">提交</button>
    </div>


    <div id="context" class="test3" contenteditable="true"></div>

  </div>
</template>

<script>
// 引入axios用来发请求
import axios from "axios";
// 引入docx-preview插件
let docx = require("docx-preview");



export default {
  mounted() {
    console.log("使用插件的renderAsync方法来渲染", docx); //
  },
  methods: {
    data(){
      return{
        category:null,
        ruleForm: {
          id: '',
          thesisId: '',
          status:'已通过',
          teacherId:'',
          studentId:'',
          comment:''

        }
      }

    },
    // 预览
    goPreview() {
      axios({
        method: "get",
        responseType: "blob", // 因为是流文件，所以要指定blob类型
        url: "http://localhost:8181/thesis/download/"+localStorage.getItem('thesisId'), // 自己的服务器，提供的一个word下载文件接口
      }).then(({ data }) => {
        console.log(data); // 后端返回的是流文件
        docx.renderAsync(data, this.$refs.file); // 渲染到页面
      });
    },
    // 下载
    downLoad() {
      axios({
        method: "get",
        responseType: "blob", // 因为是流文件，所以要指定blob类型
        url: "http://localhost:8181/thesis/download/"+localStorage.getItem('thesisId'), // 自己的服务器，提供的一个word下载文件接口
      }).then(({ data }) => {
        console.log(data); // 后端返回的是流文件
        const blob = new Blob([data]); // 把得到的结果用流对象转一下
        var a = document.createElement("a"); //创建一个<a></a>标签
        a.href = URL.createObjectURL(blob); // 将流文件写入a标签的href属性值
        a.download = "出师表.docx"; //设置文件名
        a.style.display = "none"; // 障眼法藏起来a标签
        document.body.appendChild(a); // 将a标签追加到文档对象中
        a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
        a.remove(); // 一次性的，用完就删除a标签
      });
    },
    updata(){
      const _this = this
      let admin = JSON.parse(window.localStorage.getItem('dormitoryAdmin'))
      var status = document.getElementById("status").value
      var comment= document.getElementById("context").innerText
      let thesisId = localStorage.getItem('thesisId')
      axios.post("http://localhost:8181/thesis",{status:status,id:thesisId})
      axios.post("http://localhost:8181/review",{comment:comment,progress:status,thesisId:thesisId,teacherId:admin.id}).then(function (resp){
        if(resp.data.code == 0){
          _this.$alert('修改成功', '', {
            confirmButtonText: '确定',
            callback: action => {
              _this.$router.push('/myStudent')
            }}
          )}
      })


      console.log(document.getElementById("context").innerText)



    }

  },
};
</script>
<style lang="less" scoped>
.docWrap {
  // 指定样式宽度
  width: 900px;
  overflow-x: auto;
}
.test3{
  position: fixed;
  right: 10px;
  top: 200px;

  width: 400px;

  min-height: 60px;//设置元素的最小高度

line-height: 30px;// 设置行高

max-height: 300px;//设置元素最大高度

_height: 100px;/* IE6浏览器对min/max家族不屑一顾，结合其内部元素溢出会撑开父标签高宽的特性,所以针对IE6 直接定高 */

  margin: 0 auto;//外边距

padding: 10px;// 内边距

outline: 0;// / 去掉虚框 * 浏览器如Firefox在可编辑模式下的div获取焦点的时候会有虚框，而实际上textarea是 没有虚框显示的 */

border: 1px solid #a0b3d6;//#设置边框1px厚，实线，蓝色的边框线

border-radius: 4px;//为元素添加圆角边框！

font-size: 12px;

  word-wrap: break-word; //允许长的内容长单词或 URL 地址内部可以自动换行。

  overflow-x: hidden;//左/右边缘进行裁剪，裁剪内容 - 隐藏滚动条

  overflow-y: auto;//上/下边缘的裁剪，裁剪内容 - 不隐藏滚动条

  _overflow-y: visible;

  -webkit-user-modify: read-write-plaintext-only;

}
.text{
  position: fixed;
  top: 150px;
  right: 150px;
}

</style>