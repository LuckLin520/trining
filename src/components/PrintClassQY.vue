<template>
    <div id="prit-classQY" class="container">
        <h2 class="table-tit">
            2018年成都市总工会在职职工<br/>万人免费技能提升培训开班申请表（企业）
        </h2>
        <div class="table-name">
            <div>企业名称（公章）：<span class="">{{classListQY.User ? classListQY.User.Name : ''}}</span></div>
            <div>班级批次：<span class="">{{classListQY.Name}}</span></div>
        </div>
        <el-table
            :data="[classListQY]"
            border
            style="width: 100%">
            <el-table-column
            prop="ConsignTrainingAgency"
            label="委托培训机构">
            </el-table-column>
            <el-table-column
            prop="TrainingAgencyContacts"
            label="培训单位联系人">
            </el-table-column>
            <el-table-column
            prop="TrainingAgencyContactNumber"
            label="联系电话"
            width="300">
            </el-table-column>
        </el-table>
        <el-table
            :data="[classListQY]"
            border
            style="width: 100%">
            <el-table-column
            prop="ConsignAssessAgency"
            label="委托考核机构">
            </el-table-column>
            <el-table-column
            prop="AssessAgencyContacts"
            label="考核单位联系人">
            </el-table-column>
            <el-table-column
            prop="AssessAgencyContactNumber"
            label="联系电话"
            width="300">
            </el-table-column>
        </el-table>
        <el-table
            :data="[classListQY]"
            border
            style="width: 100%">
            <el-table-column
            prop="TrainingAddress"
            label="培训班地址">
            </el-table-column>
            <el-table-column
            prop="TrainingType"
            label="培训工种">
            </el-table-column>
            <el-table-column
            prop="TrainingLevel"
            label="培训等级"
            width="150">
            </el-table-column>
            <el-table-column
            prop="TrainingPersonNumber"
            label="拟培训人数"
            width="150">
            </el-table-column>
        </el-table>
          <el-table
            :data="[classListQY]"
            border
            style="width: 100%">
            <el-table-column
            prop="allDate"
            label="开班时间">
            </el-table-column>
            <el-table-column
            prop="TrainingDay"
            label="培训期限">
            </el-table-column>
            <el-table-column
            prop="Contacts"
            label="联系人"
            width="150">
            </el-table-column>
            <el-table-column
            prop="ContactNumber"
            label="联系电话"
            width="150">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        props: {
            classListQY: {
                type: Object,
                required: true
            }
        },
        data() {
           return {
           }
        },
        mounted() {
        }
    }
</script>
<style scoped>
    #prit-classQY{
        margin-top: 50px;
        /* width: 994px; */
        padding: 0;
        border: 1px solid #909399;
    }
    #prit-classQY h2.table-tit{
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        color: #909399;
        border: 1px solid #ebeef5;
        border-bottom: 0;
        padding: 20px 0;
        margin-bottom: 0;
    }
    #prit-classQY div.table-name{
        text-align: left;
        font-size: 16px;
        font-weight: 700;
        color: #909399;
        border: 1px solid #ebeef5;
        border-bottom: 0;
        display: flex;
        justify-content: space-between;
    }
    #prit-classQY div.table-name >div{
        flex: 1;
        padding: 20px;
    }
    #prit-classQY div.table-name >div:nth-child(1){
        border-right: 1px solid #ebeef5;
    }
    #prit-classQY div.table-name span{
        font-weight: 500;
        margin-left: 10px;
    }
    .el-table, >>> th{
        text-align: center;
    }
    .el-table >>> table, .el-table >>> .el-table__empty-block{
        width: initial!important;
    }
</style>

