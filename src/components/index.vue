<template>
  	<div id="index">
  		<div class="head">
            <div class="container d-flex justify-content-between">
            	
                <ul class="d-flex">
                    <li v-if="user.Type=='SYSTEM' || user.Type==0">
                        <router-link class="mr-5" to="/admini/home">课程审核</router-link>
						<span v-if="classTodo != 0" class="todoing">{{classTodo}}</span>
                    </li>
                    <!-- <li v-if="user.Type!='SYSTEM'">
                        <a href="javascript:;" @click="no()" class="mr-5">课程补贴</a>
                    </li> -->
                    <li v-if="user.Type=='SYSTEM' || user.Type==0">
						<router-link to="/quick" class="mr-5">
							个人直补
						</router-link>
						
                    </li>
                    <li class="sub" v-if="user.Type!='SYSTEM' && user.Type!=0">
                        <a href="javascript:;" class="mr-5">查询</a>
                        <div class="subnav">
                            <!-- <a href="#" class="">查询人员</a> -->
                            <router-link to="/home">查询班级</router-link>
                            <!-- <a href="javascript:;" @click="no()" class="">数据查看</a> -->
                        </div>
                    </li>

					<li v-if="user.Type=='SYSTEM' || user.Type==0">
						<router-link class="mr-5" to="/admini/subsidyAudit">补贴审核</router-link>
						<span v-if="subsidyTodo != 0" class="todoing">{{subsidyTodo}}</span>
                    </li>
                    <li class="sub" v-if="user.Type=='SYSTEM' || user.Type==0">
                        <a class="mr-5">基本设置</a>
                        <div class="subnav">
                        	<!-- <router-link to="/role">角色管理</router-link> -->
                        	<router-link to="/user">账号管理</router-link>
							<router-link to="/subsidystandard">补贴标准</router-link>
							<router-link to="/businessscope">业务范围</router-link>
                        </div>
                    </li>
					<li class="sub" v-if="user.Type=='SYSTEM' || user.Type==0">
                        <a class="mr-5">查询</a>
                        <div class="subnav">
							<router-link to="/admini/statistics">数据统计</router-link>
                        </div>
                    </li>
					<li>
						<router-link to="/modifypassword" class="mr-5">
							修改密码
						</router-link>
					</li>
					<li v-if="user.Type!='SYSTEM' && user.Type!=0">
						<router-link to="/userinfo" class="mr-5">
							个人信息
						</router-link>
					</li>
                </ul>
				
                <span class="close_1">{{user.Name}}&emsp;<span @click="exit">退出</span></span>
            </div>
        </div>
		<router-view @getClass="getClassTodo" @getSubsidy="getSubsidyTodo"></router-view>
  	</div>
</template>

<script>
import {ajax} from '@/assets/fc';
export default {
  	name: '',
  	data(){
  		return{
			user:{},
			classTodo: 0,
			subsidyTodo: 0
		}
  	},
  	methods:{
  		no(){
  			 this.$notify({
          		title: '提示',
         		message: '功能维护中',
          		type: 'warning'
        	});
		},
		exit(){
			localStorage.removeItem('user0609')
			this.$router.replace({path:'/'})
		},
		getClassTodo(n) {
			this.classTodo = n;
		},
		getSubsidyTodo(n) {
			this.subsidyTodo = n;
		},
  	},
    mounted: function () {
		if(!localStorage.user0609 && localStorage.user0609!=''){
			this.$router.push('/')
		}else{
			this.user=JSON.parse(localStorage.user0609);
			// console.log(this.user)
		}

		//课程审核待处理的条数
		var params1 = { page: 1,
						per_page: 99999,
						user: '',	
						class_name: '',
						startdate:"",
						enddate:"",
						status: 1,
						type: 1		//1是普通班，0是直补班
					}
		ajax('get','/class', params1, (x) => {
			var x=JSON.parse(x);
			if(x.Result){
				this.classTodo = x.Memory.DataList.length;
			}
		});
		//补贴审核待处理的条数
		var params2 = { page:1,
						per_page:99999,
						user:'',    //用户Id
						class_name:'',    //班级名称
						startdate:'',
						enddate:'',
						status: 1,  //补贴状态 ''全部 1待审核 2为通过 3通过
					}
		ajax('get','/classsubsidy/page', params2, (x) => {
			var x=JSON.parse(x);
			console.log(x)
			if(x.Result){
				this.subsidyTodo = x.Memory.DataList.length;
			}
		})
		
	},
}
</script>

<style>
	#index .head {
	    height: 50px !important;
	    background: url(../assets/img/nav.png);
	    /* background-position: 30px 0px; */
	}
	#index .head ul>li{
		position: relative;
	}
	#index .head ul>li>a {
	    color: white;
	    height: 50px;
	    display: block;
	    margin-right: 1rem;
	    line-height: 50px;
	}
	#index .head ul>li>span{
		position: absolute;
		width: 15px;
		height: 15px;
		background: orangered;
		text-align: center;
		line-height: 15px;
		border-radius: 50%;
		font-size: 12px;
		color: #fff;
		right: 20px;
		top: 10px;
	}
	#index .head .subnav {
	     display: none; 
	    position: absolute;
	    top: 49px;
	    left: -10px;
	    height: 110px;
	    width: 160px;
	    border-top: 3px solid grey;
	    z-index: 10;
	}
	#index .head ul>li:hover .subnav{
		display: block;
	}
	#index .head .subnav a,#index .head .subnav .sub>a {
	    display: block;
	    padding-top: .44rem;
	    padding-left: 1rem;
	    padding-bottom: .44rem;
	    background-color: #ffffff;
	    box-shadow: 0px 5px 17px 0px rgba(167, 162, 162, 0.16);
	    color: #444444;
	}
	#index .head .subnav>a:hover {
	    background: #eaeaea;
	}
	#index .head .close_1{
		line-height: 50px;
	}
	#index .head .close_1 span{
		cursor: pointer;
	}
</style>
