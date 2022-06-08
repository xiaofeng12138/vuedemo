<template>
  <div class="search">
    <div class="header">
      <p>搜索</p>
      <div class="header_search">
        <input type="text" placeholder="输入品名、报关单号、HS编码、展商名称、原产地" @click="focus" />
        <i class="iconfont icon-xiazai17"></i>
      </div>
    </div>
    <div class="search_name">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="展品清单" name="first">
          <el-table :data="exhibitList" border @row-click="rowClick1" style="width: 100%">
            <el-table-column prop="POSITION" label="展位号" width="100"></el-table-column>
            <el-table-column prop="FORMID" label="报关单号" width="150"></el-table-column>
            <el-table-column prop="ITEM" label="品名" width="150"></el-table-column>
            <el-table-column prop="ORIGINAL" label="原产地"></el-table-column>
            <el-table-column prop="ITEM_QTY" label="数量"></el-table-column>
            <el-table-column prop="ITEM_VALUES" label="价格"></el-table-column>
            <!-- <el-table-column prop="jd_fs" label="监管方式"></el-table-column> -->
          </el-table>
          <el-pagination
            class="pagination"
            :page-size="this.pageSize"
            :pager-count="5"
            layout="prev, pager, next"
            @current-change="this.currentPageChange"
            :total="this.tab0Total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="展商清单" name="second">
          <el-table :data="exhibitorsList" border @row-click="rowClick2" style="width: 100%">
            <el-table-column prop="PLACEPOSITION" label="展位号"></el-table-column>
            <el-table-column prop="EXPOCOMPANY" label="展商名称"></el-table-column>
            <el-table-column prop="HQCOUNTRY" label="国家（地区）"></el-table-column>
          </el-table>
          <el-pagination
            class="pagination"
            :page-size="this.pageSize"
            :pager-count="5"
            layout="prev, pager, next"
            @current-change="this.currentPageChange"
            :total="this.tab1Total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="禁限清单" name="third">
          <!-- <el-table :data="limitAndForbidList" border style="width: 100%">
            <el-table-column prop="RN" label="序号"></el-table-column>
            <el-table-column prop="NAME" label="商品名称"></el-table-column>
            <el-table-column prop="HSCODE" label="HS编码"></el-table-column>
            <el-table-column prop="ISLIMIT" label="限用"></el-table-column>
            <el-table-column prop="ISFORBID" label="禁用"></el-table-column>
          </el-table>-->
          <el-table ref="table" :data="limitAndForbidList" border>
            <el-table-column prop="RN" label="序号"></el-table-column>
            <el-table-column prop="NAME" label="商品名称" width="150"></el-table-column>
            <el-table-column prop="HSCODE" label="HS编码" width="100"></el-table-column>
            <el-table-column prop="ORIGINCOUNTRY" label="原产国"></el-table-column>
            <el-table-column prop="ISLIMIT" label="限用"></el-table-column>
            <el-table-column prop="ISFORBID" label="禁用"></el-table-column>

            <el-table-column type="expand" label="查看规则" width="100">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <span>{{ props.row.CONTENT }}</span>
                </el-form>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            class="pagination"
            :page-size="this.pageSize"
            :pager-count="5"
            layout="prev, pager, next"
            @current-change="this.currentPageChange"
            :total="this.tab2Total"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import getCookie from "@/util/getcookie";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import store from '@/store/store.js'

export default {
  data() {
    return {
      activeName: "first",
      input1: "",
      tableData: [],
      exhibitList: [],
      exhibitorsList: [],
      limitAndForbidList: [],
      currentIndex: 0,
      tab0Total: 0,
      tab1Total: 0,
      tab2Total: 0,
      pageSize: 9,
      tabId: 0,
      expends: []
    };
  },
  mounted() {
    this.queryMaterialsComplex(1);
    this.queryExhibitorsData(1);
    this.queryLimitAndForbidList(1);
  },
  methods: {
    toogleExpand(row) {
      let $table = this.$refs.table;
      this.limitAndForbidList.map(item => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false);
        }
      });
      $table.toggleRowExpansion(row);
    },

    //展品清单请求数据
    queryMaterialsComplex(page) {
      let data = {
        page: page,
        pageSize: this.pageSize,
        paramApp: ""
      };
      publicInter(interfaceUrl.queryMaterialsComplex, data).then(res => {
        console.log(res);
        this.exhibitList = res.data;
        this.tab0Total = res.total;
      });
    },
    //展商清单请求数据
    queryExhibitorsData(page) {
      let data = {
        page: page,
        pageSize: this.pageSize,
        expocompany: ""
      };
      publicInter(interfaceUrl.allExhibitorsData, data).then(res => {
        this.exhibitorsList = res.datas;
        this.tab1Total = res.total;
      });
    },
    //禁限清单请求数据
    queryLimitAndForbidList(page) {
      let data = {
        page: page,
        pageSize: this.pageSize,
        paramApp: ""
      };
      publicInter(interfaceUrl.qryLimitAndForbidList, data).then(res => {
        console.log(res);
        let obj = {};
        this.limitAndForbidList = res.result;
        this.tab2Total = res.total;
        this.expends = res.result.NAME;
      });
    },
    focus() {
      this.$router.push({
        name: "searchdetail",
        params: { id: this.tabId }
      });
    },
    handleClick: function(tab, event) {
      this.tabId = tab.index;
      console.log(this.tabId);
      if (tab.index != this.currentIndex) {
        this.currentIndex = tab.index;
      }
    },
    rowClick1(row, column, event) {
      let result = row.POSITION;
      var reg = /^[\u4E00-\u9FA5][\u4E00-\u9FA50-9a-zA-Z]{1,39}$/;
      if(reg.test(result)){
        this.$message.warning('未知展位号！')
        return false
      }
      
      store.commit("Zsinfo/SET_BOOTHNUMBER", result); //储存展位号
      let s1 = result.split(/[A-N]/)[0]; //获取展馆号
      store.commit("Zsinfo/SET_EXHILIST", result); //储存展馆号
      this.$router.push({
        name: "zwxx",
        params: {
          zwh: result
        }
      });
    },
    rowClick2(row, column, event) {
      let result = row.PLACEPOSITION;
      store.commit("Zsinfo/SET_BOOTHNUMBER", result); //储存展位号
      let s1 = result.split(/[A-N]/)[0]; //获取展馆号
      store.commit("Zsinfo/SET_EXHILIST", result); //储存展馆号

      this.$router.push({
        name: "zwxx",
        params: {
          zwh: result
        }
      });
    },
    currentPageChange(currentPage) {
      if (this.currentIndex == 0) {
        this.queryMaterialsComplex(currentPage);
      } else if (this.currentIndex == 1) {
        this.queryExhibitorsData(currentPage);
      } else if (this.currentIndex == 2) {
        this.queryLimitAndForbidList(currentPage);
      }
    }
  }
};
</script>
<style lang='scss'>
.search {
  margin-bottom: 1.1rem;
  .header {
    position: relative;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.4rem;
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
      input {
        width: 90%;
        height: 0.76rem;
        border-radius: 0.5rem;
        outline: none;
        border: 1px solid #ccc;
        text-indent: 0.4rem;
        font-size: 0.2rem;
        margin-left: 0.35rem;
      }
      input[type="text"]:focus {
        border: 1px solid #6f85e9;
      }
      i {
        position: absolute;
        font-size: 0.4rem;
        top: 1.3rem;
        right: 0.65rem;
      }
    }
  }
  .search_name {
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
  }
}
.pagination {
  text-align: center;
}
</style>