<template>
	<div id="Seeclass">
	<form @submit.prevent="submitInfo" id="wrapForm2">
		<section class="application container">
			<div class="d-flex align-items-center bread border-bottom">您的位置：课程审核 >&emsp13;
				<a href="javascript:void(0)" class="position-info">...</a>
			</div>

			<div class="status my-5 d-flex align-items-center" v-if="rejMsg">
				<span class="rej ml-5">驳回理由：{{rejMsg}}</span>
			</div>

      <!-- <div class="box_1">
        <div class="status-1" v-show="class_obj.Status==1"></div>
        <div class="status-2" v-show="class_obj.Status==2"></div>
        <div class="status-3" v-show="class_obj.Status==3"></div>
        <div class="status-4" v-show="class_obj.Status==4"></div>        
        <span :class="'type_'+class_obj.Status">{{type_name[class_obj.Status]}}</span>
      </div> -->
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
              <span>3</span>
              <i class="el-icon-check"></i>
          </div>
        </li>
        <li :class="{'active_1':class_obj.Status>4,'active':class_obj.Status==4}">
          <div>补贴</div>
          <div>
              <span>4</span>
              <i class="el-icon-check"></i>
          </div>
        </li>
        <li :class="{'active_1':class_obj.Status>5,'active':class_obj.Status==5}">
          <div>结业</div>
          <div>
              <span>5</span>
              <i class="el-icon-check"></i>
          </div>
        </li>
        <li v-if="class_obj.Status == 6">
          <div>已冻结</div>
          <div style="background:#2d2dda">
              <span>6</span>
              <i class="el-icon-check"></i>
          </div>
        </li>
      </ul>

			<section class="input-block" v-if="class_obj.User && class_obj.User.Type==1">
			<!-- <section class="input-block"> -->
				<h5 class="title">基本信息</h5>

				<div class="row">
					<div class="col-6">
						<div class="row info">
							<label><span class="text-danger">* </span>委托培训机构</label>
							<input :readonly="user.Type !='SYSTEM'" type="text" class="form-control col-md-6" v-model="class_obj.ConsignTrainingAgency" required/>
						</div>
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>培训机构联系人</label>
							<input :readonly="user.Type !='SYSTEM'" type="text" class="form-control col-md-6" v-model="class_obj.TrainingAgencyContacts" required/>
						</div>
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>培训机构联系电话</label>
							<input :readonly="user.Type !='SYSTEM'" type="text" class="form-control col-md-6" v-model="class_obj.TrainingAgencyContactNumber" required @change="checkChange1"/>
							<span v-if="showInfo.change1" style="color:red;margin-left:260px;">请输入有效的手机号码！</span>
						</div>

					</div>

					<div class="col-6">

						<div class="row info">
							<label>
                                <span class="text-danger">* </span>委托考核机构</label>
							<input :readonly="user.Type !='SYSTEM'" type="text" class="form-control col-md-6" v-model="class_obj.ConsignAssessAgency" required/>
						</div>
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>考核机构联系人</label>
							<input :readonly="user.Type !='SYSTEM'" type="text" class="form-control col-md-6" v-model="class_obj.AssessAgencyContacts" required/>
						</div>
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>考核机构联系电话</label>
							<input :readonly="user.Type !='SYSTEM'" type="text" class="form-control col-md-6" v-model="class_obj.AssessAgencyContactNumber" required @change="checkChange2"/>
							<span v-if="showInfo.change2" style="color:red;margin-left:260px;">请输入有效的手机号码！</span>
						</div>
					</div>
				</div>
			</section>
			
			<section class="input-block">
				<h5 class="title">开班信息</h5>
				<div class="row">
					<div class="col-6">
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>班级批次</label>
							<input :readonly="user.Type !='SYSTEM'" type="text" class="form-control col-md-6" v-model="class_obj.Name" required/>
						</div>
            			<!-- <div class="row info">
							<label><span class="text-danger">* </span>培训人数</label>
							<input :readonly="user.Type !='SYSTEM'" type="text" class="form-control col-md-6" v-model="class_obj.TrainingPersonNumber" required/>
						</div> -->
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>培训班地址</label>
							<input :readonly="user.Type !='SYSTEM'" type="text" class="form-control col-md-6" v-model="class_obj.TrainingAddress" required/>
						</div>
						<div class="row info">
							<label><span class="text-danger">* </span>培训工种</label>
              <input readonly v-if="user.Type !='SYSTEM'" type="text" class="form-control col-md-6" v-model="class_obj.TrainingType" required/>
				<select v-else id="businessscope" v-model="value11" class="form-control w-50">
                	<option v-for=" item in businessscope_list" :key="item"  :value="item">{{item}}</option>
              </select>
              <!-- <div class="col-md-6" style="text-align:left;padding:0px;">
                <el-select v-model="value11" multiple collapse-tags placeholder="请选择">
                  <el-option
                    v-for="item in businessscope_list"
                    :key="item.Name"
                    :label="item.Name"
                    :value="item.Name">
                  </el-option>
                </el-select> 
              </div> -->
            </div>
						<div class="row info">
							<label>
                <span class="text-danger">* </span>培训等级</label>
                <input readonly v-if="user.Type !='SYSTEM'" class="form-control col-md-6" v-model="class_obj.TrainingLevel" type="text" name="" id="" value="" />
                <select v-else id="TrainingLevel" name="trainingLv" v-model="class_obj.TrainingLevel" class="form-control w-50" @change='levelChange'>
                  <option v-for=" item in TrainingLevels" :key="item.id"  :value="item.Name">{{item.Name}}</option>
                </select>
						</div>
					</div>
					<div class="col-6">
						<div class="row info">
							<label>
                <span class="text-danger">* </span>开班时间</label>
							 <!-- <el-date-picker :readonly="user.Type !='SYSTEM'" :class="{'no_border':user.Type !='SYSTEM'}" type="dates" value-format="yyyy-MM-dd" v-model="dates" placeholder="选择一个或多个日期"></el-date-picker> -->
                <!-- <div class="form-control col-md-6 text-left" v-if="user.Type !='SYSTEM'">{{class_obj.TrainingStartDate}}至{{class_obj.TrainingEndDate}}</div> -->
                <input v-if="user.Type !='SYSTEM'" readonly class="form-control col-md-6" :value="(()=> this.class_obj.TrainingStartDate+'至'+class_obj.TrainingEndDate)()"/>
               <div v-else class="block col-md-6" style="padding: 0">
                <el-date-picker
                value-format="yyyy-MM-dd"
                  v-model="dates"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="dates">
                </el-date-picker>
              </div>
            </div>
						<!-- <div class="row info">
							<label>
                                <span class="text-danger">* </span>培训期限</label>
							<input :readonly="user.Type !='SYSTEM'"type="text" class="form-control col-md-6" placeholder="请输入天数" v-model="class_obj.TrainingDay" required/>
						</div> -->
            			
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>联系人</label>
							<input :readonly="user.Type !='SYSTEM'" type="text" class="form-control col-md-6" v-model="class_obj.Contacts" required/>
						</div>
						<div class="row info">
							<label>
                                <span class="text-danger">* </span>联系人电话</label>
							<input :readonly="user.Type !='SYSTEM'" type="text" class="form-control col-md-6" v-model="class_obj.ContactNumber" required @change="checkChange3"/>
							<span v-if="showInfo.change3" style="color:red;margin-left:260px;">请输入有效的手机号码！</span>
						</div>
						<div class="row info">
							<label><span class="text-danger">* </span>证书类型</label>
							<input readonly v-if="user.Type !='SYSTEM'" type="text" class="form-control col-md-6" placeholder="请输入天数" v-model="class_obj.CertificateType" required/>
							<select v-else name="trainingLv" v-model="class_obj.CertificateType" class="form-control w-50" @change="CertificateChange">
				                <option v-for=" item in certificateType_list" :key="item"  :value="item">{{item}}</option>
				            </select>

						</div>
					</div>
				</div>
			</section>
			<section class="input-block">
				<h5 class="title">资料文件</h5>
				<div class="row info" >
					<label>培训人员花名册:</label>
					<div class="col-12">
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
									<!-- <th>证书类型</th> -->
									<th>原技术的等级</th>
									<th>培训等级</th>
									<!-- <th>证书编号</th> -->
									<th>家庭地址</th>
								</tr>
							</thead>
							<tbody>
								<tr class="text-center" v-for="(x,$index) in student_obj.DataList">
									<td  @keyup="editItem(x, 'Sort', $event)">{{x.Sort}}</td>
									<td  @keyup="editItem(x, 'Name',$event)" style="min-width:5em;">{{x.Name}}</td>
									<td  @keyup="editItem(x, 'Sex',$event)">{{x.Sex}}</td>
									<td  @keyup="editItem(x,'Nation',$event)">{{x.Nation}}</td>
									<td  @keyup="editItem(x,'EducationLevel',$event)">{{x.EducationLevel}}</td>
									<td  @keyup="editItem(x,'IdCardNo',$event)" style="padding: 0 .5em">{{x.IdCardNo}}</td>
									<td  @keyup="editItem(x,'TrainingType',$event)" style="white-space:nowrap;padding:0 .5em;">{{x.TrainingType}}</td>
									<td  @keyup="editItem(x,'Company',$event)"  style="max-width:10em;padding:0 .3em">{{x.Company}}</td>
									<td  @keyup="editItem(x,'ContactNumber',$event)">{{x.ContactNumber}}</td>
									<!-- <td  @keyup="editItem(x,'CertificateType',$event)">{{x.CertificateType}}</td> -->
									<td  @keyup="editItem(x,'OriginalTechnologyLevel',$event)">{{x.OriginalTechnologyLevel}}</td>
									<td  @keyup="editItem(x,'TrainingLevel',$event)">{{x.TrainingLevel}}</td>
									<!-- <td  @keyup="editItem(x,'CertificateNumber',$event)">{{x.CertificateNumber}}</td> -->
									<td  @keyup="editItem(x,'Address',$event)"  style="max-width:10em;padding:0 .3em">{{x.Address}}</td>
								</tr>
							</tbody>
						</table>
						<!-- <button @click="addStudent" class="btn">继续添加</button> -->
						<!-- <button id="button-a" class="btn" @click="downloadStudent">下载表</button> -->
					</div>
					<!-- <form action='http://114.55.173.248:2000/upload'  @submit.prevent="upload1" id="form-1" enctype="multipart/form-data" method="POST">
						<input id="file1" type="file" required/>
						<button class="ml-2 btn">上传</button>
					</form> -->
				</div>
        <div class="row info">
          <div class="col-12">
              <div style="float:right">
              <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange" 
                :current-page.sync="query_obj.page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="query_obj.per_page" 
                layout="sizes,prev, pager, next, jumper" 
                :total="student_obj.MaxCount">
              </el-pagination>
            </div>
          </div>
        </div>
				<!-- <div class="row info">
					<label></label>
          	<a href="http://114.55.173.248:2000/upload/student.xlsx"  class="btn">下载花名册模板</a>
				</div> -->

		<div class="row info">
			<label>课程: </label>
			<div class="col-12 my-3">
            <table class="w-100">
              <tbody style="text-align:left">
                <tr>
                  <td style="width:25%;padding-left:20px;">培训机构：</td>
                  <td style="width:25%;padding-left:20px;color:#909399">{{class_obj.User ? class_obj.User.Name : ''}}</td>
                  <td style="width:25%;padding-left:20px;">工种等级：</td>
                  <td style="width:25%;padding-left:20px;color:#909399">{{class_obj.TrainingType}}、{{class_obj.TrainingLevel}}</td>
                </tr>
                <tr>
                  <td style="padding-left:20px;">班&emsp;&emsp;次：</td>
                  <td style="padding-left:20px;color:#909399">{{class_obj.Name}}</td>
                  <td style="padding-left:20px;">开班日期：</td>
                  <td style="padding-left:20px;color:#909399">{{class_obj.allDate}}</td>
                </tr>
              </tbody>
            </table>
						<table class="w-100">
							<tbody class="border-table">
                <tr class="text-center">
                  <td style="width:20%">日期</tdtd>
									<td style="width:20%">授课时间</td>
									<td style="width:20%">培训内容</td>
									<td style="width:20%">授课形式</td>
									<td style="width:20%">授课教师</td>
                </tr>
								<tr class="text-center" v-for="(x,$index) in courseData.DataList">
									<td @keyup="editCourse(x, 'date', $event)">{{x.Date}}</td>
									<td @keyup="editCourse(x, 'time', $event)">{{x.TeachingTime}}</td>
									<td @keyup="editCourse(x, 'content', $event)">{{x.TrainingContent}}</td>
									<td @keyup="editCourse(x, 'form', $event)">{{x.TeachingStyle}}</td>
									<td @keyup="editCourse(x, 'teacher', $event)">{{x.Teacher}}</td>
								</tr>
							</tbody>
						</table>
						<!-- <button @click="addCourse" class="btn">继续添加</button> -->
						<!-- <button id="button-a" class="btn" @click="downloadCourse">下载表</button> -->
					</div>
					<!-- <form  @submit.prevent="upload2" id="form-2" >
						<input id="file2" type="file" />
						<button class="btn ml-2">上传</button>
					</form> -->
				</div>

				<!-- <div class="row info">
					<label></label>
					<a href="http://114.55.173.248:2000/upload/schedule.xlsx"  class="btn">下载课程表模板</a>
				</div> -->
				<!-- <div class="row info" v-show="class_obj.Status==3">
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
					<button class="btn mr-2" @click="openTable3">在线编辑</button>
					<a href="xlsx/补贴表.xlsx">下载模板3</a>
				</div> -->

			</section>

       <!-- <section class="input-block" v-if="class_obj.Status==6">
				  <h5 class="title">冻结信息</h5>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>冻结时间：{{class_obj.FreezeDate}}</td>
                <td>操作人：{{class_obj.FreezeUserName}}</td>
              </tr>
              <tr>
                <td colspan="2">冻结信息</td>
              </tr>
              <tr>
                <td colspan="2" v-html="class_obj.FreezeMessage"></td>
              </tr>
            </tbody>
          </table>
        </section> -->
        <section class="input-block" v-if="Record.rejectList.length">
				  <h5 class="title">驳回记录</h5>
          <table class="table table-bordered">
            <tbody style="text-align:center;">
              <tr style="background:#E9ECEF">
                <td style="width:20%">审核时间</td>
                <td style="width:60%">审核理由</td>
                <td>审核人</td>
              </tr>
              <tr v-for="item in Record.rejectList">
                <td>{{item.CreateDate}}</td>
                <td><p style="display:inline-block;text-align:left;">{{item.Content}}</p></td>
                <td>{{item.CreateUserName}}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section class="input-block" v-if="Record.resolveList.length">
				  <h5 class="title">通过记录</h5>
          <table class="table table-bordered">
            <tbody style="text-align:center;">
              <tr style="background:#E9ECEF">
                <td style="width:20%">审核时间</td>
                <td style="width:60%">审核理由</td>
                <td>审核人</td>
              </tr>
              <tr v-for="item in Record.resolveList">
                <td>{{item.CreateDate}}</td>
                <td><p style="display:inline-block;text-align:left;">{{item.Content}}</p></td>
                <td>{{item.CreateUserName}}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section class="input-block" v-if="Record.freezeList.length">
				  <h5 class="title">冻结信息</h5>
          <table class="table table-bordered">
            <tbody style="text-align:center;">
              <tr style="background:#E9ECEF">
                <td style="width:20%">审核时间</td>
                <td style="width:60%">审核理由</td>
                <td>审核人</td>
              </tr>
              <tr v-for="item in Record.freezeList">
                <td>{{item.CreateDate}}</td>
                <td><p style="display:inline-block;text-align:left;">{{item.Content}}</p></td>
                <td>{{item.CreateUserName}}</td>
              </tr>
            </tbody>
          </table>
        </section>
			<!-- <hr class="w-75 mt-5">
			<div v-show="class_obj.Status==2">
				是否需要补考
				<input type="checkbox">{{class_obj.Status}}
			</div>
			<hr> -->

			<div class="row mb-footer mt-5 d-flex justify-content-center">
				<button type="button" @click.prevent="retu()" class="mr-5 app-btn rounded-btn">返回</button>
				<button type="button"  @click.prevent="adopt(3)" v-if="class_obj.Status==1" class="mr-5 app-btn rounded-btn">通过</button>
				<button type="button" @click.prevent="adopt(2)" v-if="class_obj.Status==1" class="mr-5 app-btn rounded-btn">驳回</button>
				<button  v-if="user.Type == 'SYSTEM'" type="submit" class="app-btn"  form="wrapForm2">保存修改</button>
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

  <div class="modal_1 modal fade bs-example-modal-sm" id="ReviewMessage_box" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">请输入审核理由</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="modal-body ">
					<div contenteditable="true" class="form-control ReviewMessage_box" style="height:auto;min-height:200px"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" @click="Determine()">确定</button>
				</div>
			</div>
		</div>
	</div>


    <div v-if="class_obj.User && class_obj.User.Type == 1">
      <div id="printClassQY">
        <classQY :classListQY="class_obj"></classQY>
      </div>
      <div class="container">
        <el-button style="float:right; margin:10px 0;" type="primary" size="small" @click="doPrint('printClassQY')">打印</el-button>
      </div>
    </div>
    <div  v-if="class_obj.User && class_obj.User.Type == 2">
      <div id="printClassJG">
        <classJG :classListJG="class_obj"></classJG>
      </div>
      <div class="container">
        <el-button style="float:right; margin:10px 0;" type="primary" size="small" @click="doPrint('printClassJG')">打印</el-button>
      </div>
    </div>
    <div>
      <div id="printSchedule">
        <schedule :scheduleList="courseData.DataList" :classObject="class_obj"></schedule>
      </div>
      <div class="container">
        <el-button style="float:right; margin:10px 0;" type="primary" size="small" @click="doPrint('printSchedule')">打印</el-button>
      </div>
    </div>

    <div>
      <div id="printStudent">
        <student :studentObject="student_obj" :classObject="class_obj"></student>
      </div>
      <div class="container">
        <el-button style="float:right; margin:10px 0;" type="primary" size="small" @click="doPrint('printStudent')">打印</el-button>
      </div>
    </div>
	<!-- <classJG :classListJG="class_obj"></classJG> -->
	<!-- <classJG :classListQY="class_obj"></classQY>  -->
	<!-- <schedule :scheduleList="courseData.DataList" :classObject="class_obj"></schedule> -->
	<!-- <student :studentObject="student_obj" :classObject="class_obj"></student> -->
	</div>
