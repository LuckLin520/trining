<template>
  	<div id="userdetails">
  		<section class="application container">
            <div class="d-flex align-items-center bread border-bottom">
            	您的位置： 用户详情
            </div>
            
			<section class="input-block">
                <h5 class="title">基本信息填写</h5>
				<form @submit.prevent="form_1()">
	                <div class="row">
	                	<div class="col-6">
	                		<div class="form-group row">
	    						<label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>登录账号</label>
	    						<div class="col-sm-8 input_box">
	      							<!-- <input :required="!user_obj.Id" @change="change_1()" :readonly="user_obj.Id" pattern=".*[^ ].*" type="text"  class="form-control" v-model="user_obj.Code"> -->
									<input readonly type="text"  class="form-control" v-model="user_obj.Code">
									<i v-if="Account_detection==2" class="err_1 el-icon-error"></i>
									<i v-if="Account_detection==1" class="ok_1 el-icon-success"></i>		
	    						</div>
	  						</div>
	                	</div>
	                    <div class="col-6">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>名称</label>
	                            <div class="col-sm-8">
		                            <input required="" :readonly="isReadonly" @change="change_1()" v-on:input="input_1()" pattern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.Name">
	                            </div>
	                        </div>
	                    </div>
	                    <!-- <div class="col-6" v-if="this.user_obj.Type != '0' && this.user_obj.Type != 'SYSTEM'">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>登录密码</label>
	                            <div class="col-sm-8">
		                            <input :readonly="!user_obj.Id" pattern=".*[^ ].*" :type="input_type"  class="form-control" v-model="user_obj.Pass_1">
	                            </div>
	                        </div>
	                    </div>
	                    <div class="col-6" v-if="user_obj.Id && this.user_obj.Type != '0' && this.user_obj.Type != 'SYSTEM'">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>重复密码</label>
	                            <div class="col-sm-8">
		                            <input pattern=".*[^ ].*" type="password" class="form-control" v-model="user_obj.Pass_2">
	                            </div>
	                        </div>
	                    </div> -->
	                    <div class="col-6" v-if="this.user_obj.Type != '0' && this.user_obj.Type != 'SYSTEM'">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>联系人</label>
	                            <div class="col-sm-8">
	                          		<input required pattern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.Contacts">
	                            </div>
	                        </div>
	                    </div>
	                    <div class="col-6" v-if="this.user_obj.Type != '0' && this.user_obj.Type != 'SYSTEM'">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>联系电话</label>
	                            <div class="col-sm-8">
	                           		<input required="" pattern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.ContactNumber" @change="checkChange1">
									<span v-if="showInfo.change1" style="color:red;">请输入正确的手机号码！</span>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="col-6" v-if="this.user_obj.Type != '0' && this.user_obj.Type != 'SYSTEM'">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>统一社会信用代码</label>
	                            <div class="col-sm-8">
	                            	<input required="" pattern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.CreditCode" @change="checkChange2"/>
									<span v-if="showInfo.change2" style="color:red;">信用代码不能含有中文或字符！</span>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="col-6"  v-if="this.user_obj.Type != '0' && this.user_obj.Type != 'SYSTEM'">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>银行开户行</label>
	                            <div class="col-sm-8">
	                            	<input required="" pattern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.Bank">
	                            </div>
	                        </div>
	                    </div>
	                    <div class="col-6"  v-if="this.user_obj.Type != '0' && this.user_obj.Type != 'SYSTEM'">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>户名</label>
	                            <div class="col-sm-8">
	                            	<input required="" pattern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.AccountName">
	                            </div>
	                        </div>
	                    </div>
	                    <div class="col-6"  v-if="this.user_obj.Type != '0' && this.user_obj.Type != 'SYSTEM'">
	                    	<div class="form-group row">
	                            <label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>银行账号</label>
	                            <div class="col-sm-8">
	                            	<input required="" pattern=".*[^ ].*" type="text" class="form-control" v-model="user_obj.AccountNo" @change="checkChange3">
									<span v-if="showInfo.change3" style="color:red;">银行账号不能含有中文或字符！</span>
	                            </div>
	                        </div>
	                    </div>
						<div class="col-6" v-if="this.user_obj.Type != 'SYSTEM'">
							<div class="form-group row">
								<label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>机构企业</label>
								<div class="col-sm-8" >
									<select :readonly="isReadonly" :disabled="isReadonly" name="" v-model="user_obj.Type" required class="form-control">
										<option value="0">管理员</option>
										<option value="1">企业</option>
										<option value="2">机构</option>
									</select>
								</div>
							</div>
						</div>
						<div class="col-6"></div>
						<div class="col-6" v-if="this.user_obj.Type != '0' && this.user_obj.Type != 'SYSTEM'">
							<div class="form-group row">
								<label class="col-sm-4 col-form-label text-right"><span class="text-danger">* </span>选择工种</label>
								<!-- <div class="col-sm-8" style="padding-left:5px">
									<el-select style="width:100%" v-model="value11" multiple collapse-tags placeholder="请选择">
										<el-option
											v-for="item in businessscope_list"
											:key="item.Name"
											:label="item.Name"
											:value="item.Name">
										</el-option>
									</el-select> 
								</div> -->
								<div class="col-sm-8">
									<input pattern=".*[^ ].*" type="text" class="form-control" v-model="businessscope_search" placeholder="输入关键字搜索" @input="handleSearch">
								</div>
							</div>
						</div>
						<div class="col-12 select-box" v-if="this.user_obj.Type != '0' && this.user_obj.Type != 'SYSTEM'">
							<el-checkbox-group v-model="value11">
								<el-checkbox v-for="(item,idx) in filterArr" :label="item.Name" :key=idx></el-checkbox>
							</el-checkbox-group>
							<div v-if="!filterArr.length" style="text-align:center">没有找到相关工种！</div>
						</div>
						
						<div class="col-12">
							<hr class="w-75 mt-5">
							<div class="row mb-footer mt-5 d-flex justify-content-center">
								<button type="button" @click="ret" id="myBtn" class="mr-5 app-btn btn" style="background: #ffffff; color: #000000">返回</button>
								<button v-if="!isReadonly" type="submit" class="btn app-btn">提交</button>
								<button v-if="user.Type == 'SYSTEM'" @click="resetPassword" type="button" class="ml-5 btn app-btn" style="width: initial; background:#fd902e; ">重置该用户密码</button>
							</div>
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
				isReadonly: false,
				businessscope_list: [],
				businessscope_search: '',
				filterArr: [],
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
				input_type:'text',
				showInfo: {
					change1: false,
					change2: false,
					change3: false
				}
	  		}
	  	},//Contacts,ContactNumber,CreditCode,Bank,AccountName,AccountNo
	  	methods:{
			handleSearch() {
				if(!this.businessscope_search){
					this.filterArr = this.businessscope_list;
					return;
				}
				this.filterArr = this.businessscope_list.filter(v => {
					return v.Name.indexOf(this.businessscope_search) > -1;
				})
			},
			  //输入中文名自动判断转换问英文
			input_1(){
					//console.log(this.user_obj.Name);
				if(!this.user_obj.Id){		//添加的时候才执行
				  	if(this.user_obj.Name){
					  	this.user_obj.Code=pinyinUtil.getFirstLetter(this.user_obj.Name, false);
				  	}else{
					  	this.user_obj.Code=''
					}
				}
			},
			change_1(){
				if(!this.user_obj.Id){
					if(!this.user_obj.Code || this.user_obj.Code==''){
						this.Account_detection=0
					}else{
						ajax('get','/user/c',{'code':this.user_obj.Code},this.Testing)
					}
					
				}
			},
			Testing(x){
				var x = JSON.parse(x);
				console.log(x)
				this.Account_detection= x.Result ? 1 : 2;
				//如果已存在自动增加数字编号
				if(this.Account_detection === 2){
					var last3 = this.user_obj.Code.slice(-3);
					var base = this.user_obj.Code.slice(0, -3)
					if(/\d{3}/.test(last3)){
						this.user_obj.Code = base + '00' + (Number(last3) + 1);
					}else{
						this.user_obj.Code += '001'; 
					}
					this.change_1();
				}else if(this.Account_detection === 1){
					this.Account_detection = 1;
					console.log(this.user_obj.Code)
				}
				
			},
	  		form_1(){
				this.user_obj.RoleList=[];
				this.user_obj.PermissionList=[];

				//验证输入值
				var checkPhone = this.checkInput(this.user_obj.ContactNumber, 'phone');
				var checkCredit = this.checkInput(this.user_obj.CreditCode, 'code', '信用代码');
				var checkAccount = this.checkInput(this.user_obj.AccountNo, 'code', '银行账号');
				for(var re of [checkPhone, checkCredit, checkAccount]){
					if(!re.re){
						this.$message({
							message: re.msg,
							type: 'warning'
						});
						return;
					}
				}

				if(!this.value11.length && this.user_obj.Type != '0'){
					this.$message({
						message: '请选择培训工种！',
						type: 'warning'
					});
					return;
				}
				// 设置 工种
				this.user_obj.Businessscope = this.value11.join(',') || "";
				if(this.user_obj.Id){
					if(this.user_obj.Pass_1!=this.user_obj.Pass_2){
						this.$message({
							showClose: true,
							message: '错了哦，两次密码不一致！',
							type: 'error'
						});
					}else{
						if(this.user_obj.Pass_1){
							this.user_obj.Pass=this.user_obj.Pass_1;
						}		
						http(this,'patch','/user',this.user_obj,this.post_user)
					}
				}else{
					if(this.user_obj.Type == "0"){
						this.user_obj.Contacts = this.user_obj.Pass_2 = this.user_obj.ContactNumber = this.user_obj.CreditCode = this.user_obj.Bank = this.user_obj.AccountName = this.user_obj.AccountNo = "";
					}
					this.user_obj.Pass='123456';
					http(this,'post','/user',this.user_obj,this.post_user)
				}
	  			
	  		},
	  		post_user(x){
	  			console.log(x)
	  			if(x.Result){
	  				window.history.back();
	  			}else{
	  				this.$message({
			          	showClose: true,
			          	message: x.Message,
			          	type: 'error'
			        });
	  			}
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
	  		//获取所有权限
	  		get_permission(){
	  			http(this,'get','/permission','',this.permission_return)
	  		},
	  		permission_return(x){
	  			console.log('权限列表',x)
	  			var this_1=this;
	  			this.permission=treeType(x.Memory,null);
				var params=this.$route.params
				console.log(params)
				if(params.id){
					http(this,'get','/user/id?id='+params.id,'',this.get_user)
				}
	  		},
	  		//获取单个用户
	  		get_user(x){
				// var x=JSON.parse(x);
				console.log('获取单个用户',x);
				this.user_obj=x.Memory
				if(x.Memory.Businessscope){
					this.value11 = x.Memory.Businessscope.split(',');
				}
				if(this.user_obj.Type === this.user.Type){
					this.isReadonly = true;
				}
	  		},
	  		//返回
	  		ret(){
	  			window.history.back()
			},
			 businessscope(x){
				var x=JSON.parse(x);
				console.log('业务范围',x);
				var list=[];
				this.businessscope_list=this.filterArr=x.Memory
			},
			resetPassword() {
				this.$confirm('确认重置该用户密码?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					ajax('patch', '/userpass/r', JSON.stringify({Id: this.user_obj.Id}), x => {
						if(JSON.parse(x).Result){
							this.$message({
								type: 'success',
								message: '用户密码已重置!'
							});
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});          
				});
			},
			checkInput(val,reg,info) {
				if(reg=='phone'){
					if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(val) && val){
						return {re: false, msg: "请输入有效的手机号码！"}
					}
				}
				if(reg=='code'){
					if(!/^[A-Za-z0-9]+$/.test(val) && val){
						return {re: false, msg: info+"不能含有中文或字符！"}
					}
				}
				return {re: true}
			},
			checkChange1(e) {
				var checkPhone = this.checkInput(this.user_obj.ContactNumber, 'phone');
				this.showInfo.change1 = !checkPhone.re;
			},
			checkChange2(e) {
				var checkCredit = this.checkInput(this.user_obj.CreditCode, 'code', '信用代码');
				this.showInfo.change2 = !checkCredit.re;
			},
			checkChange3(e) {
				var checkAccount = this.checkInput(this.user_obj.AccountNo, 'code', '银行账号');
				this.showInfo.change3 = !checkAccount.re;
			},
	  	},
	    created: function () {
			console.log(this.$route)
			// this.get_role()	//获取角色
			// this.get_permission();	//获取所有权限
			var params=this.$route.params
			console.log(params)
			if(params.id){
				http(this,'get','/user/id?id='+params.id,'',this.get_user)
				this.input_type='password'
			}

			if(!localStorage.user0609){
				this.$router.push('/')
			}else{
				this.user=JSON.parse(localStorage.user0609);
				if(this.user.Type == '1' || this.user.Type == '2'){
					this.$router.push('/home');
				}
			}
			 //查询业务范围
    		ajax('get','/businessscope','',this.businessscope);

		},
	    mounted: function () {
			
		},

	}
