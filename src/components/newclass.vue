<template>
	<div id="newclass">
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

			<section class="input-block">
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
                                <span class="text-danger">* </span>培训单位联系人</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.TrainingAgencyContacts" required/>
						</div>
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>联系电话</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.TrainingAgencyContactNumber" required/>
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
                                <span class="text-danger">* </span>考核单位联系人</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.AssessAgencyContacts" required/>
						</div>
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>联系电话</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.AssessAgencyContactNumber" required/>
						</div>
					</div>
				</div>
			</section>
			
			<section class="input-block">
				<h5 class="title">开班信息填写</h5>
				<div class="row">
					<div class="col-6">
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>班级名称</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.Name" required/>
						</div>

						<div class="row info">
							<label>
                                <span class="text-danger">* </span>培训班地址</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.TrainingAddress" required/>
						</div>
						<div class="row info">
							<label><span class="text-danger">* </span>培训工种</label>
              <!-- <input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.TrainingType" required/> -->
              <div class="col-md-6" style="text-align:left;padding:0px;">
                <el-select v-model="value11" multiple collapse-tags placeholder="请选择">
                  <el-option
                    v-for="item in businessscope_list"
                    :key="item.Name"
                    :label="item.Name"
                    :value="item.Name">
                  </el-option>
                </el-select> 
              </div>
            </div>
						<div class="row info">
							<label>
                <span class="text-danger">* </span>培训等级</label>
                <input v-if="currentClass!=''" :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" class="form-control col-md-6" v-model="class_obj.TrainingLevel" type="text" name="" id="" value="" />
                <select id="TrainingLevel" v-if="currentClass==''" name="trainingLv" v-model="class_obj.TrainingLevel" class="form-control w-50">
                  <option v-for=" item in TrainingLevels" :key="item.id"  :value="item.Name">{{item.Name}}</option>
                </select>
						</div>
					</div>
					<div class="col-6">
						<div class="row info">
							<label>
                <span class="text-danger">* </span>开班时间</label>
							 <!-- <el-date-picker :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="dates" value-format="yyyy-MM-dd" v-model="dates" placeholder="选择一个或多个日期"></el-date-picker> -->
                <!-- <div class="form-control col-md-6 text-left" :class="{'no_border':currentClass!=''}" v-if="See">{{class_obj.TrainingStartDate}}至{{class_obj.TrainingEndDate}}</div> -->
               <div v-if="!See" class="block col-md-6">
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
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>培训期限</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" placeholder="请输入天数" v-model="class_obj.TrainingDay" required/>
						</div>
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>联系人</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.Contacts" required/>
						</div>
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>联系人电话</label>
							<input :readonly="currentClass!=''" :class="{'no_border':currentClass!=''}" type="text" class="form-control col-md-6" v-model="class_obj.ContactNumber" required/>
						</div>
					</div>
				</div>
			</section>
			<section class="input-block">
				<h5 class="title">上传资料文件</h5>
				<div class="row info">
					<label><span class="text-danger">* </span>培训人员花名册:</label>
					<div class="col-12" v-if="table1">
						<table class="w-100">
							<!-- 设置表头 -->
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
							<!-- 设置表格内部的内容 -->
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
						<button @click="addStudent" class="btn">继续添加</button>
						<button id="button-a" class="btn" @click="downloadStudent">下载表</button>
					</div>
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
						<button @click="addCourse" class="btn">继续添加</button>
						<button id="button-a" class="btn" @click="downloadCourse">下载表</button>
					</div>
					<form  @submit.prevent="upload2" id="form-2" >
						<input id="file2" type="file" />
						<button class="btn">上传</button>
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

						<!-- <div class="row">
                            <div class="col-2 bt">审批人</div>
                            <div class="col-3 bt"><input type="text" class="w-100" v-model="allowance.jugement" disabled></div>
                            <div class="col-3 bt">核准人</div>
                            <div class="col-3 bt"><input type="text" class="w-100" v-model="allowance.check" disabled></div>
                        </div> -->

						<!-- <div class="row">
                            <div class="col-2 bt">审核时间</div>
                            <div class="col-9 bt"><input type="text" class="w-100" v-model="allowance.jugeDate" disabled></div>
                        </div> -->

					</div>
					<button class="btn mr-2" @click="openTable3">在线编辑</button>
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
				<button type="button" @click="retu()" class="mr-5 app-btn rounded-btn">返回</button>
				<button  v-if="!See" type="button" class="app-btn" @click.prevent="submitInfo">{{class_obj.Status == 4 ? '审核已经通过': '提交审核'}}</button>
			</div>
		</section>


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
					<!--<button type="button" class="btn btn-primary">Save changes</button>-->
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

