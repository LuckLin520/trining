<template>
  	<div id="index">
        <div class="container">
            <div class="d-flex align-items-center bread border-bottom">
                您的位置： 补贴
            </div>
            <div class="mt-2 mb-2">
                 <button type="button" @click="retu()" class="btn btn-sm btn-outline-success">返回上一页</button>
                <router-link :to="'/admini/addsubsidy?id='+classid">
                    <button class="btn btn-success btn-sm float-right">添加</button>
                </router-link>
            </div>
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <!-- <th>状态</th> -->
                            <th>专业</th>
                            <th>等级</th>
                            <th>培训人数</th>
                            <th>补贴金额</th>
                            <!-- <th>审核人</th> -->
                            <th>时间</th>
                            <th class="text-center">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x in classsubsidy_list">
                            <!-- <td>{{Status_lsit[x.Status]}}</td> -->
                            <td>{{x.Profession}}</td>
                            <td>{{x.Level}}</td>
                            <td>{{x.TrainingPersonCount}}</td>
                            <td>{{x.SubsidyPrice}}</td>
                            <!-- <td>{{x.ReviewUserName}}</td> -->
                            <td>{{x.CreateDate}}</td>
                            <td class="text-center">
                                <!-- <button class="btn btn-info btn-sm" @click="goToReview(item, index)">查看</button> -->
							    <!-- <button class="btn btn-info btn-sm" @click="goToReview_1(item, index)">修改</button> -->
                                  <!-- 修改 -->
				      	 		<!-- <el-button v-if="x.Status==2" @click="See(x)" type="primary" icon="el-icon-edit" size="mini" circle></el-button> -->
								   <!-- 删除 -->
				      	 		<!-- <el-button v-if="x.Status==2" type="danger" @click="delete_1(x)" icon="el-icon-delete" size="mini" circle></el-button> -->
                                <!-- <a :href="'#/studentDetails?id='+x.Id+'&Status='+Status"> -->
								<!-- 查看 -->
                                <el-button  @click="See(x)" type="primary" icon="el-icon-search" size="mini" circle></el-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>            
  	</div>
</template>

<script>
    import {ajax , DX} from '@/assets/fc'
export default {
  	name: '',
  	data(){
  		return{
            user:{},
            classid:'',
            classsubsidy_list:[],
            Status_lsit:['','待审核','未通过','已通过','']
		}
  	},
  	methods:{
        //查看
        See(x){
            // this.$router.push('/addsubsidy?id='+x.Id+'&status='+x.Status);
            this.$router.push('/admini/addsubsidy?id='+x.Id+'&status='+x.Status);
        },
        retu(){
              window.history.back();
        },
        get_classsubsidy(){
            ajax('get','/classsubsidy',{'class_id':this.classid},this.classsubsidy_return)
        },
        classsubsidy_return(x){
            var x=JSON.parse(x);
            console.log('查询补贴',x)
            this.classsubsidy_list=x.Memory
        }
  	},
    created: function () {
        	
    },
    mounted: function () {
        var query=this.$route.query;
            this.classid=query.id;

            this.get_classsubsidy();
            // this.Status=query.Status;
            // this.get_student()
	},
}
</script>

<style>

</style>
