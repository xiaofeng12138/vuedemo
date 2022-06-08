<template>
    <div class="myAnswer">
        <div class="noJd" v-if ="jdList.length == 0">暂无解答信息</div>
        <div class="myAnswerBox" v-else  v-for="(item,index) in jdList" :key="index" @click="goZXdetail(index)">
             <div class="imgHeader">
                <li class="li1">
                    <i class="iconfont icon-location"></i> {{item.boothno}}
                </li>
                <li class="li2">
                    <i class="iconfont icon-yonghuming"></i> {{item.companyname}}
                </li>
             </div>
             <div class="answerDetail">
                {{item.des}}
             </div>
             <div class="answerTime">
                {{item.uptime}}

             </div>
             <div class="showImg">
              <img  v-for="(imgSrc,index) in item.compyPics" :key="index" :src="`${urlPath}/${imgSrc.filepath.replace('/data/file/','').trim()}`" >
            </div>
        </div>
    </div>
</template>
<script>

import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import baseURL from '@/util/env.js'

export default {
   data() {
       return {
           jdList:[],
           urlPath:baseURL,
       }
   },
    mounted() {
        this.myDealList()
    },
    methods: { //myDealList
       goZXdetail(index){
          let uuid =  this.jdList[index].uuid
          this.$router.push({
              name:'answerdetail',
              params:{
                  id:uuid
              }
          })
       },
        myDealList(){
            publicInter(interfaceUrl.querymyDealList, {}).then(res => {
                this.jdList = res
            //     for(let i = 0 ;i< this.jdList.seaPics.length;i++){
            //       this.imgListtt.push(this.jdList.seaPics[i].filepath.replace('/data/file/','').trim()) 
            //    }
          });
        }
    },
    
}
</script>
<style lang="scss">
.myAnswer{
    width: 100%;
    margin-bottom: 1.3rem;
    .noJd{
        font-size: 0.5rem;
        text-align: center
    }
    .myAnswerBox{
        width: 100%;
        border: 1px solid #ccc;
        margin-bottom: 0.3rem;
        .imgHeader{
            display: flex;
            width: 100%;
            height: 1rem;
            background-color: #DCE5FB;
                li{
                    font-size: 0.2rem;
                    line-height: 1rem;
                    margin-left: 0.2rem;
                    i{
                        color: #A6ABB8;
                        margin-right: 0.1rem;
                    }
                }
                .li1{
                width: 35%;
                }
                .li2{
                    width: 100%;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
        }
        .answerDetail{
            width: 100%;
            font-size: 0.3rem;
            text-indent: 0.5rem;
            line-height: 0.5rem;
            padding: 0.2rem;
        }
        .answerTime{
          height: 0.5rem;
          width: 100%;
          text-indent: 0.5rem;
          line-height: 0.5rem;
          font-size: 0.3rem;
          margin-bottom: 0.3rem;

        }
         .showImg{
            width: 100%;
            img{
                width: 80%;
                height: 80%;
                margin-left: 0.2rem;
                margin-top: 0.2rem;
                margin-bottom: 0.2rem;
            }

        }
 
    }
}
</style>


