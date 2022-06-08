<template>
  <div class="zwxqw" :style="{height:app_height}" >
    <div class="headerw">
      <p>北厅</p>
      <div class="header_searchw">
        <i class="iconfont icon-zuojiantou" @click="goback"></i>
      </div>
    </div>
    <div class="distributionw">
      <!-- <div class="dis_topw">
        <span class="commonw"></span>
        <p>普通展位</p>
        <span class="riskw"></span>
        <p>高风险展位</p>
      </div> -->
      <div class="dis_contentw">
        <div class="areaCw">
          <h3></h3>
            <ul>
              <li @click="jump">NHA1-01</li>
              <li @click="jump">NHA1-03</li>
              <li @click="jump">NHA1-03</li>
              <li @click="jump">NHA1-04</li>
              <li @click="jump">NHA2-01</li>
              <li @click="jump">NHA2-02</li>
              <li @click="jump">NHA2-03</li>
              <li @click="jump">NHA2-04</li>
              <li @click="jump">NHA3-01</li>
              <li @click="jump">NHA3-02</li>
              <li @click="jump">NHA3-03</li>
              <li @click="jump">NHA3-04</li>
              <li @click="jump">NHA3-05</li>
              <li @click="jump">NHB1-01</li>
              <li @click="jump">NHB1-02</li>
              <li @click="jump">NHB2-01</li>
              <li @click="jump">NHB2-02</li>
              <li @click="jump">NHB3-01</li>
              <li @click="jump">NHB4-01</li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import store from '@/store/store'

