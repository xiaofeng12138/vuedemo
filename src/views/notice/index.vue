<template>
     <div class="focus_content">
            <h3>
              <i class="iconfont icon-yuanquan8"></i>通知公告列表
            </h3>
            <el-table :data="tableData"  border style="width: 100%">
               <el-table-column label="序号" prop="" width="80" align="center">
                  <template slot-scope="scope">
                    <span v-text="(scope.$index)+1"> </span>
                  </template>
              </el-table-column>
              <el-table-column prop="title" label="标题" width="200px"></el-table-column>
              <!-- <el-table-column prop="NAME" label="展商名称"  width="150px"></el-table-column> -->
              <el-table-column prop="content" label="内容" width="300px"></el-table-column>
              <el-table-column prop="userid"  label="发布人" width="100px" ></el-table-column>
              <el-table-column prop="" label="状态" width="100px">
                <template  slot-scope="scope">
                    <span v-if="scope.row.status == 0">有效</span>
                    <span v-else>无效</span>
                 </template>
              </el-table-column>
              <el-table-column prop="recUpdDt" label="发布日期" width="100px"></el-table-column>
               <el-table-column prop="" label="阅读状态" width="100px">
                <template  slot-scope="scope">
                    <span v-if="scope.row.readStatus == 0">未读</span>
                    <span v-else>已读</span>
                 </template>
              </el-table-column>
              <el-table-column  label="操作" width="100px">
                  <template  slot-scope="scope">
                     <el-button type='primary' :disabled ="scope.row.readStatus == 1" size="mini" @click="edit(scope.row)">已读</el-button>
                  </template>
              </el-table-column>
            </el-table>
          </div>
</template>

<script>
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";

export default {
    data() {
        return {
            tableData:[],
        }
    },
    
    methods: {
        queryNoticeList(){
            publicInter(interfaceUrl.queryNoticeByUser,{}).then(res=>{
                console.log(res)
                this.tableData = res.list
            })
        },
        edit(data){
            let requsetData ={
                noticeid:data.uuid
            }
            publicInter(interfaceUrl.addNoticeRead,requsetData).then(res=>{
                console.log(res)
                if(res>0){
                  this.$message.success('阅读成功')
                  this.queryNoticeList()
                }
            })
        }
    },

    mounted() {
        this.queryNoticeList()
    },
}
</script>
<style lang="scss" scoped>
  .focus_content {
    width: 90%;
    margin: auto;
    h3 {
      margin-top: 0.4rem;
      font-size: 0.3rem;
      margin-bottom: 0.4rem;
      i {
        color: #4da1ff;
        font-size: 0.4rem;
        margin-top: 0.1rem;
      }
    }
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
.pagination {
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 0.3rem;
}
</style>


