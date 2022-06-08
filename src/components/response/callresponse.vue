<template>


  <div class="wrapBox">
      <div class="resSearch">
       
    <el-select v-model="select" slot="prepend" placeholder="请选择展馆">
      <el-option label="全部" value=""></el-option>
      <el-option label="1.1" value="1.1"></el-option>
      <el-option label="1.2" value="1.1"></el-option>
      <el-option label="2.1" value="2.1"></el-option>
      <el-option label="2.2" value="2.1"></el-option>
      <el-option label="3" value="3"></el-option>
      <el-option label="4.1" value="4.1"></el-option>
      <el-option label="5.1" value="5.1"></el-option>
      <el-option label="5.2" value="5.2"></el-option>
      <el-option label="6.1" value="6.1"></el-option>
      <el-option label="6.2" value="6.2"></el-option>
      <el-option label="7.1" value="7.1"></el-option>
      <el-option label="7.2" value="7.2"></el-option>
      <el-option label="8.1" value="8.1"></el-option>
      <el-option label="8.2" value="8.2"></el-option>
      <el-option label="北厅" value="NH"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="queryInfo"></el-button>
 </div>

    <div class="callBox">
          <el-table
            :data="callDate"
            border
            style="width: 100%">
            <el-table-column
            prop="boothno"
            label="展位号"
            width="100">
            </el-table-column>
            <el-table-column
            prop="companyname"
            label="展商名称"
            width="200">
            </el-table-column>
            <el-table-column
            prop="callTimes"
            label="呼叫时间"
            width="200">
            </el-table-column>
             <el-table-column
             label="操作"
             width="100">
             <template slot-scope="scope">
                <el-button type="primary" size="small" @click="deleteRow(scope.$index, callDate)">响应</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</div>
</template>
<script>
import { publicInter } from "../../api/http";
import interfaceUrl from "../../api/interfaceUrl";

export default {
    data() {
        return {
            callDate:[],
            select:'',
        }
    },
    mounted() {
        this.queryCallInfo()
    },
    methods: {

        deleteRow(index, rows) {
          let uuid = rows[index].uuid
          let data = {
              uuid
          }
          publicInter(interfaceUrl.respCall, data).then(res => {
            //console.log(res)
            this.$message.success(res.message)
            setTimeout(() => {
                this.$router.push('/my')
            }, 1500);
      });

      },
      queryCallInfo(){
        publicInter(interfaceUrl.unDealList, {}).then(res => {
            console.log(res)
           this.callDate = res
        });
      },
      queryInfo(){
          let data ={
              ehNo:this.select
          }
           publicInter(interfaceUrl.unDealList, data).then(res => {
            console.log(res)
            this.callDate = res
        });
      }
    },
}
</script>
<style lang="scss">
 .wrapBox{
     .resSearch{
         margin: auto;
         text-align: center;
         margin-bottom: 0.5rem;
     }


 }
</style>


