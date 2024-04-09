<template>
  <div style="top:200px">
    <input type="file" ref="fileInput" @change="handleFileChange"accept=".docx, application/vnd.openxmlformats-officedocument.wordprocessingml.document">
    <button @click="uploadFile">上传文件</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      file: null,
      params: {
        Id: JSON.parse(window.localStorage.getItem('student')).id,
        teacherId: JSON.parse(window.localStorage.getItem('student')).teacherId
      }
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    uploadFile() {
      // 创建一个 FormData 对象
      const formData = new FormData();
      // 添加文件
      formData.append('file', this.file);
      // 添加参数
      Object.keys(this.params).forEach(key => {
        formData.append(key, this.params[key]);
      });

      // 发送文件上传请求，使用你的后端接口的 URL
      // 这里只是一个示例，你需要将 URL 替换为你的实际后端接口的 URL
      const url = 'http://localhost:8181/thesis/upload';
      axios.post(url, formData)
          .then(response => {
            // 处理响应
            if (response.data.code == '0'){

              let _this = this;
              _this.$alert('上传成功', '提示', {
                  confirmButtonText: '确定'
                })


            }
            // ...
          })
          .catch(error => {
            // 处理错误
            // ...
          });
    }
  }
};
</script>
