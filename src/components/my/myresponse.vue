<template>
    <div class="myresponse">
      <div class="nomannge" v-if="myresList.length == 0">暂无响应信息 </div>
       <div class="myBox" v-for = '(item,index) in myresList' :key='index' v-else>
           <div class="my_left">
               <li style="padding-top:0.2rem;">
                  <i class="iconfont icon-location"></i> {{item.boothno}}
               </li>
               <li>
                    <i class="iconfont icon-yonghuming"></i> {{item.companyname}}
               </li>
           </div>
           <div class="my_right">
               <li>{{item.callTimes}}</li>
               <li class="btn"  @click="submitRes(index)" v-if = ' item.status == 1'>上传响应信息</li>
               <li class="btn2" v-else @click="showDetail(index)">已上传</li>
           </div>
       </div>
    </div>
</template>
<script>

import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";

export default {
    data() {
        return {
          myresList:[], 
        }
    },
    mounted() {
        this.myDealList()
    },
    methods: {
        submitRes(index){
            let uuid = this.myresList[index].uuid
            this.$router.push({
                name:'submitres',
                params:{
                    id:uuid
                }
            })
        },
        showDetail(index){
           let uuid = this.myresList[index].uuid
            this.$router.push({
                name:'showdetail',
                params:{
                    id:uuid
                }
            })
        },

       myDealList(){
         publicInter(interfaceUrl.myDealList, {}).then(res => {
             console.log(res)
             this.myresList = res
          });
       }
    },
    
}
</script>
<style lang="scss">
.myresponse{
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
    margin-bottom: 1.2rem;
    
    .myBox{
        display: flex;
        width: 100%;
        height: 2rem;
        margin: auto;
        border: 1px solid #ccc;
        margin-bottom: 0.3rem;
        .my_left{
            width: 60%;
            height: 2rem;
            li{
                font-size: 0.25rem;
                height: 1rem;
                line-height: 0.5rem;
                margin-left: 0.2rem;
                font-weight: bold;
                i{
                    color: #A6ABB8;
                    margin-right: 0.1rem;
                }
            }
        }
        .my_right{
            width: 40%;
            height: 2rem;
            li{
                font-size: 0.2rem;
                height: 1rem;
                line-height: 1rem;
                margin-left: 0.2rem;
            }
            .btn{
               background-color: #1F5FF2;
               border-radius: 0.2rem;
               padding-right: 0.2rem;
               width: 80%;
               height: 0.8rem;
               text-align: center;
               line-height: 0.8rem;
               color: #fff;
               font-weight: bold;
            }
            .btn2{
               background-color: #ccc;
               border-radius: 0.2rem;
               padding-right: 0.2rem;
               width: 80%;
               height: 0.8rem;
               text-align: center;
               line-height: 0.8rem;
               color: #000;
               font-weight: bold;  
            }
        }
    }
    .nomannge{
        font-size: 0.5rem;
        text-align: center
    }

}
</style>

