<template>
  <div class="zwxx">
    <div class="zpxx">
      <h3>
        <i class="iconfont icon-yuanquan8"></i>展商信息
      </h3>
      <div class="search_result" v-for='(item,index) in zsList' :key='index'>
        <ul>
          <li>
            <span class="left">展商名称:</span>
            <span class="right zsName">{{ item.EXPOCOMPANY}}</span>
          </li>
          <li>
            <span class="left">国家:</span>
            <span class="right">{{ item.HQCOUNTRY}}</span>
          </li>
          <li>
            <span class="left">展商ID:</span>
            <span class="right">{{ item.COMPANYID}}</span>
          </li>
          <li>
            <span class="left">展位号:</span>
            <span class="right">{{ item.PLACEPOSITION}}</span>
          </li>
          <li>
            <span class="left">监管方式:</span>
            <span class="right">{{ item.MONITORMETHOD}}</span>
          </li>
           <li>
            <span class="left">承运商:</span>
            <span class="right zsName">{{ item.AGENTNAME}}</span>
          </li>
          <li>
            <span class="left">联系人:</span>
            <span class="right">{{ item.COMPANYCONTACTS}}</span>
          </li>
          <li>
            <span class="left">联系电话:</span>
            <span class="right">{{ item.COMPANYCONTACTSMOBILE}}</span>
          </li>
        </ul>
      </div>
    </div>

     <div class="zsxx">
      <h3>
        <i class="iconfont icon-yuanquan8"></i>展品信息
      </h3>
      <div class="search_result">
           <el-table
           :header-cell-style="{background: '#E4E7EB'}"
            :data="tableData"
            border
            style="width: 100%">
             <el-table-column
              prop="NAME"
              label="展商名称"
              align='center'
              width="100">
            </el-table-column>
            <el-table-column
              prop="FORMID"
              label="报关单号"
              align='center'
              width="100">
            </el-table-column>
            <el-table-column
              prop="ITEM"
              label="品名"
              align='center'
              width="180">
            </el-table-column>
            <el-table-column
              prop="ORIGINAL"
              align='center'
              label="原产地">
            </el-table-column>
            <el-table-column
              prop="ITEM_QTY"
              align='center'
              label="数量">
            </el-table-column>
            <el-table-column
              prop="ITEM_VALUES"
              align='center'
              label="价格">
            </el-table-column>
            <el-table-column
              prop="MONITORMETHOD"
              align='center'
              label="监管方式">
            </el-table-column>
            <el-table-column
              prop="CHECKER"
              align='center'
              label="查验人员">
            </el-table-column>
            <el-table-column
              prop="INS_BEGIN_DATE"
              align='center'
              label="开检日期">
            </el-table-column>
            <el-table-column
              prop="GOODS_EVAL_RESULT"
              align='center'
              label="货物评定">
            </el-table-column>
            <el-table-column
              prop="CONT_QUAR_RESULT"
              align='center'
              label="集装箱检疫结果">
              
            </el-table-column>
            <el-table-column
              prop="WOD_PACK_RES_EVAL"
              align='center'
              label="木质品检疫结果">
            </el-table-column>
          </el-table>
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
      zsList:[],
      zpList:[],
      tableData:[],
    };
  },
  created() {
  },
  mounted() {
    this.queryInfo()
   
  },
  methods: {
    queryInfo() {
        let data = {
        boothno: store.getters['Zsinfo/BoothNumber']
      };
      publicInter(interfaceUrl.qryExhibitorListByBoothNo, data).then(res => {
        console.log(res)
        this.zsList = res.data
        this.tableData = res.data2
         store.commit('Zsinfo/SET_COMPANYID',res.data[0].COMPANYID)
      });
    }, 
  }
};
</script>
<style lang='scss'>
.zwxx {
  width: 90%;
  height: 100%;
  margin: auto;
  margin-bottom: 1rem;
  background-color: #f6f6f8;
  .zsxx {
    width: 100%;
    margin-bottom: 1.5rem;
    h3 {
      margin-top: 0.4rem;
      font-size: 0.3rem;
      margin-bottom: 0.2rem;
      i {
        color: #4da1ff;
        font-size: 0.4rem;
      }
    }
    .zsxx_js {
      width: 90%;
      height: 2rem;
      margin: auto;
      font-size: 0.3rem;
    }
  }
  .zpxx {
    width: 100%;
    h3 {
      margin-top: 0.4rem;
      font-size: 0.3rem;
      margin-bottom: 0.2rem;
      i {
        color: #4da1ff;
        font-size: 0.4rem;
      }
    }
    .search_result {
      width: 90%;
      height: 7rem;
      margin: 0.2rem auto;
      ul {
        li {
          display: flex;
          width: 100%;
          height: 0.8rem;
          margin-bottom: 0.05rem;
          .left {
            width: 30%;
            height: 0.8rem;
            background-color: #8d919a;
            color: #fff;
            font-size: 0.3rem;
            text-align: center;
            line-height: 0.8rem;
          }
          .left1 {
            font-size: 0.2rem;
          }
          .zsName {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .zpName {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .right {
            width: 70%;
            height: 0.8rem;
            background-color: #fff;
            font-size: 0.25rem;
            text-indent: 0.3rem;
            line-height: 0.8rem;
            p {
              color: #1f5ff2;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .cjxx {
    width: 100%;
    margin-top: 0.3rem;
    h3 {
      margin-top: 0.4rem;
      font-size: 0.3rem;
      margin-bottom: 0.2rem;
      i {
        color: #4da1ff;
        font-size: 0.4rem;
      }
    }
    .zsxx_js {
      width: 90%;
      height: 2rem;
      margin: auto;
      font-size: 0.3rem;
      text-indent: 0.4rem;
    }
  }
}
</style>