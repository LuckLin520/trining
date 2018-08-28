<template>
  	<div id="user">
  		<section class="application container">
            <div class="d-flex align-items-center bread border-bottom">
            	您的位置： 账号管理
            	<router-link to="/userdetails" class="btn_1">
            		<el-button type="primary" size="mini" round>添加</el-button>
            	</router-link>
            </div>
			<div class="row mt-4 filter">
                <label class="pt-2">帐号名称：</label>
                <div>
                    <div class="search border rounded" style="width:350px;">
                        <input style="padding-left:10px" type="text" class="w-85 search-input" placeholder="搜索" v-model="search_name" />
                        <img src="@/assets/img/search.png" @click="mkCourse(search_type)" class="search-btn">
                    </div>
                </div>
            </div>
            <div class="row filter_1 mt-4">
				<label class="pt-1">帐号类型：</label>
				<a href="javascript:void(0)" :class="{'active': search_type === ''}" @click="mkCourse('')">全部</a>
				<a href="javascript:void(0)" :class="{'active': search_type === '0'}" @click="mkCourse('0')">管理员</a>
				<a href="javascript:void(0)" :class="{'active': search_type === '2'}" @click="mkCourse('2')">机构</a>
				<a href="javascript:void(0)" :class="{'active': search_type === '1'}" @click="mkCourse('1')">企业</a>
			</div>
            
            <!-- <table class="table table-height" style="min-height: 335px;"> -->
					<!-- admin -->
            	<table class="table table-hover" align="center" v-if="user.Type == 'SYSTEM'">
				  	<thead class="table-primary">
					    <tr>
					      	<th>名称</th>
					      	<th>账号</th>
					      	<th>类型</th>
					      	<th>最后登录时间</th>
					      	<th scope="col" class="last">操作</th>
					    </tr>
				  	</thead>
				  	<tbody>
				    	<tr v-for="x in user_obj.DataList">
				      		<td scope="row">{{x.Name}}</td>
				      		<td>{{x.Code}}</td>
				      		<td class="type">{{type[x.Type]}}</td>
				      		<td>{{x.LastLoginTime}}</td>
				      		<td class="last">
				      			<router-link :to="'/userdetails/'+x.Id">
				      	 			<el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
				      	 		</router-link>
				      	 		<el-button type="danger" @click="delete_1(x)" icon="el-icon-delete" size="mini" circle class="dangerBtn"></el-button>
				      		</td>
			    		</tr>
				  	</tbody>
				</table>
					<!-- 非admin -->
				<table class="table table-hover" align="center" v-if="user.Type != 'SYSTEM'">
				  	<thead class="table-primary">
					    <tr>
					      	<th>名称</th>
					      	<th>账号</th>
					      	<th>类型</th>
					      	<th>最后登录时间</th>
					      	<th scope="col" class="last">操作</th>
					    </tr>
				  	</thead>
				  	<tbody>
				    	<tr v-for="x in user_obj.DataList">
				      		<td scope="row">{{x.Name}}</td>
				      		<td>{{x.Code}}</td>
				      		<td class="type">{{type[x.Type]}}</td>
				      		<td>{{x.LastLoginTime}}</td>
				      		<td class="last">
				      			<div v-if="x.Type != 'SYSTEM'">
									  <!-- 修改 -->
									<router-link :to="'/userdetails/'+x.Id" v-if="x.Type != '0'">
										<el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
									</router-link>
									<!-- 查看 -->
									<router-link :to="'/userdetails/'+x.Id" v-if="x.Type == '0'">
										<el-button type="primary" icon="el-icon-search" size="mini" circle></el-button>
									</router-link>
									<!-- 删除 -->
									<el-button v-if="x.Type != '0'" type="danger" @click="delete_1(x)" icon="el-icon-delete" size="mini" circle class="dangerBtn"></el-button>
								</div>
				      		</td>
			    		</tr>
				  	</tbody>
				</table>
            <!-- </table> -->
            
            <div class="block text-right">
			    <el-pagination 
			     	@current-change="handleCurrentChange" 
			     	:current-page.sync="currentPage4" 
			     	:page-size="per_page" 
			     	layout="prev, pager, next, jumper" 
			     	:total="user_obj.MaxCount">
    			</el-pagination>
			</div>
            
        </section>
	
  	</div>
</template>

<script>
	import {http,paging} from '@/assets/fc';
	export default {
	  	name: '',
	  	data(){
	  		return{
				search_name: '',
				search_type: '',
	  			Prompt:'',
	  			page:1,			//页数
	  			per_page:30,		//每页显示条数
	  			user_obj:{	
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
	  		//获取用户
	  		get_user(){
	  			http(this,'get','/user?page='+this.page+'&per_page='+this.per_page+'&user_role=&user_name=','',this.user_return)
	  		},
	  		user_return(x){
	  			console.log('获取用户',x);
	  			this.user_obj=x.Memory;
	  		},
		    handleCurrentChange(x) {
//		        console.log(`当前页: ${x}`);
				console.log(x)
				this.page=x;
				this.get_user()
		    },
		    //删除
		    delete_1(x){
		    	console.log(x);
		    	this.$confirm('此操作将永久删除, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	http(this,'delete','/user',{'Id':x.Id},this.delete_retun)
		        }).catch(() => {
		          	          
		        });
		    },
		    delete_retun(x){
		    	console.log(x);
		    	if(x.Result){
		    		this.get_user()		//获取
		    	}else{
		    		this.$message({
			          	showClose: true,
			          	message: x.Message,
			          	type: 'error'
			        });
		    	}
			},
			mkCourse(type) {//搜索账号类型
				this.search_type = type;
				var url = "/user?page=" +this.page+ "&per_page=" +this.per_page+ "&user_name=" +this.search_name+ "&user_type=" + this.search_type;
				http(this, 'get', url, {}, this.mkCourse_return);
			},
			mkCourse_return(x) {
				console.log(x);
				this.user_obj = x.Memory;
			}
		  },
		created() {
			if(!localStorage.user0609 && localStorage.user0609!=''){
				this.$router.push('/')
			}else{
				this.user=JSON.parse(localStorage.user0609);
			}
		},
	    mounted: function () {
			this.get_user()		//获取
			
	    },
	}
</script>

<style scoped>
	.filter_1 .active{
        color: #ffffff;
        background: #3737e1;
    }
    .filter_1 a {
        margin-right: 3rem;
        display: block;
        padding: 4px 15px 4px 15px;
        border-radius: 5px;
        color: #000000;
    }
	#user .btn_1{
		position: absolute;
		right: 0px;
		top: 0;
		line-height: 80px;
	}
	.table{
		/* text-align: center; */
		/* width: 70%; */
		margin-top: 1rem;
	}
	.table thead tr th{
		padding: 5px;
		padding-left: 40px;
	}
	.table thead tr th.last{
		padding-left: 55px;
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
		padding-left: 35px; 
	}
	.table .dangerBtn{
		margin-left: 20px;
	}
</style>