export default {
  data() {
    return {
      app_height: `${window.screen.availHeight }px`,
      exhiDetail: [],
      POSITION: "",
      NAME: "",
      LOAD_PLACE: "",
      AREA: "",
      COMPANYID: ""
    };
  },
  created() {
    //保存展馆号
    store.commit('Zsinfo/SET_EXHILIST',this.$route.query.id)
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
     jump(e){
      let value = e.target.innerHTML;
      store.commit('Zsinfo/SET_BOOTHNUMBER',value)
      let s1 = 'NH' //获取展馆号
      store.commit('Zsinfo/SET_EXHILIST',s1)
      this.$router.push({ name: "zwxx", params: { zwh: value} });
    }
   
  }
};
</script>
<style lang='scss'>
.zwxqw {
  width: 100%;
  background: linear-gradient(to right, #030e3c, #050f3a);
  margin-bottom: 1.1rem;
  .headerw {
    position: relative;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.3rem;
    background-color: #fff;
    z-index: 999;
    p {
      position: relative;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 1.3rem;
      font-size: 0.35rem;
      text-align: center;
      line-height: 1.3rem;
      font-weight: bold;
    }
    .header_searchw {
      position: relative;
      width: 100%;
      padding-top: 0.6rem;
      .icon-zuojiantou {
        position: absolute;
        top: 0.4rem;
        left: 0.2rem;
        font-size: 0.7rem;
        color: #8d919a;
      }
    }
  }
  .distributionw {
    width: 6.3rem;
    margin: 0.5rem auto;
    border-radius: 10px;
    //展馆分布
    .dis_topw {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      border-radius: 10px;
      span {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        margin: auto 0;
        margin-left: 0.3rem;
      }
      .riskw {
        border: 2px solid #ee414e;
      }
      .commonw {
        border: 2px solid #1e5be9;
      }
      p {
        font-size: 0.25rem;
        color: #fff;
        margin-right: 0.3rem;
        padding-left: 0.1rem;
      }
    }
    .dis_contentw {
      position: relative;
      width: 100%;
      height: 100%;
      border: 1px solid #0d2874;
      box-shadow: 0 0 10px #1e5be9;
      border-radius: 10px;
      .areaCw {
        height: 10rem;
        h3 {
          text-align: center;
          font-size: 0.4rem;
          color: #ccc;
          padding-top: 0.2rem;
          margin-bottom: 0.3rem;
        }
        ul {
          margin-top: 0.3rem;
          margin: auto;
          margin-left: 0.4rem;
          li {
            float: left;
            width: 1.5rem;
            height: 1rem;
            margin-left: 0.2rem;
            margin-bottom: 0.2rem;
            background-color: #0f235a;
            border: 1px solid #1e5be9;
            font-size: 0.2rem;
            text-align: center;
            line-height: 1rem;
            color: #fff;
            cursor: pointer;
          }
          .dangerousw {
            background-color: #3a1d3a;
            border: 1px solid #ee414e;
          }
        }
      }
     
     
    }
    .showw {
      position: fixed;
      overflow: hidden;
      bottom: 1.1rem;
      left: 0;
      width: 100%;
      height: 0;
      .show_topw {
        position: relative;
        display: flex;
        height: 1rem;
        width: 100%;
        line-height: 1rem;
        background-color: #e8effd;
        i {
          font-size: 0.4rem;
          font-weight: bold;
        }
        .icon-jiantou9 {
          position: absolute;
          top: 0;
          right: 0.3rem;
        }
        .icon-location {
          color: "#1F5FF2";
          margin: 0 0.2rem;
        }
        h2 {
          font-size: 0.3rem;
        }
      }
      .show_detailw {
        position: relative;
        width: 100%;
        height: 3rem;
        width: 100%;
        background-color: #fff;
        .show_detail_topw {
          padding-top: 0.2rem;
          ul {
            li {
              display: flex;
              height: 0.5rem;
              line-height: 0.5rem;
              margin-bottom: 0.1rem;
              span {
                display: block;
                float: right;
                font-size: 0.3rem;
                font-weight: bold;
                color: #898989;
                margin-left: 0.4rem;
                text-align: right;
              }
              p {
                font-size: 0.25rem;
                margin-left: 0.2rem;
              }
            }
          }
        }
        .el-button {
          position: absolute;
          bottom: 0.2rem;
          left: 0;
          width: 90%;
          height: 0.8rem;
          margin-left: 0.4rem;
          border-radius: 10px;
        }
      }
    }
    .show2w {
      position: fixed;
      overflow: hidden;
      bottom: 1.1rem;
      left: 0;
      width: 100%;
      height: 0;
      .show2_topw {
        position: relative;
        display: flex;
        height: 1rem;
        width: 100%;
        line-height: 1rem;
        background-color: #e8effd;
        .fengxianw {
          display: block;
          height: 80%;
          width: 1.8rem;
          text-align: center;
          background-color: red;
          line-height: 0.8rem;
          font-size: 0.3rem;
          color: #fff;
          border-radius: 10px;
          margin-top: 0.1rem;
          margin-left: 0.5rem;
        }
        i {
          font-size: 0.4rem;
          font-weight: bold;
        }
        .icon-jiantou9 {
          position: absolute;
          top: 0;
          right: 0.3rem;
        }
        .icon-location {
          color: "#1F5FF2";
          margin: 0 0.2rem;
        }
        h2 {
          font-size: 0.3rem;
        }
      }
      .show2_detailw {
        position: relative;
        width: 100%;
        height: 3rem;
        width: 100%;
        background-color: #fff;
        .show2_detail_topw {
          padding-top: 0.2rem;
          ul {
            li {
              display: flex;
              height: 0.5rem;
              line-height: 0.5rem;
              margin-bottom: 0.1rem;
              span {
                display: block;
                float: right;
                font-size: 0.3rem;
                font-weight: bold;
                color: #898989;
                margin-left: 0.4rem;
                text-align: right;
              }
              p {
                font-size: 0.25rem;
                margin-left: 0.2rem;
              }
            }
          }
        }
        .el-button {
          position: absolute;
          bottom: 0.2rem;
          left: 0;
          width: 90%;
          height: 0.8rem;
          margin-left: 0.4rem;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>