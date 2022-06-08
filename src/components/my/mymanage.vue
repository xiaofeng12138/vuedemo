<template>
    <div class="myAnswer">
        <div class="nomannge" v-if="myfqwList.length == 0">暂无受理信息 </div>

        <div v-else class="myAnswerBox" v-for = "(item,index) in myfqwList" :key='index'>
             <div class="imgHeader">
                <li class="li1">
                    <i class="iconfont icon-location"></i> {{item.BOOTHNO}}
                </li>
                <li class="li2">
                    <i class="iconfont icon-yonghuming"></i> {{item.COMPANYNAME}}
                </li>
             </div>
             <div class="answerDetail">
                {{item.DEALDES}}
             </div>
             <div class="answerTime">
                {{item.DEALTIME}}
             </div>
              <div class="rlist_img" v-if="item.files.length > 0">
                    <img style="margin-left: 10px" v-for="(imgSrc,index) in item.files" :key="index" :src="`${baseURL}/video/${imgSrc}`" alt="">
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
            myfqwList:[]
        }
    },
    mounted() {
        this.qryWasteDealList()
    },
    methods: {
        qryWasteDealList(){
            let data = {
                pageSzie:500,
                pageNum:1
            }
             publicInter(interfaceUrl.qryWasteDealList, data).then(res => {
                 
                 this.myfqwList = res.list
                 for(let i = 0; i < this.myfqwList.length; i++) {
                  this.myfqwList[i].files = this.myfqwList[i].FILENAME.split(',')
            }
            });
        }
    },
    
}
</script>
<style lang="scss">
.myAnswer{
    width: 100%;
    margin-bottom: 1.3rem;
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
        .rlist_img{
                margin-top: 0.2rem;
                margin-bottom: 0.3rem;
                img{
                    width: 2rem;
                    height: 2rem;
                }
            }
    }
    .nomannge{
        font-size: 0.5rem;
        text-align: center
    }
}
</style>


