<template>
    <div id="prit-schedule" class="container">
        <h2 class="table-tit">
            2018年成都市总工会在职职工<br/>万人免费技能提升培训课程表
        </h2>
        <table class="top">
            <tr>
                <td class="w20">培训机构：</td>
                <td class="grey" v-if="classObject.User && classObject.User.Type == 1">{{classObject.ConsignTrainingAgency}}</td>
                <td class="grey" v-else>{{classObject.CreateUserName}}</td>
                <td class="w20">工种等级：</td>
                <td class="grey">{{classObject.TrainingType}}、{{classObject.TrainingLevel}}</td>
            </tr>
            <tr>
                <td>班次：</td>
                <td class="grey">{{classObject.Name}}</td>
                <td>开班日期：</td>
                <!-- <td class="grey">{{classObject.CreateDate}}</td> -->
                <td class="grey">{{classObject.allDate}}</td>
            </tr>
        </table>

        <el-table
            :data="scheduleList"
            :span-method="objectSpanMethod"
            border
            style="width: 100%; margin-top: 20px">
            <el-table-column
                prop="Date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="TeachingTime"
                label="授课时间">
            </el-table-column>
            <el-table-column
                prop="TrainingContent"
                label="培训内容">
            </el-table-column>
            <el-table-column
                prop="TeachingStyle"
                label="授课形式">
            </el-table-column>
            <el-table-column
                prop="Teacher"
                label="培训教师">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        props: {
            scheduleList: {
                type: Array,
                required: true
            },
            classObject: {
                type: Object,
                required: true
            }
        },
        data() {
           return {
           }
        },
        methods: {
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            }
        },
        computed: {

        },
        mounted() {
        }
    }
</script>
<style scoped>
    #prit-schedule{
        margin-top: 50px;
        /* width: 994px; */
        padding: 0;
        border: 1px solid #909399;
    }
    #prit-schedule h2.table-tit{
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        color: #909399;
        border: 1px solid #ebeef5;
        border-bottom: 0;
        padding: 20px 0;
        margin-bottom: 0;
    }
    #prit-schedule table.top{
        width:100%;
    }
    #prit-schedule table.top td{
        padding: 12px 15px;
    }
    #prit-schedule table.top td.grey{
        color:#909399;
    }
    #prit-schedule table.top td.w20{
        box-sizing: border-box;
        width: 200px;
    }
    .el-table, >>> th{
        text-align: center;
        margin-top: 0!important;
    }
    .el-table >>> table, .el-table >>> .el-table__empty-block{
        width: initial!important;
    }
    
</style>

