<template>
  	<div id="addsubsidy">
        <div class="container">
            <div class="d-flex align-items-center bread border-bottom">
                您的位置： 申请补贴
            </div>

            <!-- <div class="box_1" v-if="status!=''">
                <div class="status-1" v-show="status==1">
                    <img src="@/assets/img/status-1.png" alt="">
                </div>
                <div class="status-2" v-show="status==2">
                    <img src="@/assets/img/status-2.png" alt="">
                </div>
                <div class="status-3" v-show="status==3">
                    <img src="@/assets/img/status-3.png" alt="">
                </div>
                <div class="status-4" v-show="status==4">
                    <img src="@/assets/img/status-4.png" alt="">
                </div>
                <span :class="'type_'+status">{{type_name[status]}}</span>
            </div> -->

            <form  @submit.prevent="form_1()">
                <h5 class="title">基本信息填写</h5>
                <div class="row">
                    <div class="col-6 row mt-3">
                        <label class="col-4 control-label text-right">专业：</label>
                        <div class="col-8">
                            <input :readonly="status==5" :class="{'no_border':status==5}" type="text" v-model="subsidy.Profession" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-6 row mt-3">
                        <label class="col-4 control-label text-right">证书类型：</label>
                        <div class="col-8">
                            <input :readonly="status==5" :class="{'no_border':status==5}" type="text" required v-model="subsidy.CertificateType" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-6 row mt-3">
                        <label class="col-4 control-label text-right">等级：</label>
                        <div class="col-8">
                            <input :readonly="status==5" :class="{'no_border':status==5}" type="text" v-model="subsidy.Level" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-6 row mt-3">
                        <label class="col-4 control-label text-right">培训地址：</label>
                        <div class="col-8">
                            <input :readonly="status==5" :class="{'no_border':status==5}" type="text" v-model="subsidy.Address" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-6 row mt-3">
                        <label class="col-4 control-label text-right">培训人数：</label>
                        <div class="col-8">
                            <input :readonly="status==5" :class="{'no_border':status==5}" type="text" v-model="subsidy.TrainingPersonCount" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-6 row mt-3">
                        <label class="col-4 control-label text-right">联系人：</label>
                        <div class="col-8">
                            <input :readonly="status==5" :class="{'no_border':status==5}" type="text" v-model="subsidy.Contacts" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-6 row mt-3">
                        <label class="col-4 control-label text-right">联系电话：</label>
                        <div class="col-8">
                            <input :readonly="status==5" :class="{'no_border':status==5}" type="text" v-model="subsidy.ContactNumber" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-6 row mt-3">
                        <label class="col-4 control-label text-right">开户行：</label>
                        <div class="col-8">
                            <input :readonly="status==5" :class="{'no_border':status==5}" type="text" v-model="subsidy.Bank" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-6 row mt-3">
                        <label class="col-4 control-label text-right">开户名：</label>
                        <div class="col-8">
                            <input :readonly="status==5" :class="{'no_border':status==5}" type="text" v-model="subsidy.AccountName" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-6 row mt-3">
                        <label class="col-4 control-label text-right">补贴金额大写：</label>
                        <div class="col-8">
                            <input  type="text" :class="{'no_border':status==5}" class="form-control" readonly :value="subsidy.SubsidyPriceUpper"/>
                        </div>
                    </div>
                    <div class="col-6 row mt-3">
                        <label class="col-4 control-label text-right">银行账号：</label>
                        <div class="col-8">
                            <input :readonly="status==5" :class="{'no_border':status==5}" type="text" v-model="subsidy.AccountNo" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-6 row mt-3">
                        <label class="col-4 control-label text-right">补贴金额小写：</label>
                        <div class="col-8">
                            <input type="text" :class="{'no_border':status==5}" class="form-control" readonly :value="subsidy.SubsidyPrice"/>
                        </div>
                    </div>
                    <div class="col-6 row mt-3">
                        <label class="col-4 control-label text-right">申请经办人：</label>
                        <div class="col-8">
                            <input :readonly="status==5" :class="{'no_border':status==5}" type="text" required v-model="subsidy.ApplicationManager" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-6 row mt-3">
                        <label class="col-4 control-label text-right">经办人电话：</label>
                        <div class="col-8">
                            <input :readonly="status==5" :class="{'no_border':status==5}" type="text" required v-model="subsidy.ManagerContactNumber" class="form-control"/>
                        </div>
                    </div>
                </div>

                <h5 class="title">学生信息</h5>

                <table class="table table-bordered table-sm">
                    <thead>
                        <tr>
									<th>序号</th>
									<th>姓名</th>
									<th>性别</th>
									<!-- <th>名族</th> -->
									<!-- <th>文化程度</th> -->
									<th>身份证号码</th>
									<!-- <th>工种</th> -->
									<!-- <th>工作单位</th> -->
									<th>联系电话</th>
									<!-- <th>证书类型</th> -->
									<!-- <th>原技术的等级</th> -->
									<th>培训等级</th>
									<!-- <th>证书编号</th> -->
									<!-- <th>家庭地址</th> -->
                                    <th>证书类型</th>
                                    <th>证书编号</th>
						</tr>
                    </thead>
                    <tbody>
								<tr class="text-center" v-for="(x,$index) in student_list">
									<td>{{x.Sort}}</td>
									<td>{{x.Name}}</td>
									<td>{{x.Sex}}</td>
									<!-- <td>{{x.Nation}}</td> -->
									<!-- <td>{{x.EducationLevel}}</td> -->
									<td>{{x.IdCardNo}}</td>
									<!-- <td>{{x.TrainingType}}</td> -->
									<!-- <td>{{x.Company}}</td> -->
									<td>{{x.ContactNumber}}</td>
									<!-- <td  @keyup="editItem(x,'CertificateType',$event)">{{x.CertificateType}}</td> -->
									<!-- <td>{{x.OriginalTechnologyLevel}}</td> -->
									<td>{{x.TrainingLevel}}</td>
									<!-- <td  @keyup="editItem(x,'CertificateNumber',$event)">{{x.CertificateNumber}}</td> -->
									<!-- <td >{{x.Address}}</td> -->
                                    <td>
                                        <!-- <input type="text" v-model="x.CertificateNumber"> -->
                                        {{x.CertificateNumber}}
                                    </td>
                                    <td>
                                        <!-- <input type="text" v-model="x.CertificateType"> -->
                                        {{x.CertificateType}}
                                    </td>
								</tr>
							</tbody>
                </table>
                
                <div class="mt-4 text-center mb-5">
                    <button type="button" @click="retu()" class="app-btn">返回上一页</button>
                    <button type="submit" v-if="status!=5" class="app-btn">提交</button>
                    <!-- <button type="button" @click="To_examine(3)" v-if="status==1 && examine" class="app-btn">通过</button> -->
                    <!-- <button type="button" @click="To_examine(2)" v-if="status==1 && examine" class="app-btn">驳回</button> -->
                </div>

            </form>


            <div class="modal_1 modal fade bs-example-modal-sm" id="To_examine_box" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="myModalLabel">请输入{{examine_type==2 ?'驳回' :'通过'}}理由</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body ">
                            <div contenteditable="true" class="form-control To_examine_box" style="height:auto;min-height:200px"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="Determine()">确定</button>
                        </div>
                    </div>
                </div>
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
                subsidy:{
                    Class:'',
                    ClassName:'',    //班级名称
                    Profession:'',  //专业
                    CertificateType:'', //证书类型
                    Level:'',   //等级
                    TrainingPersonCount:'', //培训人数
                    TrainingStartDate:'',   //培训开始时间
                    TrainingEndDate:'', //培训结束时间
                    Contacts:'' ,   //联系人
                    Address:'', //培训地址
                    ContactNumber:'',   //联系人电话
                    Bank:'',    //开户银行
                    AccountName:'', //开户名
                    AccountNo:'',   //银行账号
                    SubsidyPrice:'',    //小写金额
                    SubsidyPriceUpper:'',   //大写金额
                    ApplicationManager:'',  //申请经办人
                    ManagerContactNumber:'',    //经办人电话
                    CreateUser:'',  //用户Id
                    CreateUserName:'',
                    CreateUserPhone:'',
                    User:'',    //也是用户Id
                },
                classid:'',
                student_list:[],
                classobj:{},
                status:'',
                examine:false, //是否审核
                examine_type:'',    //审核状态
                type_name:['','待审核','驳回','已通过','补贴','结业'],  //状态
            }
        },
        methods:{
            
            //添加
            form_1(){
                console.log(this.subsidy)
                if(this.status==''){
                    this.subsidy.Status=3
                    this.subsidy.Profession=this.subsidy.Profession ? this.subsidy.Profession : '';//专业
                    this.subsidy.Level=this.subsidy.Level ? this.subsidy.Level : '';    //等级
                    console.log('添加')
                    ajax('post','/classsubsidy/q',JSON.stringify(this.subsidy),this.classsubsidy_return)               
                }else{
                    console.log('修改')
                    
                    this.subsidy.Status=3
                    ajax('patch','/classsubsidy',JSON.stringify(this.subsidy),this.classsubsidy_return)
                }
            },
            classsubsidy_return(x){
                var x=JSON.parse(x)
                console.log(x);
                if(x.Result){
                    this.$alert(this.Status=='' ? '添加成功！' :'修改成功', '标题名称', {
                        confirmButtonText: '确定',
                        callback: action => {
                            window.history.back();
                        }
                    });
                }else{
                    this.$message({
                        showClose: true,
                        message: '系统错误，请联系管理员！',
                        type: 'error'
                    });
                }
            },
            //   student/finish
            student_finish(){
                ajax('get','/student/finish',{'class_id':this.classid},this.student_finish_return)
            },
            student_finish_return(x){

                var x=JSON.parse(x)

                console.log(x);
                this.student_list=x.Memory;
                this.subsidy.StudentList=x.Memory;
                this.subsidy.TrainingPersonCount=x.Memory.length;
                var money=0;
                for(var i=0;i<x.Memory.length;i++){
                    money+=x.Memory[i].TrainingPrice
                }
                // console.log(money)
                this.subsidy.SubsidyPriceUpper=DX(money);   //金额大写
                this.subsidy.SubsidyPrice=money;    //金额小写
            },
            //查询班级信息
            get_class(){
                 ajax("get", "/class/id", {id: this.classid },this.class_return);
            },
            class_return(x){
                var x=JSON.parse(x);
                console.log('班级基本信息',x);
                this.subsidy=x.Memory;
                this.subsidy.Class=this.classid
                this.subsidy.ClassName=x.Memory.Name;
                this.subsidy.Level=x.Memory.TrainingLevel
                this.subsidy.Address=x.Memory.TrainingAddress

                this.subsidy.User= this.user.Id;
                this.subsidy.CreateUser= this.user.Id;
                this.subsidy.CreateUserName= this.user.Name;
                this.subsidy.CreateUserPhone= this.user.ContactNumber;
                this.subsidy.Bank= this.user.Bank;
                this.subsidy.AccountName= this.user.AccountName;
                this.subsidy.AccountNo= this.user.AccountNo;
                
                this.student_finish();
            },
            retu(){
                window.history.back();
            },

            //查询
            classsubsidy_id(){
                ajax('get','/classsubsidy/id',{'id':this.classid},this.get_classsubsidy_id)
            },
            get_classsubsidy_id(x){
                var x=JSON.parse(x)
                console.log('根据Id查询',x)
                this.subsidy=x.Memory;
                this.status=x.Memory.Status;
                this.student_list=x.Memory.StudentList
            }
        },
        created: function () {
        },
        mounted: function () {
            var query=this.$route.query;
                this.classid=query.id;
                this.subsidy.Class=query.id;

            console.log(query)
            //status 这个只是一个表示 不是添加的意思
            if(!query.status){
                this.status=''
                this.get_class(); //基本信息
            }else{
                this.status=query.status;
                this.classsubsidy_id();
            }
           
            console.log(this.status)
            //判断是否是审核
            if(query.examine){
                this.examine=true;
            }
           

            var user0609 = JSON.parse(localStorage.user0609);
            // console.log(user0609)
            this.user=user0609;
            
            


        },
    }
