<template>
  <div class="zwxq">
    <div class="header">
      <p>{{ this.$route.query.id}}馆</p>
      <div class="header_search">
        <i class="iconfont icon-zuojiantou" @click="goback"></i>
      </div>
    </div>
    <div class="search">
      <el-autocomplete
          class="autoip"
          v-model="state4"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入展位号"
          @select="handleSelect"
        >
        <el-button slot="append" icon="el-icon-search" @click="infoSearch"></el-button>
        </el-autocomplete>
    
    </div>
    <div class="distribution">
      <div class="legend">
       <li>
         <span class="cold"></span>
         冷链展位
       </li>
       <li>
         <span class="risk"></span>
         高风险展位
       </li>
       <li>
          <span class="notice"></span>
           重点关注展位
       </li>
       <li>
         <span class="entry"></span>
           暂进展位
       </li>
       <li>
         <span class="normal"></span>
           普通展位
       </li>
      </div>
      <div class="layoutwrap">
          <div class="layoutt">
             <div class="riskk" v-if="this.ZWall.list1.length >0" >
                <h3>冷链展位</h3>
                <ul>
                    <li class="clodlist" v-for="(item,index) in ZWall.list1"  @click="dangjump" :key="index">{{item.PLACEPOSITION}}</li>
                </ul>
            </div>
            <div class="riskk"  v-if="ZWall.list2.length >0">
                <h3>高风险展位</h3>
                <ul>
                    <li class="risklist" v-for="(item,index) in ZWall.list2"  @click="dangjump" :key="index">{{item.PLACEPOSITION}}
                      <el-badge class="mark" :value= item.FROMTYPE />
                    </li>
                </ul>
            </div>
            <div class="riskk"  v-if="ZWall.list3.length >0">
                <h3>重点关注展位</h3>
                <ul>
                    <li class="noticelist" v-for="(item,index) in ZWall.list3"  @click="dangjump" :key="index">{{item.PLACEPOSITION}}
                    </li>
                </ul>
            </div>
             <div class="riskk"  v-if="ZWall.list4.length >0">
                <h3>暂进展位</h3>
                <ul>
                    <li class="entrylist" v-for="(item,index) in ZWall.list4"  @click="dangjump" :key="index">{{item.PLACEPOSITION}}
                      <el-badge class="mark" :value= item.FROMTYPE />
                    </li>
                </ul>
            </div>
            <div class="normal">
                <h3>普通展位</h3>
                <ul>
                    <li v-for="(item,index) in normalList"  @click="jump" :key="index">{{item.PLACEPOSITION}}</li>
                </ul>
            </div>
       </div>
      </div>
    </div>
  </div>
</template>
<script>
import getCookie from "@/util/getcookie";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import store from '@/store/store'

