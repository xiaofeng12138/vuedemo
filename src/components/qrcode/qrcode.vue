<template>
  <div class="erwm">
    <i class="iconfont icon-zuojiantou" @click="goback"></i>
    <!-- <i class="photoAlbum" @click="openPhoto">相册</i> -->
    <!-- <i class="photoAlbum" @click="openTest('展位号：1.1A1-04')">相册</i> -->
    <i class="photoAlbum" @click="getHistory">记录</i>
    <div class="scan">
      <div>
        <div id="bcid">
          <!-- <div style="height:40%"></div> -->
          <p class="tip">...载入中...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import store from '@/store/store.js'
var scan = null;
var styles = {
  frameColor: "#65e102",
  scanbarColor: "#b7e871",
  background: "#000"
}; //边框属性，中间线属性，背景色
var filter; //扫码格式 空为全类型

export default {
  name: "erwm",
  components: {},
  data() {
    return {
      codeUrl: "",
      isShow: true
    };
  },

  mounted() {
    this.startRecognize()
  },
  destroyed() {
    this.closeScan();
  },

  methods: {
    //打开相册
    // openPhoto() {
    //   if (!window.plus) return;
    //   let that = this;
    //   plus.gallery.pick(
    //     function(path) {
    //       plus.barcode.scan(
    //         path,
    //         function(type, result) {
    //           switch (type) {
    //             case plus.barcode.QR:
    //               type = "QR";
    //               break;
    //           }
    //           result = result.substring(result.lastIndexOf("：") + 1); //获取展位编号
    //           that.$store.commit("BoothNumber", result);

    //           let s1 = result.split(/[A-N]/)[0]; //获取展馆号
    //           that.$store.commit("exhiList", s1);

    //           that.codeUrl = result;
    //           let data = {
    //             SIGNINAREA: result
    //           };
    //           publicInter(interfaceUrl.addExpoSignIn, data).then(r => {
    //             if(r.code == 200 && result) {
    //               alert("您当前的位置是:" + result);
    //               that.closeScan();
    //               that.$router.push({
    //                 path: "/zwjs/zwxx",
    //                 query: {
    //                   zwh: result
    //                 }
    //               });
    //             }
    //           });
    //         },
    //         function(error) {
    //           alert("无法识别");
    //         }
    //       );
    //     },
    //     function(e) {
    //       console.log("取消选择图片");
    //     },
    //     { filter: "image" }
    //   );
    // },
    openTest(params){
      let that = this
        let result = params.substring(params.lastIndexOf("：") + 1); //获取展位编号
        store.commit("Zsinfo/SET_BOOTHNUMBER", result); //储存展位号
        let s1 = result.split(/[A-M]/)[0]; //获取展馆号
        let newZG = ''
        if(s1 == 'N'){
           newZG = 'NH'
        }else{
          newZG = s1
        }
        store.commit("Zsinfo/SET_EXHILIST", newZG);
        // console.log(result)
        //  console.log(s1)
        //  return false
        that.codeUrl = result;
        let data = {
          SIGNINAREA: result
        };
        // return false
        publicInter(interfaceUrl.addExpoSignIn, data).then(r => {
          if (r.code == 200 && result) {
            alert("您当前的位置是:" + result);
            that.closeScan();
            that.$router.push({
              name: "zwxx",
              params: { zwh: result }
            });
          } else {
            return;
          }
        });
    },
    //创建扫描控件 手机扫码
    startRecognize() {
      let that = this;
      if (!window.plus) return;
      scan = new plus.barcode.Barcode("bcid", filter, styles);
      scan.onmarked = onmarked;
      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = "QR";
            break;
        }
        

        result = result.substring(result.lastIndexOf("：") + 1); //获取展位编号
        store.commit("Zsinfo/SET_BOOTHNUMBER", result); //储存展位号
        let s1 = result.split(/[A-M]/)[0]; //获取展馆号
        let newZG = ''
        if(s1 == 'N'){
           newZG = 'NH'
        }else{
          newZG = s1
        }
        store.commit("Zsinfo/SET_EXHILIST", newZG);
        that.codeUrl = result;
        let data = {
          SIGNINAREA: result
        };
        publicInter(interfaceUrl.addExpoSignIn, data).then(r => {
          if (r.code == 200 && result) {
            alert("您当前的位置是:" + result);
            that.closeScan();
            that.$router.push({
              name: "zwxx",
              params: { zwh: result }
            });
          } else {
            return;
          }
        });
      }
      that.startScan();
    },

    //开始扫描
    startScan() {
      if (!window.plus) return;
      scan.start();
    },

    //关闭扫描
    cancelScan() {
      if (!window.plus) return;
      scan.cancel();
    },

    //关闭条码识别控件
    closeScan() {
      if (!window.plus) return;
      scan.close();
    },

    goback() {
      // 返回
      this.closeScan();
      this.$router.push({ path: "/" });
      // this.isShow = false;
    },
    getHistory() {
      this.$router.push({ path: "/qrcodeHistory" });
    }
  }
};
</script>

<style lang="less">
.scan {
  height: 100%;
  #bcid {
    z-index: 1;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 8%;
    bottom: 0;
    text-align: center;
    color: red;
    background: #fff;
  }
  footer {
    position: absolute;
    left: 0;
    bottom: 1rem;
    height: 2rem;
    line-height: 2rem;
    z-index: 2;
  }
}
.tip {
  margin-top: 40%;
}
.icon-zuojiantou {
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  font-size: 0.8rem;
  // color: #fff;
}
.photoAlbum {
  position: absolute;
  top: 0.3rem;
  left: 6.2rem;
  font-size: 0.4rem;
  font-style: normal;
}
.history {
  position: absolute;
  top: 0.3rem;
  left: 5.2rem;
  font-size: 0.4rem;
  font-style: normal;
}
</style>