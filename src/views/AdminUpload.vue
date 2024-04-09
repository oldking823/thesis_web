<template>
  <div>
    <input type="file" @change="handleFileSelect" accept=".xlsx" />
    <div v-if="previewData">
      <h2>文件预览</h2>
      <table>
        <thead>
        <tr>
          <th v-for="header in previewData.headers" :key="header">{{ header }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, index) in previewData.rows" :key="index">
          <td v-for="cell in row" :key="cell">{{ cell }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <button @click="upload">上传</button>
  </div>
</template>
<style>
.bordered-table {
  border-collapse: collapse;
}

.bordered-table th,
.bordered-table td {
  border: 2px solid black;
  padding: 8px;
}
</style>

<script>
const XLSX = require('xlsx');
export default {
  data() {
    return {
      previewData: null,
      uploadedFile: null,
    };
  },
  methods: {
    handleFileSelect(event) {
      const file = event.target.files[0];
      this.uploadedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        console.log(data);
        const workbook = XLSX.read(data, { type: 'array' });

        // 获取第一个工作表的数据
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const headers = jsonData[0];
        const rowCount = Math.min(jsonData.length, 5);
        const rows = jsonData.slice(1, rowCount + 1);



        this.previewData = { headers, rows };
      };

      reader.readAsArrayBuffer(file);
    },
    upload() {

      const formData = new FormData();
      // 添加文件
      formData.append('file', this.uploadedFile);
      const url = 'http://localhost:8181/admin/stu/import';
      axios.post(url, formData)
          .then(response => {
            // 处理响应
            if (response.data.code == '0'){
              _this.$router.push('/studentManager')

            }
            // ...
          })
          .catch(error => {
            // 处理错误
            // ...
          });

        this.previewData = null;
        this.uploadedFile = null;

    },
  },
};
</script>
