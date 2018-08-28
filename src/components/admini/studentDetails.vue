<template>
  	<div id="Student">
  		<section class="application container">
            <div class="d-flex align-items-center bread border-bottom">
            	您的位置： 学生信息
            </div>
            
            <form @submit.prevent="form_1()">
                <section class="input-block">
				    <h5 class="title">学生信息</h5>
                    <div class="row">
                        <div class="col-6">
                            <div class="row info">
                                <label><span class="text-danger">* </span>序号</label>
                                <input :readonly="Status!=0" :class="{'no_border':Status!=0}" type="text" v-model="student_obj.Sort" class="form-control col-md-6"  required/>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row info">
                                <label> <span class="text-danger">* </span>姓名</label>
                                <input :readonly="Status!=0" :class="{'no_border':Status!=0}" v-model="student_obj.Name" type="text" class="form-control col-md-6" required/>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row info">
                                <label><span class="text-danger">* </span>性别</label>
                                <input :readonly="Status!=0" :class="{'no_border':Status!=0}"  v-model="student_obj.Sex" type="text" class="form-control col-md-6"  required/>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="row info">
                                <label><span class="text-danger">* </span>民族</label>
                                <input :readonly="Status!=0" :class="{'no_border':Status!=0}" v-model="student_obj.Nation" type="text" class="form-control col-md-6"  required/>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row info">
                                <label><span class="text-danger">* </span>文化程度</label>
                                <input :readonly="Status!=0" :class="{'no_border':Status!=0}" v-model="student_obj.EducationLevel" type="text" class="form-control col-md-6"  required/>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row info">
                                <label><span class="text-danger">* </span>身份证号码</label>
                                <input :readonly="Status!=0" :class="{'no_border':Status!=0}" v-model="student_obj.IdCardNo" type="text" class="form-control col-md-6"  required/>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="row info">
                                <label><span class="text-danger">* </span>工种</label>
                                <input :readonly="Status!=0" :class="{'no_border':Status!=0}" v-model="student_obj.TrainingType" type="text" class="form-control col-md-6"  required/>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row info">
                                <label><span class="text-danger">* </span>工作单位</label>
                                <input :readonly="Status!=0" :class="{'no_border':Status!=0}" v-model="student_obj.Company" type="text" class="form-control col-md-6"  required/>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row info">
                                <label><span class="text-danger">* </span>联系电话</label>
                                <input :readonly="Status!=0" :class="{'no_border':Status!=0}" v-model="student_obj.ContactNumber" type="text" class="form-control col-md-6"  required/>
                            </div>
                        </div>

                        <div class="col-6">
                            <!-- <div class="row info">
                                <label><span class="text-danger">* </span>证书类型</label>
                                <input readonly :class="{'no_border':Status!=2}" v-model="student_obj.CertificateType" type="text" class="form-control col-md-6"  required/>
                            </div> -->
                            <div class="row info">
                                <label><span class="text-danger">* </span>原技术等级</label>
                                <input :readonly="Status!=0" :class="{'no_border':Status!=0}" v-model="student_obj.OriginalTechnologyLevel" type="text" class="form-control col-md-6"  required/>
                            </div>
                            <!-- <div class="row info">
                                <label><span class="text-danger">* </span>培训等级</label>
                                <input readonly :class="{'no_border':Status!=2}" v-model="student_obj.TrainingLevel" type="text" class="form-control col-md-6"  required/>
                            </div> -->
                        </div>

                        <!-- <div class="col-6">
                            <div class="row info">
                                <label><span class="text-danger">* </span>证书编号</label>
                                <input readonly :class="{'no_border':Status!=2}" v-model="student_obj.CertificateNumber" type="text" class="form-control col-md-6"  required/>
                            </div>
                        </div> -->
                        <div class="col-12">                        
                            <div class="row info">
                                <label><span class="text-danger">* </span>家庭地址</label>
                                <input :readonly="Status!=0" :class="{'no_border':Status!=0}" v-model="student_obj.Address" type="text" class="form-control col-md-9"  required/>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-footer mt-5 d-flex justify-content-center">
                        <button type="button" @click="retu()" class="mr-5 app-btn rounded-btn">返回</button>
                        <button  type="submit" v-if="Status==0" class="app-btn">提交</button>
                    </div>
                </section>
            </form>


                       
        </section>
  	</div>
</template>

