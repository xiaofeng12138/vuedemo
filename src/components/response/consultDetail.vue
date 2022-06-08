<template>
    <div class="consultdetail">
        <div class="header">
            <div class="header_search">
                <i class="iconfont icon-zuojiantou" @click="goback"></i>
            </div>
            <p>咨询解答</p>
        </div>
       
       <div class="myAnswerBox">
             <div class="imgHeader">
                <li class="li1">
                    <i class="iconfont icon-location"></i> {{zxdetail.boothno}}
                </li>
                <li class="li2">
                    <i class="iconfont icon-yonghuming"></i> {{zxdetail.companyname}}
                </li>
             </div>
             <div class="answerDetail">
                {{zxdetail.des}}
             </div>
             <div class="answerTime">
                <li>
                    {{zxdetail.uptime}}
                </li>
             </div>
             <div class="showImg">
               <img  v-for="(imgSrc,index) in imgListt" :key="index" :src="`${isUrl}/${imgSrc}`" >
            </div>
      </div>
          <div class='imgdesc'>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="文字描述(必填)" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc" class="textarea"></el-input>
                </el-form-item>
                <el-form-item label="上传图片" >
                <el-upload
                    :action = urlPath
                    list-type="picture-card"
                    ref="upload"
                    :headers="headers"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-change="handleChange"
                    :on-success="handleSuccess"
                    :data='uploadInfo'
                    :before-upload ='beforeUpload'
                >
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" >提 交</el-button>
                </el-form-item>
      </el-form>
      </div>
</div>
</template>
<script>

import { publicInter } from "../../api/http";
import interfaceUrl from "../../api/interfaceUrl";
import baseURL from '@/util/env.js'

export default {
    data() {
      return {
           urlPath:baseURL+ interfaceUrl.uploadImage,
           isUrl:baseURL,
           arr:[],
           zxdetail:[],
           imgListt:[],
            ruleForm:{
            desc:''
        },
            rules:{
            desc:[
                    { required: true, message: '请输入文字描述说明', trigger: 'blur' }
            ],
            },
            dialogImageUrl: "",
            dialogVisible: false,
            fileLists: [],
            headers: {
                Authorization: "bearer " + window.localStorage.getItem("token")
            },
            imgId: [],
            uploadInfo:{
              desc:'1',
              zwh:''
            } //向服务器进行传递的参数
        };
    },
        mounted() {
            this.detailInfo()
        },
         methods: {
             detailInfo(){
                 let data ={
                     uuid:this.$route.params.id
                 }
                publicInter(interfaceUrl.querydetailInfo, data).then(res => {
                    console.log(res)
                    this.zxdetail = res
                    this.uploadInfo.zwh = res.boothno
                    for(let i = 0 ;i<this.zxdetail.compyPics.length;i++){
                    this.imgListt.push(this.zxdetail.compyPics[i].filepath.replace('/data/file/','').trim()) 
                  }
               });
             },
             
    submitForm(formName) {
         this.$refs[formName].validate((valid) => {
          if (valid) {
             let data = {
              uuid:this.$route.params.id,
              answerdes:this.ruleForm.desc,
              pics:this.arr.join()
            }
              publicInter(interfaceUrl.querysubmitDealInfo, data).then(r => {
                if(r.code =='200'){
                  this.$message.success('操作成功')
                  setTimeout(() => {
                    this.$router.push('/my')
                  }, 1500);
                }
            })
          } else {
           this.$message.error("必填项不能为空");
          }
        });
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
    handleRemove(file, fileList) {
      
    },
    //点击放大图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //文件上传之前处理函数 图片压缩功能
  beforeUpload(file){
    let _this = this
    return new Promise((resolve, reject) => {
        let isLt2M = file.size / 1024 / 1024 < 10 // 判定图片大小是否小于10MB
        if(!isLt2M) {
            this.message.error('图片过大，上传失败！！')
        }
        let image = new Image(), resultBlob = '';
        image.src = URL.createObjectURL(file);
        image.onload = () => {
            resultBlob = _this.compressUpload(image);
            resolve(resultBlob)
        }
        image.onerror = () => {
            reject()
        }
       })
     },
   

    // 图片压缩方法-canvas压缩 
     compressUpload(image) {
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          let initSize = image.src.length
          let { width } = image, { height } = image
          canvas. width = width
          canvas.height = height
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(image, 0, 0, width, height)
          
          // 进行最小压缩0.1
          let compressData = canvas.toDataURL('image/jpeg', 0.1)
          let blobImg = this.dataURItoBlob(compressData)
          return blobImg
      },
       

       // base64转Blob对象 
       dataURItoBlob(data) {
            let byteString;
            if(data.split(',')[0].indexOf('base64') >= 0) {
                byteString = atob(data.split(',')[1])
            }else {
                byteString = unescape(data.split(',')[1])
            }
            let mimeString = data
                .split(',')[0]
                .split(':')[1]
                .split(';')[0];
            let ia = new Uint8Array(byteString.length)
            for( let i = 0; i < byteString.length; i += 1) {
                ia[i] = byteString.charCodeAt(i)
            }
            return new Blob([ia], {type: mimeString})
          },
 

    handleSuccess(response, file, fileList) {
      //判断是否成功
      console.log(response.data)
      console.log(file)
      console.log(fileList)
      if (response.code === "200") {
          this.arr.push(response.data)
      } else {
        this.$message.error("图片上传失败");
      }
    },
  }
}
</script>
<style lang="scss">
.consultdetail{
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
    .myAnswerBox{
        border: 1px solid #ccc;
        margin-bottom: 0.3rem;
        margin-top: 1.5rem;
        .imgHeader{
            display: flex;
            width: 100%;
            height: 1rem;
            background-color: #DCE5FB;
                li{
                    font-size: 0.2rem;
                    line-height: 1rem;
                    margin-left: 0.2rem;
                    i{
                        color: #A6ABB8;
                        margin-right: 0.1rem;
                    }
                }
                .li1{
                width: 35%;
                }
                .li2{
                    width: 100%;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
        }
        .answerDetail{
            width: 100%;
            font-size: 0.3rem;
            text-indent: 0.5rem;
            line-height: 0.5rem;
            padding: 0.2rem;
        }
        .answerTime{
             height: 0.5rem;
             width: 100%;
             display: flex;
             justify-content: space-between;
             margin-bottom: 0.2rem;
            li{
                height: 0.5rem;
                width: 50%;
                text-indent: 0.5rem;
                line-height: 0.5rem;
                font-size: 0.3rem;
            }
            .lispan{
                 width: 30%;
                 border-radius: 0.5rem;
                 background-color: #A6ABB8;
                 color: #CED0D8;
                 float: right;
                 margin-right: 0.2rem;
            }
         }
         .showImg{
            width: 100%;
            img{
                width: 3rem;
                height: 3rem;
                margin-left: 0.2rem;
                margin-top: 0.2rem;
                margin-bottom: 0.2rem;
            }

        }
 
    }
    .imgdesc{
        .imgHeader{
            display: flex;
            width: 100%;
            height: 1rem;
            li{
                font-size: 0.2rem;
                line-height: 1rem;
                margin-left: 0.2rem;
                i{
                    color: #A6ABB8;
                    margin-right: 0.1rem;
                }
            }
            .li1{
            width: 35%;
            }
            .li2{
                width: 100%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
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
            width: 5rem;
            margin-left: -1.1rem;
        }
     }
  }
}

</style>


