<template>
  	<div id="statistics">
        <div class="container">
        	<p class="title-search">条件筛选：</p>
        	<el-row>
        		<el-col :span="6">
        			<el-select v-model="userType" clearable placeholder="机构类型">
					    <el-option
					      v-for="item in userTypes"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-input
					  :class="'input-name'"
					  placeholder="名称"
					  v-model="userName"
					  clearable>
					</el-input>
				</el-col>
				<el-col :span="6">
					<el-select v-model="TrainingType" clearable filterable placeholder="工种">
					    <el-option
					      v-for="item in TrainingTypes"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
		        </el-col>
		        <el-col :span="6">
					<el-select v-model="level" clearable placeholder="等级">
					    <el-option
					      v-for="item in levels"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-col>
        	</el-row>
        	
        	<el-row>
				<el-col :span="6">
					<el-input
					  :class="'input-name'"
					  placeholder="班次"
					  v-model="classIndex"
					  clearable>
					</el-input>
				</el-col>
				<el-col :span="12">
					<el-date-picker
					  value-format="yyyy-MM-dd"
				      v-model="date"
				      type="daterange"
				      align="right"
				      unlink-panels
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      :picker-options="pickerOptions2">
				    </el-date-picker>
		        </el-col>
		        <el-col :span="6">
					<el-select v-model="state" clearable placeholder="状态">
					    <el-option
					      v-for="item in states"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
		        </el-col>
        	</el-row>
        	<el-row>
        		<el-col :span="6" :offset="18">
					<el-button type="primary" icon="el-icon-search" @click="searchTotal">搜索</el-button>
		        </el-col>
        	</el-row>

        	<p class="title-search">查询结果：</p>
        	<!-- <table width="100%" class="table-total">
	        	<tr class="con">
	        		<td>班次</td>
	        		<td>名称</td>
	        		<td>开班时间</td>
	        		<td>结束时间</td>
	        		<td>培训地址</td>
	        		<td>专业</td>
	        		<td>等级</td>
	        		<td>培训人数</td>
	        		<td>证书类型</td>
	        	</tr>
	        	<tr class="con">
	        		<td>9999</td>
	        		<td>9999</td>
	        		<td>9999</td>
	        		<td>9999</td>
	        		<td>9999</td>
	        		<td>9999</td>
	        		<td>9999</td>
	        		<td>9999</td>
	        		<td>9999</td>
	        	</tr>
	        </table> -->
	        <el-table :data="dataList.slice((currpage - 1) * pagesize, currpage * pagesize)" border style="width: 100%">
		    	<!-- <el-table-column type="index" label="序号" width="45"></el-table-column> -->
		        <el-table-column prop="Name" label="班次" width="110"></el-table-column>
		        <el-table-column prop="CreateUserName" label="名称" width="130"></el-table-column>
		        <el-table-column prop="TrainingStartDate" label="开班时间" width="95"></el-table-column>
		        <el-table-column prop="TrainingEndDate" label="结束时间" width="95"></el-table-column>
		        <el-table-column prop="TrainingAddress" label="培训地址"></el-table-column>
		        <el-table-column prop="TrainingType" label="专业" width="100"></el-table-column>
		        <el-table-column prop="TrainingLevel" label="等级" width="95"></el-table-column>
		        <el-table-column prop="TrainingPersonNumber" label="培训人数" width="50"></el-table-column>
		        <el-table-column prop="CertificateType" label="证书类型" width="95"></el-table-column>
		    </el-table>
			<div class="text-right" style="margin-top: 15px;">
				<el-pagination background 
					layout="prev, pager, next, sizes, total, jumper"
					:page-sizes="[10, 15, 20, 25]"
					:page-size="pagesize"
					:total="dataList.length"
					@current-change="handleCurrentChange" 
					@size-change="handleSizeChange" 
					>
				</el-pagination>
			</div>
	

        	<p class="title-search">统计：</p>
        	<table width="100%" class="table-total">
	        	<tr class="con">
	        		<td>补贴金额</td>
	        		<td>通过人数</td>
	        		<td>通过率</td>
	        		<td>总补贴金额</td>
	        		<td>开班数</td>
	        		<td>培训人数</td>
	        	</tr>
	        	<tr class="con">
	        		<td>{{statistics.SubsidyPrice}}</td>
	        		<td>{{statistics.PassPersonNum}}</td>
	        		<td>{{statistics.PersonPassRate}}</td>
	        		<td>{{statistics.PriceAll}}</td>
	        		<td>{{statistics.ClassCount}}</td>
	        		<td>{{statistics.PersonNum}}</td>
	        	</tr>
	        </table>
        </div>
  	</div>
