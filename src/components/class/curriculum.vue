<template>
    <div id="adoptstudent">
        <section class="application container">
            <div class="d-flex align-items-center bread border-bottom">
            	您的位置： 课程查看
            </div>
                        <table class="table table-bordered" style="margin-bottom:0px;">
                            <tbody style="text-align:left">
                                <tr class="">
                                    <td style="width:15%;padding-left:20px;">培训机构：</td>
                                    <td style="width:30%;padding-left:20px;color:#909399">{{this.$route.params.consignTrainingAgency}}</td>
                                    <td style="width:15%;padding-left:20px;">工种等级：</td>
                                    <td style="width:40%;padding-left:20px;color:#909399">{{this.$route.params.typeLevel}}</td>
                                </tr>
                                <tr class="">
                                    <td style="padding-left:20px;">班&emsp;&emsp;次：</td>
                                    <td style="padding-left:20px;color:#909399">{{this.$route.params.name}}</td>
                                    <td style="padding-left:20px;">开班日期：</td>
                                    <td style="padding-left:20px;color:#909399">{{this.$route.params.date}}</td>
                                </tr>
                            </tbody>
                        </table>
						<table class="table table-bordered">
							<tbody class="border-table">
                                <tr class="text-center">
                                    <td>日期</tdtd>
									<td>授课时间</td>
									<td>培训内容</td>
									<td>授课形式</td>
									<td>授课教师</td>
                                </tr>
								<tr class="text-center" v-for="(x,$index) in courseData.DataList">
									<td @keyup="editCourse(x, 'date', $event)">{{x.Date}}</td>
									<td @keyup="editCourse(x, 'time', $event)">{{x.TeachingTime}}</td>
									<td @keyup="editCourse(x, 'content', $event)">{{x.TrainingContent}}</td>
									<td @keyup="editCourse(x, 'form', $event)">{{x.TeachingStyle}}</td>
									<td @keyup="editCourse(x, 'teacher', $event)">{{x.Teacher}}</td>
								</tr>
							</tbody>
						</table>
            <div class="text-center" style="margin:20px 0px;">
                <button @click="rout()" class="btn btn-default btn-block" type="button">返回上一页</button>
            </div>
        </section>
    </div>
</template>
<script>
    import {ajax,paging,dateFtt} from '@/assets/fc';
	export default {
		components: {
//	    	VueDaterangePicker
        },
        data(){
            return{
                url:'',
                courseData:{       //课程 elxe 表的内容
                    TrainingInstitutions:'',  // 培训机构
                    Level:'',   //工种等级
                    Class:'',    //班次
                    OpeningDate:'', //开班日期
                    DataList:[]
                },
            }
        },
        methods:{
            rout(){
                window.history.back();
            },
           //查询课程表
            get_courseData(){
                if(this.url){
                    ajax('get','/schedule/excel',{'path':this.url},this.get_courseData_return)
                }
            },
            get_courseData_return(x){
                var x=JSON.parse(x);
                console.log('课程',x);
                if(x.Result){
                    this.courseData=x.Memory 
                }
            },
        },
        mounted(){
            var params = this.$route.params;
            this.url=params.url;
            console.log(params)
            this.get_courseData();
        }
    }
</script>
<style>

</style>
