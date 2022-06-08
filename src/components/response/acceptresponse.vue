<template>
    <div class="ttd-record">
        <div class="record">
            <div class="ttd-table">
                <el-table border :header-cell-style="{background: '#8D919A'}" :data="fqwList">
                    <el-table-column 
                    prop="NUM" 
                    label="序号"
                    width="80">
                    </el-table-column>
                    <el-table-column 
                    prop="BOOTHNO" 
                    label="展位号"
                    width="100">
                 </el-table-column>
                 <el-table-column 
                    prop="COMPANYNAME" 
                    label="展商名称"
                    width="180">
                 </el-table-column>
                
                 <el-table-column 
                    prop="APPLYTIME" 
                    label="登记时间"
                    width="180">
                 </el-table-column>
                </el-table>
                 <el-pagination
                    class="pagination"
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="this.tab2Total"
                ></el-pagination>
            </div>

        </div>
    </div>
</template>

<script>

import { publicInter } from "../../api/http";
import interfaceUrl from "../../api/interfaceUrl";

export default {
    data() {
        return {
            tab2Total:0,
            fqwList: []
        }
    },
    mounted() {
        this.qryApplyList(1);
    },
    methods: {
       qryApplyList(page){
          let pageNum = page
          let data={
             pageNum:pageNum,
             pageSize:10
          }
            publicInter(interfaceUrl.qryApplyList, data).then(res => {
                this.fqwList = res.list
                this.tab2Total = res.totalRow;
           });
       },
        handleCurrentChange(page){
            this.qryApplyList(page)
        }
    }
}
</script>

<style lang="scss" scoped>
.ttd-record {
    width: 100%;
    height: 100%;
    background: #E4E7EB;
    .record {
        width: 100%;
        background: #fff;
        margin-top: 5%;
        padding-left: 2%;
        padding-bottom: 2%;
        .date {
            height: 32px;
            line-height: 32px;
            display: flex;
            align-items:center;
            .circle {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #2957E6;
            }
            span {
                font-size: 14px;
                color: #666666;
                opacity: 0.8;
                margin-left: 10px;
            }
        }
        .ttd-table {
            margin-top: 10px;
            margin-right: 5px;
            .p-cn {
                font-size: 12px;
                text-align: center
            }
            .p-en {
                font-size: 8px;
                text-align: center;
            }
        }
    }
}
</style>
