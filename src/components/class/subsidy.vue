<template>
  	<div id="index">
        <div class="container">
            <div class="d-flex align-items-center bread border-bottom">
                您的位置： 申请补贴
            </div>
            <div class="mt-2 mb-2">
                 <button type="button" @click="retu()" class="btn btn-sm btn-outline-success">返回上一页</button>
                 <button class="btn btn-success btn-sm float-right" @click="toAddSubsidy" v-if="classsubsidy_list.length<2">添加</button>
            </div>
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>状态</th>
                            <th>专业</th>
                            <th>等级</th>
                            <th>培训人数</th>
                            <th>补贴金额</th>
                            <th>审核人</th>
                            <th>审核时间</th>
                            <th class="text-center">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x in classsubsidy_list">
                            <td>{{Status_lsit[x.Status]}}</td>
                            <td>{{x.Profession}}</td>
                            <td>{{x.Level}}</td>
                            <td>{{x.TrainingPersonCount}}</td>
                            <td>{{x.SubsidyPrice}}</td>
                            <td>{{x.ReviewUserName}}</td>
                            <td>{{x.ReviewDate}}</td>
                            <td class="text-center">
                                <!-- <button class="btn btn-info btn-sm" @click="goToReview(item, index)">查看</button> -->
							    <!-- <button class="btn btn-info btn-sm" @click="goToReview_1(item, index)">修改</button> -->
                                  <!-- 修改 -->
				      	 		<el-button v-if="x.Status==2" @click="See(x)" type="primary" icon="el-icon-edit" size="mini" circle></el-button>
								   <!-- 删除 -->
				      	 		<!-- <el-button v-if="x.Status==2" type="danger" @click="delete_1(x)" icon="el-icon-delete" size="mini" circle></el-button> -->
                                <!-- <a :href="'#/studentDetails?id='+x.Id+'&Status='+Status"> -->
								<!-- 查看 -->
                                <el-button v-if="x.Status==1 ||  x.Status==3 || x.Status==4" @click="See(x)" type="primary" icon="el-icon-search" size="mini" circle></el-button>
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
            Status_lsit:['','待审核','未通过','已通过',''],
            finish: 0
		}
  	},
  	methods:{
        //查看
        See(x){
            this.$router.push('/addsubsidy?id='+x.Id+'&status='+x.Status);
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
            this.classsubsidy_list=x.Memory;
        },
        //   student/finish
        student_finish(){
            ajax('get','/student/finish',{'class_id':this.classid}, (x) => {
                x = JSON.parse(x)
                if (x.Result) {
                    console.log(x.Memory)
                    this.finish = x.Memory.length;
                }
            })
        },
        toAddSubsidy(){
            if(this.finish){
                this.$router.push('/addsubsidy?id='+this.classid)
            }else{
                this.$message({
                    showClose: true,
                    message: '必须有学生已结业才能申请补贴！',
                    type: 'warning'
                });
            }
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
            this.student_finish()
	},
}
</script>

<style>

</style>