<script>
	import {http,paging,ajax} from '@/assets/fc';
	export default {
	  	name: '',
	  	data(){
	  		return{
                query_obj:{
                    page:1,
                    per_page:5,
                    student_class:'',
                    student_name:'',
                },
                Status:'',
                id:'',
                student_obj:{
                    Address:"",          //地址
                    CertificateNumber:"",   //证书编号 不修改
                    CertificateType:"", //证书类型  不修改
                    Class:"",           //班级 不修改
                    Company:"",     //工作单位     
                    ContactNumber:"",   //联系电话
                    EducationLevel:"",  //文化程度
                    Id:"",
                    IdCardNo:"",    //身份证号码
                    Name:"",    //姓名
                    Nation:"",  //民族
                    OriginalTechnologyLevel:"", //原技术等级
                    Sex:"", //性别
                    Sort:'', //排序
                    TrainingLevel:"",   //培训等级 不修改
                    TrainingPrice:"",   //价格 不显示
                    TrainingType:"",    //培训工种
                },  //学生对象
                edit: ''

	  			
	  		}
	  	},
	  	methods:{
            retu(){
                window.history.back();
            },
              form_1(){
                 
                this.student_obj.CertificateNumber=(!this.student_obj.CertificateNumber || this.student_obj.CertificateNumber==null) ? '' : this.student_obj.CertificateNumber;
                this.student_obj.CertificateType=(!this.student_obj.CertificateType || this.student_obj.CertificateType==null) ? '' : this.student_obj.CertificateType;
                 console.log(this.student_obj)
                ajax('patch','/student',JSON.stringify(this.student_obj),this.modify)
              },
            modify(x){
                console.log(x)
                var x=JSON.parse(x);
                if(x.Result){
                    this.$alert('修改成功', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        window.history.back();
                        }
                    });
                }else{
                    this.$message({
                        showClose: true,
                        message: '系统错误，请稍后再试',
                        type: 'error'
                    });
                }
            },
	  		//获取用户
	  		get_student(){
                  // http(this,'get','/user?page='+this.page+'&per_page='+this.per_page+'&user_role=&user_name=','',this.user_return)
                ajax('get','/student/id',{'id':this.id},this.student_return)
            },
            student_return(x){
                console.log(x)
                var x=JSON.parse(x);
                this.student_obj=x.Memory
            },
            //查询
            search(){
                console.log(this.query_obj)
                this.query_obj.page=1;
                this.get_student();
            },
            //分页
            handleCurrentChange(x) {
                 this.query_obj.page=x;
                this.get_student();
		    },



	  		user_return(x){
	  			console.log('获取用户',x);
	  			this.user_obj=x.Memory;
	  		},
		    
		    //删除
		    delete_1(x){
		    	console.log(x);
		    	this.$confirm('此操作将永久删除, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	http(this,'delete','/user',{'Id':x.Id},this.delete_retun)
		        }).catch(() => {
		          	          
		        });
		    },
		    delete_retun(x){
		    	console.log(x);
		    	if(x.Result){
		    		this.get_user()		//获取
		    	}else{
		    		this.$message({
			          	showClose: true,
			          	message: x.Message,
			          	type: 'error'
			        });
		    	}
		    }
	  	},
	    created: function () {
           
        },
	    mounted: function () {
             // this.get_user()		//获取
            var query=this.$route.query;
            this.id=query.id;
            this.Status=query.Status;
            this.edit = query.edit;
            console.log(this.edit)
            if(this.id){
                this.get_student()
            }
            
	    },
	}
</script>

<style>
	#Student .btn_1{
		position: absolute;
		right: 0px;
	}
	#Student .input_box{
        margin: 20px 0px;
    }
    #Student .no_border {
        border: none;
        background: none;
    }
    #Student .no_border:focus {
        box-shadow: none;
    }

    .mr-413 {
  margin-right: 10%;
  padding-top: 1.2rem;
}

.bread {
  height: 80px;
}

a {
  color: #444444;
}

.status-1 {
  height: 300px;
  /* background: url(../../assets/img/status-1.png) no-repeat center center; */
}

.status-2 {
  height: 300px;
  /* background: url(../../assets/img/status-2.png) no-repeat center center; */
}

.status-3 {
  height: 300px;
  /* background: url(../../assets/img/status-3.png) no-repeat center center; */
}

.status-4 {
  height: 300px;
  /* background: url(../../assets/img/status-4.png) no-repeat center center; */
}

.rej:before {
  content: url(../../assets/img/error.png);
  position: relative;
  display: inline-block;
  top: 10px;
  margin-right: 10px;
}

.status {
  height: 100px;
  border: 2px dashed #e5e5e5;
}

.info {
  vertical-align: middle;
}

.input-block h5 {
  font-size: 24px;
  border-left: 10px solid #3737e1;
  padding-left: 7%;
  margin-top: 4%;
  margin-bottom: 4%;
}

.input-block .info {
  margin-bottom: 2%;
  text-align: right;
}

.input-block label {
  color: #888888;
  display: inline-block;
  width: 240px;
  text-align: right;
  margin-right: 1.5rem;
  padding-top: 6px;
  /* line-height: 1rem; */
}

.mb-footer {
  margin-bottom: 10rem;
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

#table3 input {
  border: none;
}
</style>
