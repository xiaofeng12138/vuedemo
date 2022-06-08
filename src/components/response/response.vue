<template>
  <div class="response">
    <div class="header">
      <p>响应</p>
    </div>

    <div class="search_name">
      <el-tabs v-model="activeName">
        <el-tab-pane label="一键呼叫响应" name="first">
          <Callresponse />
        </el-tab-pane>

        <el-tab-pane label="展商咨询解答" name="second">
          <Consultresponse />
        </el-tab-pane>

        <el-tab-pane label="废弃物登记查询" name="third">
          <Accept />
        </el-tab-pane>

        <el-tab-pane label="品尝、试用、散发查询" name="four">
          <Resquery />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Callresponse from "./callresponse";
import Consultresponse from "./consultresponse";
import Accept from "./acceptresponse";
import Resquery from "./resquery";

export default {
  components: {
    Callresponse,
    Consultresponse,
    Accept,
    Resquery
  },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>
<style lang="scss">
.response {
  margin-bottom: 1.3rem;
  .header {
    position: relative;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.2rem;
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
  }

  .search_name {
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      font-size: 25px;
    }
    .el-tabs__content {
      width: 90%;
      margin: auto;
      .el-table th {
        background-color: #8d919a;
      }
      .el-table th div {
        text-align: center;
        color: #fff;
        font-size: 0.28rem;
      }

      .el-table .cell,
      .el-table th div {
        word-wrap: break-word;
        text-align: center;
        font-size: 0.2rem;
      }
    }
    .el-tabs__nav {
      width: 100%;
      display: table;
      .el-tabs__active-bar {
        z-index: 0;
      }
      .el-tabs__item {
        display: table-cell;
        font-size: 0.3rem;
        text-align: center;
        border: 1px solid #ccc;
        background-color: #fff;
        padding: 0 0.2rem;
        height: 0.4rem;
      }
      .el-tabs__item.is-active {
        color: #fff;
        background-color: #2669f4;
        font-weight: bold;
      }
      .el-tabs__item:hover {
        color: #fff;
        background-color: #2669f4;
        font-weight: bold;
      }
      .el-tabs__header {
        width: 33%;
      }
    }

    .focus_content {
      width: 100%;
      margin: auto;
      h3 {
        margin-top: 0.2rem;
        font-size: 0.3rem;
        margin-bottom: 0.4rem;
        i {
          color: #4da1ff;
          font-size: 0.4rem;
          margin-top: 0.1rem;
        }
      }
      .el-table th {
        background-color: #8d919a;
      }
      .el-table th div {
        text-align: center;
        color: #fff;
        font-size: 0.28rem;
      }
      .el-table .cell,
      .el-table th div {
        word-wrap: break-word;
        text-align: center;
        font-size: 0.2rem;
      }
    }
    .pagination {
      text-align: center;
      margin-bottom: 1rem;
      margin-top: 0.3rem;
    }
  }
}
</style>


