<template>
	<div id="newclass">
    <form  @submit.prevent="submitInfo" id="wrapForm">
		<section class="application container">
			<div class="d-flex align-items-center bread border-bottom">您的位置： 个人直补 >&emsp13;
				<a href="#">补贴详情</a>
			</div>

            <!-- ['','待审核','未通过','已通过','补贴','结业','',''] -->
            <ul class="box_2" :class="'active_'+class_obj.Status">
                <li class="" :class="{'active_1':class_obj.Status>1,'active':class_obj.Status==1}">
                    <div>待审核</div>
                    <div>
                        <span>1</span>
                        <i class="el-icon-check"></i>
                    </div>
                </li>
                <li :class="{'active_1':class_obj.Status>2,'active':class_obj.Status==2}">
                    <div>未通过</div>
                    <div>
                        <span>2</span>
                        <i class="el-icon-check"></i>
                    </div>
                </li>
                <li :class="{'active_1':class_obj.Status>3,'active':class_obj.Status==3}">
                    <div>已通过</div>
                    <div>
                        <span>1</span>
                        <i class="el-icon-check"></i>
                    </div>
                </li>
                <li :class="{'active_1':class_obj.Status>4,'active':class_obj.Status==4}">
                    <div>补贴</div>
                    <div>
                        <span>2</span>
                        <i class="el-icon-check"></i>
                    </div>
                </li>
                <li :class="{'active_1':class_obj.Status>5,'active':class_obj.Status==5}">
                    <div>结业</div>
                    <div>
                        <span>3</span>
                        <i class="el-icon-check"></i>
                    </div>
                </li>
            </ul>


			<section class="input-block">
				<h5 class="title">开班信息填写</h5>
				<div class="row">
					<div class="col-6">
						<div class="row info">
							<!-- <label><span class="text-danger">* </span>班级名称</label>
              <input :readonly="class_obj.Status!='' && class_obj.Status!=3" :class="{'no_border':(class_obj.Status!='' && class_obj.Status!=3)}" type="text" class="form-control col-md-6" v-model="class_obj.Name" required/> -->
              <label><span class="text-danger">* </span>班级批次</label>
							<div class="input_box col-md-6">
                <input readonly  type="text" class=" form-control" v-model="class_obj.Name" required/>
                 <i v-if="Account_detection==2" class="err_1 el-icon-error"></i>
							   <i v-if="Account_detection==1" class="ok_1 el-icon-success"></i>
                 <el-button v-if="Account_detection==2" class="btnRe" plain size="small" @click.prevent="setClassName">更新</el-button>
              </div>
            </div>
            <div class="row info">
							<label><span class="text-danger">* </span>培训人数</label>
							<input :readonly="class_obj.Status!='' && class_obj.Status!=3" :class="{'no_border':(class_obj.Status!='' && class_obj.Status!=3)}" type="text" class="form-control col-md-6" v-model="class_obj.TrainingPersonNumber" required/>
						</div>
						<div class="row info">
							<label><span class="text-danger">* </span>培训班地址</label>
							<input :readonly="class_obj.Status!='' && class_obj.Status!=3" :class="{'no_border':(class_obj.Status!='' && class_obj.Status!=3)}" type="text" class="form-control col-md-6" v-model="class_obj.TrainingAddress" required/>
						</div>
						<div class="row info">
							<label><span class="text-danger">* </span>联系人电话</label>
							<input :readonly="class_obj.Status!='' && class_obj.Status!=3" :class="{'no_border':(class_obj.Status!='' && class_obj.Status!=3)}" type="text" class="form-control col-md-6" v-model="class_obj.ContactNumber" required/>
						</div>
					</div>
					<div class="col-6">
						<div class="row info">
							<label><span class="text-danger">* </span>开班时间</label>
                            <div v-if="class_obj.Status!='' && class_obj.Status!=3" class="form-control col-md-6 text-left" :class="{'no_border':(class_obj.Status!='' && class_obj.Status!=3)}">{{class_obj.TrainingStartDate}}至{{class_obj.TrainingEndDate}}</div>
                            <div v-if="class_obj.Status=='' || class_obj.Status==3" class="block col-md-6" style="padding:0px">
                                <el-date-picker
                                value-format="yyyy-MM-dd"
                                v-model="dates"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
						<!-- <div class="row info">
							<label><span class="text-danger">* </span>培训期限</label>
							<input :readonly="class_obj.Status!='' && class_obj.Status!=3" :class="{'no_border':(class_obj.Status!='' && class_obj.Status!=3)}" type="text" class="form-control col-md-6" placeholder="请输入天数" v-model="class_obj.TrainingDay" required/>
						</div> -->
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>联系人</label>
							<input :readonly="class_obj.Status!='' && class_obj.Status!=3" :class="{'no_border':(class_obj.Status!='' && class_obj.Status!=3)}" type="text" class="form-control col-md-6" v-model="class_obj.Contacts" required/>
						</div>
						
					</div>
				</div>
			</section>
			<section class="input-block" v-if="class_obj.Status=='' || class_obj.Status==3">
				<h5 class="title">上传资料文件 <span class="text-red">(选择文件后请点击上传)</span> </h5>
				<div class="row info">
					<label><span class="text-danger">* </span>培训人员花名册:</label>
					<form action='http://114.55.173.248:2000/upload'  @submit.prevent="upload1" id="form-1" enctype="multipart/form-data" method="POST">
						<input id="file1" type="file" required/>
						<button class="ml-2 btn">上传</button>
					</form>					
				</div>
				<div class="row info">
					<label></label>
					<!--<button class="btn" @click="openTable1">在线编辑</button>-->
          	        <a href="http://114.55.173.248:2000/upload/student.xlsx"  class="btn">下载花名册模板</a>
				</div>

				<div class="row info">
					<label><span class="text-danger">*</span>课程: </label>
					<form  @submit.prevent="upload2" id="form-2" >
						<input id="file2" type="file" required/>
						<button class="btn">上传</button>
					</form>
				</div>

				<div class="row info">
					<label></label>
					<a href="http://114.55.173.248:2000/upload/schedule.xlsx"  class="btn">下载课程表模板</a>
				</div>				
			</section>
			<div class="row mb-footer mt-5 d-flex justify-content-center">
				<button type="button" @click.prevent="retu()" class="mr-5 app-btn rounded-btn">返回</button>
				<button  v-if="class_obj.Status=='' || class_obj.Status==3" type="submit" class="app-btn">提交</button>
			</div>
		</section>
    </form>


	<div class="modal_1 modal fade bs-example-modal-sm" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">提示</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="modal-body"  v-html="Prompt">
					<!-- {{Prompt}} -->
				</div>
				<div class="modal-footer">
					<button type="button"  class="btn btn-default" data-dismiss="modal">关闭</button>
					<!-- <button type="button" class="btn btn-primary">Save changes</button> -->
				</div>
			</div>
		</div>
	</div>

	</div>
