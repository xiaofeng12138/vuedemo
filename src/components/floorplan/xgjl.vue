<template>
  <div class="bg">
    <div class="xgjl">
      <div class="xgjl_header">
        <h3>
          <i class="iconfont icon-yuanquan8"></i>
          {{zgNumber}}
        </h3>
        <span>{{time}}</span>
      </div>
    </div>
    <div class="xgjl_content">您的工号:{{userName}}</div>
    <div class="btn">
      <el-row>
        <router-link :to="{name:'xgjlb'}">
          <el-button type="primary">巡馆记录表</el-button>
        </router-link>
        <router-link :to="{name:'upload'}">
          <el-button type="primary">图片上传</el-button>
        </router-link>
      </el-row>
      <el-row>
        <el-button type="primary" class="btn3" @click="add">视频上传</el-button>
      </el-row>
      <!-- <router-link :to="{name:'videoupload'}">
          <el-button type="primary">视频上传</el-button>
        </router-link> -->
    </div>
    <div class='xgList'>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="图片采集清单" name="first">
              <div class="imgList">
                <div class="noupload" v-if ="picList.length == 0 ">暂无上传图片</div>
                <div class="imgBox" v-else v-for="(item,index) in picList" :key="index">
                  <!-- <img :src="'data:image/'+item.FILETYPE+';base64,'+item.FILEBASE64" alt /> -->
                  <img :src="item" alt v-preview="item" />
                  <div class="imgzwh">
                    展位号：<span>{{imgZwh[index]}}</span>
                  </div>
                  <div class="imgzwh">
                    巡检员：<span>{{userID[index]}}</span>
                  </div>
                  <div class="imgDes">
                    上传说明：<span>{{imgDesc[index]}}</span>
                  </div>
                  <div class="del">
                    <span @click="delImg(index)">删除图片</span>
                  </div>
                </div>
            </div>
          </el-tab-pane>
        <el-tab-pane label="视频采集清单" name="second">
              <el-table
              :data="videoList"
              @row-click='rowClick2'
              border
              height="250"
              style="width: 100%">
              <el-table-column
                prop="NUM"
                label="序号"
                width="50px">
              </el-table-column>
              <el-table-column
                prop="USERID"
                label="巡馆人"
                width="100px">
              </el-table-column>
              <el-table-column
                prop="UPTIME"
                label="上传时间"
                width="150px"
                >
              </el-table-column>
              <el-table-column
                prop="DESCRIP"
                label="描述"
                width="200px"
                >
              </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="巡馆记录清单" name="three">
              <el-table
              :data="LogSheet"
              @row-click='rowClick'
              border
              height="250"
              style="width: 100%">
              <el-table-column
                prop="serial"
                label="序号"
                width="60%">
              </el-table-column>
              <el-table-column
                prop="RECODE_USER"
                label="巡馆人"
                 width="90%"
                >
              </el-table-column>
              <el-table-column
                prop="RECODE_TIME"
                label="巡馆时间"
                >
              </el-table-column>
            </el-table>
        </el-tab-pane>
       </el-tabs>
    </div>
    <el-dialog
        :visible.sync="dialogVisible"
        width="90%"
        >
        <div class="jlb">
      <table border="1" cellspacing="0" cellpadding="0">
        <thead>
          <colgroup>
            <col width="33.3%" />
            <col width="33.3%" />
            <col width="33.3%" />
          </colgroup>
          <tr>
            <th rowspan="2">核查内容</th>
            <th colspan="2">核查情况记录</th>
          </tr>
          <tr>
            <th>是否存在问题</th>
            <th>问题记录</th>
          </tr>
        </thead>
        <tbody class="cruise">
          <tr>
            <td>（一）展览品是否符合禁止清单、限制清单的要求。</td>
            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="a" value="0" />
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="a" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>（二）展览品是否有擅自移出展馆、违规销售等情况。</td>
            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="b" value="0" />
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="b" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>（三）展览品是否有未经批准的试用、品尝、馈赠等情况。</td>

            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="c" value="0" />
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="c" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>（四）展览品中是否存在非法出版物、印刷品、音像制品等违禁品。</td>
            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="d" value="0" />
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="d" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>（五）展览品中是否存在未经海关审批入境的动植物及其产品、动植物源性食品、特殊物品。</td>
            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="e" value="0" />
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="e" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>（六）未获检疫准入的动植物产品是否与其它参展动植物产品相对隔离，是否做好每日消耗核销记录。</td>

            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="f" value="0" />
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="f" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>（七）特殊物品包装是否安全无破损，存在生物安全风险的特殊物品是否具有生物危害标识并具备相关生物安全控制条件。</td>

            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="g" value="0" />
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="g" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>

          <tr>
            <td>
              <span>（八）动植物及其产品、动植物源性食品废弃物是否按海关要求进行收集和处理。</span>
            </td>
            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="h" value="0" />
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="h" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>
              <span>（九）是否发现动植物疫情疫病。</span>
            </td>
            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="i" value="0" />
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="i" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
          <tr>
            <td>
              <span>（十）是否存在其他不符合海关规定的情况。</span>
            </td>
            <td class="radioGroup">
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="j" value="0" />
                <span></span>正常
              </label>
              <label class="radio">
                <input record-data="IS_PRRBLEM" type="radio" name="j" value="1" />
                <span></span>异常
              </label>
            </td>
            <td>
              <input type="text" record-data="PROBLEM_RECODE" class="ipt" />
            </td>
          </tr>
        </tbody>
      </table>
     </div>
    </el-dialog>

    <el-dialog
        :visible.sync="dialogVisible1"
        width="90%"
        >
      <video 
      :src="videoSrc"
      controls
      autoplay
      muted
      class="showVideo"
      width="280px"
      height="400px"
       >
       </video>
    </el-dialog>
  </div>
