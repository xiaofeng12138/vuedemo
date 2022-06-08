<template>
  <div class="upload">
    <div class="header">
      <div class="header_search">
        <i class="iconfont icon-zuojiantou" @click="goback"></i>
      </div>
      <p>图片采集上传</p>
    </div>
    <div class="imgdesc">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="展位号" prop="name">
          <el-input v-model="ruleForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="上传说明" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc" class="textarea"></el-input>
        </el-form-item>
        <el-form-item label="图片上传">
          <el-upload
            :action="url"
            list-type="picture-card"
            ref="upload"
            :headers="headers"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change="handleChange"
            :on-success="handleSuccess"
            :data="uploadInfo"
            :before-upload="beforeUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交上传</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import baseURL from '@/util/env.js'
import store from '@/store/store'

export default {
  data() {
    return {
      ruleForm: {
        name: store.getters['Zsinfo/BoothNumber'],
        desc: ""
      },
      rules: {
        name: [{ required: true, message: "展位号不能为空", trigger: "blur" }],
        desc: [{ required: true, message: "请输入上传说明", trigger: "blur" }]
      },
      url: baseURL + interfaceUrl.uploadPhotoFile,
      //url:'',
      dialogImageUrl: "",
      dialogVisible: false,
      fileLists: [],
      headers: {
        Authorization: "bearer " + store.getters['Login/token']
      },
      imgId: [],
      uploadInfo: {
        zwh: "",
        desc: ""
      } //向服务器进行传递的参数
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.uploadInfo.zwh = (this.ruleForm.name).trim();
      this.uploadInfo.desc = this.ruleForm.desc;
      if (!this.fileLists || !this.fileLists.length) {
        this.$message.warning("请选择上传的图片");
        return;
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$refs.upload.submit();
          } else {
            this.$message.error("必填项不能为空");
          }
        });
      }
    },

    goback() {
      this.$router.go(-1);
    },
    //文件状态改变时，添加文件、上传成功和上传失败时会执行
    handleChange(files, fileList) {
      const aa = fileList[fileList.length - 1];
      this.fileLists.push(aa);
    },
    //点击删除图片
    handleRemove(file, fileList) {},
    //点击放大图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //文件上传之前处理函数 图片压缩功能
    beforeUpload(file) {
      let _this = this;
      return new Promise((resolve, reject) => {
        let isLt2M = file.size / 1024 / 1024 < 10; // 判定图片大小是否小于10MB
        if (!isLt2M) {
          this.message.error("图片过大，上传失败！！");
        }
        let image = new Image(),
        resultBlob = "";
        image.src = URL.createObjectURL(file);
        image.onload = () => {
          resultBlob = _this.compressUpload(image);
          resolve(resultBlob);
        };
        image.onerror = () => {
          reject();
        };
      });
    },

    // 图片压缩方法-canvas压缩
    compressUpload(image) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let initSize = image.src.length;
      let { width } = image,
        { height } = image;
      canvas.width = width;
      canvas.height = height;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, width, height);

      // 进行最小压缩0.1
      let compressData = canvas.toDataURL("image/jpeg", 0.1);
      let blobImg = this.dataURItoBlob(compressData);
      return blobImg;
    },

    // base64转Blob对象
    dataURItoBlob(data) {
      let byteString;
      if (data.split(",")[0].indexOf("base64") >= 0) {
        byteString = atob(data.split(",")[1]);
      } else {
        byteString = unescape(data.split(",")[1]);
      }
      let mimeString = data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      let ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },

    handleSuccess(response, file, fileList) {
      //console.log(response)
      //判断是否成功
      if (response.code === "200") {
        this.$refs.upload.clearFiles();
        setTimeout(() => {
          this.$message.success("上传成功", 1000);
          this.$router.go(-1);
        }, 1500);
      } else {
        this.$message.error("图片上传失败");
      }
    }
  }
};
</script>
<style lang='scss'>
.upload {
  width: 100%;
  margin-bottom: 1.3rem;
  .header {
    display: flex;
    position: relative;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.3rem;
    background-color: #f6f6f8;
    z-index: 999;
    p {
      position: relative;
      width: 100%;
      height: 1.2rem;
      font-size: 0.35rem;
      text-align: center;
      line-height: 1.2rem;
      font-weight: bold;
    }
    .header_search {
      .icon-zuojiantou {
        position: absolute;
        top: 0.3rem;
        left: 0.2rem;
        font-size: 0.7rem;
        color: #8d919a;
        z-index: 999;
      }
    }
  }
  .imgdesc {
    margin-top: 1.5rem;
    form {
      margin-top: 20px;
      .el-form-item__label {
        font-size: 10px;
        margin-left: -10px;
      }
      .el-form-item__content {
        width: 60%;
        button {
          margin-top: 20px;
        }
      }
      .el-textarea__inner {
        height: 2rem;
      }
      .el-button--primary {
        margin-left: 0.35rem;
      }
    }
  }
}
</style>