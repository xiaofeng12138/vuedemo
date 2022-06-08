<template>
  <div class="index">
    <div class="header">
      <i class="iconfont icon-yonghu1" @click="login"></i>
      <p>首页</p>
    </div>
    <div class="unread" v-if="readNum"> 
      您有 <strong>{{readNum}}</strong> 条未读新通知，请去处理
        <el-button type="primary" style="height:0.2rem;line-height:0.1rem" @click="godetail">查看详情</el-button>
    </div>
    <div class="nav">
      <div class="block">
        <img src="../../../static/zwt/indexLogo2.png" alt="">
      </div>
    </div>
    <div class="information" > 
       <h2>展馆介绍</h2>
        <div id='info_body' style="display:flex">
          <ul>
              <li v-for="(item,index) in imgType" :key="index" @click="changeFn(index)" :class="{colorChange:item.isActive}" >
                <img :src= item.imgUrl  alt="">
                <p>{{item.desc}}</p>
              </li>
          </ul>
         
      </div>
    </div>
    <div class="showType">
      <div class="st_left">
        <img src="../../../static/zgt/map20201015.jpg" alt=""> 
      </div>
      <div class="st_right">
        <h2>展品类型:</h2>
        <ul>
          <li v-for= "(item,index) in typeList" :key="index">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ax from "@/api/axios";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import baseURL from '@/util/env.js'
import store from '@/store/store.js'

export default {
  data() {
    return {
      readNum:0,
      typeList:[],
      typeListAll:[
        ['饮料酒类', '休闲食品','蔬菜农产品','有机食品','乳制品','综合食品'],
        ['汽车零部件','汽车配套','新能源汽车','智能汽车','自动驾驶','智能出行'],
        ['工业自动化', '数据信息化','高端机械','工业产成品','节能环保'],
        ['美妆日化品', '家居用品','智能生活','母婴用品','户外休闲','时尚潮流'],
        ['医疗器械', '健康护理','医疗美容','医疗旅行','医疗技术','医疗服务'],
        ['物流服务', '信息服务','综合服务','文化服务','教育服务','旅游服务'],
       
      ],
      app_height: `${window.screen.availHeight-255}px`,
      imgType:[
        {
          imgUrl:require('./img/food.jpg'),
          desc:'食品农产品',
          isActive:true
        },
        {
          imgUrl:require('./img/automobile.jpg'),
          desc:'汽车',
          isActive:false
        },
        {
          imgUrl:require('./img/technology-cn.jpg'),
          desc:'技术装备',
          isActive:false
        },
         {
          imgUrl:require('./img/consumer.jpg'),
          desc:'消费品展区',
           isActive:false
        },
        {
          imgUrl:require('./img/medicine.jpg'),
          desc:'医疗器械',
           isActive:false
        },
        {
          imgUrl:require('./img/trade.jpg'),
          desc:'服务贸易',
          isActive:false
        },
      ],
    };
  },
  mounted() {
    this.changeFn(0)
    this.queryList()
  },
  methods: {
    godetail(){
      this.$router.push('my')
    },
    queryList(){
        publicInter(interfaceUrl.queryNoticeByUser,{}).then(res=>{
                let readNum = 0
                let newArr = res.list.forEach((item)=>{
                    if(item.readStatus == 0){
                       readNum++
                    }
                })
                this.readNum = readNum
            })
    },
    login() {
      if (store.getters['Login/token']) {
        this.$router.push("/islogin");
      } else {
        this.$router.push("/login");
      }
    },
    changeFn(index){
      this.imgType.forEach((item,val)=>{
       if(index == val){
         item.isActive = true
       }else{
          item.isActive = false
       }
      })
      this.typeList = this.typeListAll[index]
    }
  }
};
</script>
<style lang="scss">
.index {
  .header {
    position: relative;
    position: sticky;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.3rem;
    background-color: #fff;
    z-index: 999;
    p {
      font-size: 0.35rem;
      text-align: center;
      line-height: 1.3rem;
      font-weight: bold;
    }
    i {
      position: absolute;
      top: 0.4rem;
      left: 0.4rem;
      font-size: 0.5rem;
    }
  }
  .unread{
    position: relative;
    top: 1.4rem;
    left: 0;
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    padding-left: 0.2rem;
    font-size: 0.3rem;
    border: 2px solid #0B68EE;
    margin-bottom:1rem;
    button{
      position: absolute;
      right: 0;
      top: 0.03rem;
    }
  }
  .nav {
    width: 100%;
    height: 3.55rem;
    background-color: #d8d8d8;
    margin-top: 1.45rem;
    .block {
      height: 3.55rem;
      img{
        width: 100%;
        height: 3.55rem;
      }
    }
  }
  .information {
    margin-top: 0.2rem;
    width: 100%;
    background-color: #F6F6F8;
    overflow: hidden;
     white-space: nowrap;
     h2{
       font-size: 0.4rem;
       margin-left: 0.2rem;
     }
    #info_body{
      height: 2.25rem;
      width: 100%;
      margin-top: 0.2rem;
      border:1px solid #ccc;
      ul{
        display: flex;
        width: 100%;
        height: 2.2rem;
        li{
          width: 18%;
          height: 2.2rem;
          background-color: #fff;
          p{
            font-size: 0.15rem;
            text-align: center;
            margin-top: 0.2rem;
          }
          img{
            display: block;
            margin:auto;
            margin-top: 0.2rem;
          }
        }
        .colorChange {
              background-color: #0099FC;
            }
       }
    }
  }

  .showType{
    margin-top: 0.2rem;
    margin-bottom: 1.2rem;
    display: flex;
    width: 100%;
    .st_left{
      width: 60%;
      height: 5rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .st_right{
      width: 40%;
      height: 5rem;
      h2{
        font-size: 0.3rem;
        margin-top: 0.2rem;
        margin-left: 0.2rem;
     }
     ul{
       li{
         width: 40%;
         height: 0.6rem;
         background-color: #fff;
         margin-top: 0.2rem;
         font-size: 0.15rem;
         line-height: 0.6rem;
         margin-left: 0.15rem;
         margin-right: 0.1rem;
         text-align: center;
         float: left;
         border: 1px solid#eee;
         color: #205093;
         font-weight: bold;
       }
     }
   }
  }
}
</style>

