<template>
	<div id="home">
		<section class="application container">
			<div class="row  mt-5 justify-content-between">
				<div class="col-3 search border rounded">
					<input type="text" class="w-85 search-input" v-on:input="onchange" placeholder="搜索" v-model="getData_obj.class_name" />
					<img src="@/assets/img/search.png" @click="search()" class="search-btn">
				</div>
				<!--<div class="col-3 text-right" v-if="userType == 0">-->
				<div class="col-3 text-right">
					<!-- <a @click="openClass" class="btn main-btn text-white">新建课程 +</a> -->
				</div>
			</div>
			<hr>

			<!--<div class="row filter mt-4" v-bind:class="active" v-if="userType == 1">-->
			<!-- <div class="row filter mt-4">
				<label class="pt-1">创建方：</label>
				<a @click="mkActive('all')" :class="{'active':active=='all'}">全部</a>
				<a @click="mkActive('ent')" :class="{'active':active=='ent'}">企业</a>
				<a @click="mkActive('inti')" :class="{'active':active=='inti'}">机构</a>
			</div> -->

			<div class="row filter mt-4">
				<label class="pt-1">课程状态：</label>
				<a href="javascript:void(0)" :class="{'active':courseActive==''}" @click="mkCourse('')">全部<span v-if="this.allCount != 0">({{this.allCount}})</span></a>
				<a href="javascript:void(0)" :class="{'active':courseActive=='1', orangeColor: this.state1Count != 0}" @click="mkCourse('1')">待审核<span v-if="this.state1Count != 0">({{this.state1Count}})</span></a>
				<a href="javascript:void(0)" :class="{'active':courseActive=='3', orangeColor: this.state3Count != 0}" @click="mkCourse('3')">已通过<span v-if="this.state3Count != 0">({{this.state3Count}})</span></a>
				<a href="javascript:void(0)" :class="{'active':courseActive=='2', orangeColor: this.state2Count != 0}" @click="mkCourse('2')">未通过<span v-if="this.state2Count != 0">({{this.state2Count}})</span></a>
				<a href="javascript:void(0)" :class="{'active':courseActive=='4', orangeColor: this.state4Count != 0}" @click="mkCourse('4')">补贴<span v-if="this.state4Count != 0">({{this.state4Count}})</span></a>
				<a href="javascript:void(0)" :class="{'active':courseActive=='5', orangeColor: this.state5Count != 0}" @click="mkCourse('5')">结业<span v-if="this.state5Count != 0">({{this.state5Count}})</span></a>
				<a href="javascript:void(0)" :class="{'active':courseActive=='6', orangeColor: this.state6Count != 0}" @click="mkCourse('6')">冻结<span v-if="this.state6Count != 0">({{this.state6Count}})</span></a>
			</div>

			<div class="row filter mt-4">
				<label class="pt-2">申请时间：</label>
				<div class="ml-5">
				  	<div  class="block">
				    	<el-date-picker
					    	v-on:change="change_time()"
					      	v-model="default_time"
					      	type="daterange"
					      	align="left"
					      	unlink-panels
					      	range-separator="至"
					      	start-placeholder="开始时间"
					      	end-placeholder="结束时间"
					      	:picker-options="pickerOptions2">
				   		</el-date-picker>
				  	</div>
				</div>
			</div>
			<!-- <hr class="my-4"> -->
			<!--<table class="table table-striped" v-if="userType==1">-->
			<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">状态</th>
						<th scope="col">培训班级批次</th>
						<th style="width: 24%" scope="col">企业/机构</th>
						<th style="width: 20%" scope="col">工种</th>
						<th style="width: 6%;" scope="col">人数</th>
						<th scope="col">申请时间</th>
						<th scope="col">审核人</th>
						<th scope="col" style="width:180px;" class="text-center last">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in dataList" :key="index">
						<td>
							<span :class="'type_'+item.Status">
								<img v-if="item.Status==1" src="@/assets/img/1.png" alt="">
								<img v-if="item.Status==2" src="@/assets/img/2.png" alt="">
								<img v-if="item.Status==3" src="@/assets/img/3.png" alt="">
								<img v-if="item.Status==4" src="@/assets/img/3.png" alt="">
								<img v-if="item.Status==5" src="@/assets/img/3.png" alt="">
								<!-- <img src="@/assets/img/2.png" alt="">
								<img src="@/assets/img/3.png" alt="">
								<img src="@/assets/img/4.png" alt=""> -->
								{{Status[item.Status]}}
							</span>
						</td>
						<td>{{item.Name}}</td>
						<!-- {{item.User}} -->
						<td>{{item.CreateUserName}}</td>
						<td>{{item.TrainingType}}</td>
						<td><div style="width: 20px;text-align:center;">{{item.TrainingPersonNumber}}</div></td>
						<td>{{item.CreateDate.slice(0,10)}}</td>
						<td>{{item.ReviewUserName}}</td>
						<td class="text-center">
							<div style="width:188px;display:inline-block" :class="{'text-left': item.Status == 6 || item.Status == 5}">
								<button class="btn btn-info btn-sm" @click="goToReview(item, index)">查看</button>
								<button class="btn btn-info btn-sm" @click="goToReview_1(item, index)">学生信息</button>
								<button v-if="item.Status != 6 && item.Status != 5" class="btn btn-info btn-sm" @click="freezeClass(item, index)">冻结</button>
								<button class="btn btn-sm delete-btn" @click="deleteClass(item)">删除</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>

			<hr>

			<div class="d-flex justify-content-between">
				<span>共有{{total}}条记录</span>
				<ul class="my_pagination" v-if="page.list.length!=0">
					<li @click="change_page(page.shang)" :class="{'disabled':page.shang=='','active':page.shang!=''}"><</li>
					<li @click="change_page(x)" v-for="x in page.list" :class="{'active':x==getData_obj.page}">{{x}}</li>
					<li @click="change_page(page.xia)" :class="{'disabled':page.xia=='','active':page.xia!=''}">></li>
				</ul>
			</div>
			<br>
			<br>

		</section>
		
		<!--提示-->
		<div class="modal_1 modal fade bs-example-modal-sm" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  	<div class="modal-dialog" role="document">
		    	<div class="modal-content">
			      	<div class="modal-header">
			      		<h4 class="modal-title" id="myModalLabel">Modal title</h4>
			        	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			      	</div>
			      	<div class="modal-body">
			        	{{Prompt}}
			      	</div>
			      	<div class="modal-footer">
			        	<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			        	<button type="button" class="btn btn-primary">Save changes</button>
			      	</div>
		    	</div>
		  	</div>
		</div>
	</div>
