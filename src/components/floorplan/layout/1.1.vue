<template>
  <div class="zwxq">
    <div class="header">
      <p>1.1馆</p>
      <div class="header_search">
        <i class="iconfont icon-zuojiantou" @click="goback"></i>
      </div>
    </div>
    <div class="distribution">
      <div class="dis_top">
        <span class="common"></span>
        <p>普通展位</p>
        <span class="risk"></span>
        <p>高风险展位</p>
      </div>
      <div class="dis_content">
        <div class="areaC">
          <h3>C 区</h3>
          <ul>
            <li @click="show1">1C1-001</li>
            <li @click="show1">1C1-002</li>
            <li @click="show1">1C1-003</li>
            <li @click="show1">1C1-004</li>
            <li @click="show2" class="dangerous">1C1-005</li>
            <li @click="show1">1C1-006</li>
            <li @click="show1">1C1-007</li>
            <li @click="show1">1C1-008</li>
            <li @click="show1">1C1-009</li>
            <li @click="show1">1C2-001</li>
            <li @click="show2" class="dangerous">1C2-002</li>
            <li @click="show1">1C2-003</li>
            <li @click="show1">1C2-004</li>
            <li @click="show1">1C2-005</li>
            <li @click="show1">1C2-006</li>
            <li @click="show1">1C2-007</li>
            <li @click="show1">1C2-008</li>
            <li @click="show1">1C2-009</li>
            <li @click="show1">1C3-001</li>
            <li @click="show1">1C3-002</li>
            <li @click="show1">1C3-003</li>
            <li @click="show1">1C3-004</li>
            <li @click="show1">1C3-005</li>
            <li @click="show1">1C3-006</li>
            <li @click="show1">1C3-007</li>
            <li @click="show1">1C3-008</li>
            <li @click="show1">1C3-009</li>
          </ul>
        </div>
        <div class="areaB">
          <h3>B 区</h3>
          <ul>
            <li @click="show1" ref="li">1B1-001</li>
            <li @click="show1" ref="li">1B1-002</li>
            <li @click="show1">1B1-003</li>
            <li @click="show1">1B1-004</li>
            <li @click="show2" class="dangerous">1B1-005</li>
            <li @click="show1">1B1-005</li>
            <li @click="show1">1B1-006</li>
            <li @click="show1">1B1-007</li>
            <li @click="show1">1B1-008</li>
            <li @click="show1">1B1-009</li>
            <li @click="show2" class="dangerous">1B2-001</li>
            <li @click="show1">1B2-002</li>
          </ul>
        </div>
        <div class="areaA">
          <h3>A 区</h3>
          <ul>
            <li @click="show1">3A1-001</li>
            <li @click="show1">3A1-002</li>
            <li @click="show1">3A1-003</li>
            <li @click="show1">3A1-004</li>
            <li @click="show2" class="dangerous">3A1-005</li>
            <li @click="show1">2A2-004</li>
            <li @click="show1">2A3-001</li>
            <li @click="show1">2A3-002</li>
            <li @click="show1">2A3-003</li>
            <li @click="show1">2A3-004</li>
            <li @click="show2" class="dangerous">2A3-005</li>
            <li @click="show1">2A3-006</li>
          </ul>
        </div>
      </div>
      <div class="show" ref="show1">
        <div class="show_top">
          <i class="iconfont icon-location"></i>
          <h2>{{this.POSITION}}</h2>
          <i class="iconfont icon-jiantou9" @click="hide"></i>
        </div>
        <div class="show_detail">
          <div class="show_detail_top">
            <ul>
              <li>
                <span>展商名称:</span>
                <p>{{this.NAME}}</p>
              </li>
              <li>
                <span>国家(地区):</span>
                <p>{{this.LOAD_PLACE}}</p>
              </li>
              <li>
                <span>展品类型:</span>
                <p>{{this.AREA}}</p>
              </li>
            </ul>
          </div>
          <el-button type="primary" @click="detail">查看详情</el-button>
        </div>
      </div>
      <div class="show2" ref="show2">
        <div class="show2_top">
          <i class="iconfont icon-location"></i>
          <h2>{{this.POSITION}}</h2>
          <span class="fengxian">高风险</span>
          <i class="iconfont icon-jiantou9" @click="hide2"></i>
        </div>
        <div class="show2_detail">
          <div class="show2_detail_top">
            <ul>
              <li>
                <span>展商名称:</span>
                <p>{{this.NAME}}</p>
              </li>
              <li>
                <span>国家(地区):</span>
                <p>{{this.LOAD_PLACE}}</p>
              </li>
              <li>
                <span>展品类型:</span>
                <p>{{this.AREA}}</p>
              </li>
            </ul>
          </div>
          <el-button type="primary" @click="detail">查看详情</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import getCookie from "../../util/getcookie";
