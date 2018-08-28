<template>
    <div id="quick">
        <section class="application container">
            <div class="d-flex align-items-center bread border-bottom">
            	您的位置： 个人直补
            </div>
            <div class="row mt-4 filter justify-content-between">
                <label class="pt-2">班级名称：</label>
                <div style="flex-grow:1">
                    <div class="search border rounded" style="width:350px;">
                        <input style="padding-left:10px" type="text" class="w-85 search-input" placeholder="搜索" v-model="query_obj.class_name" />
                        <img src="@/assets/img/search.png" @click="search()" class="search-btn">
                    </div>
                </div>
                <router-link to="/channeldetails" class="btn main-btn text-white">新建直补 +</router-link>
            </div>
            <div class="row filter mt-4">
				<label class="pt-2">申请时间：</label>
				<div>
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
            <!-- <hr> -->
            <table class="table table-striped">
				<thead>
					<tr>
						<th>状态</th>
						<th>申请班级</th>
                        <!-- <th>专业</th> -->
                        <!-- <th>等级</th> -->
						<th>培训人数</th>
                        <th>创建时间</th>
                        <!-- <th>申请时间</th> -->
						<th style="width:100px" class="text-center">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in classsubsidy.DataList" :key="index">
						<td>
                            <span :class="'type_'+item.Status">
                                <img v-if="item.Status==4" src="@/assets/img/1.png" >
                                <img v-if="item.Status==5" src="@/assets/img/3.png" >
                                <!-- <img  src="@/assets/img/3.png" > -->
                                <img  v-if="item.Status==3" src="@/assets/img/4.png" >
                                {{Status[item.Status]}}
                            </span>
                        </td>
						<td>{{item.Name}}</td>
                        <!-- <td>{{item.Profession}}</td> -->
                        <!-- <td>{{item.Level}}</td> -->
						<td>{{item.TrainingPersonNumber}}</td>
						<td>{{item.CreateDate}}</td>
                        <!-- <td>{{item.CreateDate.slice(0,10)}}</td> -->
						<td style="white-space:nowrap">
							<button class="btn btn-info btn-sm" @click="see(item)">查看</button>
                            <button class="btn btn-info btn-sm" @click="goToReview_1(item, index)">学生</button>
							<button class="btn btn-info btn-sm" v-if="item.ScheduleUrl" @click="goScheduleUrl(item)">课程</button>
							<button class="btn btn-primary btn-sm" v-if="item.Status==3 || item.Status==4" @click="gosubsidy(item)">补贴</button>
							<button type="button" v-if="item.Status==4" @click="Graduation(item)" class="btn btn-sm btn-danger">结业</button>
						</td>
					</tr>
                    <tr v-if="classsubsidy.DataList.length == 0">
                        <td  style="font-size:16px; text-align:center; padding: 20px" colspan='10'>没有数据！</td>
                    </tr>
				</tbody>
			</table>
    
            <hr/>

            <div class="block text-right">
			    <el-pagination 
			     	@current-change="handleCurrentChange" 
			     	:current-page.sync="query_obj.page" 
			     	:page-size="query_obj.per_page" 
			     	layout="prev, pager, next, jumper" 
			     	:total="classsubsidy.MaxCount">
    			</el-pagination>
			</div>

            
            <!-- <div class="panel-footer text-center" style="margin:20px 0px">
                <button @click="rout()" class="btn btn-default ">返回上一页</button>
                <button class="btn btn-info" @click="sub()">提交</button>
            </div> -->
        </section>
    </div>
</template>
<script>
    import {ajax,paging,dateFtt} from '@/assets/fc';
	export default{
        data(){
            var new_date=new Date();
			var Today=new_date.getFullYear()+'-'+(new_date.getMonth()+1)+'-'+new_date.getDate()		//今天
			var	firstDay=new_date.getFullYear()+'-'+(new_date.getMonth()+1)+'-01' 	//当月第一天
            return{
                query_obj:{		//查询参数
					page:1,
					per_page:25,
					user:'',	//登录人的Id
					class_name:'',
					startdate:firstDay+" 00:00",
					enddate:Today+" 23:59",
					status:'',
					type:0		//0 表示直补
				},
                classsubsidy:{
                    MaxCount:50,
                    MaxPage:1,
                    DataList:[]
                },
                Status:['','待审核','未通过','待补贴','补贴','结业','',''],		//审核状态
                default_time: [firstDay,Today],	//默认时间
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
            }
        },
        methods:{
            rout(){
                window.history.back();
            },
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
                    // this.getData();
                    this.get_classs();
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
				this.$router.push('/admini/subsidy?id='+x.Id)
			},
            //查看课程
			goScheduleUrl(x){
				this.$router.push('/curriculum?url='+x.ScheduleUrl)
			},
            //查看学生
            goToReview_1(item){
                // if(item.Status==1 || item.Status==2){
				// 	this.$router.push('/Student?id='+item.Id+'&Status='+item.Status);
				// }else{
					this.$router.push('/quickstuednt?id='+item.Id+'&Status='+item.Status);
				// }
            },
            //查看信息
            see(x){
                this.$router.push('/channeldetails?id='+x.Id);
            },
            //分页
            handleCurrentChange(x){
                this.query_obj.page=x
                this.get_classs();
            },
            //选择时间
           change_time(){
				this.query_obj.page=1
				if(this.default_time && this.default_time!=null){
					this.query_obj.startdate=dateFtt(this.default_time[0],"yyyy-MM-dd")+' 00:00'
					this.query_obj.enddate=dateFtt(this.default_time[1],"yyyy-MM-dd")+' 23:59:59'
				}else{
					this.query_obj.startdate='';
					this.query_obj.enddate='';
                }
                this.get_classs();
            },
            search(){
                this.query_obj.page=1
                this.get_classs();
            },
            get_classs(){
                ajax('get','/class',this.query_obj,this.class_return)
            },
            class_return(x){
                var x=JSON.parse(x);
                console.log('查询直补',x)
                this.classsubsidy=x.Memory
            }
            
        },
        mounted(){
            // var query=this.$route.query;
            var user=JSON.parse(localStorage.user0609);
            this.query_obj.user=user.Id;
            this.get_classs();
        }
    }
</script>
<style scoped>
    #quick .main-btn {
		color: #ffffff;
		background: #3737e1;
        line-height: 30px;
	}
    .type_1{
        color: #2ea7df;
    }
    .type_2{
        color: #ff921c;
    }
    .type_3{
        color: #34b247
    }
    .type_4{
        color:#a0a0a0 
    }
    .type_5{
        color: #34b247
    }

    .table{
		margin-top: 1.8rem;
	}
	/* .table thead{
        border:1px solid #dee2e6;
    } */
	.table thead tr th{
		padding: 5px 0 5px 10px!important;
	}
	.table thead tr th.last{
		padding-left: 0!important;
	}
	.table td{
		padding: 5px 0 5px 10px;
	}
</style>