</template>

<script>
    import {ajax , DX, dateFtt} from '@/assets/fc'
    export default {
        data() {
        	return {
        		userType: '',
        		userTypes:[{
        		// 	value: "",
        		// 	label: "全部"
        		// },{
        			value: "2",
        			label: "机构"
        		},{
        			value: "1",
        			label: "企业"
        		},{
        			value: "3",
        			label: "个人直补"
        		}],
        		userName: '',
        		TrainingType: '',
        		TrainingTypes: [],
        		level: '',
        		levels: [],
        		classIndex: '',
        		state: '',
        		states: [{
        		// 	value: "",
        		// 	label: "全部"
        		// },{
        			value: "1",
        			label: "待审核"
        		},{
        			value: "3",
        			label: "已通过"
        		},{
        			value: "2",
        			label: "未通过"
        		},{
        			value: "4",
        			label: "补贴"
        		},{
        			value: "5",
        			label: "结业"
        		},{
        			value: "6",
        			label: "冻结"
        		}],
        		date: [],
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
			    page: 1,
			    per_page: 9999,
			    dataList: [],
			    currpage: 1,
			    pagesize: 10,
			    statistics: {}
        	}
        },
        methods: {
        	searchTotal() {
        		var params = {
        			page: this.page,
        			per_page: this.per_page,
        			startdate: this.startdate,
        			enddate: this.enddate,
        			type: this.userType,
        			name: this.userName,
        			profession: this.TrainingType,
        			level: this.level,
        			status: this.state,
        			batch: this.classIndex
        		}
        		// console.log(params)
        		ajax('get','/statisticsall', params, re => {
        			re = JSON.parse(re)
        			if(re.Result){
        				re.Memory.DataList.forEach(v => {
        					v.TrainingStartDate = dateFtt(v.TrainingStartDate,'yyyy-MM-dd')
        					v.TrainingEndDate = dateFtt(v.TrainingEndDate,'yyyy-MM-dd')
        				})
        				this.dataList = re.Memory.DataList
        				console.log(this.dataList)
        				this.statistics = re.Memory.Statistics
        			}else{
        				this.$message({
				          showClose: true,
				          message: re.Message,
				          type: 'warning'
				        });
        			}
        		})
        	},
        	//查询
            getbusinessscope(){
                ajax('get','/businessscope','',this.businessscope_return);
            },
            businessscope_return(x){
                var x=JSON.parse(x)
                this.TrainingTypes = x.Memory.map(v => {return {value: v.Name, label: v.Name}})
                // this.TrainingTypes.unshift({value: '', label: '全部'})
            },
            subsidystandard(){
                ajax('get','/subsidystandard','',this.subsidystandard_return)
            },
            subsidystandard_return(x){
                var x=JSON.parse(x);
                this.levels = x.Memory.map(v => {return {value: v.Name, label: v.Name}})
                // this.levels.unshift({value: '', label: '全部'})
            },
            handleCurrentChange(cpage) {
				this.currpage = cpage;
			},
			handleSizeChange(psize) {
				this.pagesize = psize;
			}

        },
        computed: {
        	startdate() {
        		return this.date ? this.date[0] :  ''
        	},
        	enddate() {
        		return this.date ? this.date[1] :  ''
        	}
        },
        mounted() {
        	this.getbusinessscope()
        	this.subsidystandard()
        }


    }
</script>

<style scoped>
	#statistics p.title-search{
		margin-top: 40px;
		margin-bottom: 20px;
		font-size: 18px;
	}
	#statistics .el-select{
		margin-bottom: 20px;
	}
	#statistics .el-row{
		padding: 0 90px;
	}
	#statistics .table-total td{
		text-align: center;
		border: 1px solid #000;
        padding: 10px 5px;
	}
	.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: 430px;
	}
	.el-button{
		padding: 12px 74px;
	}
	.input-name{
		width: 197px;
	}
	.el-table, >>> th{
        text-align: center;
    }
    .el-table >>> td, .el-table >>> th {
        padding: 0;
        
    }
    .el-table >>> .cell{
    	display:-webkit-box; 
	    -webkit-box-orient:vertical;
	    -webkit-line-clamp:2;
	    display: -moz-box; 
	    -moz-line-clamp: 2;
	    -moz-box-orient: vertical;
	    overflow: hidden;
    }

    .container{
    	padding-bottom: 40px;
    }
</style>
