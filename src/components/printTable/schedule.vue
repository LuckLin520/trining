<template>
    <div id="schedule" class="container">
        <table width="100%" class="top">
        	<tr>
        		<td colspan="4"><h3>2018年成都市总工会在职职工<br/>万人免费技能提升培训课程表</h3></td>
        	</tr>
        	<tr class="con">
        		<td class="attr">培训机构：</td>
        		<td v-if="classObject.User && classObject.User.Type == 1">{{classObject.ConsignTrainingAgency}}</td>
        		<td v-else>{{classObject.CreateUserName}}</td>
        		<td class="attr">工种等级：</span></td>
        		<td>{{classObject.TrainingType}}、{{classObject.TrainingLevel}}</span></td>
        	</tr>
        	<tr class="con">
        		<td class="attr">班次：</td>
        		<td>{{classObject.Name}}</td>
        		<td class="attr">开班日期：</td>
        		<td>{{classObject.allDate}}</td>
        	</tr>
        </table>
        <table width="100%" class="mid">
        	<tr class="con">
        		<td style="width: 10%">日期</td>
        		<td style="width: 15%">授课时间</td>
        		<td>培训内容</td>
        		<td style="width: 15%">授课形式</td>
        		<td style="width: 10%">培训教师</td>
        	</tr>
        	<tr class="con" v-for="(item, idx) in scheduleList">
        		<td v-if="(idx+1) % 2 !=0" rowspan="2">{{item.Date}}</td>
        		<td>{{item.TeachingTime}}</td>
        		<td>{{item.TrainingContent}}</td>
        		<td>{{item.TeachingStyle}}</td>
        		<td>{{item.Teacher}}</td>
        	</tr>
        </table>
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
		line-height: 16px;
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
/*	.mid .con td{
		width: 20%;
	}*/

 
</style>