</script>

<style>
	#userdetails .checkbox{
		border: 1px solid #CCCCCC;
		border-radius: 3px;
		padding: 6px 12px;
	}
	#userdetails .input_box{
		position: relative;
	}
	#userdetails .input_box .err_1,
	#userdetails .input_box .ok_1{
		position: absolute;
		right: -10px;
		top: 11px;
	}
	#userdetails .input_box .err_1{
		color: red;
	}
	#userdetails .input_box .ok_1{
		color: #04b980;
	}


	#userdetails .checkbox_1 label{
		display: block;
		/*margin-left: 0px;*/
	}
    #userdetails .mr-413 {
        margin-right: 10%;
        padding-top: 1.2rem;
    }
    #userdetails .progress {
        height: 300px;
    }
    #userdetails .rej:before {
        position: relative;
        display: inline-block;
        top: 10px;
        margin-right: 10px;
    }
    #userdetails .status {
        height: 100px;
        border: 2px dashed #e5e5e5;
    }
    #userdetails .info {
        vertical-align: middle
    }
    #userdetails .input-block h5 {
        font-size: 24px;
        border-left: 10px solid #3737e1;
        padding-left: 7%;
        margin-top: 4%;
        margin-bottom: 4%;
    }
    #userdetails .input-block .info {
        /*margin-bottom: 2%;*/
       /*margin-bottom: 20px;*/
        /*text-align: left;*/
    }
    #userdetails .input-block .info>label {
        color: #888888;
        /*display: inline-block;*/
        /*width: 160px;*/
        /*margin-right: 1.5rem;*/
        /*margin-left: 10rem;*/
        /* line-height: 1rem; */
    }
    #userdetails .mb-footer {
        margin-bottom: 10rem;
    }
    #userdetails .input-block input {
		height: 40px;
	}
	#userdetails .input-block select{
		height: 40px;
	}
    #userdetails .app-btn {
        width: 126px;
        height: 36px;
        border: none;
        border: 1px solid #eaeaea;
        background: #3737e1;
        color: #ffffff;
        border-radius: 5px;
    }
    #userdetails .dialog {
        height: 340px;
        background: #ffffff;
        width: 50%;
        z-index: 1;
        margin: 12% auto;
        /* overflow: auto;   */
    }
    #userdetails .dialog textarea {
        width: 450px;
        height: 200px;
    }
    #userdetails .dialog-head {
        height: 50px;
        background-repeat: repeat-x;
    }
    #userdetails #background {
        display: block;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
    /* The Modal (background) */
    #userdetails .modal {
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
    #userdetails .modal-content {
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
    #userdetails .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }
    #userdetails .close:hover,
    #userdetails .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
    #userdetails textarea {
        resize: none;
        border: none;
        outline: none;
        height: 8rem;
    }
    #userdetails .btn-color {
        background: #3737e1;
        color: #ffffff;
    }
    #userdetails .ml-50p {
        margin-left: 38%;
    }
	 #userdetails .input-block label{
		 margin-right: 0px;
	}
	#userdetails .select-box{
		padding-left: 10rem;
	}
	#userdetails .select-box label.el-checkbox{
		width: 20%;
		margin-left: 30px;
		
	}
	#userdetails .select-box label{
		text-align: left!important;
	}
</style>