import { http, ajax ,dateFtt} from "@/assets/fc";
import "@/assets/css/style.css";
export default {
  name: "",
  data() {
    return {
      businessscope_list:[],
      value11: [],
      See: false,
      dates: [],
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
        TrainingPersonNumber: 0,
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
        Status: ""
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
      }
    };
  },
  methods: {
    //返回
    retu() {
      window.history.back();
    },
    downloadCourse: function() {
      console.log(this.courseData);
      var wb = XLSX.utils.book_new();
      wb.SheetNames.push("Course Sheet");

      var ws_data = [
        ["2018年成都市总工会在职职工万人免费技能提升培训课程表"],
        [
          "培训机构",
          `${this.class_obj.training}`,
          "",
          "培训等级",
          `${this.class_obj.TrainingLevel}`
        ],
        ["班次", ``, "", "开班日期", `${this.clasStart}`],
        ["日期", "授课时间", "培训内容", "授课形式", "授课教师"]
      ];

      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      XLSX.utils.sheet_add_json(ws, this.courseData, {
        skipHeader: true,
        origin: "A4"
      });

      wb.Sheets["Test Sheet"] = ws;
      XLSX.writeFile(wb, "课程表.xlsx");
    },
    downloadStudent: function() {
      var wb = XLSX.utils.book_new();

      wb.SheetNames.push("Student Sheet");
      var ws_data = [
        ["成都市总工会在职职工万人免费技能提升培训学员花名册"],
        [
          "培训机构",
          `${this.class_obj.training}`,
          "",
          "工种班次",
          ``,
          "",
          "开班日期",
          `${this.class_obj.TrainingStartDate}`,
          ""
        ],
        [
          "序号",
          "姓名",
          "性别",
          "民族",
          "文化程度",
          "身份证号码",
          "工种",
          "工作单位",
          "联系电话",
          "证书类型",
          "原技术等级",
          "培训等级",
          "证书编号",
          "家庭地址"
        ]
      ];

      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      XLSX.utils.sheet_add_json(ws, this.studentData, {
        skipHeader: true,
        origin: "A4"
      });

      ws["!merges"] = [
        {
          s: {
            c: 0,
            r: 0
          },
          e: {
            c: 14,
            r: 0
          }
        },
        {
          s: {
            c: 1,
            r: 1
          },
          e: {
            c: 2,
            r: 1
          }
        },
        {
          s: {
            c: 4,
            r: 1
          },
          e: {
            c: 5,
            r: 1
          }
        },
        {
          s: {
            c: 7,
            r: 1
          },
          e: {
            c: 8,
            r: 1
          }
        }
      ];

      wb.Sheets["Test Sheet"] = ws;
      XLSX.writeFile(wb, "学员花名册.xlsx");
    },
    editItem: function(item, type, event) {
      item[type] = event.target.innerText;
    },

    editCourse: function(item, type, event) {
      item[type] = event.target.innerText;
    },

    addStudent: function() {
      this.studentData.push({
        Sort: "",
        Name: "",
        Sex: "",
        Nation: "",
        EducationLevel: "",
        IdCardNo: "",
        TrainingType: "",
        Company: "",
        TrainingPrice: "",
        ContactNumber: "",
        CertificateType: "",
        OriginalTechnologyLevel: "",
        CertificateNumber: "",
        Address: "",
        TrainingLevel: ""
      });
    },

    addCourse: function() {
      this.courseData.push({
        date: "",
        time: "",
        content: "",
        form: "",
        teacher: ""
      });
    },

    openTable1: function() {
      this.table1 = !this.table1;
    },

    openTable2: function() {
      this.table2 = !this.table2;
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
      this.class_obj.TrainingType=this.value11.join(',');


      //获取学生列表
      new Promise((a, b) => {
        if (self.class_obj.StudentUrl != "") {
          console.log(1);
          $.get({
            url: `//114.55.173.248:2000/v1/student/excel?path=${self.class_obj.StudentUrl}`,
            success(res) {
              var data = JSON.parse(res);
              if (data.Result) {
                self.class_obj.TrainingPersonNumber = data.Memory.DataList.length;
                self.TrainingLevels.forEach(item => {
                if (item["Name"] === self.class_obj.TrainingLevel) {
                  sum = item["Price"] * self.class_obj.TrainingPersonNumber;
                }
				});
				var newdata = data.Memory.DataList.map(item=>{
					item.TrainingPrice = '';  //返回的数据添加这两个key
					item.CertificateNumber = '';
					return item
				})
                a(newdata);
              } else {
                b(data.Message);
              }
            },
            error(err) {
              b(err);
            }
          });
        } else {
          a(null);
        }
      }).then(data => {
		  //添加班级
		  self.class_obj.TrainingPrice = sum.toString();
          if (data) {
            this.class_obj.StudentList = data;
          }
          this.class_obj.Type = "1";
          if (self.class_obj.Status == 1) {
            ajax("post","/class",JSON.stringify(this.class_obj), this.post_class);
          } else if (self.class_obj.Status == 2) {
            ajax("patch","/class",JSON.stringify(this.class_obj),this.post_class);
          } else if (self.class_obj.Status == 3) {
            ajax("patch","/class", JSON.stringify(this.class_obj),this.post_class);
          } else if (!self.class_obj.Status) {
            //添加
			      self.class_obj.Status = 1;
            ajax("post", "/class", JSON.stringify(self.class_obj), function(res) {
              console.log(JSON.stringify(self.class_obj));
			        console.log(res);
			        console.log('添加成功')
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      //
    },
    post_class(x) {
      console.log(x);
      var x = JSON.parse(x);
      if (!x.Result) {
        this.Prompt = x.Message;
        $("#newclass .modal_1").modal("show");
      } else {
        this.Prompt = "设置成功";
        $("#newclass .modal_1").modal("show");
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
      this.StudentList=x.Memory.DataList;
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
    // 			this.username = user0609.Code;
    //          this.userId = user0609.Id;
    //          this.userType = user0609.Type;

    this.class_obj.User = user0609.Id;
    this.class_obj.Type = user0609.Type;

    this.class_obj.CreateUser = user0609.Id;
    this.class_obj.CreateUserName = user0609.Name;
    this.class_obj.CreateUserPhone = user0609.ContactNumber;
    //          CreateUser
    //          CreateUserName
    //          CreateUserPhone
    //          sessionStorage.currentClick=43
    this.currentClass = sessionStorage.getItem("currentClick");
    console.log('课程id',this.currentClass)
    this.getData();

    var params = this.$route.params;
    this.See = params.type ? true : false;

    //查询业务范围
    ajax('get','/businessscope','',this.businessscope)


  }
};
</script>

<style>
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
  background: url(../assets/img/status-1.png) no-repeat center center;
}

.status-2 {
  height: 300px;
  background: url(../assets/img/status-2.png) no-repeat center center;
}

.status-3 {
  height: 300px;
  background: url(../assets/img/status-3.png) no-repeat center center;
}

.status-4 {
  height: 300px;
  background: url(../assets/img/status-4.png) no-repeat center center;
}

.rej:before {
  content: url(../assets/img/error.png);
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