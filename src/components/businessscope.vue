<template>
  	<div id="businessscope">
  		
  		<div class="container">

  			<div class="d-flex align-items-center bread border-bottom">您的位置： 业务范围
                    <el-button type="primary" @click="add()" size="mini" round>添加</el-button>
            </div>
			<div class="row mt-4 filter">
                <label class="pt-2">工种名称：</label>
                <div>
                    <div class="search border rounded" style="width:350px;">
                        <input style="padding-left:10px" type="text" class="w-85 search-input" placeholder="搜索" v-model="search_name" @input="mkCourse"/>
                        <img src="@/assets/img/search.png" class="search-btn">
                    </div>
                </div>
            </div>
			
			<table class="table table-hover table_1">
			  <thead class="table-primary">
			    <tr  class="">
			      	<th scope="col">名称</th>
			      	<th scope="col" class="text-right">操作</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr v-for="x in filterArr">
			      	<td>{{x.Name}}</td>
			      	<td class="text-right">
                        <!-- <button @click="modify(x)" type="button" class="btn btn-sm btn-warning">修改</button>
                        <button  @click="del(x)" type="button" class="btn btn-sm btn-danger">删除</button> -->
                        <el-button @click="modify(x)" type="primary" icon="el-icon-edit" size="mini" circle></el-button>
                        <el-button @click="del(x)" type="danger" icon="el-icon-delete" size="mini" circle class="dangerBtn"></el-button>
			      	</td>
			    </tr>
                <tr v-if="filterArr.length == 0">
                        <td  style="font-size:16px; text-align:center; padding: 20px" colspan='10'>没有数据！</td>
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
                        <h4 class="modal-title" id="myModalLabel">{{modify_obj.Id ? '修改' : '添加'}}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" required class="form-control" v-model="modify_obj.Name" >
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
                modify_obj:{},   //待修改的对象
                search_name: '',
                filterArr: []
            }
	  	},
	  	methods:{
            add(){
                this.modify_obj={};
                $('#modify').modal('show');
            },
              //修改
            modify(x){
                console.log(x);
                this.modify_obj={};
                for(var key in x){
                    this.modify_obj[key]=x[key]
                }
                $('#modify').modal('show');
            },
            //提交
            form_1(){
                $('#modify').modal('hide');
                if(this.modify_obj.Id){
                    ajax('patch','/businessscope',JSON.stringify(this.modify_obj),this.businessscope_post)
                }else{
                    ajax('post','/businessscope',JSON.stringify(this.modify_obj),this.businessscope_post)
                }
            }, 
            businessscope_post(x){
                console.log(x);
                var x=JSON.parse(x)
                this.$message({
                    message: x.Result ? "设置成功" : x.Message,
                    type: "success"
                });
                this.getbusinessscope();
            },
            //查询
            getbusinessscope(){
                ajax('get','/businessscope','',this.businessscope_return);
            },
            businessscope_return(x){
                var x=JSON.parse(x)
                console.log(x)
                this.list=this.filterArr=x.Memory;
            },
            //删除
            del(x){
                console.log(x);
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    ajax('delete','/businessscope',JSON.stringify(x),this.businessscope_post);
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                }).catch(() => {});

            },
            mkCourse() {
                if(this.search_name){
                    this.filterArr = this.list.filter(v => {
                        return v.Name.indexOf(this.search_name) > -1;
                    })
                }else{
                    this.filterArr = this.list;
                }
            } 
	  	},
	    created: function () {
	    },
	    mounted: function () {
			this.getbusinessscope();
	    },
	}
</script>

<style scoped>
	#businessscope .table_1 td .btn-group {
		display: none;
	}
	#businessscope .table_1 tr:hover>td .btn-group {
		display: inline-flex;
	}
    .table{
		margin-top: 1rem;
	}
	.table thead tr th{
		padding: 5px;
		padding-left: 40px;
        vertical-align: middle;
	}
	.table thead tr th.text-right{
		padding-right: 65px;
        width: 
	}
	.table td{
		font-size: 14px;
        padding: 5px 38px 5px 40px!important;
        text-align: left;
        width: 200px;
        vertical-align: middle!important;
	}
	.table td.text-right{
		padding-right: 50px;
	}
    .d-flex{
        justify-content: space-between;
    }
    .dangerBtn{
        margin-left: 20px!important;
    }
</style>
