<template>
    <div id="prit-student" class="container">
        <h2 class="table-tit">
            2018年成都市总工会在职职工<br/>万人免费技能提升培训学员花名册
        </h2>
        <table class="top">
            <tr>
                <td>培训机构：</td>
                <td class="grey">{{classObject.User ? classObject.User.Name : ''}}</td>
                <td>工种班次：</td>
                <td class="grey">{{classObject.TrainingType}}、{{classObject.Name}}</td>
                <td>开班日期：</td>
                <td class="grey">{{classObject.allDate}}</td>
            </tr>
        </table>

        <el-table
            :data="studentObject.DataList"
            border
            style="width: 100%">
            <el-table-column
                type="index"
                label="序号"
                width="35">
            </el-table-column>
            <el-table-column
                prop="Name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="Sex"
                label="性别">
            </el-table-column>
            <el-table-column
                prop="Nation"
                label="民族">
            </el-table-column>
            <el-table-column
                prop="EducationLevel"
                label="文化程度">
            </el-table-column>
            <el-table-column
                prop="IdCardNo"
                label="身份证号码">
            </el-table-column>
            <el-table-column
                prop="TrainingType"
                label="工种">
            </el-table-column>
            <el-table-column
                prop="Company"
                label="工作单位">
            </el-table-column>
            <el-table-column
                prop="ContactNumber"
                label="联系电话">
            </el-table-column>
            <el-table-column
                prop="CertificateType"
                label="证书类型">
            </el-table-column>
            <el-table-column
                prop="OriginalTechnologyLevel"
                label="原技术等级">
            </el-table-column>
            <el-table-column
                prop="TrainingLevel"
                label="培训等级">
            </el-table-column>
            <el-table-column
                prop="CertificateNumber"
                label="证书编号">
            </el-table-column>
            <el-table-column
                prop="Address"
                label="家庭住址">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        props: {
            studentObject: {
                type: Object,
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
        }
    }
</script>
<style scoped>
    #prit-student{
        margin-top: 50px;
        /* width: 994px; */
        padding: 0;
        border: 1px solid #909399;
    }
    #prit-student h2.table-tit{
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        color: #909399;
        border: 1px solid #ebeef5;
        border-bottom: 0;
        padding: 20px 0;
        margin-bottom: 0;
    }
    #prit-student table.top{
        width:100%;
    }
    #prit-student table.top td{
        padding: 12px 15px;
    }
    #prit-student table.top td.grey{
        color:#909399;
    }
    #prit-student table.top td:nth-child(2n-1){
        width: 115px;
    }
    .el-table >>> table, .el-table >>> .el-table__empty-block{
        width: initial!important;
    }
    .el-table >>> th, .el-table >>> td{
        text-align: center;
        box-sizing: border-box;
        padding: 3px 0;
    }
    .el-table >>> th .cell, .el-table >>> td .cell{
        padding:0 5px;
    }

</style>

