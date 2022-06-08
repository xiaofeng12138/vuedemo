<template>
  <div class="result">
    <div class="header">
      <p>搜索结果</p>
      <div class="header_search">
        <i class="iconfont icon-zuojiantou" @click="goback"></i>
      </div>
    </div>
    <div class="no_result" v-if="searchResultList.length == 0 && searchResultList2.length == 0  && searchResultList3.length == 0 " >无结果</div>
    <div class="search_result"  v-else-if="searchResultList.length > 0 " v-for="(value,index) in searchResultList" :key="index">
      <ul>
        <li>
          <span class="left">展品名称:</span>
          <span class="right">{{value.ITEM}}</span>
        </li>
        <li>
          <span class="left">展位号:</span>
          <span class="right" @click="jump(index)">
            <p class="p">{{value.POSITION}}</p>
          </span>
        </li>
        <li>
          <span class="left">报关单号:</span>
          <span class="right">{{value.FORMID}}</span>
        </li>
        <li>
          <span class="left">原产地:</span>
          <span class="right">{{value.LOAD_PLACE}}</span>
        </li>
      </ul>
    </div>
    <div class="search_result"  v-else-if="searchResultList2.length > 0 " v-for="(value,index) in searchResultList2" :key="index">
      <ul>
        <li>
          <span class="left">展商名称:</span>
          <span class="right zsName">{{value.EXPOCOMPANY}}</span>
        </li>
        <li>
          <span class="left">展商ID:</span>
          <span class="right">{{value.COMPANYID}}</span>
        </li>
        <li>
          <span class="left">展商地区:</span>
          <span class="right">{{value.HQCOUNTRY}}</span>
        </li>
        <li>
          <span class="left">展位号:</span>
          <span class="right">{{value.PLACEPOSITION}}</span>
        </li>
      </ul>
    </div>
    <div class="tabWrap" v-else-if="searchResultList3.length > 0 ">
      <el-table  ref="table" :data="searchResultList3"  border >
            <el-table-column prop="RN" label="序号" align="center"></el-table-column>
            <el-table-column prop="NAME" label="商品名称" width="150" align="center"></el-table-column>
            <el-table-column prop="HSCODE" label="HS编码" width="100" align="center"></el-table-column>
            <el-table-column prop="ORIGINCOUNTRY" label="原产国" align="center"></el-table-column>
            <el-table-column prop="ISLIMIT" label="限用" align="center"></el-table-column>
            <el-table-column prop="ISFORBID" label="禁用" align="center"></el-table-column>

          <el-table-column type="expand"  label="查看规则" width="100">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <span>{{ props.row.CONTENT }}</span>
                </el-form>
              </template>
        </el-table-column>
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
  </div>
</template>
<script>
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";

export default {
  data() {
    return {
      searchResultList:  [],
      searchResultList2: [],
      searchResultList3: [],
      total: 0,
      pageSize: 5,
      currentPage: 1,
      inputValue: "",
      queryUrl:''
    };
  },
  methods: {
        toogleExpand(row) {
   let $table = this.$refs.table;
   this.limitAndForbidList.map((item) => {
     if (row.id != item.id) {
       $table.toggleRowExpansion(item, false)
    }
    })
   $table.toggleRowExpansion(row)
  },
    goback(){
      this.$router.push('/search')
    },
    getData() {
      let tabIndex = this.$route.query.id;
      if(tabIndex == 0){
        this.queryUrl = interfaceUrl.queryMaterialsComplex
      }else if(tabIndex == 1){
         this.queryUrl = interfaceUrl.allExhibitorsData
      }else{
        this.queryUrl = interfaceUrl.qryLimitAndForbidList
      }

      let data = {
        page: this.currentPage,
        pageSize: this.pageSize,
        paramApp: this.inputValue
      };
      let data1 = {
        page: this.currentPage,
        pageSize: this.pageSize,
        expocompany: this.inputValue
      }
      
      console.log(this.queryUrl)

      if(tabIndex == 0){
        console.log(data)
        publicInter(this.queryUrl, data).then(res => {
          
          this.searchResultList = res.data;
          this.total = res.total;
        })
      }else if(tabIndex == 1){
        publicInter(this.queryUrl, data1).then(res => {
          console.log(res)
          this.searchResultList2 = res.datas;
          this.total = res.total;
        })
      }else{
        publicInter(this.queryUrl, data).then(res => {
          this.searchResultList3 = res.result;
          this.total = res.total;
        })
      }
    },
    currentPageChange(currentPage) {
      console.log(this.currentPage)
      this.currentPage = currentPage;
      this.getData();
    },

    //点击展位号跳转到展位详情
    jump(index) {
      let result = document.getElementsByClassName("p")[index].innerHTML;
      var reg = /^[\u4E00-\u9FA5][\u4E00-\u9FA50-9a-zA-Z]{1,39}$/;
      if(reg.test(result)){
        this.$message.warning('未知展位号！')
        return false
      }
      this.$store.commit("BoothNumber", result);
      let str1 = "";
      if (result.match(/[^*]+[A-Z]/)[0].length > 2) {
        str1 = result.match(/[^*]+[A-Z]/)[0].slice(0, 3);
      } else {
        str1 = result.match(/[^*]+[A-Z]/)[0].slice(0, 1);
      }

      this.$store.commit("exhiList", str1);
      this.$router.push({
        name: "zwxx",
        params: { zwh: result }
      });
    }
  },
  mounted() {
    this.inputValue = this.$route.query.inputValue;
    this.getData();
    console.log(this.$route.query.inputValue)
    console.log(this.$route.query.id)
  }
};
</script>
<style lang='scss'>
.result {
  // height: 6rem;
  // background-color: #ccc;
  margin-bottom: 1.1rem;
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
        font-size: 0.7rem;
        color: #8d919a;
      }
    }
  }
  .search_result {
    width: 90%;
    // height: 4.0rem;
    margin: 0.2rem auto 0 auto;
    border: 1px solid;
    ul {
      li {
        display: flex;
        width: 100%;
        .cyName{
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size:0.2rem;
            background-color: #fff;
            font-size: 0.2rem;
           text-indent: 0.3rem;
           width: 80%;
           line-height:0.4rem;
        }
        .zsName{
          overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .left {
          width: 20%;
          height: 0.8rem;
          background-color: #8d919a;
          color: #fff;
          font-size: 0.2rem;
          text-align: center;
          line-height: 0.8rem;
        }
        .red{
          color:red;
        }
        .right {
          width: 78%;
          height: 0.8rem;
          background-color: #fff;
          font-size: 0.2rem;
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
  .tabWrap{
    width: 90%;
    margin: auto;
    margin-top: 0.5rem;
    
  }
  .no_result {
    font-size: 0.6rem;
    text-align: center;
    margin-top: 10%;
  }
  
}
</style>
