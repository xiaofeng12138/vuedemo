<template>
  <div class="focusresult">
    <div class="header">
      <p>搜索结果</p>
      <div class="header_search">
        <i class="iconfont icon-zuojiantou" @click="goback"></i>
      </div>
    </div>
    <div class="content" v-for="(item,index) in focusList" :key="index">
      <p>
        展位号:
        <span class="zhanweihao">{{item.PLACEPOSITION}}</span>
      </p>
      <P>
        展商名称:
        <span class="zhanshangName">{{item.EXPOCOMPANY}}</span>
      </P>
      <p>问题反馈:</p>
      <el-input
        type="textarea"
        placeholder="请输入异常原因"
        :key="index"
        v-model="textarea[index]"
        class="ipt"
      ></el-input>
      <div class="submit">
        <el-button type="primary" @click="submit(index)">提交反馈</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
export default {
  data() {
    return {
      textarea: [],
      focusList: ""
    };
  },
  created() {
    this.focusList = this.$route.query.data;
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    submit(index) {
      if (this.textarea.length == "0") {
        this.$message.warning("异常原因不能为空");
      } else {
        let area = document.getElementsByClassName("zhanweihao")[index]
          .innerHTML;
        let name = document.getElementsByClassName("zhanshangName")[index]
          .innerHTML;
        let value = this.textarea[index];
        let data = {
          AREA: area,
          NAME: name,
          UNNORMALSTATE: value
        };
        publicInter(interfaceUrl.addExpoUnnormalState, data).then(res => {
          if (res.code === "200") {
            this.$message.success("问题反馈成功");
            this.$router.push("/focus");
          } else {
            this.$message.success("问题反馈失败,请重试");
          }
        });
      }
    }
  }
};
</script>
<style lang='scss'>
.focusresult {
  .header {
    position: relative;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.3rem;
    background-color: #f6f6f8;
    z-index: 999;
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
        font-size: 0.5rem;
        color: #8d919a;
      }
    }
  }
  .content {
    width: 90%;
    height: 8rem;
    margin: auto;
    p {
      font-size: 0.3rem;
      margin: 0.2rem;
      margin-top: 0.3rem;
      margin-left: 0.5rem;
      span {
        font-weight: bold;
      }
    }
    .el-textarea textarea {
      width: 85%;
      height: 3rem;
      margin-left: 0.5rem;
      border-radius: 5px;
      text-indent: 0.2rem;
    }
    .submit {
      text-align: center;
      margin: auto;
    }
  }
}
</style>