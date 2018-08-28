<template>
  	<div id="statistics">
        <div class="container">
            <div class="row filter mt-4">
				<label class="pt-2">录入时间：</label>
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
            <hr>

            <ul class="box_3 row justify-content-between">
                <li class="col-lg-5">
                    <header>培训人数</header>
                    <ul class="box_4 container-fluid">
                        <li class=" row justify-content-center text-center">
                            <div class="bg_1">
                                <div class="title_1">培训人数</div>
                                <span>{{data_obj.PersonCount.AllCount}}</span>
                            </div>
                        </li>
                        <li class="row justify-content-between text-center">
                            <div class="bg_2">
                                <div class="title_1">机构培训数</div>
                                <span>{{data_obj.PersonCount.AgencyCount}}</span>
                            </div>
                            <div class="bg_2">
                                <div class="title_1">企业培训数</div>   
                                <span>{{data_obj.PersonCount.CompanyCount}}</span> 
                            </div>
                            <div class="bg_2">
                                <div class="title_1">个人补贴数</div>
                                <span>{{data_obj.PersonCount.SubsidyCount}}</span>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="col-lg-5">
                    <header>合格率</header>
                    <ul class="box_4 container-fluid">
                        <li class=" row justify-content-center text-center">
                            <div class="bg_1">
                                <div class="title_1">合格率</div>
                                <span>{{data_obj.Qualified.AllPassRate}}</span> 
                            </div>
                        </li>
                        <li class="row mt-5 justify-content-between text-center">
                            <div class="bg_2">
                                <div class="title_1">机构合格率</div> 
                                <span>{{data_obj.Qualified.AgencyPassRate}}</span>
                            </div>
                            <div class="bg_2">
                                <div class="title_1">企业合格率</div>   
                                <span>{{data_obj.Qualified.CompanyPassRate}}</span> 
                            </div>
                            <div class="bg_2">
                                <div class="title_1">个人补贴合格率</div> 
                                <span>{{data_obj.Qualified.SubsidyPassRate}}</span>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="col-lg-5">
                    <header>结业人数</header>
                    <ul class="box_4 container-fluid">
                        <li class=" row justify-content-center text-center">
                            <div class="bg_1">
                                <div class="title_1">结业人数</div>
                                <span>{{data_obj.Closing.AllFinishCount}}</span>
                            </div>
                        </li>
                        <li class="row mt-5 justify-content-between text-center">
                            <div class="bg_2">
                                <div class="title_1">机构结业数</div>
                                <span>{{data_obj.Closing.AgencyFinishCount}}</span>
                            </div>
                            <div class="bg_2">
                                <div class="title_1">企业结业数</div>   
                                <span>{{data_obj.Closing.CompanyFinishCount}}</span> 
                            </div>
                            <div class="bg_2">
                                <div class="title_1">个人结业数</div>
                                <span>{{data_obj.Closing.SubsidyFinishCount}}</span>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="col-lg-5">
                    <header>补贴金额</header>
                    <ul class="box_4 container-fluid">
                        <li class=" row justify-content-center text-center">
                            <div class="bg_1">
                                <div class="title_1">总补贴金额</div>
                                <span>{{data_obj.Amount.AllPrice}}</span>
                            </div>
                        </li>
                        <li class="row mt-5 justify-content-between text-center">
                            <div class="bg_2">
                                <div class="title_1">机构金额</div>
                                <span>{{data_obj.Amount.AgencyPrice}}</span>
                            </div>
                            <div class="bg_2">
                                <div class="title_1">企业金额</div>   
                                <span>{{data_obj.Amount.CompanyPrice}}</span> 
                            </div>
                            <div class="bg_2">
                                <div class="title_1">个人金额</div>
                                <span>{{data_obj.Amount.SubsidyPrice}}</span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>

            <br>
            <br>
            <br>
            <br>
            
        </div>            
  	</div>
</template>

