<template>
  <div class="my">
    <div class="header">
      <p>我的</p>
    </div>
    <div class="search_name">
      <el-tabs v-model="activeName">
        <el-tab-pane label="我的响应" name="second">
          <tt />
        </el-tab-pane>
        <el-tab-pane label="我的解答" name="third">
          <myAnswer />
        </el-tab-pane>
        <el-tab-pane label="巡馆异常" name="first">
          <div class="focus_content">
            <h3>
              <i class="iconfont icon-yuanquan8"></i>巡馆异常清单
            </h3>
            <el-table :data="tableData" @row-click="rowClick" border style="width: 100%">
              <el-table-column prop="ZWH" label="展位号" width="100px"></el-table-column>
              <!-- <el-table-column prop="NAME" label="展商名称"  width="150px"></el-table-column> -->
              <el-table-column prop="RECODE_USER" label="巡馆人" width="100px"></el-table-column>
              <el-table-column prop="RECODE_TIME" width="150px" label="巡馆时间"></el-table-column>
              <el-table-column prop="RECCN" label="核查项目" width="300px"></el-table-column>
              <el-table-column prop="PROBLEM_RECODE" label="异常说明" width="200px"></el-table-column>
            </el-table>
            <el-pagination
              class="pagination"
              :page-size="this.pageSize"
              :pager-count="5"
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :total="this.tab2Total"
            ></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="通知公告" name="four">
                 <Notice />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import tt from "./myresponse";
import myAnswer from "./myAnswer";
import myManage from "./mymanage";
import Notice from '@/views/notice/index'
import store from '@/store/store'

export default {
  components: {
    tt,
    myAnswer,
    myManage,
    Notice
  },
  data() {
    return {
      activeName: "second",
      tableData: [],
      pageSize: 10,
      tab2Total: 0,
      currentIndex: 0
    };
  },
  mounted() {
    this.queryUnnormalList(1);
  },
  methods: {
    //巡馆异常记录的函数
    rowClick(row) {
      let result = row.ZWH;
      store.commit('Zsinfo/SET_BOOTHNUMBER',result)
      let s1 = result.split(/[A-N]/)[0]; //获取展馆号
      store.commit('Zsinfo/SET_EXHILIST',s1)

      this.$router.push({
        name: "zwxx",
        params: {
          zwh: result
        }
      });
    },
    queryUnnormalList(page) {
      //console.log(page)
      let data = {
        zwh: "",
        pageNum: page,
        pageSize: 10
      };
      publicInter(interfaceUrl.queryErrorPatrolRecord, data).then(res => {
        this.tableData = res.list;
        this.tab2Total = res.totalRow;
        res.list.forEach(item => {
          item.index = item.RECODE_NO;
        });
      });
    },
    handleCurrentChange(currentIndex) {
      this.queryUnnormalList(currentIndex);
    }
  }
};
</script>
<style lang="scss">
.my {
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


