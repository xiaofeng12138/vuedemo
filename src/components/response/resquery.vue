<template>
    <div class="ttd-record">
        <div class="record">
            <div class="ttd-table">
                <el-table border :header-cell-style="{background: '#8D919A'}" :data="data">
                    <el-table-column 
                    prop="RN" 
                    label="序号"
                    width="80">
                    </el-table-column>
                    <el-table-column 
                    prop="POSITION" 
                    label="展位号"
                    width="100">
                 </el-table-column>
                 <el-table-column 
                    prop="EXHIBITORNAME" 
                    label="展商名称"
                    width="180">
                 </el-table-column>
                
                 <el-table-column 
                    prop="EXHIBITSNAME" 
                    label="展品名称"
                    width="180">
                 </el-table-column>
                  <el-table-column 
                    prop="REC_UPD_DT" 
                    label="提交时间"
                    width="180">
                 </el-table-column>
                    <el-table-column 
                     prop="ORIGIN"
                     label="原产国"
                     width="125">
                    </el-table-column>
                    <el-table-column prop="index" width="240"  label="消耗方式">
                        <template slot-scope="scope">
                            <el-checkbox-group v-model="scope.row.checkList">
                                <el-checkbox label="试用" disabled></el-checkbox>
                                <el-checkbox label="品尝" disabled></el-checkbox>
                                <el-checkbox label="散发" disabled></el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </el-table-column>
                    <el-table-column prop="AMOUNT" width="160">
                        <template slot="header" slot-scope="slot">
                            <p class="p-cn">消耗数量</p>
                        </template>
                    </el-table-column>
                </el-table>
                 <el-pagination
                    class="pagination"
                    :page-size="10"
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
            checkList: ['试用'],
            data: []
        }
    },
    mounted() {
        this.queryTryOutRecord(1);
    },
    methods: {

        //queryTryOutRecord
         go(){
            this.$router.go('-1')
        },
        renderHeader(h, cnName, enName) {
            return [h('p', {}, ['序号']),h('p', {}, ['number'])]
        },

        queryTryOutRecord(page) {
            let data = {
                pageNum: page,
                pageSize: 10
            };
            publicInter(interfaceUrl.queryTryOutRecord, data).then(r => {
                console.log(r)
             if(r.code == '200') {
                this.data = r.list;
                this.tab2Total = r.totalRow;
                for(let i = 0; i < this.data.length; i++) {
                    let checkList = [];
                    checkList.push(this.data[i].ISTYROUT == '1' ? '试用' : '');
                    checkList.push(this.data[i].ISDEGUSTATION == '1' ? '品尝' : '');
                    checkList.push(this.data[i].ISDISTRIBUTION == '1' ? '散发' : '');
                    this.data[i].checkList = checkList;
                }
            }
          })
        },
        handleCurrentChange(page){
            this.queryTryOutRecord(page)
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