</template>
<script>
import { publicInter } from "../../api/http";
import interfaceUrl from "../../api/interfaceUrl";
import baseURL from '@/util/env.js'
import store from '@/store/store'

export default {
  data() {
    return {
      urlPath:baseURL,
      //视频展示部分
      zgNumber:store.getters['Zsinfo/BoothNumber'],
      userName:store.getters['Login/userName'],
      videoList:[],
      dialogVisible1:false,
      videoSrc:"",
      //弹出框部分
       dialogVisible: false,
       infoList:'',
    //list表格部分
    LogSheet: [],
       activeName: 'first',
       //图片部分
        picList:[],
        imgId: [],
        imgZwh:[],
        imgDesc:[],
        userID:[],

      time:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
      exhibitorList: ""
    };
  },


  mounted() {
    this.ImgUpload();
    this.queryList();
    this.queryVideo()
  },
  methods: {
    test(){
       window.location.href = baseURL+'/video/video_20191012091109.mp4'
    },
    //视频查看
    rowClick2(row, event, column){
      console.log(row)
      this.dialogVisible1 = true
      this.videoSrc = this.urlPath +'/'+ row.FILEPATH.replace('/data/file/','').trim()
      console.log(this.videoSrc)
    },
    //视频查询记录
    queryVideo(){
      let data = {
         page:1,
         pageSize:500,
         zwh:store.getters['Zsinfo/BoothNumber']
      }
      publicInter(interfaceUrl.queryVideoByZwh, data).then(res => {
        console.log(res)
        this.videoList = res.list
      })
    },


    //记录表查询
     queryList() {
      let data = {
        zwh:store.getters['Zsinfo/BoothNumber']
      };
      publicInter(interfaceUrl.qryPatrolRecodeByExhibitor, data).then(res => {
        this.LogSheet = res.result
      })
    },
  
  rowClick(	row, event, column){
    this.dialogVisible = true
     let data = {
        zwh:store.getters['Zsinfo/BoothNumber']
      };
    publicInter(interfaceUrl.qryPatrolRecodeByExhibitor, data).then(res => {
        this.LogSheet = res.result
        this.infoList = res.result[row.serial - 1].list
        let num = this.infoList.length;
        let index = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
        ];
        for (let i = 0; i < num; i++) {
          this.$jq(
            "input[name=" +
              index[i] +
              "]" +
              "[value=" +
              this.infoList[i].IS_PROBLEM +
              "]"
          ).attr("checked", true);
          this.$jq(".cruise tr")
            .eq(i)
            .children("td")
            .eq(2)
            .children("input")
            .val(this.infoList[i].PROBLEM_RECODE);
        }
      })
  },

     handleClick(tab, event) {
        //console.log(tab, event);
      },

    //图片上传
    ImgUpload() {
          let data = {
            pageSize:500,
            page: 1,
            zwh:store.getters['Zsinfo/BoothNumber']
          };
          publicInter(interfaceUrl.queryImageFiles, data).then(res => {
            res.list.forEach(item => {
              item.src =
                "data:image/" + item.FILETYPE + ";base64," + item.FILEBASE64;
              item.id = item.ATTACHMENT_UUID;
              item.zwh = item.ZWH;
              item.userId = item.USERID;
              item.desc = item.DESCRIP;
              this.picList.push(item.src);
              this.imgId.push(item.ID);
              this.imgZwh.push(item.zwh);
              this.imgDesc.push(item.desc)
              this.userID.push(item.userId)
            });
          });
       },

        //用户删除图片的函数
    delImg(index) {
      this.$confirm('是否确认删除',{
         center: true
      }).then(()=>{
        let data = {
          ATTACHMENT_UUID: this.imgId[index]
        };
         publicInter(interfaceUrl.deleteImageFile, data).then(res => {
        if (res.code == "200") {
          this.$message.success("删除成功");
          this.picList.splice(index,1)
        } else {
          this.$message.error(res.msg);
        }
      })
      }).catch(()=>{
         return 
      })
     },


    add() {
      this.$router.push('/video')
    }
  }
};
</script>
<style lang='scss'>
.bg {
  margin-top: 0.3rem;
  width: 90%;
  margin: auto;
  background-color: #f6f6f8;
  .xgjl {
    width: 100%;
    margin: auto;
    border-radius: 10px;
    .xgjl_header {
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin-top: 0.2rem;
      height: 1rem;
      border-radius: 10px;
      h3 {
        margin-top: 0.2rem;
        font-size: 0.3rem;
        margin-bottom: 0.2rem;
        margin-left: -0.6rem;
        i {
          color: #4da1ff;
          font-size: 0.4rem;
        }
      }
      span {
        display: block;
        font-size: 0.3rem;
        line-height: 1rem;
        margin-right: -0.4rem;
      }
    }
    .xgjl_phone {
      width: 100%;
      height: 3.2rem;
      img {
        width: 100%;
        height: 3.2rem;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
      }
    }
  }
  .xgjl_content {
    font-size: 0.4rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    font-weight: bold;
  }
  .btn {
    .el-row {
      display: flex;
      justify-content: center;
      margin: auto;
      text-align: center;
      button {
        margin: 0 0.3rem;
      }
      .btn3 {
        margin-top: 0.3rem;
        width: 70%;
      }
    }
  }
  .xgList{
    width: 100%;
    margin-top: 0.3rem;
    .el-tabs__content {
      width: 90%;
      margin: auto;
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
    .el-tabs__nav {
      width: 100%;
      display: table;
      .el-tabs__active-bar {
        z-index: 0;
      }
      .el-tabs__item {
        display: table-cell;
        font-size: 0.3rem;
        text-align: center;
        border: 1px solid #ccc;
        background-color: #fff;
        padding: 0 0.2rem;
        height: 0.4rem;
      }

      .el-tabs__item.is-active {
        color: #fff;
        background:linear-gradient(to right, #4697fd, #2467f3);
        font-weight: bold;
      }
      .el-tabs__item:hover {
        color: #fff;
        background:linear-gradient(to right, #4697fd, #2467f3);
        font-weight: bold;
      }
      
    }
  }
  .el-dialog__body{
    padding: 0 0 0.1rem 0;
  }
  .jlb {
    width: 90%;
    margin: auto;
    margin-top: 0.3rem;
    table {
      width: 100%;
      td {
        width: 33.333%;
      }
      thead {
        th {
          font-size: 0.3rem;
        }
      }
      tbody {
        font-size: 0.2rem;
        .radioGroup {
          div {
            margin-left: 0.06rem;
          }
        }
        .ipt {
          width: 2.5rem;
          height: 0.7rem;
          outline: none;
          border: none;
          text-indent: 0.3rem;
        }
      }
    }
  }
   .imgList {
    width: 100%;
    height: 100%;
    .noupload{
      font-size: 0.5rem;
      width: 100%;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
    }
    .imgBox {
      margin-top: 0.3rem;
      margin-bottom: 0.2rem;
      border-bottom: 1px solid #ddd;
      img {
        display: block;
        width: 4rem;
        margin: 0 1rem;
      }
      .imgzwh{
        margin-top: 0.2rem;
        font-size: 0.3rem;
        margin-left: 0.6rem;
        color:#606266;
        span{
          color:#000;
        }
      }
      .imgDes{
        font-size: 0.3rem;
        margin-top: 0.2rem;
        padding-left: 0.6rem;
        padding-right:0.6rem;
        color:#606266;
        span{
          color:#000;
        }
      }
      .del {
        height: 0.6rem;
        width: 100%;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        span {
          display: block;
          width: 2rem;
          height: 100%;
          font-size: 0.3rem;
          background-color: #409eff;
          text-align: center;
          line-height: 0.6rem;
          border-radius: 0.1rem;
          margin: 0 auto;
          color: #fff;
        }
      }
    }
   }
   .showVideo{
     margin-top: 0.5rem;
     margin-left: 0.4rem;
   }
}
</style>