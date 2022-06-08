<template>
    <div class="myAnswerDetail">
         <div class="header">
            <div class="header_search">
                <i class="iconfont icon-zuojiantou" @click="goback"></i>
            </div>
            <p>查看解答详情</p>
        </div>
        <div class="myAnswerBox">
             <div class="imgHeader">
                <li class="li1">
                    <i class="iconfont icon-location"></i> {{jdxqList.boothno}}
                </li>
                <li class="li2">
                    <i class="iconfont icon-yonghuming"></i>{{jdxqList.companyname}}
                </li>
             </div>
             <div class="answerDetail">
                 {{jdxqList.des}}
             </div>
             <div class="answerTime">
                {{jdxqList.uptime}}
             </div>
              <div class="showImg">
                       <img  v-for="(imgSrc,index) in jdxqList.compyPics" :key="index" :src="`${urlPath}/${imgSrc.filepath.replace('/data/file/','').trim()}`" >
             </div>

              <div class="show">
                    <div class="showTop">
                        <li class="li1">
                            <img src="./icon-gy@2x.png" alt="" >
                        </li>
                        <li class="li2">
                            <p class="p1">{{jdxqList.answerperson}}</p>
                            <p class="p2">{{jdxqList.anstime}}</p>
                        </li>
                    </div>
                    <div class="showContent">
                       {{jdxqList.answerdes}}
                    </div>
                    <div class="showImg">
                        <img  v-for="(imgSrc,index) in jdxqList.seaPics" :key="index" :src="`${urlPath}/${imgSrc.filepath.replace('/data/file/','').trim()}`" >
                    </div>
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
            jdxqList:[],
            hgimgList:[],
            zsimgList:[],
            urlPath:baseURL,
        }
    },
    mounted() {
        this.queryJDInfo()
    },
    
    methods: {
        goback(){
            this.$router.go('-1')
        },
         queryJDInfo(){
              let data = {
                uuid : this.$route.params.id
              }
                publicInter(interfaceUrl.querydetailInfo, data).then(res => {
                console.log(res)
                this.jdxqList = res
            });
             
         }
    },
}
</script>
<style lang="scss">
.myAnswerDetail{
    width: 100%;
    .header {
    display: flex;
    position: relative;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.3rem;
    background-color: #f6f6f8;
    z-index: 999;
    p {
      position: relative;
      width: 100%;
      height: 1.2rem;
      font-size: 0.35rem;
      text-align: center;
      line-height: 1.2rem;
      font-weight: bold;
    }
    .header_search {
      .icon-zuojiantou {
        position: absolute;
        top: 0.3rem;
        left: 0.2rem;
        font-size: 0.7rem;
        color: #8d919a;
        z-index: 999;
      }
    }
  }
    .myAnswerBox{
        width: 90%;
        border: 1px solid #ccc;
        margin:  1.5rem auto;
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
                    margin-top: 0.2rem;
                    margin-left: 0.6rem;
                }

            }
        .show{
        width: 100%;
        border-radius: 0.2rem;
        margin-top: 0.5rem;
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
            .showTop{
                display: flex;
                height: 1rem;
                width: 100%;
                .li1{
                    width: 20%;
                    height: 1rem;
                    margin-left: 0.2rem;
                    img{
                        width: 80%;
                        height: 100%;
                    }
                }
                .li2{
                    width: 80%;
                    height: 1rem;
                    p{
                    padding-top: 0.1rem;
                    font-size: 0.3rem;
                    }
                    .p1{
                    font-weight: bold;
                    }
                }

            }
            .showContent{
                width: 100%;
                font-size: 0.3rem;
                text-indent: 0.5rem;
                padding: 0.2rem;
                line-height: 0.5rem;
            }
            .showImg{
                width: 100%;
                img{
                    width: 3rem;
                    height: 3rem;
                    margin-left: 0.2rem;
                    margin-bottom: 0.2rem;
                }
            }
        }
   }
}
</style>


