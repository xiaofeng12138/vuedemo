<template>
  <div class="test">
    <h2>这是一个测试的页面</h2>
    <a :href=" txtList ">111</a>
    <el-button type="primary" @click="download">下载</el-button>
  </div>
</template>
<script>
import baseURL from '@/util/env.js'
export default {
  data() {
    return {
      txtList: "",
      name: "1"
    };
  },
  methods: {
    download() {
      //console.log(1);
      let data = {};
      this.$Axios({
        method: "post",
        url: baseURL+"/cusBase/public/signMgmt/getSecretKey",
        data
      }).then(res => {
        // console.log(res);
        this.txtList = res.data;
        this.fileUpload(this.name, res.data);
      });
    },
    fileUpload(filename, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }
};
</script>
<style lang='scss'>
.test {
  h2 {
    font-size: 0.5rem;
  }
}
</style>