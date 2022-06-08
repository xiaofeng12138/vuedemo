<template>
  <div class="qrcodeHistory">
    <header class="header">扫码记录</header>
    <i class="iconfont icon-zuojiantou" @click="goback"></i>
    <div class="content">
      <el-table
        :data="historyList"
        border
        style="width: 100%"
        :header-cell-style="{
                'background-color': '#8d919a',
                'color': '#FFF'}"
      >
        <el-table-column prop="SIGNINAREA" label="展位号" align="center"></el-table-column>
        <el-table-column prop="REC_UPD_DT" label="时间" width="180" align="center"></el-table-column>
        <el-table-column prop="USERID" label="扫码人员" align="center"></el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pagination"
      :page-size="this.pageSize"
      :pager-count="5"
      layout="prev, pager, next"
      @current-change="this.currentPageChange"
      :total="this.total"
    ></el-pagination>
    <!-- <div class="footer">
            <el-button class="clearButton" @click="clearHistory">清除</el-button>
    </div>-->
  </div>
</template>

<script>
import { publicInter } from "../../api/http";
import interfaceUrl from "../../api/interfaceUrl";

export default {
  data() {
    return {
      historyList: [],
      total: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //请求扫码记录
    getData() {
      let data = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      publicInter(interfaceUrl.getExpoSignInByUser, data).then(r => {
        this.historyList = r.result;
        this.total = r.total;
      });
    },
    goback() {
      this.$router.go(-1);
    },
    currentPageChange(currentPage) {
      this.currentPage = currentPage;
      this.getData();
    }
  }
};
</script>
<style lang="scss" scoped>
.qrcodeHistory {
  height: 100%;
}
.header {
  font-size: 0.35rem;
  text-align: center;
  line-height: 1.2rem;
  font-weight: bold;
}
.icon-zuojiantou {
  position: absolute;
  top: 0.3rem;
  left: 0.2rem;
  font-size: 0.7rem;
  // color: #fff;
}
.pagination {
  text-align: center;
}
</style>
