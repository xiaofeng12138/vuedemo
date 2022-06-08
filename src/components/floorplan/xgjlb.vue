<template>
  <div class="xgjlb">
    <div class="header">
      <p>巡馆记录表</p>
      <div class="header_search">
        <i class="iconfont icon-zuojiantou" @click="goback"></i>
      </div>
    </div>
    <div class="xgjlb_top">
      <div class="xgjlb_top_one">
        <ul>
          <li>展馆号: &nbsp;{{zgh}}号馆</li>
          <li>展台号: &nbsp;{{zth}}</li>
        </ul>
      </div>
      <div class="xgjlb_top_two">
        <ul>
          <li>
            <span>巡馆人员:</span>
            <el-input v-model="input" placeholder="请输入巡馆人员" disabled width="80%" class="inputt"></el-input>
          </li>
          <li>
            <span>巡馆时间:</span>
            <el-input v-model="time" placeholder="请输入巡馆时间" disabled width="80%" class="inputt"></el-input>
          </li>
        </ul>
      </div>
    </div>
    <div class="jlb">
      <table border="1" cellspacing="0" cellpadding="0">
        <thead>
          <colgroup>
            <col width="33.3%" />
            <col width="33.3%" />
            <col width="33.3%" />
          </colgroup>
          <tr>
            <th rowspan="2">核查内容</th>
            <th colspan="2">核查情况记录</th>
          </tr>
          <tr>
            <th>是否存在问题</th>
            <th>问题记录</th>
          </tr>
        </thead>
        <tbody class="cruise">
          <tr>
            <td>（一）展览品是否符合禁止清单、限制清单的要求。</td>
            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="a" value="0" checked/>
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="a" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>（二）展览品是否有擅自移出展馆、违规销售等情况。</td>
            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="b" value="0" checked />
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="b" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>（三）展览品是否有未经批准的试用、品尝、馈赠等情况。</td>

            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="c" value="0" checked/>
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="c" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>（四）展览品中是否存在非法出版物、印刷品、音像制品等违禁品。</td>
            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="d" value="0" checked/>
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="d" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>（五）展览品中是否存在未经海关审批入境的动植物及其产品、动植物源性食品、特殊物品。。</td>
            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="e" value="0" checked/>
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="e" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>（六）未获检疫准入的动植物产品是否与其它参展动植物产品相对隔离，是否做好每日消耗核销记录。</td>

            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="f" value="0" checked/>
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="f" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>（七）特殊物品包装是否安全无破损，存在生物安全风险的特殊物品是否具有生物危害标识并具备相关生物安全控制条件。</td>

            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="g" value="0" checked/>
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="g" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>
              <span>（八）动植物及其产品、动植物源性食品废弃物是否按海关要求进行收集和处理。</span>
            </td>
            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="h" value="0" checked/>
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="h" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
           <tr>
            <td>
              <span>（九）是否发现动植物疫情疫病。</span>
            </td>
            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="i" value="0" checked/>
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="i" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
           <tr>
            <td>
              <span>（十）是否存在其他不符合海关规定的情况。</span>
            </td>
            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="j" value="0"  checked/>
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="j" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isShowUpload" style="margin-top:0.2rem"> 
         <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
      >
        <el-form-item label="图片上传">
          <el-upload
            :action="uploadUrl"
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
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交上传</el-button>
        </el-form-item> -->
      </el-form>

       
      </div>
      <div class="btnbox">
        <el-button type="primary" class="btn" @click="normalSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import getCookie from "@/util/getcookie";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import store from '@/store/store'
import  Time  from '@/util/time'
import baseURL from '@/util/env.js'