</template>

<script>
	import {ajax,paging,dateFtt} from '@/assets/fc';
	export default {
		props: {
			returnData: {
				type: Object
			},
			Memory: {
				type: Object
			}
		},
		components: {
//	    	VueDaterangePicker
	  	},
		name: '',
		data() {
			// var new_date=new Date();
			// var Today=new_date.getFullYear()+'-'+(new_date.getMonth()+1)+'-'+new_date.getDate()		//今天
			// var	firstDay=new_date.getFullYear()+'-'+(new_date.getMonth()+1)+'-01' 	//当月第一天
			var Today=''
			var	firstDay=''
			return {
        		pickerOptions2: {
		          shortcuts: [{
		            text: '最近一周',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '最近一个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '最近三个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
		              picker.$emit('pick', [start, end]);
		            }
		          }]
		        },
       			default_time: [firstDay,Today],	//默认时间
				Prompt:'',			//提示
				active: 'all',
				courseActive: '',
				Name: '',
				username: '',
				userType: '', 		// 0 user 1 admin 2 super admin,
				total: '',			//总条数
				dataList: [],		//数据列表
				maxCount: '',		//最大页数
				review: '/review.html',
				searchString: '',	//搜索条件

				// Status:['待审核','待审核证书编号','待审核补贴','审核通过'],		//审核状态
				Status:['','待审核','未通过','已通过','补贴','结业','冻结',''],		//审核状态
				getData_obj:{		//查询参数
					page:1,
					per_page:25,
					user:'',	//登录人的Id
					class_name:'',
					startdate:"",
					enddate:"",
					status:'',
					type:1		//0直补 1 普通
				},
				page:{				//分页
					list:[],
					shang:'',
					xia:''
				},
				allCount: 0,
				state1Count: 0,
				state2Count: 0,
				state3Count: 0,
				state4Count: 0,
				state5Count: 0,
				state6Count: 0
			}
		},
		methods: {
			change_time(){
				this.getData_obj.page=1
				if(this.default_time && this.default_time!=null){
//					console.log(this.default_time);
					this.getData_obj.startdate=dateFtt(this.default_time[0],"yyyy-MM-dd")+' 00:00'
					this.getData_obj.enddate=dateFtt(this.default_time[1],"yyyy-MM-dd")+' 23:59:59'
				}else{
					this.getData_obj.startdate='';
					this.getData_obj.enddate='';
				}
				this.getData();	
			},
			//点击分页
			change_page(x){
				if(x!=''){
					this.getData_obj.page=x;
					this.getData();	
					this.$emit("getReturnData", {tag: this.getData_obj.status, page: x})
				}
			},
			openClass: function() {
				sessionStorage.setItem("currentClick", "");
//				window.location.href = "new-class.html"
				this.$router.push('/addclass')
			},
			//选择创建方
			mkActive: function(tag) {
				this.active = tag;
				this.getData();	
			},
			//第一个查看
			goToDetail: function(item) {
				sessionStorage.setItem('currentClick', item.Id);
//				window.location.href = "/newclass";
				this.$router.push('/newclass/See')
			},
			//第二个查看
			goToReview: function(item, index) {
				// console.log('ucks')
				sessionStorage.setItem("currentClick", item.Id);
//				window.location.href = "review.html"
				// this.$router.push('/newclass/See')
				this.$router.push('/admini/adminiSeeclass')
			},
			//查看学生
			goToReview_1(item,index){
				console.log(item)
				this.$router.push('/Student?id='+item.Id+'&Status='+item.Status);
			},
			freezeClass(item, index) {
				var self = this;
				this.$confirm('确认冻结改班级？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消'
				}).then(() => {
					const h = this.$createElement;
					this.$msgbox({
						title: '请输入冻结原因',
						message: h('p', null, [
							h('textarea', {id: 'textMessage'}, '')
						]),
						showCancelButton: true,
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						beforeClose: (action, instance, done) => {
							if (action === 'confirm') {
								if(!$('.el-message-box__message textarea').val()){
									this.$message({message: '请输入冻结原因!', type: 'warning'});
									return;
								}
								instance.confirmButtonLoading = true;
								instance.confirmButtonText = '执行中...';
								var message = $('.el-message-box__message textarea').val();
								// console.log(JSON.stringify({Id: item.Id, FreezeUser: this.user.Id, FreezeUserName: this.user.Name, FreezeMessage: message}))
								ajax('patch', '/class/f', JSON.stringify({Id: item.Id, FreezeUser: this.user.Id, FreezeUserName: this.user.Name, FreezeMessage: message}), (x) => {
									// var re = JSON.parse(x);
									// if(re.Result){
									// 	console.log(re)
									// 	instance.confirmButtonLoading = false;
									// 	done();
									// }
								})
								ajax('post', '/class/record',JSON.stringify({Type: '冻结',Class: item.Id, Content: message, CreateUser:this.user.Id, CreateUserName:this.user.Name}), (x) => {
									var re = JSON.parse(x);
									if(re.Result){
										console.log(re)
										instance.confirmButtonLoading = false;
										done();
									}
								})
							} else {
								done();
							}
						}
					}).then(() => {
						this.$confirm('冻结成功！', '提示', { confirmButtonText: '确定'});
					}).catch(() => {
						this.$message('已取消操作！');
					})
				}).catch(() => {
					
				})
				
			},

			class_return(x){
				var x=JSON.parse(x);
				if(x.Result){
					console.log(x)
					this.dataList=x.Memory.DataList;
					this.total=x.Memory.MaxCount;
					this.page=paging(x.Memory.MaxPage,this.getData_obj.page);
					console.log(this.page)
				}else{
					this.Prompt=x.Message;
					$('#home .modal_1').modal('show');
				}
			},
			getData: function(u, s, c) {
				console.log(this.getData_obj)
				ajax('get','/class',this.getData_obj,this.class_return)
			},

			onchange: function() {

				if(!this.searchString) {
					this.getData()
					console.log('onchange')
				}

			},
			//选择课程状态
			mkCourse: function(tag,page=1) {
				this.courseActive = tag;
				this.getData_obj.status=tag
				this.getData_obj.page = page
				this.getData();
				this.$emit("getReturnData", {tag, page: 1})
			},
			search: function() {
				this.getData('', '', this.searchString)
			},
			getclass2(Memory,returnData) {
				// 初始化课程状态分类计数
				this.dataList = Memory.DataList.filter(v => {
					return v.Status == returnData.tag
				});
				this.total = this.dataList.length;
				this.allCount = Memory.DataList.length;
				this.state1Count = Memory.DataList.filter(v => {
					return v.Status == 1;
				}).length;
				this.state2Count = Memory.DataList.filter(v => {
					return v.Status == 2;
				}).length;
				this.state3Count = Memory.DataList.filter(v => {
					return v.Status == 3;
				}).length;
				this.state4Count = Memory.DataList.filter(v => {
					return v.Status == 4;
				}).length;
				this.state5Count = Memory.DataList.filter(v => {
					return v.Status == 5;
				}).length;
				this.state6Count = Memory.DataList.filter(v => {
					return v.Status == 6;
				}).length;
				this.$emit("getClass", this.state1Count);
			},
			deleteClass(item) {
				var _this = this;
				this.$confirm('此操作将永久删除该班级所有信息, 是否继续？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		            setTimeout(() => {
		            	this.$confirm('包括该班级所有学生及补贴信息都将被永久删除，真的要删除？', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				          	deletefn()
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消删除'
				          });          
				        });
		            }, 800)
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
				function deletefn() {
					ajax('delete','/class', JSON.stringify({Id: item.Id}), (x) => {
						x = JSON.parse(x)
						if(x.Result){
							_this.$alert('删除成功！', {
					          type: 'success'
					        })
						}
					})
				}
			}
		},
		watch: {
			Memory(newV, oldV) {
				this.getclass2(newV, this.returnData)
			}
		},
		mounted: function() {
			var user = JSON.parse(localStorage.user0609);
			console.log(user)
			this.userType = user.Type
			// this.Name = user.Name;
			this.username = user.Id;
			this.user = user;

			//查询对象
			// this.getData_obj.user=user.Id;
			// this.getData_obj.type=user.Type=='SYSTEM' ? 0 : user.Type;		//管理员不填写
			//			console.log(this.userType)
			if(this.userType=='SYSTEM' || this.userType==0){
				// this.getData();
				this.courseActive = this.returnData.tag
				// console.log(this.returnData)
				if(this.Memory.DataList){
					this.getclass2(this.Memory, this.returnData)
					this.mkCourse(this.returnData.tag, this.returnData.page)
				}
			}

			
			
		
	

		},
	}
