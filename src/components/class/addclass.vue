<template>
	<div id="newclass">
    <form @submit.prevent="submitInfo" id="wrapForm">
		<section class="application container">
			<div class="d-flex align-items-center bread border-bottom">您的位置： 首页 >&emsp13;
				<a href="#">新建课程</a>
			</div>

			<div class="status my-5 d-flex align-items-center" v-if="rejMsg">
				<span class="rej ml-5">驳回理由：{{rejMsg}}</span>
			</div>

			<div class="status-1" v-show="class_obj.Status==1"></div>
			<div class="status-2" v-show="class_obj.Status==2"></div>
			<div class="status-3" v-show="class_obj.Status==3"></div>
			<div class="status-4" v-show="class_obj.Status==4"></div>

			<section class="input-block" v-if="user.Type==1">
			<!-- <section class="input-block"> -->
				<h5 class="title">基本信息填写</h5>
				<div class="row">
					<div class="col-6">
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>委托培训机构</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.ConsignTrainingAgency" required/>
						</div>
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>培训机构联系人</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.TrainingAgencyContacts" required/>
						</div>
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>培训机构联系电话</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.TrainingAgencyContactNumber" required @change="checkChange1"/>
              <span v-if="showInfo.change1" style="color:red;margin-left:260px;">请输入有效的手机号码！</span>
            </div>

					</div>

					<div class="col-6">

						<div class="row info">
							<label>
                                <span class="text-danger">* </span>委托考核机构</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.ConsignAssessAgency" required/>
						</div>
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>考核机构联系人</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.AssessAgencyContacts" required/>
						</div>
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>考核机构联系电话</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.AssessAgencyContactNumber" required @change="checkChange2"/>
              <span v-if="showInfo.change2" style="color:red;margin-left:260px;">请输入有效的手机号码！</span>
            </div>
					</div>
				</div>
			</section>
			
			<section class="input-block">
				<h5 class="title">开班信息填写</h5>
				<div class="row">
					<div class="col-6">
						<div class="row info">
							<label><span class="text-danger">* </span>班级批次</label>
							<div class="input_box col-md-6">
                <input readonly  type="text" class=" form-control" v-model="class_obj.Name" required/>
                 <i v-if="Account_detection==2" class="err_1 el-icon-error"></i>
							   <i v-if="Account_detection==1" class="ok_1 el-icon-success"></i>
                 <!-- <el-button class="btnRe" type="primary" size="mini">主要按钮</el-button> -->
                 <el-button v-if="Account_detection==2" class="btnRe" plain size="small" @click.prevent="setClassName">更新</el-button>
              </div>
						</div>
            <!-- <div class="row info">
							<label><span class="text-danger">* </span>培训人数</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="number" class="form-control col-md-6" v-model="class_obj.TrainingPersonNumber" required/>
						</div> -->
						<div class="row info">
							<label><span class="text-danger">* </span>培训班地址</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.TrainingAddress" required/>
						</div>
						<div class="row info">
							<label><span class="text-danger">* </span>培训工种</label>
              <!-- <input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.TrainingType" required/> -->
              <!-- <div class="col-md-6" style="text-align:left;padding:0px;">
                <el-select style="width:100%" v-model="value11" multiple collapse-tags placeholder="请选择">
                  <el-option
                    v-for="item in businessscope_list"
                    :key="item.Name"
                    :label="item.Name"
                    :value="item.Name">
                  </el-option>
                </el-select> 
              </div> -->
              <select id="businessscope" v-if="currentClass==''" v-model="value11" class="form-control w-50" required>
                <option v-for=" item in businessscope_list" :key="item"  :value="item">{{item}}</option>
              </select>
            </div>
						<div class="row info">
							<label><span class="text-danger">* </span>证书类型</label>
              <select id="TrainingLevel" v-if="currentClass==''" name="trainingLv" v-model="class_obj.CertificateType" class="form-control w-50" required @change="CertificateChange">
                <option v-for=" item in certificateType_list" :key="item"  :value="item">{{item}}</option>
              </select>
						</div>
					</div>
					<div class="col-6">
						<div class="row info">
							<label>
                <span class="text-danger">* </span>开班时间</label>
							 <!-- <el-date-picker :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="dates" value-format="yyyy-MM-dd" v-model="dates" placeholder="选择一个或多个日期"></el-date-picker> -->
                <!-- <div class="form-control col-md-6 text-left" :class="{'no_border':currentClass!=''}" v-if="See">{{class_obj.TrainingStartDate}}至{{class_obj.TrainingEndDate}}</div> -->
               <div v-if="!See" class="block col-md-6" style="padding:0px">
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
							<label>
                                <span class="text-danger">* </span>培训期限</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" placeholder="请输入天数" v-model="class_obj.TrainingDay" required/>
						</div> -->
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>联系人</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.Contacts" required/>
						</div>
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>联系人电话</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.ContactNumber" required @change="checkChange3"/>
              <span v-if="showInfo.change3" style="color:red;margin-left:260px;">请输入有效的手机号码！</span>
            </div>
            <div class="row info">
							<label><span class="text-danger">* </span>培训等级</label>
              <!-- <input v-if="currentClass!=''" :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" class="form-control col-md-6" v-model="class_obj.TrainingLevel" type="text" name="" id="" value="" /> -->
              <select v-if="currentClass==''" name="trainingLv" v-model="class_obj.TrainingLevel" class="form-control w-50" required @change='levelChange'>
                <option v-for=" item in TrainingLevels" :key="item.id"  :value="item.Name">{{item.Name}}</option>
              </select>
						</div>
					</div>
				</div>
			</section>
			<section class="input-block">
				<h5 class="title">上传资料文件 <span class="text-red">(选择文件后请点击上传)</span> </h5>
				<div class="row info">
					<label><span class="text-danger">* </span>培训人员花名册:</label>
					<div class="col-12" v-if="table1">
						<table class="w-100">
							<thead class="table-head">
								<tr>
									<th>序号</th>
									<th>姓名</th>
									<th>性别</th>
									<th>名族</th>
									<th>文化程度</th>
									<th>身份证号码</th>
									<th>工种</th>
									<th>工作单位</th>
									<th>联系电话</th>
									<th>证书类型</th>
									<th>原技术的等级</th>
									<th>培训等级</th>
									<th>证书编号</th>
									<th>家庭地址</th>
								</tr>
							</thead>
							<tbody>
								<tr class="text-center" v-for="(item,index) in studentData">
									<td contenteditable="true" @keyup="editItem(item, 'Sort', $event)"></td>
									<td contenteditable="true" @keyup="editItem(item, 'Name',$event)"></td>
									<td contenteditable="true" @keyup="editItem(item, 'Sex',$event)"></td>
									<td contenteditable="true" @keyup="editItem(item,'Nation',$event)"></td>
									<td contenteditable="true" @keyup="editItem(item,'EducationLevel',$event)"></td>
									<td contenteditable="true" @keyup="editItem(item,'IdCardNo',$event)"></td>
									<td contenteditable="true" @keyup="editItem(item,'TrainingType',$event)"></td>
									<td contenteditable="true" @keyup="editItem(item,'Company',$event)"></td>
									<td contenteditable="true" @keyup="editItem(item,'ContactNumber',$event)"></td>
									<td contenteditable="true" @keyup="editItem(item,'CertificateType',$event)"></td>
									<td contenteditable="true" @keyup="editItem(item,'OriginalTechnologyLevel',$event)"></td>
									<td contenteditable="true" @keyup="editItem(item,'TrainingLevel',$event)"></td>
									<td contenteditable="true" @keyup="editItem(item,'CertificateNumber',$event)"></td>
									<td contenteditable="true" @keyup="editItem(item,'Address',$event)"></td>
								</tr>
							</tbody>
						</table>
						<button @click.prevent="addStudent" class="btn">继续添加</button>
						<button id="button-a" class="btn" @click.prevent="downloadStudent">下载表</button>
					</div>
					<form class="formPosition" action='http://114.55.173.248:2000/upload'  @submit.prevent="upload1" id="form-1" enctype="multipart/form-data" method="POST">
						<input id="file1" type="file" required/>
						<button class="ml-2 btn">上传</button>
            <div class="uploadInfo">
              <span v-if="uploadInfo.upload1 == 1"><i style="color:#04b980;" class="ok_1 el-icon-success"></i>上传成功</span>
              <span v-if="uploadInfo.upload1 == 2" style="color:red">上传失败，学生身份证号码重复！</span>
              <span v-if="uploadInfo.upload1 == 0" style="color:red">请上传学生花名册！！</span>
            </div>
					</form>
					
				</div>
				<div class="row info">
					<label></label>
					<!--<button class="btn" @click="openTable1">在线编辑</button>-->
          	<a href="http://114.55.173.248:2000/upload/student.xlsx"  class="btn">下载花名册模板</a>
				</div>

				<div class="row info">
					<label><span class="text-danger">*</span>课程: </label>
					<div class="col-12 my-3" v-if="table2">
						<table class="w-100">
							<!-- 设置表头 -->
							<thead class="table-head">
								<tr>
									<th>日期</th>
									<th>授课时间</th>
									<th>培训内容</th>
									<th>授课形式</th>
									<th>授课教师</th>
								</tr>
							</thead>
							<tbody class="border-table">
								<tr class="text-center" v-for="(item,index) in courseData">
									<th contenteditable="true" @keyup="editCourse(item, 'date', $event)"></th>
									<th contenteditable="true" @keyup="editCourse(item, 'time', $event)"></th>
									<th contenteditable="true" @keyup="editCourse(item, 'content', $event)"></th>
									<th contenteditable="true" @keyup="editCourse(item, 'form', $event)"></th>
									<th contenteditable="true" @keyup="editCourse(item, 'teacher', $event)"></th>
								</tr>
							</tbody>
						</table>
						<button @click.prevent="addCourse" class="btn">继续添加</button>
						<button id="button-a" class="btn" @click.prevent="downloadCourse">下载表</button>
					</div>
					<form class="formPosition"  @submit.prevent="upload2" id="form-2" >
						<input id="file2" type="file" required/>
						<button class="btn">上传</button>
            <div class="uploadInfo">
              <span v-if="uploadInfo.upload2 == 1"><i style="color:#04b980;" class="ok_1 el-icon-success"></i>上传成功</span>
              <span v-if="uploadInfo.upload2 == 2" style="color:red">上传失败！</span>
              <span v-if="uploadInfo.upload2 == 0" style="color:red">请上传课程表！</span>
            </div>
					</form>
				</div>

				<div class="row info">
					<label></label>
					<!--<button class="btn mr-2" @click="openTable2">在线编辑</button>-->
					<a href="http://114.55.173.248:2000/upload/schedule.xlsx"  class="btn">下载课程表模板</a>
				</div>
				<div class="row info" v-show="class_obj.Status==3">
					<label><span class="text-danger">*</span>申请补贴</label>
					<div id="table3" class="col-12 my-3" v-if="table3">
						<div class="row">
							<div class="col-3 bt">专业</div>
							<div class="col-3 bt">证书类型</div>
							<div class="col-3 bt">等级</div>
							<div class="col-2 bt">人数</div>
						</div>
						<div class="row">
							<div class="col-3 bt">
								<input type="text" class="w-100" v-model="allowance.subject">
							</div>
							<div class="col-3 bt">
								<input type="text" class="w-100" v-model="allowance.certType">
							</div>

							<div class="col-3 bt">
								<input type="text" class="w-100" v-model="allowance.lv">

							</div>
							<div class="col-2 bt">
								<input type="text" class="w-100" v-model="allowance.nop">
							</div>
							<!-- <div class="col-2 bt">
                                <input type="text" class="w-100" v-model="allowance.classDate">

                            </div>

                            <div class="col-3 bt">
                                <input type="text" class="w-100" v-model="allowance.classAddr">
                            </div> -->
						</div>
						<div class="row">
							<div class="col-3 bt">联系人</div>
							<div class="col-2 bt">
								<input type="text" class="w-100" v-model="allowance.contact">
							</div>
							<div class="col-2 bt">联系电话</div>
							<div class="col-4 bt">
								<input type="text" class="w-100" v-model="allowance.tel">
							</div>
						</div>
						<div class="row">
							<div class="col-3 bt">户名</div>
							<div class="col-5 bt">开户行</div>
							<div class="col-3 bt">银行账号</div>
						</div>

						<div class="row">
							<div class="col-3 bt">
								<input type="text" class="w-100" v-model="allowance.account">
							</div>
							<div class="col-5 bt">
								<input type="text" class="w-100" v-model="allowance.bank">
							</div>
							<div class="col-3 bt">
								<input type="text" class="w-100" v-model="allowance.accountNo">
							</div>
						</div>

						<div class="row">
							<div class="col-4 bt">补贴金额</div>
							<div class="col-7 bt">
								<input type="text" class="w-100" placeholder="XX人XX元/人= 元" v-model="allowance.amount">
							</div>
						</div>

						<div class="row">
							<div class="col-2 bt">大写: </div>
							<div class="col-1 bt">
								<input type="text" class="w-100" v-model="allowance.capital1" />
							</div>
							万
							<div class="col-1 bt">
								<input type="text" class="w-100" v-model="allowance.capital2" />
							</div>
							仟
							<div class="col-1 bt">
								<input type="text" class="w-100" v-model="allowance.capital3" />
							</div>
							佰
							<div class="col-1 bt">
								<input type="text" class="w-100" v-model="allowance.capital4" />
							</div>
							元
							<div class="col-1 bt">
								<input type="text" class="w-100" v-model="allowance.capital5" />
							</div>
							角
							<div class="col-1 bt">
								<input type="text" class="w-100" v-model="allowance.capital6" />
							</div>
							分
							<div class="col-2 bl"></div>

						</div>

						<div class="row">
							<div class="col-2 bt">申请单位经办人</div>
							<div class="col-3 bt">
								<input type="text" class="w-100" v-model="allowance.applicant">
							</div>
							<div class="col-3 bt">经办人电话</div>
							<div class="col-3 bt">
								<input type="text" class="w-100" v-model="allowance.applicantTel">
							</div>
						</div>

					</div>
					<button class="btn mr-2" @click.prevent="openTable3">在线编辑</button>
					<a href="xlsx/补贴表.xlsx">下载模板3</a>
				</div>

			</section>
			<hr class="w-75 mt-5">
			<div v-show="class_obj.Status==2">
				是否需要补考
				<input type="checkbox">{{class_obj.Status}}
			</div>
			<hr>

			<div class="row mb-footer mt-5 d-flex justify-content-center">
				<!-- <button type="button" @click.prevent="retu()" class="mr-5 app-btn rounded-btn">返回</button> -->
				<el-button type="info" @click="retu">返回上一页</el-button>
				<!-- <button  v-if="!See" type="submit" class="app-btn" form="wrapForm">{{class_obj.Status == 4 ? '审核已经通过': '提交审核'}}</button> -->
				<el-button v-if="!See" type="primary" native-type="submit" >{{class_obj.Status == 4 ? '审核已经通过': '提交审核'}}</el-button>
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
				<div class="modal-body" v-html="Prompt">
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
      user:{},
      businessscope_list:[],
      value11: [],
      See: false,
      dates: [],
      required: true,
      TrainingLevels: [],
      certificateType_list: ["行业证书", "职业资格等级证书"],
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
        TrainingPersonNumber: '',
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
        Type:1
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
      studentData: [
        {
          Sort: "",
          Name: "",
          Sex: "",
          Nation: "",
          EducationLevel: "",
          IdCardNo: "",
          TrainingType: "",
          Company: "",
          ContactNumber: "",
          CertificateType: "",
          OriginalTechnologyLevel: "",
          TrainingPrice: "",
          CertificateNumber: "",
          Address: "",
          TrainingLevel: ""
        }
      ],
      courseData: [
        {
          date: "",
          time: "",
          content: "",
          form: "",
          teacher: ""
        }
      ],
      allowance: {
        orgName: "",
        dateIn: "",
        subject: "",
        certType: "",
        lv: "",
        nop: "",
        classDate: "",
        classAddr: "",
        contact: "",
        tel: "",
        account: "",
        bank: "",
        accountNo: "",
        amount: "",

        capital1: "",
        capital2: "",
        capital3: "",
        capital4: "",
        capital5: "",
        capital6: "",
        applicant: "",
        applicantTel: "",
        jugement: "",
        check: "",
        jugeDate: ""
      },
      Account_detection: 2,
      showInfo: {
        change1: false,
        change2: false,
        change3: false
      },
      uploadInfo: {
        upload1: 0,
        upload2: 0
      }
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
      this.class_obj = x.Memory;

    },
    getData: function() {
      let self = this;
      if (this.currentClass) {
        //http(this,'get','/class/id',{'class_id':this.currentClass},this.class_return)
        ajax("get", "/class/id", {id: this.currentClass },this.class_return);
      }
    },
    submitInfo: function() {
      let self = this;
      let sum = 0;
      //   console.log(self.class_obj.Status);
      // 1 待审核 课程表 花名册 基本信息
      // 2 待审核 学员证书编号
      // 3 带审核 申请补贴

      // 1-2 stuck，resubmit  审核课程表花名册和基本信息失败
      // console.log(this.value11);
      // return
      

      var checkPhone = this.checkInput(this.class_obj.TrainingAgencyContactNumber, 'phone');
      var checkCredit = this.checkInput(this.class_obj.AssessAgencyContactNumber, 'phone');
      var checkAccount = this.checkInput(this.class_obj.ContactNumber, 'phone');
      for(var re of [checkPhone, checkCredit, checkAccount]){
        if(!re.re){
          this.$message({
            message: re.msg,
            type: 'warning'
          });
          return;
        }
      }

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
     
      if(this.uploadInfo.upload1 == 0 || this.uploadInfo.upload2 == 0){
         this.$message({
            message:"请上传花名册和课程表！",
            type: 'warning'
          });
          return;
      }
      //设置 工种
      // this.class_obj.TrainingType=this.value11.join(',');
      this.class_obj.TrainingType=this.value11;
      console.log(this.class_obj)
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
        this.$alert('开班成功，已提交至审核', '提示', {
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
          self.$set(self.class_obj, "StudentUrl", data.Memory);

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
      for(var j = 0; j < x.Memory.DataList.length-1; j++){
        for(var i = j+1; i < x.Memory.DataList.length; i++){
          if(x.Memory.DataList[j].IdCardNo === x.Memory.DataList[i].IdCardNo && x.Memory.DataList[j].IdCardNo){
            this.uploadInfo.upload1 = 2;
            return;
          }
        }
      }
      ajax('post', '/student/c', JSON.stringify({DataList: x.Memory.DataList, Class: 0}), (re) => {
        this.Prompt = JSON.parse(re).Message;
        if(!JSON.parse(re).Result){
          $("#newclass .modal_1").modal("show");
          this.uploadInfo.upload1 = 0;
        }else{
          this.class_obj.StudentList=x.Memory.DataList;
          this.class_obj.TrainingPersonNumber=x.Memory.DataList.length;
          this.uploadInfo.upload1 = 1;
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
          self.uploadInfo.upload2 = 1;
        },
        error: function(err) {
          console.log(err);
          self.uploadInfo.upload2 = 2;
        }
      });
    },
    setClassName() {//机构‘JG+当年年份+000n’
      var type = this.user.Type == '1' ? 'QY' : 'JG';
      var year = new Date().getFullYear();
      var testName = type + year;
      this.class_obj.Name = testName;
      ajax('get', '/class/batchno?no='+testName, '', (x) => {
        var re = JSON.parse(x);
        if(re.Result){
          var last4 = re.Memory.slice(-4);
          this.class_obj.Name = testName + PreFixInterge( String(Number(last4)+1), 4);
          this.Account_detection = 1;
        }
      })      
    },
    levelChange() {
      if(this.class_obj.TrainingLevel == '从业资格'){
        this.class_obj.CertificateType = '行业证书';
      }else{
         this.class_obj.CertificateType = '职业资格等级证书';
      }
    },
    CertificateChange() {
      if(this.class_obj.CertificateType == '行业证书'){
        this.class_obj.TrainingLevel = '从业资格';
      }
      if(this.class_obj.CertificateType == '职业资格等级证书'){
        this.class_obj.TrainingLevel = '初级';
      }
    },
    get_user(x) {
      var x = JSON.parse(x);
      console.log("获取用户信息", x)
      if(x.Result){
        this.businessscope_list=x.Memory.Businessscope.split(',');
       
      }
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
      var checkPhone = this.checkInput(this.class_obj.TrainingAgencyContactNumber, 'phone');
      this.showInfo.change1 = !checkPhone.re;
      console.log(this.showInfo)
    },
    checkChange2(e) {
      var checkCredit = this.checkInput(this.class_obj.AssessAgencyContactNumber, 'phone');
      this.showInfo.change2 = !checkCredit.re;
    },
    checkChange3(e) {
      var checkAccount = this.checkInput(this.class_obj.ContactNumber, 'phone');
      this.showInfo.change3 = !checkAccount.re;
    },
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
        };
        // if(newVal.CertificateType == '行业证书'){ 
        //   newVal.TrainingLevel = '从业资格';
        // }
        
      }
    },
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
    this.businessscope_list = user0609.Businessscope.split(',');

    this.class_obj.CreateUser = user0609.Id;
    this.class_obj.CreateUserName = user0609.Name;
    this.class_obj.CreateUserPhone = user0609.ContactNumber;
    this.currentClass = sessionStorage.getItem("currentClick");
    console.log('课程id',this.currentClass)

    this.setClassName();
    ajax('get','/user/id',{id: this.user.Id}, this.get_user);
    
    // this.getData();

    // var params = this.$route.params;
    // this.See = params.type ? true : false;

  }
};
</script>

<style scoped>
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

select{
  height: 33px!important;
}
.formPosition{
  position: relative;
}
.formPosition>div{
  position: absolute;
  right: 0;
  top: 15%;
  transform: translateX(110%);
}
</style>