import baseURL from '@/util/env.js'
export default {
  data() {
    return {
      exhiDetail: [],
      POSITION: "",
      NAME: "",
      LOAD_PLACE: "",
      AREA: "",
      COMPANYID: ""
    };
  },
  created() {
    this.$store.commit("exhiList", this.$route.query.id);
    //console.log(this.$store.state.exhiList);
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    show1(e) {
      let value = e.target.innerHTML;
      let url =
        baseURL+"/cusBase/ranger/expoIpad/qryExhibitorListByBoothNo";
      let data = {
        boothno: value
      };
      this.$Axios({
        method: "post",
        url,
        data
      }).then(res => {
        this.exhiDetail = res.data.data2[0];
        this.POSITION = this.exhiDetail.POSITION;
        this.NAME = this.exhiDetail.NAME;
        this.LOAD_PLACE = this.exhiDetail.LOAD_PLACE;
        this.AREA = this.exhiDetail.AREA;
        this.COMPANYID = this.exhiDetail.COMPANYID;
      });
      this.$refs.show1.style.height = "4rem";
      this.$refs.show1.style.transition = "0.6s";
      this.$store.commit("BoothNumber", value);
    },
    show2() {
      this.$refs.show2.style.height = "4rem";
      this.$refs.show2.style.transition = "0.6s";
    },
    hide() {
      this.$refs.show1.style.height = "0";
      this.$refs.show1.style.transition = "0.6s";
    },
    hide2() {
      this.$refs.show2.style.height = "0";
      this.$refs.show2.style.transition = "0.6s";
    },
    detail() {
      this.$router.push({ name: "zwxx", params: { zwjs: this.exhiDetail } });
      this.$store.commit("companyId", this.COMPANYID);
    }
  }
};
</script>
<style lang='scss'>
.zwxq {
  width: 100%;
  background: linear-gradient(to right, #030e3c, #050f3a);
  height: 21rem;
  margin-bottom: 1.1rem;
  .header {
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
    .header_search {
      position: relative;
      width: 100%;
      padding-top: 0.6rem;
      .icon-zuojiantou {
        position: absolute;
        top: 0.4rem;
        left: 0.2rem;
        font-size: 0.5rem;
        color: #8d919a;
      }
    }
  }
  .distribution {
    width: 6.3rem;
    height: 17.5rem;
    margin: 0.5rem auto;
    border-radius: 10px;
    //展馆分布
    .dis_top {
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
      .risk {
        border: 2px solid #ee414e;
      }
      .common {
        border: 2px solid #1e5be9;
      }
      p {
        font-size: 0.25rem;
        color: #fff;
        margin-right: 0.3rem;
        padding-left: 0.1rem;
      }
    }
    .dis_content {
      position: relative;
      width: 100%;
      height: 100%;
      border: 1px solid #0d2874;
      box-shadow: 0 0 10px #1e5be9;
      border-radius: 10px;
      .areaC {
        height: 8.2rem;
        h3 {
          text-align: center;
          font-size: 0.4rem;
          color: #ccc;
          padding-top: 0.2rem;
        }
        ul {
          margin-top: 0.3rem;
          li {
            float: left;
            width: 1rem;
            height: 1rem;
            margin-left: 0.2rem;
            margin-bottom: 0.2rem;
            background-color: #0f235a;
            border: 1px solid #1e5be9;
            font-size: 0.15rem;
            text-align: center;
            line-height: 1rem;
            color: #fff;
            cursor: pointer;
          }
          .dangerous {
            background-color: #3a1d3a;
            border: 1px solid #ee414e;
          }
        }
      }
      .areaB {
        height: 4.5rem;
        h3 {
          text-align: center;
          font-size: 0.4rem;
          color: #ccc;
          padding-top: 0.2rem;
        }
        ul {
          margin-top: 0.3rem;
          li {
            float: left;
            width: 1rem;
            height: 1rem;
            margin-left: 0.2rem;
            margin-bottom: 0.2rem;
            background-color: #0f235a;
            border: 1px solid #1e5be9;
            font-size: 0.15rem;
            text-align: center;
            line-height: 1rem;
            color: #fff;
            cursor: pointer;
          }
          .dangerous {
            background-color: #3a1d3a;
            border: 1px solid #ee414e;
          }
        }
      }
      .areaA {
        h3 {
          text-align: center;
          font-size: 0.4rem;
          color: #ccc;
          padding-top: 0.2rem;
        }
        ul {
          margin-top: 0.3rem;
          li {
            float: left;
            width: 1rem;
            height: 1rem;
            margin-left: 0.2rem;
            margin-bottom: 0.2rem;
            background-color: #0f235a;
            border: 1px solid #1e5be9;
            font-size: 0.15rem;
            text-align: center;
            line-height: 1rem;
            color: #fff;
            cursor: pointer;
          }
          .dangerous {
            background-color: #3a1d3a;
            border: 1px solid #ee414e;
          }
        }
      }
    }
    .show {
      position: fixed;
      overflow: hidden;
      bottom: 1.1rem;
      left: 0;
      width: 100%;
      height: 0;
      background-color: #f60;
      .show_top {
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
      .show_detail {
        position: relative;
        width: 100%;
        height: 3rem;
        width: 100%;
        background-color: #fff;
        .show_detail_top {
          padding-top: 0.2rem;
          ul {
            li {
              display: flex;
              height: 0.5rem;
              line-height: 0.5rem;
              margin-bottom: 0.1rem;

              overflow: hidden;
              span {
                display: block;
                float: right;
                font-size: 0.3rem;
                font-weight: bold;
                color: #898989;
                margin-left: 1rem;
                text-align: right;
              }
              p {
                font-size: 0.25rem;
                margin-left: 0.2rem;
                white-space: nowrap;
                text-overflow: ellipsis;
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
    .show2 {
      position: fixed;
      overflow: hidden;
      bottom: 1.1rem;
      left: 0;
      width: 100%;
      height: 0;
      background-color: #f60;
      .show2_top {
        position: relative;
        display: flex;
        height: 1rem;
        width: 100%;
        line-height: 1rem;
        background-color: #e8effd;
        .fengxian {
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
      .show2_detail {
        position: relative;
        width: 100%;
        height: 3rem;
        width: 100%;
        background-color: #fff;
        .show2_detail_top {
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
                margin-left: 1rem;
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