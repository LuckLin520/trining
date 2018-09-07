<template>
    <div id="printSubsidy" class="container">
        <table width="100%" class="top">
        	<tr>
        		<td colspan="6"><h3>2018年成都市总工会在职职工<br/>万人免费技能提升培训补贴申请表</h3></td>
        	</tr>
        	<tr class="con">
        		<td class="attr">单位名称：</td>
        		<td><span>{{subsidy.CreateUserName}}</span></td>
        		<td class="attr">班级批次：</td>
        		<td><span>{{subsidy.ClassName}}</span></td>
        		<td class="attr">申报时间：</td>
        		<td style="min-width: 14em;"><span>{{subsidy.CreateDate}}</span></td>
        	</tr>
        </table>
        <table width="100%" class="bot">
        	<tr class="con">
        		<td style="">专业</td>
        		<td style="">证书类型</td>
        		<td style="">等级</td>
        		<td style="width: 8%;">培训人数</td>
        		<td style="width: 18%;">培训时间</td>
        		<td style="">培训地址</td>
        	</tr>
        	<tr class="con">
        		<td>{{subsidy.Profession}}</td>
        		<td>{{subsidy.CertificateType}}</td>
        		<td>{{subsidy.Level}}</td>
        		<td>{{subsidy.TrainingPersonCount}}人</td>
        		<td>{{dataAll}}</td>
        		<td>{{subsidy.Address}}</td>
        	</tr>
        	<tr class="con">
        		<td>联系人</td>
        		<td colspan="2">{{subsidy.Contacts}}</td>
        		
        		<td>联系电话</td>
        		<td colspan="2">{{subsidy.ContactNumber}}</td>
        		
        	</tr>
        	<tr class="con">
        		<td colspan="2">户名</td>
        		
        		<td colspan="2">开户行</td>
        		
        		<td colspan="2">银行账号</td>
        		
        	</tr>
        	<tr class="con">
        		<td colspan="2">{{subsidy.AccountName}}</td>
        		
        		<td colspan="2">{{subsidy.Bank}}</td>
        		
        		<td colspan="2">{{subsidy.AccountNo}}</td>
        		
        	</tr>
        	<tr class="con">
        		<td>补贴金额</td>
        		<!-- subsidy.StudentList[0].TrainingPrice * subsidy.StudentList.length  -->
        		<td colspan="5">{{subsidy.SubsidyPrice}}.00元</td>
        	</tr>
        	<tr class="con">
        		<td colspan="6">大写：<span>{{subsidy.SubsidyPriceUpper}}</span></td>
        	</tr>
        	<tr class="con">
        		<td>申请单位经办人</td>
        		<td colspan="2">{{subsidy.ApplicationManager}}</td>
        		
        		<td>经办人电话</td>
        		<td colspan="2">{{subsidy.ManagerContactNumber}}</td>
        		
        	</tr>
<!--         	<tr class="con">
        		<td>审批人</td>
        		<td colspan="2">22222</td>
        		
        		<td>核准人</td>
        		<td colspan="2">22222</td>
        		
        	</tr> -->
        	<tr class="con">
        		<td colspan="6">审核时间：<span>{{subsidy.ReviewDate}}</span></td>
        	</tr>
        </table>
    </div>
</template>
<script>
	import {dateFtt} from '@/assets/fc'
    export default {
        props: {
            subsidy: {
                type: Object,
                required: true
            },
            // classInfo: {
            // 	type: Object,
            //     required: true
            // }
        },
        data() {
           return {
           }
        },
        computed: {
        	dataAll() {
        		return dateFtt(this.subsidy.TrainingStartDate,'yyyy-MM-dd') + '至' + dateFtt(this.subsidy.TrainingEndDate,'yyyy-MM-dd')
        	}
        },
        mounted() {
        	this.$nextTick(() => {
        		console.log(this.subsidy)
        		console.log(this.classInfo)
        	})
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
		width: 10%;
	}
 
</style>

