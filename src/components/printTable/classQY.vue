<template>
    <div id="classQy" class="container">
        <table width="100%" class="top">
        	<tr>
        		<td colspan="4"><h3>2018年成都市总工会在职职工<br/>万人免费技能提升培训开班申请表（企业）</h3></td>
        	</tr>
        	<tr class="con">
        		<td class="attr">企业名称（公章）：</td>
        		<td><span>{{classListQY.User ? classListQY.User.Name : ''}}</span></td>
        		<td class="attr">班级批次：</td>
        		<td><span>{{classListQY.Name}}</span></td>
        	</tr>
        </table>
        <table width="100%" class="mid">
        	<tr class="con">
        		<td >委托培训机构</td>
        		<td>培训单位联系人</td>
        		<td>联系电话</td>
        	</tr>
        	<tr class="con">
        		<td>{{classListQY.ConsignTrainingAgency}}</td>
        		<td>{{classListQY.TrainingAgencyContacts}}</td>
        		<td>{{classListQY.TrainingAgencyContactNumber}}</td>
        	</tr>
        	<tr class="con">
        		<td >委托考核机构</td>
        		<td>考核单位联系人</td>
        		<td>联系电话</td>
        	</tr>
        	<tr class="con">
        		<td>{{classListQY.ConsignAssessAgency}}</td>
        		<td>{{classListQY.AssessAgencyContacts}}</td>
        		<td>{{classListQY.AssessAgencyContactNumber}}</td>
        	</tr>
        </table>
        <table width="100%" class="bot">
        	<tr class="con">
        		<td >培训班地址</td>
        		<td>培训工种</td>
        		<td>培训等级</td>
        		<td>拟培训人数</td>
        	</tr>
        	<tr class="con">
        		<td>{{classListQY.TrainingAddress}}</td>
        		<td>{{classListQY.TrainingType}}</td>
        		<td>{{classListQY.TrainingLevel}}</td>
        		<td>{{classListQY.TrainingPersonNumber}}人</td>
        	</tr>
        	<tr class="con">
        		<td >开班时间</td>
        		<td>培训期限</td>
        		<td>联系人</td>
        		<td>联系电话</td>
        	</tr>
        	<tr class="con">
        		<td>{{classListQY.allDate}}</td>
        		<td>{{classListQY.TrainingDay}}天</td>
        		<td>{{classListQY.Contacts}}</td>
        		<td>{{classListQY.ContactNumber}}</td>
        	</tr>
        </table>
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
    .container{
        padding: 0;
        color: #000;
        font-size: 16px;
    }
	table{
  		border-collapse:collapse;
		text-align: center;
	}
	h3{
	}
    .border-table th, td {
	    border: 1px solid #000;
        padding: 10px 5px;
	}
	

	.top .con td{
		width: 30%;
		border-bottom: 0;
	}
	.top .con td.attr{
		width: 20%;
	}
	.mid .con td{
		border-bottom: 0;
	}
 
</style>