</template>

<script>
//	创建写好了 明天写修改
//http://114.55.173.248:2000/upload/schedule.xlsx
//http://114.55.173.248:2000/upload/student.xlsx

import { http, ajax ,dateFtt} from "@/assets/fc";
import "@/assets/css/style.css";
import PrintClassQY from "@/components/PrintClassQY";
import PrintClassJG from "@/components/PrintClassJG";
import PrintSchedule from "@/components/PrintSchedule";
import PrintStudent from "@/components/PrintStudent";

import classJG from "@/components/printTable/classJG";
import classQY from "@/components/printTable/classQY";
import schedule from "@/components/printTable/schedule";
import student from "@/components/printTable/student";
export default {
  name: "",
  components: { PrintClassQY, PrintClassJG, PrintSchedule, PrintStudent , classJG, classQY, schedule, student},
  data() {
    return {
      user:{},    //登录人信息
      adopt_type:'',  //审核类型
      ReviewMessage:'',  //审核理由
      type_name:['','待审核','驳回','已通过','补贴','结业','冻结'],  //状态
      businessscope_list:[],  
      certificateType_list: ["行业证书", "职业资格等级证书"],
      value11: [],  //培训工种
      See: false, 
      dates: [],    //选择的开班时间
      required: true,
      TrainingLevels: [], //培训等级
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
      currentClass: "",   //班级Id
      ispass: true,
      table1: false,
      table2: false,
      table3: true,
      rej: "",
      rejMsg: "",
      query_obj:{   //查询学生的对象
        page:1,
        per_page:25,
        student_class:'',
        student_name:'',
      },
      student_obj:{	  //查询学生的结果
          DataList:[],
          MaxCount:1,
          MaxPage:1
      },
      studentData: [      //学生列表 暂时没用

      ],
      courseData:{       //课程 elxe 表的内容
        TrainingInstitutions:'',  // 培训机构
        Level:'',   //工种等级
        Class:'',    //班次
        OpeningDate:'', //开班日期
        DataList:[]
      },
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
      Record: {
        resolveList: [],
        rejectList: [],
        freezeList: []
      },
      showInfo: {
        change1: false,
        change2: false,
        change3: false
      },
    };
  },
  methods: {
    //通过
    adopt(x){
      console.log('审核'+x);
          this.adopt_type=x
        $('#ReviewMessage_box').modal('show');
    },
    Determine(){
      if(!$('#Seeclass .ReviewMessage_box').html() && this.adopt_type === 2){
        this.$message({
          showClose: true,
          message: '请输入审核理由！',
          type: 'warning'
        });
        return;
      }
      $('#ReviewMessage_box').modal('hide');
      var obj=new Object();
          obj.Id=this.currentClass;
          obj.ReviewUser=this.user.Id;
          obj.ReviewUserName=this.user.Name;
          obj.ReviewMessage=$('#Seeclass .ReviewMessage_box').html(); //通过理由
          obj.Status=this.adopt_type;   //1待审核 2 驳回 3通过
        ajax('patch','/class/review',JSON.stringify(obj),()=>{})

      var obj2 = {
        Class: this.currentClass,
        Content: $('#Seeclass .ReviewMessage_box').html(),
        CreateUser: this.user.Id,
        CreateUserName: this.user.Name,
        Type: this.adopt_type === 2 ? '驳回' : '通过'
      }
        ajax('post', '/class/record', JSON.stringify(obj2), this.adopt_rrturn)
    },
    adopt_rrturn(x){
      console.log('审核结果',x)
      var x=JSON.parse(x);
      if(x.Result){
        this.$alert(this.adopt_type==2 ?'已驳回':'已通过', '提示', {
          confirmButtonText: '确定',
          callback: action => {
             window.history.back();
          }
        });
      }else{
        this.$message({
          showClose: true,
          message: '系统繁忙，请稍后再试！',
          type: 'error'
        });
      }
    },
    //查询课程表
    get_courseData(){
      if(this.class_obj.ScheduleUrl){
        ajax('get','/schedule/excel',{'path':this.class_obj.ScheduleUrl},this.get_courseData_return)
      }
    },
    get_courseData_return(x){
      var x=JSON.parse(x);
      console.log('课程',x);
      if(x.Result){
        this.courseData=x.Memory 
      }
    },
    //改变学生每页大小
    handleSizeChange(x) {
      // this.query_obj={   //查询学生的对象
      //   page:1,
      //   per_page:10,
      //   student_class:'',
      //   student_name:'',
      // }
      this.query_obj.page=1;
      this.query_obj.per_page=x;
      this.get_student();
    },
    //分页
    handleCurrentChange(x) {
      this.query_obj.page=x;
      this.get_student();
    },
    //获取学生
    get_student(){
        // http(this,'get','/user?page='+this.page+'&per_page='+this.per_page+'&user_role=&user_name=','',this.user_return)
        ajax('get','/student',this.query_obj,this.student_return)
    },
    student_return(x){
      var x=JSON.parse(x);
				console.log('查询学生',x)
        this.student_obj=x.Memory;
    },
    //返回
    retu() {
      window.history.back();
    },
    downloadCourse: function() {
      
    },
    downloadStudent: function() {
      
    },
    editItem: function(item, type, event) {
      item[type] = event.target.innerText;
    },

    editCourse: function(item, type, event) {
      item[type] = event.target.innerText;
    },

    // addStudent: function() {
    //   this.studentData.push({
    //     Sort: "",
    //     Name: "",
    //     Sex: "",
    //     Nation: "",
    //     EducationLevel: "",
    //     IdCardNo: "",
    //     TrainingType: "",
    //     Company: "",
    //     TrainingPrice: "",
    //     ContactNumber: "",
    //     CertificateType: "",
    //     OriginalTechnologyLevel: "",
    //     CertificateNumber: "",
    //     Address: "",
    //     TrainingLevel: ""
    //   });
    // },

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
      console.log('班级基本信息',x);
      x.Memory.TrainingStartDate=dateFtt(x.Memory.TrainingStartDate,'yyyy-MM-dd');
      x.Memory.TrainingEndDate=dateFtt(x.Memory.TrainingEndDate,'yyyy-MM-dd');
      this.class_obj = x.Memory;
      this.class_obj.allDate =  x.Memory.TrainingStartDate+'至'+x.Memory.TrainingEndDate;
      this.dates = [x.Memory.TrainingStartDate, x.Memory.TrainingEndDate];
      this.value11 = x.Memory.TrainingType;
      console.log(this.class_obj)
      var status = this.class_obj.Status;//1-2-3-4-5
      this.$nextTick(() => {
        if(status == 6){
          $("#Seeclass .box_2 li").removeClass('active_1');
        }
        var positionInfo = $("#Seeclass .box_2 li").eq(status-1).children("div").eq(0).text();
     	$(".position-info").text(positionInfo);
      })
      
     http(this,'get','/user/id?id='+this.class_obj.CreateUser,'', (data) => {//查询班级的机构/企业信息
     	this.businessscope_list = data.Memory.Businessscope.split(',');
     });
      this.get_courseData()
    },
    getData: function() {
      let self = this;
      if (this.currentClass) {
        //http(this,'get','/class/id',{'class_id':this.currentClass},this.class_return)
        ajax("get", "/class/id", {id: this.currentClass },this.class_return);
      }
    },
    submitInfo: function() {
    	this.class_obj.StudentList = [];
	    console.log(this.class_obj)
	    ajax("patch","/classonly",JSON.stringify(this.class_obj), this.post_class);

    },
    post_class(x) {
      console.log(x);
      var x = JSON.parse(x);
      if (!x.Result) {
        this.Prompt = x.Message;
        $("#Seeclass #myModal").modal("show");
      } else {
        this.Prompt = "修改成功！";
        $("#Seeclass #myModal").modal("show");
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
      this.student_obj.StudentList=x.Memory.DataList;
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
    doPrint(id) {
      var self = this;
      this.query_obj.per_page = 1000;
      ajax('get','/student',this.query_obj,(x) => {
        x=JSON.parse(x);
        if(x.Result){
          self.student_obj=x.Memory;
          printFn()
        }
      })
      function printFn() {
        let subOutputRankPrint = document.getElementById(id);
        // console.log(subOutputRankPrint.innerHTML);
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
      }
    },
    getRecord() {
      ajax('get', '/class/record?class_id='+this.currentClass, {}, x => {
        x=JSON.parse(x)
        this.Record.resolveList = x.Memory.filter(v => v.Type == "通过");
        this.Record.rejectList = x.Memory.filter(v => v.Type == "驳回");
        this.Record.freezeList = x.Memory.filter(v => v.Type == "冻结");
        console.log('返回信息',this.Record)
      })
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
    this.user=user0609;
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
    this.getRecord();

    var params = this.$route.params;
    console.log(params)
    this.See = params.type ? true : false;

    //查询业务范围
    // ajax('get','/businessscope','',this.businessscope)

    this.query_obj.student_class=this.currentClass
    //获取学生
    this.get_student();

  }
};
</script>

<style scoped>

/* 状态 */
#Seeclass .box_2{
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  position: relative;
  margin: 30px 50px 30px;
}
#Seeclass .box_2>li{
  position: relative;
  padding: 30px 0px 0px 0px;
  z-index: 2;
}
#Seeclass .box_2::after{
  z-index: 0;
  position: absolute;
  bottom: 25px;
  left: 0px;
  width: 100%;
  height:5px;
  content:'';
  background:#dcdcdc;
}
#Seeclass .box_2::before{
  z-index: 1;
  position: absolute;
  bottom: 25px;
  left: 0px;
  height:5px;
  content:'';
  background:#2d2dda;
}
#Seeclass .box_2 li>div:nth-child(1){
  position: absolute;
  top: 0px;
  left: 0px;
  width: 50px;
  text-align: center;
  /* display: none; */
}
/* 改变背景颜色 */
#Seeclass .box_2 li.active_1>div:nth-child(2){
  background: #2d2dda;
}
/* 改变背景颜色并打钩 */
#Seeclass .box_2 li.active>div:nth-child(1){
  display: block;
}
#Seeclass .box_2 li.active>div:nth-child(2){
  background: #2d2dda;
}
#Seeclass .box_2 li.active>div:nth-child(2)>span{
  display: none;
}
#Seeclass .box_2 li.active>div:nth-child(2)>i{
  display: inline-block;
}
#Seeclass .box_2 li>div:nth-child(2){
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
#Seeclass .box_2 li>div i{
  display: none;
}