</template>

<script>
//	创建写好了 明天写修改
//http://114.55.173.248:2000/upload/schedule.xlsx
//http://114.55.173.248:2000/upload/student.xlsx

import { http, ajax ,dateFtt, PreFixInterge} from "@/assets/fc";
import "@/assets/css/style.css";
export default {
  name: "",
  data() {
    return {
        id:'',
      user:{},
      businessscope_list:[],
      value11: [],
      See: false,
      dates: [],  //时间
      required: true,
      TrainingLevels: [],
      class_obj: {
        //班级对象
        //					"Id": '',	//self.currentClass
        Name: "", //self.className
        ConsignTrainingAgency: "", //委托培训机构
        TrainingAgencyContacts: "", //委托考核机构
        TrainingAgencyContactNumber: "",
        ConsignAssessAgency: "",
        AssessAgencyContacts: "",
        AssessAgencyContactNumber: "",
        TrainingAddress: "",
        TrainingType: "",
        TrainingLevel: "",
        TrainingPrice: 0,
        TrainingPersonNumber: 0,   //直补人数
        TrainingStartDate: "",
        TrainingEndDate: "",
        TrainingDay: "",
        Contacts: "",
        ContactNumber: "",
        FillTableDate: new Date(),
        CreateUser: "", //"useless"
        CreateUserName: "",
        CreateUserPhone: "",
        StudentUrl: "", //好像是个上传地址
        ScheduleUrl: "",
        StudentList: [],
        Status: "",
        Type:0      //表示直补
      },
      Prompt: "", //提示语
      username: "",
      userType: "",
      userId: "",
      Name: "",
      file: "",
      currentClass: "",
      ispass: true,
      table1: false,
      table2: false,
      table3: true,
      rej: "",
      rejMsg: "", 
      Account_detection: 1     
    };
  },
  methods: {
    //返回
    retu() {
      window.history.back();
    },

    openTable3: function() {
      this.table3 = !this.table3;
    },

    class_return(x) {
        var x = JSON.parse(x);
        console.log(x);
        x.Memory.TrainingStartDate=dateFtt(x.Memory.TrainingStartDate,'yyyy-MM-dd');
        x.Memory.TrainingEndDate=dateFtt(x.Memory.TrainingEndDate,'yyyy-MM-dd');
        this.dates=[ x.Memory.TrainingStartDate, x.Memory.TrainingEndDate]
        this.class_obj = x.Memory;
        this.class_obj.StudentList=[]
    },
    //查询班级
    getData: function() {
        console.log(this.id)
      let self = this;
      if (this.id) {
          console.log('查询班级')
        //http(this,'get','/class/id',{'class_id':this.id},this.class_return)
        ajax("get", "/class/id", {id: this.id },this.class_return);
      }
    },
    //提交
    submitInfo: function() {      
          if(this.dates.length < 2){
            this.$message({
              message: '请填写开班时间！',
              type: 'warning'
            });
            return;
          }else{
            var milliseconds = new Date(this.class_obj.TrainingEndDate).getTime() - new Date(this.class_obj.TrainingStartDate).getTime();
            var re = new Date(milliseconds) / (1000*60*60*24) + 1;
            this.class_obj.TrainingDay = re;
          }



        this.class_obj.TrainingType=this.value11.join(',');
        console.log(this.class_obj)
        if(this.class_obj.Status==''){//添加
          // this.$message({
          //     showClose: true,
          //     message: '学生花名册 Excel 文件人数与所填写人数不符，请重新填写！',
          //     type: 'error'
          // });
          // ajax('post','/class/q',JSON.stringify(this.class_obj),this.post_class)
        }else{//查看或修改
              // this.class_obj.Status=3 //添加补贴为 3
              // ajax('patch','/class/q',JSON.stringify(this.class_obj),this.post_class)
        }
        ajax("post","/class",JSON.stringify(this.class_obj), this.post_class);
    },
    post_class(x) {
      console.log(x);
      var x = JSON.parse(x);
      if (!x.Result) {
        this.Prompt = x.Message;
        $("#newclass .modal_1").modal("show");
        this.Account_detection = 2;
      } else {
        // this.Prompt = "开班成功！已提交至审核！";
        // $("#newclass .modal_1").modal("show");
        this.$alert('开班成功!', '提示', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          callback: action => {
             window.history.back();
          }
        });
      }
    },
    upload1() {
      var self = this;
      var formdata = new FormData();
      formdata.append("upload", $("#file1")[0].files[0]);
      $.ajax({
        type: "post",
        url: "http://114.55.173.248:2000/upload",
        data: formdata,
        cache: false,
        processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
        contentType: false, // 不设置Content-type请求头
        success: function(res) {
          var data = JSON.parse(res);
          var class_obj = self.class_obj;
          self.$set(self.class_obj, "StudentUrl", data.Memory);
          self.$message({
            message: "上传成功",
            type: "success"
          });
          ajax('get','/student/excel',{'path':data.Memory},self.excel_return)
        },
        error: function(err) {
          console.log(err);
          self.$message({
            message: "上传失败",
            type: "error"
          });
        }
      });
    },
    excel_return(x){
      var x=JSON.parse(x);
      console.log(x)
      ajax('post', '/student/c', JSON.stringify({DataList: x.Memory.DataList, Class: 0}), (re) => {
        this.Prompt = JSON.parse(re).Message;
        if(!JSON.parse(re).Result){
          $("#newclass .modal_1").modal("show");
        }else{
          this.class_obj.StudentList=x.Memory.DataList;
          this.class_obj.TrainingPersonNumber=x.Memory.DataList.length;
          this.$message({
            message: "上传成功",
            type: "success"
          });
        }
      })
    },
    upload2() {
      var self = this;
      var formdata = new FormData();
      formdata.append("upload", $("#file2")[0].files[0]);
      $.ajax({
        type: "post",
        url: "http://114.55.173.248:2000/upload",
        data: formdata,
        cache: false,
        processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
        contentType: false, // 不设置Content-type请求头
        success: function(res) {
          var data = JSON.parse(res);
          var class_obj = self.class_obj;
          self.$set(self.class_obj, "ScheduleUrl", data.Memory);
          self.$message({
            message: "上传成功",
            type: "success"
          });
        },
        error: function(err) {
          console.log(err);
          self.$message({
            message: "上传失败",
            type: "error"
          });
        }
      });
    },
    businessscope(x){
      var x=JSON.parse(x);
      console.log('业务范围',x);
      var list=[];
      this.businessscope_list=x.Memory
    },
    setClassName() {//机构‘JG+当年年份+000n’
      var type = 'ZB';
      var year = new Date().getFullYear();
      var testName = type + year;
      console.log(testName)
      this.class_obj.Name = testName;
      ajax('get', '/class/batchno?no='+testName, '', (x) => {
        var re = JSON.parse(x);
        if(re.Result){
          var last4 = re.Memory.slice(-4);
          this.class_obj.Name = testName + PreFixInterge( String(Number(last4)+1), 4);
          this.Account_detection = 1;
        }
      })      
    }
  },
  watch: {
    dates() {
      console.log(this.dates)
      if(this.dates){
        this.$set(this.class_obj, "TrainingStartDate", this.dates[0]);
        this.$set(this.class_obj, "TrainingEndDate", this.dates[1]);
      }else{
        this.$set(this.class_obj, "TrainingStartDate", '');
        this.$set(this.class_obj, "TrainingEndDate", '');
      }
      
    },
    class_obj: {
      deep: "true",
      handler(newVal) {
        for (let item in newVal) {
          if (newVal[item] == "") {
            this.required = false;
          }
        }
      }
    }
  },
  created: function() {
    $.get("http://114.55.173.248:2000/v1/subsidystandard", res => {
      var data = JSON.parse(res);
      this.TrainingLevels = data.Memory;
    });
  },
  mounted: function() {
    var user0609 = JSON.parse(localStorage.user0609);
    console.log(user0609);
    this.user=user0609
    this.class_obj.User = user0609.Id;
    // this.class_obj.Type = 1;

    this.class_obj.CreateUser = user0609.Id;
    this.class_obj.CreateUserName = user0609.Name;
    this.class_obj.CreateUserPhone = user0609.ContactNumber;
    // this.id = sessionStorage.getItem("currentClick");
    var query=this.$route.query
    this.id=query.id ? query.id : '';
    console.log('课程id',this.id)
    this.getData();
    this.setClassName();
    // var params = this.$route.params;
    // this.See = params.type ? true : false;

    //查询业务范围
    // ajax('get','/businessscope','',this.businessscope)


  }
};
</script>

