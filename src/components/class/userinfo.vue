<template>
  	<div id="userInfo">
  		<section class="application container">
            <div class="d-flex align-items-center bread border-bottom">
            	您的位置： 个人信息
            </div>
            
			<section class="input-block">
                <h5 class="title">基本信息</h5>
				<form>
	                <div class="row">
	                	<div class="col-6">
	                		<div class="form-group row">
	    						<label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>登录账号</label>
	    						<div class="col-sm-8 input_box">
	      							<input readonly  pattern=".*[^ ].*" type="text"  class="form-control" v-model="user_obj.Code">
									<i v-if="Account_detection==2" class="err_1 el-icon-error"></i>
									<i v-if="Account_detection==1" class="ok_1 el-icon-success"></i>		
	    						</div>
	  						</div>
	                	</div>
	                    <div class="col-6">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>名称</label>
	                            <div class="col-sm-8">
		                            <input readonly attern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.Name">
	                            </div>
	                        </div>
	                    </div>

	                    <div class="col-6">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>联系人</label>
	                            <div class="col-sm-8">
	                          		<input readonly pattern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.Contacts">
	                            </div>
	                        </div>
	                    </div>
	                    <div class="col-6">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>联系电话</label>
	                            <div class="col-sm-8">
	                           		<input readonly pattern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.ContactNumber">
	                            </div>
	                        </div>
	                    </div>
	                    <div class="col-6">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>统一社会信用代码</label>
	                            <div class="col-sm-8">
	                            	<input readonly pattern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.CreditCode"/>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <div class="row">
	                    <div class="col-6">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>银行开户行</label>
	                            <div class="col-sm-8">
	                            	<input readonly pattern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.Bank">
	                            </div>
	                        </div>
	                    </div>
	                    <div class="col-6">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>户名</label>
	                            <div class="col-sm-8">
	                            	<input readonly pattern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.AccountName">
	                            </div>
	                        </div>
	                    </div>
	                    <div class="col-6">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>银行账号</label>
	                            <div class="col-sm-8">
	                            	<input readonly pattern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.AccountNo">
	                            </div>
	                        </div>
	                    </div>
						<div class="col-6">
							<div class="form-group row">
								<label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>选择工种</label>
								<div class="col-sm-8">
                                    <input readonly pattern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.Businessscope"/>
								</div>
							</div>
						</div>
	                </div>
					<div class="row">
						<div class="col-6">
							<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>机构企业</label>
	                            <div class="col-sm-8">
									<select disabled readonly v-model="user_obj.Type" required class="form-control">
										<option value="0">管理员</option>
										<option value="1">企业</option>
										<option value="2">机构</option>
									</select>
	                            </div>
	                        </div>
						</div>
					</div>
                   	<div class="col-12">
                    	<hr class="w-75 mt-5">
			            <div class="row mb-footer mt-5 d-flex justify-content-center">
			                <button type="button" @click="ret()" id="myBtn" class="mr-5 app-btn btn" style="background: #ffffff; color: #000000">返回</button>
			                <!-- <button type="button" class="btn app-btn">提交</button> -->
			            </div>
                    </div>
                    
                </form>
            </section>
            

            
        </section>
	
  	</div>
</template>

<script>
	// import '@/assets/pinyinjs-master/dict/pinyin_dict_withtone'
	// import {polyphone} from '@/assets/pinyinjs-master/pinyinUtil'
	import {http,paging,treeType,ajax} from '@/assets/fc';
	import  '@/assets/md5/md5.min';
	import crypto from 'crypto'
	export default {
	  	name: '',
	  	data(){
	  		return{
				businessscope_list: [],
				value11: [],
	  			role:[],			//所有角色
	  			user_obj:{			///用户对象
	  				PhoteUrl:'',
					  Type:0,
					  Pass_1:'123456',
	  				IsDisabled:1,
	  				"RoleList": [1],			//角色
					"PermissionList":[],	//权限
	  			},
	  			checkList:[],
	  			permission:[],	//所有权限
	  			defaultProps: {				//设置显示项目
		          children: 'children',
		          label: 'Name',
				},
				Account_detection:0,	//0 表示未检测 1表示正确 2表示错误
	  		}
	  	},//Contacts,ContactNumber,CreditCode,Bank,AccountName,AccountNo
	  	methods:{
			Testing(x){
				var x=JSON.parse(x);
				console.log(x)
				this.Account_detection= x.Result ? 1 : 2
			},
	  		//获取角色
	  		get_role(){
	  			http(this,'get','/role','',this.role_return)
	  		},
	  		role_return(x){
	  			console.log('获取角色',x)
	  			if(x.Result){
	  				this.role=x.Memory
	  			}else{
	  				this.Prompt=x.Message;
	  				$('#role .modal_1').modal('show');
	  			}
	  		},
	  		//获取单个用户
	  		get_user(x){
				// var x=JSON.parse(x);
				console.log('获取单个用户',x);
				this.user_obj=x.Memory
	  		},
	  		//返回
	  		ret(){
	  			window.history.back()
			},
			 businessscope(x){
				var x=JSON.parse(x);
				console.log('业务范围',x);
				var list=[];
				this.businessscope_list=x.Memory
			}
	  	},
	    created: function () {
            var user = JSON.parse(localStorage.user0609);
            http(this,'get','/user/id?id='+user.Id,'',this.get_user);


		},
	    mounted: function () {
			
		},

	}
