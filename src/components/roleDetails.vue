<template>
  	<div id="roleDetails">
  		<div class="container">
			<div class="d-flex align-items-center bread border-bottom">您的位置：<a href="#"> 角色管理 </a> > 角色设定</div>
				

				<el-form :model="role_obj" :rules="rules" ref="formName" label-width="100px" class="mt-4">
				  	<el-form-item label="角色名称" prop="Name">
				    	<el-input v-model="role_obj.Name"></el-input>
					</el-form-item>
				 	<el-form-item label="权限选择">
			  			<div class="form-control">
				  			<el-tree
						      	:data="permission"
						      	show-checkbox
						      	default-expand-all
						      	node-key="Id"
						      	:props="defaultProps"
								ref="tree">
						   </el-tree>
			  			</div>
			  		</el-form-item>
				  	<el-form-item>
					    <el-button type="primary" @click="form_1">提交</el-button>
				    	<el-button @click="retu()">返回</el-button>
					</el-form-item>
				</el-form>

		</div>
  		
		<div class="modal_1 modal fade bs-example-modal-sm" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		      	 <h4 class="modal-title" id="myModalLabel">提示</h4>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		      </div>
		      <div class="modal-body">
		        {{Prompt}}
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		      </div>
		    </div>
		  </div>
		</div>

  	</div>
</template>

<script>
	import {http,ajax,treeType} from '@/assets/fc';
	export default {
	  	name: '',
	  	data(){
	  		return{
	  			role_obj:{		//角色
	  				Name:'',
	  				PermissionList:[]
	  			},
	  			permission:[],		//递归后的数据
//		        data2: [{
//		          Id: 1,
//		          Name: '一级 1',
//		          children: []
//		        }],
		        defaultProps: {				//设置显示项目
		          children: 'children',
		          label: 'Name',
		        }, 
        
	  			Prompt:'',	//提示语
	  			
	  			//验证
		  		rules:{
		  			Name: [
			            { required: true, message: '请输入活动名称', trigger: 'blur' },
			            { min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			        ]
		  		},
	  		}
	  	},
	  	methods:{ 
	  		//获取所有权限
	  		get_permission(){
	  			http(this,'get','/permission','',this.permission_return)
	  		},
	  		permission_return(x){
	  			console.log('权限列表',x)
	  			var this_1=this;
	  			this.permission=treeType(x.Memory,null);
	  			var params=this.$route.params
				if(params.id){
					//获取单个角色
					http(this,'get','/role/id?role_id='+params.id,'',this.role_id)
				}
	  		},
	  		role_id(x){
				console.log('获取单个角色',x)
				if(!x.Result){return};
				var this_1=this
				this.role_obj=x.Memory
				var a=[];
					for(var i=0;i<x.Memory.permission.length;i++){
						if(x.Memory.permission[i].ParentId && x.Memory.permission[i].ParentId!=null){
							a.push(x.Memory.permission[i].Id)
						}else{
							for(var j=0;j<this_1.permission.length;j++){
								if(x.Memory.permission[i].Id==this_1.permission[j].Id && !this_1.permission[j].children){
									a.push(x.Memory.permission[i].Id)
								}
							}
						}
					}
//				console.log(a)
				//设置选中项目
				this.$refs.tree.setCheckedKeys(a);
	  		},
	  		//返回
	  		retu(){
	  			window.history.back();
	  		},
	  		//提交
	  		form_1(){
	  			var this_1=this;
		        this.$refs['formName'].validate((valid) => {
		          	if (valid) {
		   	  			var list=[];
		   	  			//分别是已选择和半选择
		   	  			var getCheckedKeys=this.$refs.tree.getCheckedKeys();
		   	  			var getHalfCheckedKeys=this.$refs.tree.getHalfCheckedKeys();
							list=getCheckedKeys.concat(getHalfCheckedKeys)
		  				this.role_obj.PermissionList=list;
//		  				console.log(this.role_obj);
		  				if(!this.role_obj.Id){
		  					http(this,'post','/role',JSON.stringify(this.role_obj),this.role_retun)
		  				}else{
		  					http(this,'patch','/role',JSON.stringify(this.role_obj),this.role_retun)
		  				}
		          	} else {
		            	return false;
		          	}
		      	});
	  		},
	  		role_retun(x){
	  			console.log(x);
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
	  	},
	    created: function () {
	    	this.get_permission()	    	
	    },
	    mounted: function () {

	    },
	}
//	INSERT INTO `rbac_permission`(`Name`,`MenuName`,`Url`,`Type`) 
//	VALUES 
//	('数据查看','数据查看','/数据查看','MENU')
</script>

<style>

</style>
