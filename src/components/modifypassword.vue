<template>
  	<div id="modifypassword">
  		<section class="application container">
            <div class="d-flex align-items-center bread border-bottom">
            	您的位置： 修改密码
            </div>
            
			<section class="input-block">
                <h5 class="title">修改密码</h5>
				<form @submit.prevent="form_1()">
					<div class="row mt-4">
						<div class="col-2 text-right">旧密码</div>
						<div class="col-8">
							<input type="password" required class="form-control" v-model="OldPass" name="">
						</div>
					</div>
					<div class="row mt-4">
						<div class="col-2 text-right">新密码</div>
						<div class="col-8">
							<input type="password" required class="form-control" v-model="NewPass" name="">
						</div>
					</div>
					<div class="row mt-4">
						<div class="col-2 text-right">重复新密码</div>
						<div class="col-8">
							<input type="password" required class="form-control" v-model="NewPass_1" name="">
						</div>
					</div>
	                <div class="row mt-4">
						<div class="col-12 text-center">
							<button type="submit" class="btn app-btn">提交</button>
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
				OldPass:'',
				NewPass:'',
				NewPass_1:'',
				id:''
	  		}
	  	},
	  	methods:{
			form_1(){
				if(this.NewPass!=this.NewPass_1){
					this.$message({
						showClose: true,
						message: '错了哦，两次密码不一致！',
						type: 'error'
					});
				}else{
					var obj=new Object();
						obj.Id=this.id;
						obj.OldPass=this.OldPass;
						obj.NewPass=this.NewPass;
					ajax('patch','/userpass',JSON.stringify(obj),this.userpass_return)
				}
			},
			userpass_return(x){
				console.log(x);
				var x=JSON.parse(x);
				if(x.Result){
					this.$message({
						showClose: true,
						message: '密码修改成功,请重新登录！',
						type: 'success'
					});
					localStorage.removeItem('user0609')
					this.$router.replace({path:'/'})
				}else{
					this.$message({
						showClose: true,
						message: x.Message,
						type: 'error'
					});
				}
			},
	  		//返回
	  		ret(){
	  			window.history.back()
	  		}
	  	},
	    created: function () {
			// console.log(this.$route)
			// this.get_role()	//获取角色
			// this.get_permission();	//获取所有权限
			// var params=this.$route.params
			// console.log(params)
			// if(params.id){
			// 	http(this,'get','/user/id?id='+params.id,'',this.get_user)
			// 	this.input_type='password'
			// }
	    },
	    mounted: function () {
			var user0609=JSON.parse(localStorage.user0609);
			this.id=user0609.Id;
			 console.log(this.$route)
			var query=this.$route.query;
			if(query.prompt){
				this.$message({
					message: '您的密码为初始密码，请及时修改密码!',
					type: 'warning'
				});
				
			}
	    },
	}
</script>

<style scoped>
	#modifypassword .input-block h5 {
        font-size: 24px;
        border-left: 10px solid #3737e1;
        padding-left: 7%;
        margin-top: 4%;
        margin-bottom: 4%;
    }
	
	.app-btn {
		width: 126px;
		height: 36px;
		border: none;
		border: 1px solid #eaeaea;
		background: #ffffff;
		border-radius: 5px;
	}

	.app-btn:hover {
		background: #3737e1;
		color: #ffffff;
	}
</style>
