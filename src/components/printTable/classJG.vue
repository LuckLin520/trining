<template>
    <div id="classJG" class="container">
        <table width="100%" class="top">
        	<tr>
        		<td colspan="4"><h3>2018年成都市总工会在职职工<br/>万人免费技能提升培训开班申请表（培训机构）</h3></td>
        	</tr>
        	<tr class="con">
        		<td class="attr">机构名称（公章）：</td>
        		<td><span>{{classListJG.User ? classListJG.User.Name : ''}}</span></td>
        		<td class="attr">班级批次：</td>
        		<td><span>{{classListJG.Name}}</span></td>
        	</tr>
        </table>
        <table width="100%" class="bot">
        	<tr class="con">
        		<td style="width: 30%">培训班地址</td>
        		<td style="width: 25%">培训工种</td>
        		<td>培训等级</td>
        		<td><span>拟培训人数</span></td>
        	</tr>
        	<tr class="con">
        		<td>{{classListJG.TrainingAddress}}</td>
        		<td>{{classListJG.TrainingType}}</span></td>
        		<td>{{classListJG.TrainingLevel}}</td>
        		<td>{{classListJG.TrainingPersonNumber}}</span></td>
        	</tr>
        	<tr class="con">
        		<td >开班时间</td>
        		<td>培训期限</td>
        		<td>联系人</td>
        		<td><span>联系电话</span></td>
        	</tr>
        	<tr class="con">
        		<td>{{classListJG.allDate}}</td>
        		<td>{{classListJG.TrainingDay}}</span></td>
        		<td>{{classListJG.Contacts}}</td>
        		<td>{{classListJG.ContactNumber}}</span></td>
        	</tr>
        </table>
    </div>
</template>
<script>
    export default {
        props: {
            classListJG: {
                type: Object,
                required: true
            }
        },
        data() {
           return {
           }
        },
        mounted() {
        	console.log(this.classListJG)
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
 
</style>

