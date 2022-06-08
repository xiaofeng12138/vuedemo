<template>
    <div class="consultres">
        <div v-if =' zxList.length == 0' class="noInfo">暂无咨询信息</div>
       <div v-else class="myAnswerBox" @click="showDetail(index)" v-for ="(item,index) in zxList"  :key='index'>
             <div class="imgHeader">
                <li class="li1">
                    <i class="iconfont icon-location"></i> {{item.boothno}}
                </li>
                <li class="li2">
                    <i class="iconfont icon-yonghuming"></i>{{item.companyname}}
                </li>
             </div>
             <div class="answerDetail">
                {{item.des}}
             </div>
             <div class="answerTime">
                <li>
                   {{item.uptime}}
                </li>
                <li class="lispan">待解答</li>
             </div>
             <div class="showImg">
               <img  v-for="(imgSrc,index) in item.compyPics" :key="index" :src="`${isUrl}/${imgSrc.filepath.replace('/data/file/','').trim()}`" >
            </div>
      </div>
       
</div>
</template>
<script>

import { publicInter } from "../../api/http";
import interfaceUrl from "../../api/interfaceUrl";
import baseURL from '@/util/env.js'

export default {
    data() {
        return {
            zxList:[],
            zxImgList:[],
            isUrl:baseURL
        }
    },
    mounted() {
        this.queryunDealList()
    },
    methods: {
        showDetail(index){
            let uuid = this.zxList[index].uuid;
            this.$router.push({
                name:'consultDetail',
                params:{
                    id:uuid
                }
            })
        },
        queryunDealList(){
             publicInter(interfaceUrl.queryunDealList, {}).then(r => {
                 this.zxList = r;
            })

        },
        timer() {
            return setTimeout(()=>{
              this.queryunDealList()
            },10000)
       } 
    },
}
</script>
<style lang="scss">
.consultres{
    margin-bottom: 1.3rem;
    .noInfo{
        font-size: 0.5rem;
        text-align: center;
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
             display: flex;
             justify-content: space-between;
             margin-bottom: 0.2rem;
            li{
                height: 0.5rem;
                width: 50%;
                text-indent: 0.5rem;
                line-height: 0.5rem;
                font-size: 0.3rem;
            }
            .lispan{
                 width: 30%;
                 border-radius: 0.5rem;
                 background-color: #A6ABB8;
                 color: #CED0D8;
                 float: right;
                 margin-right: 0.2rem;
            }
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


