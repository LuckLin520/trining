<template>
    <div id="student" class="container">
        <table width="100%" class="top">
        	<tr>
        		<td colspan="6"><h3>2018年成都市总工会在职职工<br/>万人免费技能提升培训<span v-if="studentObject.isSubsidy">补贴</span>学员花名册</h3></td>
        	</tr>
        	<tr class="con">
        		<td class="attr">培训机构：</td>
        		<td style="min-width: 60px">{{classObject.User ? classObject.User.Name : ''}}</td>
        		<td class="attr">工种班次：</span></td>
        		<td>{{classObject.TrainingType}}、{{classObject.Name}}</span></td>
        		<td class="attr">开班日期：</span></td>
        		<td>{{classObject.allDate}}</span></td>
        	</tr>
        	
        </table>
        <table width="100%" class="mid">
        	<tr class="con">
        		<td style="width: 2%">序号</td>
        		<td style="min-width: 4em">姓名</td>
        		<td style="width: 3%">性别</td>
        		<td style="width: 5%">民族</td>
        		<td style="width: 5%">文化程度</td>
				<td>身份证号码</td>
        		<td style="width: 10%">工种</td>
        		<td style="width: 15%">工作单位</td>
				<td>联系电话</td>
        		<td style="width: 10%">证书类型</td>
        		<td style="min-width: 3em">原技术等级</td>
				<td style="min-width: 3em">培训等级</td>
        		<td>证书编号</td>
        		<td style="width: 15%">家庭住址</td>
        	</tr>
        	<tr class="con" v-for="(item, idx) in studentObject.DataList">
        		<td>{{item.Sort}}</td>
        		<td>{{item.Name}}</td>
        		<td>{{item.Sex}}</td>
        		<td>{{item.Nation}}</td>
        		<td>{{item.EducationLevel}}</td>
        		<td>{{item.IdCardNo}}</td>
        		<td>{{item.TrainingType}}</td>
        		<td>{{item.Company}}</td>
        		<td>{{item.ContactNumber}}</td>
        		<td>{{item.CertificateType}}</td>
        		<td>{{item.OriginalTechnologyLevel}}</td>
        		<td>{{item.TrainingLevel}}</td>
        		<td>{{item.CertificateNumber}}</td>
        		<td>{{item.Address}}</td>
        	</tr>
        </table>
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
        },
        watch: {
            studentObject(n,o){
                console.log(n)
            },
            classObject(n,o){
                console.log(n)
            }
        },
        mounted() {
            console.log(this.classObject)
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
		border-bottom: 0;
	}
	.top .con td.attr{
		width: 10%;
	}
/*	.mid .con td{
		width: 20%;
	}*/

 
</style>