<style>

/* 状态 */
#newclass .box_2{
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  position: relative;
  margin: 30px 100px 30px;
}
#newclass .box_2>li{
  position: relative;
  padding: 30px 0px 0px 0px;
  z-index: 2;
}
#newclass .box_2::after{
  z-index: 0;
  position: absolute;
  bottom: 25px;
  left: 0px;
  width: 100%;
  height:5px;
  content:'';
  background:#dcdcdc;
}
#newclass .box_2::before{
  z-index: 1;
  position: absolute;
  bottom: 25px;
  left: 0px;
  height:5px;
  content:'';
  background:#2d2dda;
}
#newclass .box_2 li>div:nth-child(1){
  position: absolute;
  top: 0px;
  left: 0px;
  width: 50px;
  text-align: center;
  /* display: none; */
}
/* 改变背景颜色 */
#newclass .box_2 li.active_1>div:nth-child(2){
  background: #2d2dda;
}
/* 改变背景颜色并打钩 */
#newclass .box_2 li.active>div:nth-child(1){
  display: block;
}
#newclass .box_2 li.active>div:nth-child(2){
  background: #2d2dda;
}
#newclass .box_2 li.active>div:nth-child(2)>span{
  display: none;
}
#newclass .box_2 li.active>div:nth-child(2)>i{
  display: inline-block;
}
#newclass .box_2 li>div:nth-child(2){
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #ffffff;
  text-align: center;
  /* background: #2d2dda; */
  background: #dcdcdc;
  line-height: 48px;
  font-size: 26px;
}
#newclass .box_2 li>div i{
  display: none;
}

/* #newclass .box_2.active_1::before{
  width: 25%;
}
#newclass .box_2.active_2::before{
  width: 50%;
} */
#newclass .box_2.active_3::before{
  width: 50%;
}
#newclass .box_2.active_4::before{
  width: 100%;
}
#newclass .box_2.active_5::before{
  width: 100%;
}




#newclass .no_border {
  border: none;
  background: none;
}
#newclass .no_border:focus {
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

#newclass .input_box{
  position: relative;
  padding-left: 0!important;
  padding-right: 0!important;
}
#newclass .input_box input{
  width: 100%;
  height: 100%;
}
.input_box .err_1,
.input_box .ok_1{
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.input_box .err_1{
  color: red;
}
.input_box .ok_1{
  color: #04b980;
}
.input_box .btnRe{
  position: absolute;
  right: -0;
  top: 50%;
  transform: translate(110%, -50%);
  /* background: #2f32db; */
  z-index: 10;
}
</style>