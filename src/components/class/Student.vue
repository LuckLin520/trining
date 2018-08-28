<template>
  	<div id="Student">
  		<section class="application container">
            <div class="d-flex align-items-center bread border-bottom">
            	您的位置： 学生列表
            </div>
            <div class="input_box">
				<router-link v-if="Status==2 && user.Type!='SYSTEM' && user.Type!=0" :to="'addstudent?class='+query_obj.student_class">
					<button class="btn btn-info float-right">添加学生</button>
				</router-link>
				<div class="col-3 search border rounded">
					<input type="text" class="w-85 search-input" placeholder="搜索" v-model="query_obj.student_name" />
					<img src="@/assets/img/search.png" @click="search()" class="search-btn">
				</div>
            </div>
            <table class="table" style="min-height: 335px;">
            	<table class="table">
				  	<thead class="table-primary">
					    <tr>
                            <th>排序</th>
					      	<th>姓名</th>
					      	<th>性别</th>
					      	<th>民族</th>
                            <th>身份证号码</th>
                            <th>工种</th>
                            <th>联系电话</th>
                            <th>原技术等级</th>
					      	<th scope="col" class="text-right last">操作</th>
					    </tr>
				  	</thead>
				  	<tbody>
				    	<tr v-for="x in student_obj.DataList">
                            <td>{{x.Sort}}</td>
				      		<td>{{x.Name}}</td>
				      		<td>{{x.Sex}}</td>
                            <td>{{x.Nation}}</td>
                            <td>{{x.IdCardNo}}</td>
                            <td>{{x.TrainingType}}</td>
                            <td>{{x.ContactNumber}}</td>
                            <td>{{x.OriginalTechnologyLevel}}</td>
				      		<td class="text-right last">
								  <!-- 修改 -->
				      	 		<el-button v-if="Status==2 && user.Type!='SYSTEM' && user.Type!=0" @click="See(x)" type="primary" icon="el-icon-edit" size="mini" circle></el-button>
				      	 		<el-button v-if="user.Type=='SYSTEM'" @click="See(x, user.Type)" type="warning" icon="el-icon-edit" size="mini" circle></el-button>
								   <!-- 删除 -->
				      	 		<el-button v-if="Status==2 && user.Type!='SYSTEM' && user.Type!=0" type="danger" @click="delete_1(x)" icon="el-icon-delete" size="mini" circle></el-button>
                                <!-- <a :href="'#/studentDetails?id='+x.Id+'&Status='+Status"> -->
								<!-- 查看 -->
                                <el-button v-if="Status!=2 || user.Type=='SYSTEM' || user.Type==0" @click="See(x)" type="primary" icon="el-icon-search" size="mini" circle></el-button>
                                <!-- </a> -->
				      		</td>
			    		</tr>
						<tr v-if="student_obj.DataList.length == 0" >
							<td  style="font-size:16px; text-align:center; padding: 20px" colspan='10'>没有学生数据！</td>
						</tr>
				  	</tbody>
				</table>
            </table>
            
            <div class="block text-right">
			    <el-pagination 
			     	@current-change="handleCurrentChange" 
			     	:current-page.sync="query_obj.page" 
			     	:page-size="query_obj.per_page" 
			     	layout="prev, pager, next, jumper" 
			     	:total="student_obj.MaxCount">
    			</el-pagination>
			</div>
            <div class="box-footer" style="margin:10px 0px;">
				<button @click="rout()" class="btn btn-block" style="font-size:14px;">返回上一页</button>
			</div>

        </section>
  	</div>
</template>

<script>
	import {http,paging,ajax} from '@/assets/fc';
	export default {
	  	name: '',
	  	data(){
	  		return{
                query_obj:{
                    page:1,
                    per_page:25,
                    student_class:'',
                    student_name:'',
                },
                Status:'',
				user:{},
	  			Prompt:'',
	  			page:1,			//页数
	  			student_obj:{	
	  				DataList:[],
	  				MaxCount:1,
	  				MaxPage:1
	  			},
	  			pagind:{		//分页
	  				shang:'',
	  				list:[],
	  				xia:''
	  			},
				currentPage4: 4,
				type:['管理员','企业','机构']   
	  		}
	  	},
	  	methods:{
			  rout(){
				  window.history.back();
			  },
		    See(x, edit){
				console.log('查看学生');
				console.log(this.Status);
				if(!edit){
					this.$router.push('/studentDetails?id='+x.Id+'&Status='+this.Status)
				}else{
					this.$router.push('/studentDetails?id='+x.Id+'&Status='+this.Status+'&edit='+edit)
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
            //查询
            search(){
                console.log(this.query_obj)
                this.query_obj.page=1;
                this.get_student();
            },
            //分页
            handleCurrentChange(x) {
                 this.query_obj.page=x;
                this.get_student();
		    },



	  		user_return(x){
	  			console.log('获取用户',x);
	  			this.user_obj=x.Memory;
	  		},
		    
		    //删除
		    delete_1(x){
		    	console.log(x);
		    	this.$confirm('此操作将永久删除, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
					  // http(this,'delete','/user',{'Id':x.Id},this.delete_retun)
					  ajax('delete','/student',JSON.stringify({'Id':x.Id}),this.delete_retun)
		        }).catch(() => {
		          	          
		        });
		    },
		    delete_retun(x){
				console.log(x);
				var x=JSON.parse(x);
		    	if(x.Result){
					this.get_student();
					this.$message({
			          	showClose: true,
			          	message: '删除成功',
			          	type: 'success'
			        });
		    	}else{
		    		this.$message({
			          	showClose: true,
			          	message: '系统错误，请联系管理员',
			          	type: 'error'
			        });
		    	}
		    }
	  	},
	    created: function () {
           
        },
	    mounted: function () {
			 // this.get_user()		//获取
			 this.user=JSON.parse(localStorage.user0609);
            var query=this.$route.query;
            this.query_obj.student_class=query.id;
			this.Status=query.Status;
            this.get_student()
	    },
	}
</script>

<style scoped>
	#Student .btn_1{
		position: absolute;
		right: 0px;
	}
	#Student .input_box{
        margin: 20px 0px;
    }
	#Student table td.last{
		padding: 0 5px 0 0;
	}
	.rounded{
		position: relative;
	}
	.rounded img{
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
	}

	.table{
		/* text-align: center; */
		/* width: 70%; */
		margin-top: 1rem;
	}
	.table thead tr th{
		padding: 5px;
		padding-left: 25px;
	}
	.table thead tr th.last{
		padding-right: 20px;
	}
	.table td{
		font-size: 14px;
		padding: 5px;
		text-align: left;
		width:200px;
		padding-left: 30px;
		vertical-align: middle;
	}
	.table td.type{
		width: 150px;
		padding-left: 30px; 
	}
	.table td.last{
		width: 120px;
		padding-right: 20px;
	}
	.table .dangerBtn{
		margin-left: 20px;
	}
    
</style>
