<template>
	<div id="home">
		<section class="application container">
			<div class="row  mt-5 justify-content-between">
				<div class="col-3 search border rounded" style="box-sizing:initial">
					<input type="text" class="w-85 search-input" v-on:input="onchange" placeholder="搜索" v-model="getData_obj.class_name" />
					<img src="@/assets/img/search.png" @click="search()" class="search-btn">
				</div>
				<!--<div class="col-3 text-right" v-if="userType == 0">-->
				<div class="col-3 text-right">
					<a @click="openClass" class="btn main-btn text-white">新建课程 +</a>
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
				<a href="javascript:void(0)" :class="{'active':courseActive=='1', orangeColor: this.state1Count != 0}" @click="mkCourse('1')">审核中<span v-if="this.state1Count != 0">({{this.state1Count}})</span></a>
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
			<!--<table class="table table-striped" v-if="userType==0">-->
			<!--<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">状态</th>
						<th scope="col">培训班级名称</th>
						<th scope="col">申请时间</th>
						<th scope="col">审核人</th>
					</tr>
				</thead>
				<tbody>
						<tr v-for="item in dataList" :key="item.Id">
							<th scope="row">{{Status[item.Status]}}</th>
							<td>{{item.Name}}</td>
							<td>{{item.CreateDate.slice(0,10)}}</td>
							<td>{{item.ReviewUserName}}</td>
							<td><button class="btn" @click="goToDetail(item)">查看</button></td>
						</tr>
				</tbody>
			</table>-->

			<!--<table class="table table-striped" v-if="userType==1">-->
			<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">状态</th>
						<th scope="col">培训班级批次</th>
						<th scope="col">企业/机构</th>
						<th scope="col">申请时间</th>
						<th scope="col">审核人</th>
						<th scope="col" style="width:280px" class="text-center last">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in dataList" :key="index">
						<td>
							<span>
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
						<td>{{item.User.Name}}</td>
						<td>{{item.CreateDate.slice(0,10)}}</td>
						<td>{{item.ReviewUserName}}</td>
						<td class="last">
							<button class="btn btn-info btn-sm" @click="goToReview(item, index)">查看</button>
							<button  class="btn btn-info btn-sm" @click="goToReview_1(item, index)">学生</button>
							<button class="btn btn-info btn-sm" v-if="item.ScheduleUrl && item.Status!=6" @click="goScheduleUrl(item)">课程</button>
							<button class="btn btn-primary btn-sm" v-if="item.Status==3 || item.Status==4 || item.Status!=6" @click="gosubsidy(item)">补贴</button>
							<button type="button" v-if="item.Status==4 && item.Status!=6" @click="Graduation(item)" class="btn btn-sm btn-danger">结业</button>
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
				Status:['','待审核','未通过','已通过','补贴','已结业','冻结',''],		//审核状态
				getData_obj:{		//查询参数
					page:1,
					per_page:25,
					user:'',	//登录人的Id
					class_name:'',
					startdate:"",
					enddate:"",
					status:'',
					type:''		//0表示直补
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
			//结业
			Graduation(x){

				this.$confirm(x.CanFinish==1 ? '是否完成此班级结业？' : '此班还有未完成补贴学生，是否强制结业？' , '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(()=>{
					console.log(x)
					ajax('patch','/class/finish',JSON.stringify({'Id':x.Id}),this.Graduation_return)
				}).catch(()=>{
					// console.log(x)
				});
			},
			Graduation_return(x){
				var x=JSON.parse(x)
				console.log(x);
				if(x.Result){
					this.$message({
						showClose: true,
						message: '恭喜你，结业成功！',
						type: 'success'
					});
					this.getData();
				}else{
					this.$message({
						showClose: true,
						message: '系统错误，请稍后再试！',
						type: 'error'
					});
				}			
			},
			//补贴
			gosubsidy(x){
				this.$router.push('/subsidy?id='+x.Id)
			},
			//查看课程
			goScheduleUrl(x){
				var startDate=dateFtt(x.TrainingStartDate,'yyyy-MM-dd');
      			var endDate=dateFtt(x.TrainingEndDate,'yyyy-MM-dd');
				var params = {
					url: x.ScheduleUrl,
					consignTrainingAgency: this.userType == "2" ? x.User.Name : x.ConsignTrainingAgency,
					typeLevel: x.TrainingType+'、'+x.TrainingLevel,
					name: x.Name,
					date: startDate+'至'+endDate
				}
				this.$router.push({name:'curriculum', params})
			},
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
				this.$router.push('/Seeclass')
			},
			//查看学生
			goToReview_1(item,index){
				console.log(item)
				if(item.Status==1 || item.Status==2){
					this.$router.push('/Student?id='+item.Id+'&Status='+item.Status);
				}else{
					this.$router.push('/adoptstudent?id='+item.Id+'&Status='+item.Status);
				}
			},


			class_return(x){
				var x=JSON.parse(x);
				if(x.Result){
					this.dataList=x.Memory.DataList;
					this.total=x.Memory.MaxCount;
					this.page=paging(x.Memory.MaxPage,this.getData_obj.page);
					console.log(x)
				}else{
					this.Prompt=x.Message;
					$('#home .modal_1').modal('show');
				}
			},
			getData: function(u, s, c) {
//				let user = u ? u :'';
//				let status = s ? s : '';
//				let clas = c ? c :'';
//				let self = this;
				ajax('get','/class',this.getData_obj,this.class_return)
			},

			onchange: function() {

				if(!this.searchString) {
					this.getData()
					console.log('onchange')
				}

			},
			//选择课程状态
			mkCourse: function(tag) {
				this.getData_obj.status=tag;
				this.courseActive = tag;
				this.getData_obj.page = 1
				this.getData();
			},
			search: function() {
				this.getData('', '', this.searchString)
			},
			getclass2() {
				// 初始化课程状态分类计数
				this.getData_obj.per_page = 99999;
				ajax('get','/class', this.getData_obj, (data) => {
					data = JSON.parse(data)
					this.allCount = data.Memory.DataList.length;
					this.state1Count = data.Memory.DataList.filter(v => {
						return v.Status == 1;
					}).length;
					this.state2Count = data.Memory.DataList.filter(v => {
						return v.Status == 2;
					}).length;
					this.state3Count = data.Memory.DataList.filter(v => {
						return v.Status == 3;
					}).length;
					this.state4Count = data.Memory.DataList.filter(v => {
						return v.Status == 4;
					}).length;
					this.state5Count = data.Memory.DataList.filter(v => {
						return v.Status == 5;
					}).length;
					this.state6Count = data.Memory.DataList.filter(v => {
						return v.Status == 6;
					}).length;
					this.getData_obj.per_page = 25;
				} )
			}

		},
		created: function() {

		},
		mounted: function() {
			var user = JSON.parse(localStorage.user0609);
			console.log(user)
			this.userType = user.Type
			this.Name = user.Name;
			this.username = user.Id;

			//查询对象
			this.getData_obj.user=user.Id;
			// this.getData_obj.type=user.Type=='SYSTEM' ? 0 : user.Type;
			this.getData_obj.type=1 //不是管理员固定为 1 
			//			console.log(this.userType)
			this.getData();
			this.getclass2();
			
		},
	}
</script>

<style scoped>
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
		padding: 3px 15px 4px 15px;
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
		padding: 5px 0 5px 10px!important;
	}

</style>