</script>

<style scoped>
	#userInfo .checkbox{
		border: 1px solid #CCCCCC;
		border-radius: 3px;
		padding: 6px 12px;
	}
	#userInfo .input_box{
		position: relative;
	}
	#userInfo .input_box .err_1,
	#userInfo .input_box .ok_1{
		position: absolute;
		right: -10px;
		top: 11px;
	}
	#userInfo .input_box .err_1{
		color: red;
	}
	#userInfo .input_box .ok_1{
		color: #04b980;
	}


	#userInfo .checkbox_1 label{
		display: block;
		/*margin-left: 0px;*/
	}
    #userInfo .mr-413 {
        margin-right: 10%;
        padding-top: 1.2rem;
    }
    #userInfo .progress {
        height: 300px;
    }
    #userInfo .rej:before {
        position: relative;
        display: inline-block;
        top: 10px;
        margin-right: 10px;
    }
    #userInfo .status {
        height: 100px;
        border: 2px dashed #e5e5e5;
    }
    #userInfo .info {
        vertical-align: middle
    }
    #userInfo .input-block h5 {
        font-size: 24px;
        border-left: 10px solid #3737e1;
        padding-left: 7%;
        margin-top: 4%;
        margin-bottom: 4%;
    }
    #userInfo .input-block .info {
        /*margin-bottom: 2%;*/
       /*margin-bottom: 20px;*/
        /*text-align: left;*/
    }
    #userInfo .input-block .info>label {
        color: #888888;
        /*display: inline-block;*/
        /*width: 160px;*/
        /*margin-right: 1.5rem;*/
        /*margin-left: 10rem;*/
        /* line-height: 1rem; */
    }
    #userInfo .mb-footer {
        margin-bottom: 10rem;
    }
    #userInfo .input-block input {}
    #userInfo .app-btn {
        width: 126px;
        height: 36px;
        border: none;
        border: 1px solid #eaeaea;
        background: #3737e1;
        color: #ffffff;
        border-radius: 5px;
    }
    #userInfo .dialog {
        height: 340px;
        background: #ffffff;
        width: 50%;
        z-index: 1;
        margin: 12% auto;
        /* overflow: auto;   */
    }
    #userInfo .dialog textarea {
        width: 450px;
        height: 200px;
    }
    #userInfo .dialog-head {
        height: 50px;
        background-repeat: repeat-x;
    }
    #userInfo #background {
        display: block;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
    /* The Modal (background) */
    #userInfo .modal {
        display: none;
        /* Hidden by default */
        position: fixed;
        /* Stay in place */
        z-index: 1;
        /* Sit on top */
        left: 0;
        top: 0;
        width: 100%;
        /* Full width */
        height: 100%;
        /* Full height */
        overflow: auto;
        /* Enable scroll if needed */
        background-color: rgb(0, 0, 0);
        /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4);
        /* Black w/ opacity */
    }
    /* Modal Content/Box */
    #userInfo .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        /* 15% from the top and centered */
        padding: 20px;
        height: 15rem;
        border: 1px solid #888;
        width: 50%;
        /* Could be more or less, depending on screen size */
    }

    /* The Close Button */
    #userInfo .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }
    #userInfo .close:hover,
    #userInfo .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
    #userInfo textarea {
        resize: none;
        border: none;
        outline: none;
        height: 8rem;
    }
    #userInfo .btn-color {
        background: #3737e1;
        color: #ffffff;
    }
    #userInfo .ml-50p {
        margin-left: 38%;
    }
	 #userInfo .input-block label{
		 margin-right: 0px;
	}
</style>