#Seeclass .box_2.active_1::before{
  width: 25%;
}
#Seeclass .box_2.active_2::before{
  width: 50%;
}
#Seeclass .box_2.active_3::before{
  width: 75%;
}
#Seeclass .box_2.active_4::before{
  width: 100%;
}
#Seeclass .box_2.active_5::before{
  width: 100%;
}






#Seeclass .no_border {
  border: none;
  background: none;
}
#Seeclass .no_border:focus {
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


#Seeclass .box_1{
  position: relative;
}
#Seeclass .box_1 .type_1{
  position: absolute;
  top: 80px;
  left: 2%;
}
#Seeclass .box_1 .type_2{
  position: absolute;
  top: 80px;
  left: 25%;
}
#Seeclass .box_1 .type_3{
  position: absolute;
  top: 80px;
  left: 48%;
}
#Seeclass .box_1 .type_4{
  position: absolute;
  top: 80px;
  left: 71%;
}
#Seeclass .box_1 .type_5{
  position: absolute;
  top: 80px;
  left: 94%;
}


#Seeclass .status-1 {
  height: 300px;
  width: 100%;
  background: url(../../assets/img/status-1.png) no-repeat center center;
  background-size:100%; 
}

.status-2 {
  height: 300px;
  background: url(../../assets/img/status-2.png) no-repeat center center;
   background-size:100%; 
}

.status-3 {
  height: 300px;
  background: url(../../assets/img/status-3.png) no-repeat center center;
   background-size:100%; 
}

.status-4 {
  height: 300px;
  background: url(../../assets/img/status-4.png) no-repeat center center;
   background-size:100%; 
}

.rej:before {
  /* content: url(../assets/img/error.png); */
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
  text-align: center;
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

/*.table-head th, td {
     border: 1px solid #000; 
}*/
</style>