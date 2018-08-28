<template>
  	<div id="subsidystandard">
  		
  		<div class="container">

  			<div class="d-flex align-items-center bread">您的位置： 补贴标准</div>
			
			
			<table class="table table-hover table_1">
			  <thead class="table-primary">
			    <tr  class="">
			      	<th scope="col">补贴名</th>
			      	<th scope="col">价格</th>
			      	<th scope="col" class="text-right">
			      		<!-- <router-link to="/subsidystandardDetails">
			      			<button type="button" class="float-right btn-sm btn btn-outline-light">添加</button>
			      		</router-link> -->
                        操作
			      	</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr v-for="x in list">
			      	<td>{{x.Name}}</td>
              <td>{{x.Price}}</td>
			      	<td class="text-right">
			      		<!-- <div class="btn-group btn-group-sm float-right" role="group" aria-label="Basic example">
						  		<button @click="modify(x)" type="button" class="btn btn-warning">修改</button>
						</div> -->
									<!-- <button @click="modify(x)" type="button" class="btn btn-sm btn-warning">修改</button> -->
									<el-button @click="modify(x)" type="primary" icon="el-icon-edit" size="mini" circle></el-button>
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
    
        <div class="modal_1 modal fade bs-example-modal-sm" id="modify" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
                <form  @submit.prevent="form_1()">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">修改</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <input type="number" min="0" required class="form-control" v-model="modify_obj.Price" >
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button class="btn btn-primary">确定</button>
                    </div>
                </form>
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
                list:[],
                modify_obj:{}   //待修改的对象
	  		}
	  	},
	  	methods:{
            subsidystandard(){
                ajax('get','/subsidystandard','',this.subsidystandard_return)
            },
            subsidystandard_return(x){
                var x=JSON.parse(x);
                this.list=x.Memory
                console.log(x)

            },
              //修改
            modify(x){
                console.log(x);
                this.modify_obj=x;
                $('#modify').modal('show');
            },
            //修改
            form_1(){
                 $('#modify').modal('hide');
                ajax('patch','/subsidystandard',JSON.stringify(this.modify_obj),this.subsidystandard_patch)
            },
            subsidystandard_patch(x){
                console.log(x)
                var x=JSON.parse(x)
                this.$message({
                    message: x.Result ? "修改成功" : x.Message,
                    type: "success"
                });
                this.subsidystandard();
            }
              
	  	},
	    created: function () {
	    },
	    mounted: function () {
			this.subsidystandard();
	    },
	}
</script>

<style scoped>
	#subsidystandard .table_1 td .btn-group {
		display: none;
	}
	#subsidystandard .table_1 tr:hover>td .btn-group {
		display: inline-flex;
	}
	.table{
		/* text-align: center; */
		/* width: 70%; */
	}
	.table thead tr th{
		padding: 5px;
		padding-left: 40px;
	}
	.table thead tr th.text-right{
		padding-right: 50px;
	}
	.table td{
		font-size: 14px;
		padding: 5px;
		text-align: left;
		width:200px;
		padding-left: 40px;
		vertical-align: middle;
	}
	.table td.text-right{
		padding-right: 50px;
	}
</style>