</script>

<style>
    .app-btn {
        width: 126px;
        height: 36px;
        border: none;
        border: 1px solid #eaeaea;
        background: #ffffff;
        border-radius: 5px;
    }
     .app-btn:hover{
        background: #3737e1;
        color: #ffffff;
     }
    #addsubsidy h5{
        font-size: 24px;
        border-left: 10px solid #3737e1;
        padding-left: 7%;
        margin-top: 4%;
        margin-bottom: 4%;
    }
    #addsubsidy label{
        padding-top: 4px;
    } 
    #addsubsidy .box_1{
        width: 527px;
        overflow: hidden;
        margin: 0px auto;
        position: relative;
        height: 200px;
        padding-top: 100px;
    }
    #addsubsidy .no_border {
        border: none;
        background: none;
        margin-left: -40px;
    }
    #Seeclass .no_border:focus {
        box-shadow: none;
        border: none;
    }

    #addsubsidy .box_1 .type_1{
        position: absolute;
        top: 80px;
        left: 20px;
    }
    #addsubsidy .box_1 .type_2{
        position: absolute;
        top: 80px;
        left: 250px;
    }
    #addsubsidy .box_1 .type_3{
        position: absolute;
        top: 80px;
        left: 474px;
    }
    #addsubsidy .box_1 .type_4{
        position: absolute;
        top: 80px;
        left: 71%;
    }
    #addsubsidy .box_1 .type_5{
        position: absolute;
        top: 80px;
        left: 94%;
    }

</style>
