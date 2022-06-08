<template>
  <div class="focus">
    <div class="header">
      <p>异常</p>
      <!-- <div class="header_search">
        <input type="text" placeholder="输入展位号,添加关注" ref="input" />
        <i class="iconfont icon-xiazai17" @click="search"></i>
      </div>-->
    </div>
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
  </div>
</template>
<script>
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
export default {
  data() {
    return {
      tableData: [],
      pageSize: 10,
      tab2Total: 0,
      currentIndex: 0,
      // projectName:[
      //   '展览品是否符合禁止清单、限制清单的要求',
      //   '展览品是否有擅自移出展馆、违规销售等情况',
      //   '展览品是否有未经批准的试用、品尝、馈赠等情况',
      //   '展览品中是否存在非法出版物、印刷品、音像制品等违禁品',
      //   '展览品中是否存在未经海关审批入境的动植物及其产品、动植物源性食品、特殊物品',
      //   '未获检疫准入的动植物产品是否与其它参展动植物产品相对隔离，是否做好每日消耗核销记录',
      //   '特殊物品包装是否安全无破损，存在生物安全风险的特殊物品是否具有生物危害标识并具备相关生物安全控制条件',
      //   '动植物及其产品、动植物源性食品废弃物是否按海关要求进行收集和处理',
      //   '是否发现动植物疫情疫病',
      //   '是否存在其他不符合海关规定的情况'
      //   ],
      projectIndex: []
    };
  },
  mounted() {
    this.queryUnnormalList(1);
  },
  methods: {
    rowClick(row) {
      let result = row.ZWH;
      this.$store.commit("BoothNumber", result);
      let s1 = result.split(/[A-N]/)[0]; //获取展馆号
      this.$store.commit("exhiList", s1);
      this.$router.push({
        name: "zwxx",
        params: {
          zwh: result
        }
      });
    },
    queryUnnormalList(page) {
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
          this.projectIndex.push(item.index);
        });
      });
    },
    handleCurrentChange(currentIndex) {
      this.queryUnnormalList(currentIndex);
    }
  }
};
</script>
<style lang='scss'>
.focus {
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
    // .header_search {
    //   position: relative;
    //   width: 100%;
    //   padding-top: 0.6rem;
    //   input {
    //     width: 90%;
    //     height: 0.76rem;
    //     border-radius: 0.5rem;
    //     outline: none;
    //     border: 1px solid #ccc;
    //     text-indent: 0.4rem;
    //     font-size: 0.2rem;
    //     margin-left: 0.35rem;
    //   }
    //   input[type="text"]:focus {
    //     border: 1px solid #6f85e9;
    //   }
    //   .icon-xiazai17 {
    //     position: absolute;
    //     font-size: 0.4rem;
    //     top: 1.3rem;
    //     right: 0.65rem;
    //   }
    //   .icon-zuojiantou {
    //     position: absolute;
    //     top: 0.3rem;
    //     left: 0.2rem;
    //     font-size: 0.5rem;
    //     color: #fff;
    //   }
    // }
  }
  .focus_content {
    width: 90%;
    margin: auto;
    h3 {
      margin-top: 0.4rem;
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
}
.pagination {
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 0.3rem;
}
</style>