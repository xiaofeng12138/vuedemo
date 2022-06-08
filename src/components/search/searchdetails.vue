<template>
  <div class="searchdetailsw">
    <div class="headerw">
      <p>搜索</p>
      <div class="header_searchw">
        <i class="iconfont icon-zuojiantou" @click="goback"></i>
        <input type="text"  ref="input" />
        <i class="iconfont icon-xiazai17" @click="search"></i>
      </div>
    </div>
    <div class="search_historyw">
      <h3>历史记录</h3>
      <ul id="ul">
        <li ref="li" v-for="(item,index) in arr" :key="index">
          <span @click="arrSearch(item)">{{item.SEARCHCONTENT}}</span>
          <i class="iconfont icon-guanbi" @click="close(item.SEARCHCONTENTUUID)"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { publicInter } from "../../api/http";
import interfaceUrl from "../../api/interfaceUrl";

export default {
  data() {
    return {
      arr: "",
      indexId:''
    };
  },

  mounted() {
    this.$refs.input.focus();
    this.querySearch();
    this.indexId = this.$route.params.id
    console.log(this.$route.params.id)
  },

  methods: {
    goback() {
      this.$router.go(-1);
    },
    arrSearch(item) {
      let value = item.SEARCHCONTENT;
      let data = {
        SEARCHCONTENT: value
      };
      this.$router.push({
        path: "/searchresult",
        query: {
          inputValue: value,
          id:this.indexId
        }
      });
    },

    //查询搜索记录的函数
    querySearch() {
      let data = {};
      publicInter(interfaceUrl.getSearchContentByUser, data).then(res => {
        this.arr = res.result;
      });
    },

    search() {
      let that = this;
      let value = that.$refs.input.value;
      let data = {
        SEARCHCONTENT: value
      };
      if (value.trim().length > 0) {
        //存储搜索记录
        publicInter(interfaceUrl.addSearchContentByUser, data).then(res => {
          return;
        });
        that.$refs.input.value = "";
        that.$router.push({
          path: "/searchresult",
          query: {
            inputValue: value,
            id:this.indexId
          }
        });
      } else {
        this.$message.warning("搜索内容不能为空");
      }
    },

    //删除搜索记录
    close(index) {
      let data = {
        SEARCHCONTENTUUID: index
      };
      publicInter(interfaceUrl.removeSearchContentById, data).then(res => {
        this.querySearch();
      });
    }
  }
};
</script>
<style lang='scss'>
.searchdetailsw {
  .headerw {
    position: relative;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.4rem;
    background-color: #4da1ff;
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
    .header_searchw {
      position: relative;
      width: 100%;
      padding-top: 0.6rem;
      input {
        width: 90%;
        height: 0.76rem;
        border-radius: 0.5rem;
        outline: none;
        border: 1px solid #ccc;
        text-indent: 0.4rem;
        font-size: 0.3rem;
        margin-left: 0.35rem;
      }
      input[type="text"]:focus {
        border: 1px solid #6f85e9;
      }
      .icon-xiazai17 {
        position: absolute;
        font-size: 0.4rem;
        top: 1.25rem;
        right: 0.65rem;
      }
      .icon-zuojiantou {
        position: absolute;
        top: 0.3rem;
        left: 0.2rem;
        font-size: 0.7rem;
        color: #fff;
      }
    }
  }
  .search_historyw {
    width: 90%;
    height: 8rem;
    margin: auto;
    overflow: hidden;
    .el-message--info {
      p {
        height: 0.5rem;
        width: 80%;
      }
    }
    h3 {
      margin-top: 0.4rem;
      font-size: 0.3rem;
      margin-bottom: 0.4rem;
    }

    ul {
      li {
        position: relative;
        display: flex;
        width: 100%;
        height: 0.6rem;
        background-color: #f5f5f5;
        margin-bottom: 0.2rem;
        font-size: 0.3rem;
        text-indent: 0.3rem;
        line-height: 0.6rem;
        span {
          display: block;
          width: 80%;
        }
        i {
          position: absolute;
          right: 0.3rem;
        }
      }
    }
  }
}
</style>