<script>
    import {ajax , DX,dateFtt} from '@/assets/fc'
    export default {
        name: '',
        data(){
            var new_date=new Date();
			var Today=new_date.getFullYear()+'-'+(new_date.getMonth()+1)+'-'+new_date.getDate()		//今天
			var	firstDay=new_date.getFullYear()+'-'+(new_date.getMonth()+1)+'-01' 	//当月第一天
            return{
                query_obj:{		//查询参数
                    // page:1,
                    // per_page:10,
                    // user:'',	//登录人的Id
                    // class_name:'',
                    startdate:firstDay+" 00:00",
                    enddate:Today+" 23:59",
                    // status:'',
                    // type:0		//0 表示直补
                },
                default_time: [firstDay,Today],	//默认时间
                pickerOptions2: {
                    shortcuts: [{
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
                data_obj:{
                    Amount:{},  //金额
                    Closing:{}, //结业人数
                    PersonCount:{}, //培训人数
                    Qualified:{},   //合格率
                }
            }
        },
        methods:{
            //选择时间
           change_time(){
				this.query_obj.page=1
				if(this.default_time && this.default_time!=null){
					this.query_obj.startdate=dateFtt(this.default_time[0],"yyyy-MM-dd")+' 00:00'
                    this.query_obj.enddate=dateFtt(this.default_time[1],"yyyy-MM-dd")+' 23:59:59';
                    this.get_data();
				}else{
					// this.query_obj.startdate='';
                    // this.query_obj.enddate='';
                    this.$message({
                        showClose: true,
                        message: '请选择查询时间！',
                        type: 'error'
                    });
                }
            },
            get_data(){
                ajax('get','/statistics',this.query_obj,this.data_return)
            },
            data_return(x){
                var x=JSON.parse(x)
                if(x.Result){
                    this.data_obj=x.Memory
                }
                console.log('获取数据',x);
            }
        },
        created: function () {
            
        },
        mounted: function () {
            this.get_data()
            // http://127.0.0.1:2000/v1/statistics?startdate=2017-7-30 16:20:52&enddate=2018-7-30 16:20:52
        },
    }
</script>

<style>
    #statistics .box_3{
        display: -webkit-flex;
        display: flex;
        flex-wrap: wrap;
    }
    #statistics .box_3>li{
        /* width: 50% */
        margin: 70px 0px 0px 0px;
    }
    #statistics .box_3>li>header{
        position: relative;
        padding: 0px 0px 0px 20px;
        color: #484848;
    }
    #statistics .box_3>li>header::after{
        position: absolute;
        top: 8px;
        left: 0px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #2f2ddd;
        content: "";
    }
    #statistics .box_4{
        position: relative;
        overflow: hidden;
        margin: 10px 0px 0px 0px;
    }
    #statistics .box_4>li:nth-child(2){
        margin: 50px 0px 0px 0px;
    }
    #statistics .box_4::after{
        position: absolute;
        top: 50%;
        left: 15%;
        width: 70%;
        height: 100%;
        content: '';
        border: 1px solid #302fe2;
        border-radius: 5px;
        z-index: 0;
    }
    #statistics .box_4::before{
        position: absolute;
        top: 0%;
        left: 50%;
        width: 1px;
        height: 50%;
        content: '';
        background: #302fe2;
        z-index: 0;
    }
    #statistics .box_4 .title_1{
        font-size: 14px;
    }
    #statistics .box_4>li>div:not(:nth-child(1)):not(:nth-last-child(1)):after{
        position: absolute;
        top: -25px;
        left: 50%;
        width: 1px;
        height: 25px;
        content: '';
        background: #302fe2;
        z-index: 0;
    }

    #statistics .box_4 .bg_1,
    #statistics .box_4 .bg_2{
        position: relative;
        z-index: 1;
        min-width: 110px;
         padding: 5px 0px;
    }
    #statistics .box_4 .bg_1{
        background: #302fe2;
        color: #ffffff;
       
        border-radius: 10px;
    }
     #statistics .box_4 .bg_1>span,
     #statistics .box_4 .bg_2>span{
         font-weight: bold;
     }
    #statistics .box_4 .bg_2{
        background: #e6e6e6;
        border-radius: 10px;
    }













</style>