export default {
  data() {
    return {
      ZWall:{
        list1:[],
        list2:[],
        list3:[],
        list4:[],
        list5:[],
      }, //展位类型集合
      //循环显示
      listA:[],
      listB:[],
      listC:[],
      zmhList:[],
      qtList:[],
      //展位搜索
      state4:'',
      zwh:[],
      iptzwh:[],
      normalList:[],
    };
  },
  computed: {
  },

  created() {
    store.commit('Zsinfo/SET_EXHILIST',this.$route.query.id)
    this.queryInfo();
    this.queryDangous();
  },

  

  // mounted() {
   
  // },
  methods: {
    queryDangous(){
       let data = {
        boothLike:this.$route.query.id
      };
      publicInter(interfaceUrl.queryExhibitionNo, data).then(res => {
        console.log(res)
        this.ZWall = res
        this.normalList = res.listArea
      });
    },
    //点击跳转
   infoSearch(){
      let result = this.state4;
      let arr =[];
      for(let i = 0;i<this.zwh.length;i++){
          this.iptzwh.push(this.zwh[i].value)
      }
     if(!result){
       this.$message.warning('展位号不能为空')
       return
     }else if(this.iptzwh.indexOf(result) != '-1'){
        store.commit('Zsinfo/SET_BOOTHNUMBER',result)
          let s1 = result.split(/[A-N]/)[0] //获取展馆号
          store.commit('Zsinfo/SET_EXHILIST',s1)
            this.$router.push({
                  name: "zwxx",
                  params: { zwh: result }
                });
            }else{
              this.$message.error('请输入正确的展位号')
            }
   },

  
  //联想代码 
    querySearchAsync(queryString, cb) {
        var restaurants = this.zwh;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000 * Math.random());
      },

      createStateFilter(queryString) {
          return (zwh) => {
            return (zwh.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      handleSelect(item) {
      },

  
    queryInfo(){
      let data = {
        hallNo: this.$route.query.id
      }
       publicInter(interfaceUrl.qryExpoAreaByHallno, data).then((res)=>{
         let arrA = res.listA.slice(0,12)
         this.qtList = res.listOther.slice(0,12)
         this.zmhList = res.listCert
         this.zwh =[];
          for(let i=0;i<res.list.length;i++){
            this.zwh.push({'value':res.list[i].PLACEPOSITION})
          }
       })
    },
    goback() {
      this.$router.go(-1);
    },
    jump(e){
      let value = e.target.innerHTML;
      store.commit('Zsinfo/SET_BOOTHNUMBER',value)
      this.$router.push({ name: "zwxx", params: { zwh: value} });
    },
    dangjump(e){
      let value = e.target.innerText.trim().split(/\s+/)[0]
      store.commit('Zsinfo/SET_BOOTHNUMBER',value)
      this.$router.push({ name: "zwxx", params: { zwh: value} });
    }
  }
};
</script>
<style lang='scss'>
.zwxq {
  width: 100%;
  background: linear-gradient(to right, #030e3c, #050f3a);
  height:100%;
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
        top: 0.3rem;
        left: 0.2rem;
        font-size: 0.7rem;
        color: #8d919a;
      }
    }
  }
  .search{
    position: relative;
    width: 100%;
    height: 0.5rem;
    .el-autocomplete{
      position: absolute;
      top:-0.3rem;
      left: 0.3rem;
    }
    .el-input{
      width: 6rem;
      margin-left: 0.5rem;
      margin-top: -2rem;
    }
  }

  .distribution {
    width: 85%;
    margin: auto;
    border-radius: 10px;
    margin-top: 0.5rem;
    height: 100%;
    //展馆分布
    .legend {
      height: 1.2rem;
      width: 100%;
      margin-bottom: 0.2rem;
      li{
        float: left;
        height: 0.5rem;
        width: 30%;
        margin: 0 0.1rem;
        font-size: 0.15rem;
        display: flex;
        color: #fff;
        font-weight: bold;
        margin-bottom: 0.2rem;
         span{
            display: block;
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.1rem;
         }
         .cold{
             background-color: #FF2F2F;
         }
         .risk{
             background-color: #FF7420;
         }
         .notice{
             background-color: #FDFF2F;
             
         }
         .entry{
            background-color: #4ADB5C;
         }
         .normal{
           background-color: #0F235A;
         }
      }
    }
    .layoutwrap{
       width: 100%;
       padding-bottom: 0.5rem;
     .layoutt{
       box-shadow: 0 0 10px #1e5be9;
       border-radius: 0.2rem;
      .riskk{
        width: 100%;
        padding-left: 0.1rem;
        h3{
          font-size: 0.3rem;
          text-align: center;
          color: #fff;
          padding-top: 0.2rem;
        }
       ul {
          li {
            display: inline-block;
            width: 1.3rem;
            height: 1.3rem;
            margin-left: 0.2rem;
            background-color: #EE414E;
            border: 1px solid #1e5be9;
            font-size: 0.2rem;
            text-align: center;
            line-height: 1.3rem;
            color: #fff;
            cursor: pointer;
          }
          .dangerous {
            background-color: #3a1d3a;
            border: 1px solid #ee414e;
          }
          .clodlist{
             background-color: #FF2F2F;
          }
          .risklist{
             background-color: #FF7420;
          }
          .noticelist{
             background-color: #FDFF2F;
             color: #000;
          }
          .entrylist{
              background-color: #4ADB5C;
              color: #000;
          }
        }
      }
       .normal{
        width: 100%;
        padding-left: 0.1rem;
        padding-bottom: 0.2rem;
        h3{
          margin-top: 0.3rem;
          font-size: 0.3rem;
          text-align: center;
          color: #fff;
        }
        ul {
          li {
           display: inline-block;
            width: 1.3rem;
            height: 1.3rem;
            margin-left: 0.2rem;
            background-color: #0f235a;
            border: 1px solid #1e5be9;
            font-size: 0.2rem;
            text-align: center;
            line-height: 1.3rem;
            color: #fff;
            cursor: pointer;
           }
          }
        }
      }
    }
    
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
    }
  }
}
</style>