export default {
  data() {
    return {
      ruleForm:{},
      //图片上传的参数
      uploadInfo:{},
      headers: {
        Authorization: "bearer " + store.getters['Login/token'],
      },
      fileLists: [],

      value1: "",
      input: store.getters['Login/userName'],
      time: "",
      LogSheet: [], //记录表
      isShowUpload:false,
      zgh:store.getters['Zsinfo/exhiList'],
      zth:store.getters['Zsinfo/BoothNumber'],
      newData:[],
      uploadUrl:baseURL + interfaceUrl.addFile
    };
  },
  mounted() {
      this.time = Time()
  },
  methods: {
    //图片上传的地址
    UploadUrl(){
      return baseURL + interfaceUrl.addFile
    },
    goback() {
      this.$router.go(-1);
    },
    normalSubmit() {
      console.log(this.uploadUrl)
      let COMPANYID = store.getters['Zsinfo/companyId'];
      let RECODE_TIME = Time()
      let RECODE_USER = store.getters['Login/userName'];
      var data = [];
      let num = this.$jq(".cruise tr").length;
      for (let i = 0; i < num; i++) {
        let obj = {};
        let index = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
        ];
        obj.RECODE_NO = i;
        obj.IS_PROBLEM = this.$jq("input[name=" + index[i] + "]:checked").val()
          ? this.$jq("input[name=" + index[i] + "]:checked").val()
          : "0";
          
        obj.PROBLEM_RECODE = this.$jq(".cruise tr")
          .eq(i)
          .children("td")
          .eq(2)
          .children("input")
          .val();
        data.push(obj);
        this.newData.push(obj) 
      }
      
      let msg = {
        COMPANYID,
        RECODE_TIME,
        RECODE_USER,
        data,
        zwh:store.getters['Zsinfo/BoothNumber']
      };

      let newdata = data.filter((item)=>{
        return item.IS_PROBLEM === '1'
      })

      if(newdata.length > 0 ){
        this.isShowUpload = true
        if(this.fileLists.length == 0){
            this.$message.warning('请上传异常图片')
            return false
        }
        this.FileUpload(msg)
      }else{
         this.isShowUpload = false
         this.noFileUpload(msg)
      }
    },
    

    //没有异常提交
    noFileUpload(data){
        publicInter(interfaceUrl.updPatrolRecodeByExhibitor, data).then(res => {
        console.log(res)
        if (res.code == '200') {
          this.$message.success("提交成功");
          setTimeout(()=>{
            this.goback()
          },2000)
        } else {
          this.$message.error("提交失败");
        }
      });
    },

    FileUpload(data){
        publicInter(interfaceUrl.updPatrolRecodeByExhibitor, data).then(res => {
        console.log(res.msg)
         console.log(res.code)
        if (res.code == '200') {
          this.uploadInfo = {
               key:res.key,
               type:res.type,
               filepath:res.filepath,
               zwh:res.zwh,
               file:this.fileLists
          }
          this.$refs.upload.submit();
        } else {
          this.$message.error("提交失败");
        }
      });
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
        let isLt10M = file.size / 1024 / 1024 < 10; // 判定图片大小是否小于10MB
        if (!isLt10M) {
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
    uploadImg(){
       this.uploadInfo.assg
    },
    handleSuccess(response, file, fileList) {
      console.log(response.code)
        console.log(response.msg)
      // 判断是否成功
      if (response.code === "200") {
        this.$refs.upload.clearFiles();
          this.$message.success("提交成功", 1000);
          setTimeout(()=>{
            this.$router.go(-1);
          },2000)
      } else {
        this.$message.error("图片上传失败");
      }
    },
  },

};
</script>
<style lang='scss'>
.xgjlb {
  margin-bottom: 1.1rem;
  .header {
    position: relative;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.3rem;
    z-index: 999;
    background-color: #f6f6f8;
    p {
      position: relative;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 1.2rem;
      font-size: 0.35rem;
      text-align: center;
      line-height: 1.2rem;
      font-weight: bold;
    }
    .header_search {
      position: relative;
      width: 100%;
      padding-top: 0.6rem;
      .icon-zuojiantou {
        position: absolute;
        top: 0.3rem;
        left: 0.2rem;
        font-size: 0.7rem;
        color: #8d919a;
      }
    }
  }
  .xgjlb_top {
    .xgjlb_top_one {
      ul {
        display: flex;
        justify-content: space-between;
        li {
          width: 90%;
          height: 1rem;
          margin: auto;
          background-color: #ccc;
          font-size: 0.3rem;
          text-align: center;
          line-height: 1rem;
          font-weight: bold;
        }
      }
    }
    .xgjlb_top_two {
      ul {
        li {
          display: flex;
          font-size: 0.3rem;
          height: 1rem;
          line-height: 1rem;
          margin-left: 0.5rem;
          margin-top: 0.3rem;
          span {
            margin-right: 0.5rem;
          }
          .inputt {
            width: 63%;
            margin-left: 0.1rem;
            //margin-left: 0.3rem;
          }
        }
      }
    }
  }
  .jlb {
    width: 90%;
    margin: auto;
    margin-top: 0.3rem;
    table {
      width: 100%;
      td {
        width: 33.333%;
      }
      thead {
        th {
          font-size: 0.3rem;
        }
      }
      tbody {
        font-size: 0.2rem;
        .radioGroup {
          div {
            margin-left: 0.06rem;
          }
        }
        .ipt {
          width: 2.5rem;
          height: 0.7rem;
          outline: none;
          border: none;
          text-indent: 0.3rem;
        }
      }
    }
  }
  .fileUpload{
    width: 100%;
    margin-top: 0.4rem;
    text-align: center;
  }
  .btnbox {
    width: 100%;
    height: 2rem;
    margin: auto;
    text-align: center;
    .btn {
      width: 2.5rem;
      height: 1rem;
    }
  }
}
</style>