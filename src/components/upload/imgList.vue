<template>
  <div class="upload">
    <div class="header">
      <div class="header_search">
        <i class="iconfont icon-zuojiantou" @click="goback"></i>
      </div>
      <p>图片上传列表</p>
    </div>
      <div class="imgList">
        <div class="noupload" v-if ="picList.length == 0 ">暂无上传图片</div>
        <div class="imgBox" v-else v-for="(item,index) in picList" :key="index">
          <!-- <img :src="'data:image/'+item.FILETYPE+';base64,'+item.FILEBASE64" alt /> -->
          <img :src="item" alt v-preview="item" />
          <div class="imgzwh">
            展位号：<span>{{imgZwh[index]}}</span>
          </div>
          <div class="imgDes">
            上传说明：<span>{{imgDesc[index]}}</span>
          </div>
          <div class="del">
            <span @click="delImg(index)">删除图片</span>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { publicInter } from "../../api/http";
import interfaceUrl from "../../api/interfaceUrl";

export default {
  data() {
    return {
      picList:[],
      imgId: [],
      imgZwh:[],
      imgDesc:[],
    };
  },
  mounted() {
    this.ImgUpload();
  },
  methods: {
   
    goback() {
      this.$router.go(-1);
    },

    ImgUpload() {
      let data = {
        pageSize:500,
        page: 1,
        zwh:this.$store.state.BoothNumber
      };
      publicInter(interfaceUrl.queryImageFiles, data).then(res => {
        res.list.forEach(item => {
          item.src =
            "data:image/" + item.FILETYPE + ";base64," + item.FILEBASE64;
          item.id = item.ATTACHMENT_UUID;
          item.zwh = item.ZWH;
          item.desc = item.DESCRIP;
          this.picList.push(item.src);
          this.imgId.push(item.ID);
          this.imgZwh.push(item.zwh);
          this.imgDesc.push(item.desc)
        });
      });
    },
    //用户删除图片的函数
    delImg(index) {
      this.$confirm('是否确认删除',{
         center: true
      }).then(()=>{
        let data = {
          ATTACHMENT_UUID: this.imgId[index]
        };
         publicInter(interfaceUrl.deleteImageFile, data).then(res => {
        if (res.code == "200") {
          this.$message.success("删除成功");
          this.picList.splice(index,1); //页面中删除对应的数组
          setTimeout(() => {
            this.$router.go(0)
          }, 1000);
        } else {
          this.$message.error(res.msg);
        }
      })
      }).catch(()=>{
         return 
      })
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
        font-size: 0.5rem;
        color: #8d919a;
        z-index: 999;
      }
    }
  }

   .imgList {
    width: 100%;
    height: 100%;
    margin-bottom: 1.1rem;
    margin-top: 1.35rem;
    .noupload{
      font-size: 0.5rem;
      width: 100%;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
    }
    .imgBox {
      margin-top: 0.3rem;
      margin-bottom: 0.2rem;
      img {
        display: block;
        width: 4rem;
        margin: 0 1.8rem;
      }
      .imgzwh{
        margin-top: 0.2rem;
        font-size: 0.3rem;
        margin-left: 0.6rem;
        color:#606266;
        span{
          color:#000;
        }
      }
      .imgDes{
        font-size: 0.3rem;
        margin-top: 0.2rem;
        padding-left: 0.6rem;
        padding-right:0.6rem;
        color:#606266;
        span{
          color:#000;
        }
      }
      .del {
        height: 0.6rem;
        width: 100%;
        margin-top: 0.2rem;
        span {
          display: block;
          width: 2rem;
          height: 100%;
          font-size: 0.3rem;
          background-color: #409eff;
          text-align: center;
          line-height: 0.6rem;
          border-radius: 0.1rem;
          margin: 0 auto;
          color: #fff;
        }
      }
    }
   }
}
</style>