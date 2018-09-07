<template>
    <div id="adoptstudent">
        <section class="application container">
            <div class="d-flex align-items-center bread border-bottom">
            	您的位置： 补贴审核
            </div>
            <div class="row mt-4 filter">
                <label class="pt-2">班级名称：</label>
                <div>
                    <div class="search border rounded" style="width:350px;">
                        <input style="padding-left:10px" type="text" class="w-85 search-input" placeholder="搜索" v-model="query_obj.class_name" />
                        <img src="@/assets/img/search.png" @click="search()" class="search-btn">
                    </div>
                </div>
            </div>
            <div class="row filter_1 mt-4">
				<label class="pt-1">课程状态：</label>
				<a href="javascript:void(0)" :class="{'active':returnData2.tag==''}" @click="mkCourse('')">全部<span v-if="this.allCount != 0">({{this.allCount}})</span></a>
				<a href="javascript:void(0)" :class="{'active':returnData2.tag=='1', orangeColor: this.state1Count != 0}" @click="mkCourse('1')">审核中<span v-if="this.state1Count != 0">({{this.state1Count}})</span></a>
				<a href="javascript:void(0)" :class="{'active':returnData2.tag=='3', orangeColor: this.state3Count != 0}" @click="mkCourse('3')">已通过<span v-if="this.state3Count != 0">({{this.state3Count}})</span></a>
				<a href="javascript:void(0)" :class="{'active':returnData2.tag=='2', orangeColor: this.state2Count != 0}" @click="mkCourse('2')">未通过<span v-if="this.state2Count != 0">({{this.state2Count}})</span></a>
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
            <table class="table1 table-striped" >
				<thead>
					<tr>
						<th scope="col">状态</th>
						<th scope="col">申请班级</th>
                        <th>专业</th>
                        <th>等级</th>
						<th scope="col">培训人数</th>
                        <th>金额</th>
                        <th scope="col">申请时间</th>
						<th scope="col" style="width:100px" class="text-center">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in classsubsidy.DataList" :key="index">
						<td scope="row" style="padding-left:15px">{{Status[item.Status]}}</td>
						<td>{{item.ClassName}}</td>
                        <td>{{item.Profession}}</td>
                        <td>{{item.Level}}</td>
						<td>{{item.TrainingPersonCount}}</td>
						<td>{{item.SubsidyPrice}}</td>
                        <td>{{item.CreateDate.slice(0,10)}}</td>
						<td class="text-center">
							<button class="btn btn-info btn-sm" @click="see(item)">查看</button>
							<!-- <button class="btn btn-info btn-sm" @click="goToReview_1(item, index)">学生信息</button> -->
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
        props: {
            returnData2: {
                type: Object
            }
        },
        data(){
   //          var new_date=new Date();
			// var Today=new_date.getFullYear()+'-'+(new_date.getMonth()+1)+'-'+new_date.getDate()		//今天
			// var	firstDay=new_date.getFullYear()+'-'+(new_date.getMonth()+1)+'-01' 	//当月第一天
            var Today=''
            var  firstDay=''
            return{
                query_obj:{
                    page:1,
                    per_page:25,
                    user:'',    //用户Id
                    class_name:'',    //班级名称
                    startdate:'',
                    enddate:'',
                    status:'',  //补贴状态 ''全部 1待审核 2为通过 3通过
                },
                classsubsidy:{
                    MaxCount:50,
                    MaxPage:1,
                    DataList:[]
                },
                Status:['','待审核','未通过','已通过','补贴','','',''],		//审核状态
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
                allCount: 0,
				state1Count: 0,
				state2Count: 0,
				state3Count: 0
            }
        },
        methods:{
            rout(){
                window.history.back();
            },
            see(x){
                // addsubsidy?id=3&status=1
                // console.log(x)
                this.$router.push('/addsubsidy?id='+x.Id+'&status=1&examine=1')
            },
            mkCourse(x, page=1){
                this.query_obj.status=x
                this.query_obj.page=page
                this.get_classsubsidy();
                this.$emit("getReturnData2", {tag: x, page})
            },
            //分页
            handleCurrentChange(x){
                this.query_obj.page=x
                this.get_classsubsidy();
                this.$emit("getReturnData2", {tag: this.query_obj.status, page: x})
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
                this.get_classsubsidy();
            },
            search(){
                this.query_obj.page=1
                this.get_classsubsidy();
            },
            get_classsubsidy(){
                ajax('get','/classsubsidy/page',this.query_obj,this.classsubsidy_return)
            },
            classsubsidy_return(x){
                var x=JSON.parse(x);
                console.log('查询补贴',x)
                if(x.Result){
                    this.classsubsidy=x.Memory;
                }
            },
            getsubsidy2(returnData2) {
                this.query_obj.per_page = 99999;
                ajax('get','/classsubsidy/page',this.query_obj, (data) => {
                    data = JSON.parse(data);
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
                    this.query_obj.per_page = 25;
                    this.$emit("getSubsidy", this.state1Count);
                    this.mkCourse(returnData2.tag, returnData2.page)
                })
            }
            
        },
        mounted(){
            // var query=this.$route.query;
            // this.get_classsubsidy();
            console.log(this.returnData2)
            this.getsubsidy2(this.returnData2)

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
    /* hr{
        margin-bottom: 0!important;
    } */
    .table1{
        font-size: 14px;
        width: 100%;
        margin-top: 1.8rem;
    }
    .table1 thead{
        border:1px solid #dee2e6;
    }
    .table1 thead tr th{
        padding: 5px;
        padding-left: 20px;
    }
    .table1 tbody tr td{
        padding: 3px;
        vertical-align: middle;
        padding-left: 15px;
    }
	.orangeColor{
		color: orangered!important;
	}
</style>
