<template>
    <div id="adoptstudent">
        <section class="application container">
            <div class="d-flex align-items-center bread border-bottom">
            	您的位置： 学生列表
            </div>
                        <table class="w-100">
							<thead class="table-head">
								<tr>
									<th>序号</th>
									<th>姓名</th>
									<th>性别</th>
									<!-- <th>名族</th> -->
									<!-- <th>文化程度</th> -->
									<th>身份证号码</th>
									<!-- <th>工种</th> -->
									<!-- <th>工作单位</th> -->
									<th>联系电话</th>
									<!-- <th>证书类型</th> -->
									<!-- <th>原技术的等级</th> -->
									<th>培训等级</th>
									<!-- <th>证书编号</th> -->
									<!-- <th>家庭地址</th> -->
                                    <th>证书类型</th>
                                    <th>证书编号</th>
                                    <th>补贴</th>
                                    <th>操作</th>
								</tr>
							</thead>
							<tbody>
								<tr class="text-center" v-for="(x,$index) in student_obj.DataList">
									<td>{{x.Sort}}</td>
									<td>{{x.Name}}</td>
									<td>{{x.Sex}}</td>
									<!-- <td>{{x.Nation}}</td> -->
									<!-- <td>{{x.EducationLevel}}</td> -->
									<td>{{x.IdCardNo}}</td>
									<!-- <td>{{x.TrainingType}}</td> -->
									<!-- <td>{{x.Company}}</td> -->
									<td>{{x.ContactNumber}}</td>
									<!-- <td  @keyup="editItem(x,'CertificateType',$event)">{{x.CertificateType}}</td> -->
									<!-- <td>{{x.OriginalTechnologyLevel}}</td> -->
									<td>{{x.TrainingLevel}}</td>
									<!-- <td  @keyup="editItem(x,'CertificateNumber',$event)">{{x.CertificateNumber}}</td> -->
									<!-- <td >{{x.Address}}</td> -->
                                    <td>
                                        <input :readonly="x.Status==1 || x.Status===3 || Status==5" :class="{'no_border':x.Status==1 || x.Status===3 || Status==5}" type="text" v-model="x.CertificateNumber">
                                        <!-- {{x.CertificateNumber}} -->
                                    </td>
                                    <td>
                                        <input :readonly="x.Status==1 || x.Status===3 || Status==5" :class="{'no_border':x.Status==1 || x.Status===3 || Status==5}" type="text" v-model="x.CertificateType">
                                        <!-- {{x.CertificateType}} -->
                                    </td>
                                    <td>
                                        <!-- <i v-if="x.Finish!=0" style="color:#34bf6d;" class="el-icon-success"></i> -->
                                        <!-- {{Status_name[x.Status]}} -->
                                        <img v-if="x.Status==1" src="@/assets/img/1.png" alt="">
                                        <img v-if="x.Status==2" src="@/assets/img/2.png" alt="">
                                        <img v-if="x.Status==3" src="@/assets/img/3.png" alt="">
                                    </td>
                                    <td>
                                        <el-button @click="See(x)" type="primary" icon="el-icon-edit" size="mini" circle></el-button>
                                    </td>
								</tr>
							</tbody>
						</table>
                        <div class="panel-footer text-center" style="margin:20px 0px">
                            <button @click="rout()" class="btn btn-default ">返回上一页</button>
                            <button v-if="Status!=5" class="btn btn-info" @click="sub()">提交</button>
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
                query_obj:{
                    page:1,
                    per_page:1000,
                    student_class:'',
                    student_name:'',
                },
                student_obj:{	
	  				DataList:[],
	  				MaxCount:1,
	  				MaxPage:1
                },
                Status_name:['','待审核','未通过','已通过'],
                Status:''
            }
        },
        methods:{
            rout(){
                window.history.back();
            },
            //查看单个学生
            See(x){
				console.log('查看单个学生');
				console.log(this.Status);
				// if(this.Status==1 || this.Status==2){
					this.$router.push('/admini/studentDetails?id='+x.Id+'&Status='+x.Status)
				// }
			},
            sub(){
                var list=[];
                var StudentList = this.student_obj.DataList;
                var sub=true;
                var obj={};
                for(var i=0;i<StudentList.length;i++){
                    if(((StudentList[i].CertificateNumber!='' && StudentList[i].CertificateNumber!=null) && (StudentList[i].CertificateType=='' || StudentList[i].CertificateType==null) ) || 
                        ((StudentList[i].CertificateNumber=='' || StudentList[i].CertificateNumber==null) && (StudentList[i].CertificateType!='' && StudentList[i].CertificateType!=null) )){
                        obj=StudentList[i];
                        sub=false;
                        break;
                    }
                    if(StudentList[i].Finish==0){
                       StudentList[i].CertificateNumber=StudentList[i].CertificateNumber==null ? '' :StudentList[i].CertificateNumber;
                       StudentList[i].CertificateType=StudentList[i].CertificateType==null ? '' :StudentList[i].CertificateType;
                        list.push(StudentList[i])
                    }
                }
                if(!sub){
                    this.$message({
                        showClose: true,
                        message:obj.Name+'同学的证书或编号有误！' ,
                        type: 'error'
                    });
                }else{
                    ajax('patch','/student/list',JSON.stringify({'StudentList':list}),this.modify_return);
                }
            },
            modify_return(x){
                console.log(x);
                var x=JSON.parse(x);
                if(x.Result){
                    this.$alert('修改成功！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            window.history.back();
                        }
                    });
                }else{
                    this.$message({
                        showClose: true,
                        message:'系统错误，请稍后再试！' ,
                        type: 'error'
                    });
                }
            },
            //获取学生
	  		get_student(){
                  // http(this,'get','/user?page='+this.page+'&per_page='+this.per_page+'&user_role=&user_name=','',this.user_return)
                ajax('get','/student',this.query_obj,this.student_return)
            },
            student_return(x){
				var x=JSON.parse(x);
				console.log(x)
                this.student_obj=x.Memory;
            },
        },
        mounted(){
            var query=this.$route.query;
            this.query_obj.student_class=query.id;
            this.Status=query.Status;
            this.get_student()
        }
    }
</script>
<style>
    #adoptstudent .no_border{
        border:none;
    }
</style>
