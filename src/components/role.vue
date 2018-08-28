<template>
  	<div id="role">
  		
  		<div class="container">

  			<div class="d-flex align-items-center bread border-bottom">您的位置： 角色管理</div>
			
			
			<table class="table table-hover table_1">
			  <thead class="table-primary">
			    <tr  class="">
			      	<th scope="col">角色名</th>
			      	<th scope="col">
			      		<router-link to="/roleDetails">
			      			<button type="button" class="float-right btn-sm btn btn-outline-light">添加</button>
			      		</router-link>
			      	</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr v-for="x in role">
			      	<th>{{x.Name}}</th>
			      	<td>
			      		<div class="btn-group btn-group-sm float-right" role="group" aria-label="Basic example">
						  	<router-link :to="'/roleDetails/'+x.Id">
						  		<button type="button" class="btn btn-warning">修改</button>
						  	</router-link>
						  	<button @click="delete_1(x)" type="button" class="btn btn-danger">删除</button>
						</div>
			      	</td>
			    </tr>
			  </tbody>
			</table>
			
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
		        <!--<button type="button" class="btn btn-primary">确定</button>-->
		      </div>
		    </div>
		  </div>
		</div>
	
  	</div>
</template>

<script>
	import {http,ajax} from '@/assets/fc';
	export default {
	  	name: '',
	  	data(){
	  		return{
	  			Prompt:'',	//提示语
	  			role:[],
	  		}
	  	},
	  	methods:{
	  		//获取角色
	  		get_role(){
	  			http(this,'get','/role','',this.role_return)
	  		},
	  		role_return(x){
	  			console.log(x)
	  			if(x.Result){
	  				this.role=x.Memory
	  			}else{
	  				this.Prompt=x.Message;
	  				$('#role .modal_1').modal('show');
	  			}
	  		},
	  		//删除
	  		delete_1(x){
	  			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	console.log(x);
		        	http(this,'delete','/role',JSON.stringify({'Id':x.Id}),this.delete_return)
		        }).catch(() => {
		          	//取消时间       
		        	
		        });
	  		},
	  		delete_return(x){
	  			console.log(x);
	  			this.$message({
		          	message: x.Result ? '设置成功' :x.Message,
		          	type: x.Result ? 'success' : 'warning'
		        });
		         this.get_role();
	  		}
	  	},
	    created: function () {
	        this.get_role();	//回去角色
	    },
	    mounted: function () {
			
	    },
	}
</script>

<style>
	#role .table_1 td .btn-group {
		display: none;
	}
	#role .table_1 tr:hover>td .btn-group {
		display: inline-flex;
	}
</style>
