<template>
  <div class="upload">
    <div class="header">
      <div class="header_search">
        <i class="iconfont icon-zuojiantou" @click="goback"></i>
      </div>
      <p>视频采集上传</p>
    </div>
    <!-- <div class="upload_box">
      
    </div> -->
    <div class='imgdesc'>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
         <el-form-item label="展位号" prop="name">
           <el-input v-model="ruleForm.name" disabled></el-input>
         </el-form-item>
         <el-form-item label="上传说明" prop="des">
            <el-input type="textarea" v-model="ruleForm.des" class="textarea"></el-input>
         </el-form-item>
          <el-form-item label="视频上传">
            <!-- <input type="file" accept="video/*" capture="camera"> -->
            <video  v-if='showVideo' class ='showVideo'  :src = 'videoSrc' autoplay muted controls></video>
          <el-upload
            :action="url"
            list-type="text"
            ref="upload"
            :headers="headers"
            :auto-upload="false"
            :on-success="handleVideoSuccess"
            :data='uploadInfo'
            :before-upload ='beforeUploadVideo'
            :limit = 1
          >
       <i class="el-icon-plus"></i>
      <!--<video v-if="videoForm.showVideoPath !='' && videoFlag == false" :src="videoForm.showVideoPath" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
     <i v-else-if="videoForm.showVideoPath =='' && videoFlag == false" class="el-icon-plus avatar-uploader-icon"></i> -->

       </el-upload>
      <!-- <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog> -->
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click="submitForm('ruleForm')">提交上传</el-button>
           <!-- <el-button type="primary" @click="imgList">上传列表</el-button> -->
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
    videoSrc:'',
    showVideo: false,
    fileSize:0,
    videoFlag: false,
    //是否显示进度条
    videoUploadPercent: "",
    //进度条的进度，
    isShowUploadVideo: true,
     videoForm: {
          showVideoPath: ''
        },

    ruleForm:{
      name:store.getters['Zsinfo/BoothNumber'],
      des:''
    },
    rules:{
       name: [
            { required: true, message: '展位号不能为空', trigger: 'blur' },
          ],
       des:[
             { required: true, message: '请输入上传说明', trigger: 'blur' }
       ],
    },
      url: baseURL+"/expo/ep/uploadFile/uploadVideoFile",
     
      dialogImageUrl: "",
      dialogVisible: false,
      fileLists: [],
      headers: {
        Authorization: "bearer " + window.localStorage.getItem("token")
      },
      imgId: [],
      uploadInfo:{
       zwh:'',
       des:''
      } //向服务器进行传递的参数
    };
  },
  mounted() {
  },
  methods: {


    submitForm(formName) {
      //console.log(this.ruleForm.name)
      this.uploadInfo.zwh = this.ruleForm.name
      this.uploadInfo.des = this.ruleForm.des
         this.$refs[formName].validate((valid) => {
          if (valid) {
           this.$refs.upload.submit();
          } else {
           this.$message.error("必填项不能为空");
          }
        });
      //}
    },


    goback() {
      this.$router.go(-1);
    },
    // //文件状态改变时，添加文件、上传成功和上传失败时会执行
    // handleChange(files, fileList) {
    //   const aa = fileList[fileList.length - 1];
    //   this.fileLists.push(aa);
    // },
    //点击删除图片
    // handleRemove(file, fileList) {
      
    // },

       //上传前回调
            beforeUploadVideo(file) {
              console.log(file)
               this.fileSize = file.size
                var fileSize = file.size / 1024 / 1024 < 50;
                
                if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
                    this.$message.error("请上传正确的视频格式");
                    return false;
                }
                if (!fileSize) {
                    this.$message.error("视频大小不能超过50MB");
                    return false;
                }
            },

         //进度条
            // uploadVideoProcess(event, file, fileList) {
            //     this.videoFlag = true;
            //     this.videoUploadPercent = file.percentage.toFixed(0) * 1;
            // },

   //上传成功回调
            handleVideoSuccess(res, file) {
                console.log(res)
                console.log(file.url)
                //this.$refs.upload.clearFiles();
                this.isShowUploadVideo = true;
                this.videoFlag = false;
                this.videoUploadPercent = 0;
                
                //前台上传地址
                if (file.status == 'success' ) {
                   this.videoForm.showVideoPath = file.url;
                } else {
                    this.$message.error("上传失败，请重新上传");
                }

                //后台上传地址
                if (res.code == 200) {
                    this.$message.success('上传成功');
                    this.$router.go(-1)
                } else {
                     this.$message.error('上传失败');
                }
            },
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
  .imgdesc{
    margin-top:1.5rem;
    form{
      margin-top: 20px;
      .el-form-item__label{
      font-size: 10px;
      margin-left: -10px;
    }
    .el-form-item__content{
      width:60%;
      button{
        margin-top: 20px;
      }
    }
    .el-textarea__inner{
      height: 2rem;
      }
      .el-button--primary{
      margin-left:0.35rem;
    }
    }
  }
  .showVideo{
      width: 4.5rem;
      height: 3rem;
  }
}
</style>