</script>

<style scoped>
	#home{
		font-size: 14px;
	}
	#home .my_pagination{
		display: flex;
	}
	#home .my_pagination li{
		width: 20px;
		height: 20px;
		text-align: center;
		line-height: 20px;
		cursor: pointer;
	}
	#home .my_pagination li.active{
		color: #2E2EDD;
		font-weight: bold;
	}
	#home .my_pagination li.disabled{
		color: #9c9c9c;
	}
	
	#home .search-input {
		border: none;
		outline: none;
		padding-top: 5px;
	}
	
	#home .w-85 {
		width: 90%;
	}
	
	#home .main-btn {
		color: #ffffff;
		background: #3737e1;
	}
	
	#home .filter a.active {
		color: #ffffff;
		background: #3737e1;
	}
	
	
	#home .filter a {
		margin-left: 3rem;
		display: block;
		padding: 4px 15px 4px 15px;
		border-radius: 5px;
		color: #000000;
	}

	.orangeColor{
		color: orangered!important;
	}
	.table{
		margin-top: 1.8rem;
	}
	.table thead{
        border:1px solid #dee2e6;
    }
	.table thead tr th{
		padding: 5px 0 5px 10px!important;
	}
	.table thead tr th.last{
		padding-left: 0!important;
	}
	.table td{
		padding: 5px!important;
	}
	/* .type_1{
		color:#2ea7df;
	}
	.type_2{
		color:#2ea7df;
	}
	
	.type_3{
		color:#2ea7df;
	}
	.type_4{
		color:#2ea7df;
	}
	.type_5{
		color:#2ea7df;
	} */
	.el-message-box__message textarea{
		width: 100%;
		min-height: 115px;
	}

	.delete-btn{
		background: #f36a6e;
		color: #fff;
	}
</style>