webpackJsonp([18],{"8zta":function(t,e){},Yt1Z:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("mvHQ"),i=s.n(a),n=s("ZyLO"),r={components:{},data:function(){return{query_obj:{page:1,per_page:1e3,student_class:"",student_name:""},student_obj:{DataList:[],MaxCount:1,MaxPage:1},Status_name:["","待审核","未通过","已通过"],Status:""}},methods:{rout:function(){window.history.back()},See:function(t){console.log("查看单个学生"),console.log(this.Status),this.$router.push("/admini/studentDetails?id="+t.Id+"&Status="+t.Status)},sub:function(){for(var t=[],e=this.student_obj.DataList,s=!0,a={},r=0;r<e.length;r++){if(""!=e[r].CertificateNumber&&null!=e[r].CertificateNumber&&(""==e[r].CertificateType||null==e[r].CertificateType)||(""==e[r].CertificateNumber||null==e[r].CertificateNumber)&&""!=e[r].CertificateType&&null!=e[r].CertificateType){a=e[r],s=!1;break}0==e[r].Finish&&(e[r].CertificateNumber=null==e[r].CertificateNumber?"":e[r].CertificateNumber,e[r].CertificateType=null==e[r].CertificateType?"":e[r].CertificateType,t.push(e[r]))}s?Object(n.b)("patch","/student/list",i()({StudentList:t}),this.modify_return):this.$message({showClose:!0,message:a.Name+"同学的证书或编号有误！",type:"error"})},modify_return:function(t){console.log(t),(t=JSON.parse(t)).Result?this.$alert("修改成功！","提示",{confirmButtonText:"确定",callback:function(t){window.history.back()}}):this.$message({showClose:!0,message:"系统错误，请稍后再试！",type:"error"})},get_student:function(){Object(n.b)("get","/student",this.query_obj,this.student_return)},student_return:function(t){t=JSON.parse(t);console.log(t),this.student_obj=t.Memory}},mounted:function(){var t=this.$route.query;this.query_obj.student_class=t.id,this.Status=t.Status,this.get_student()}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"adoptstudent"}},[a("section",{staticClass:"application container"},[a("div",{staticClass:"d-flex align-items-center bread border-bottom"},[t._v("\n            \t您的位置： 学生列表\n            ")]),t._v(" "),a("table",{staticClass:"w-100"},[t._m(0),t._v(" "),a("tbody",t._l(t.student_obj.DataList,function(e,i){return a("tr",{staticClass:"text-center"},[a("td",[t._v(t._s(e.Sort))]),t._v(" "),a("td",[t._v(t._s(e.Name))]),t._v(" "),a("td",[t._v(t._s(e.Sex))]),t._v(" "),a("td",[t._v(t._s(e.IdCardNo))]),t._v(" "),a("td",[t._v(t._s(e.ContactNumber))]),t._v(" "),a("td",[t._v(t._s(e.TrainingLevel))]),t._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.CertificateNumber,expression:"x.CertificateNumber"}],class:{no_border:1==e.Status||3===e.Status||5==t.Status},attrs:{readonly:1==e.Status||3===e.Status||5==t.Status,type:"text"},domProps:{value:e.CertificateNumber},on:{input:function(s){s.target.composing||t.$set(e,"CertificateNumber",s.target.value)}}})]),t._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.CertificateType,expression:"x.CertificateType"}],class:{no_border:1==e.Status||3===e.Status||5==t.Status},attrs:{readonly:1==e.Status||3===e.Status||5==t.Status,type:"text"},domProps:{value:e.CertificateType},on:{input:function(s){s.target.composing||t.$set(e,"CertificateType",s.target.value)}}})]),t._v(" "),a("td",[1==e.Status?a("img",{attrs:{src:s("LOA1"),alt:""}}):t._e(),t._v(" "),2==e.Status?a("img",{attrs:{src:s("NKGv"),alt:""}}):t._e(),t._v(" "),3==e.Status?a("img",{attrs:{src:s("LHqX"),alt:""}}):t._e()]),t._v(" "),a("td",[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini",circle:""},on:{click:function(s){t.See(e)}}})],1)])}))]),t._v(" "),a("div",{staticClass:"panel-footer text-center",staticStyle:{margin:"20px 0px"}},[a("button",{staticClass:"btn btn-default ",on:{click:function(e){t.rout()}}},[t._v("返回上一页")]),t._v(" "),5!=t.Status?a("button",{staticClass:"btn btn-info",on:{click:function(e){t.sub()}}},[t._v("提交")]):t._e()])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",{staticClass:"table-head"},[s("tr",[s("th",[t._v("序号")]),t._v(" "),s("th",[t._v("姓名")]),t._v(" "),s("th",[t._v("性别")]),t._v(" "),s("th",[t._v("身份证号码")]),t._v(" "),s("th",[t._v("联系电话")]),t._v(" "),s("th",[t._v("培训等级")]),t._v(" "),s("th",[t._v("证书类型")]),t._v(" "),s("th",[t._v("证书编号")]),t._v(" "),s("th",[t._v("补贴")]),t._v(" "),s("th",[t._v("操作")])])])}]};var o=s("VU/8")(r,u,!1,function(t){s("8zta")},null,null);e.default=o.exports}});
//# sourceMappingURL=18.2406f0034320ee7e4a4d.js.map