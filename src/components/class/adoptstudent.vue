<template>
    <div id="adoptstudent">
        <section class="application container">
            <div class="d-flex align-items-center bread border-bottom">
            	您的位置： 学生列表
            </div>
                        <table class="w-100">
							<thead class="table-head">
								<tr style="text-align:center">
                                    <th><label style="margin-bottom:0"><input type="checkbox" @change='allcheckChange'/>选择</label></th>
									<th>序号</th>
                                    <th>状态</th>
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
                                    <!-- <th>补贴</th> -->
                                    <th>操作</th>
								</tr>
							</thead>
							<tbody>
								<tr class="text-center" v-for="(x,$index) in student_obj.DataList">
                                    <td style="width: 50px"><input :disabled="x.Status != 0 " type="checkbox" :data-id="$index" @change="checkChange(x, $index, $event)"/></td>
									<td>{{x.Sort}}</td>
                                    <td>{{x.Status == 0 ? '未结业' : (x.Status == 1 ? '已结业' : (x.Status == 2 ? '未通过' : (x.Status == 3 ? '冻结' : '未结业')))}}</td>
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
                                        <!-- <input readonly :class="{'no_border':(x.Status==1 || x.Status===3 ||  Status==5)}" type="text" v-model="x.CertificateType" > -->
                                        {{x.CertificateType}}
                                    </td>
                                    <td style="width: 200px">
                                        <input :readonly="x.Status!=0 || Status==5 || Status==6" :class="{'no_border':(x.Status != 0 ||  Status==5 || Status==6)}" type="text" v-model="x.CertificateNumber">
                                        <!-- {{x.CertificateType}} -->
                                    </td>
                                    <!-- <td>
                                        <img v-if="x.Status==1" src="@/assets/img/1.png" alt="">
                                        <img v-if="x.Status==2" src="@/assets/img/2.png" alt="">
                                        <img v-if="x.Status==3" src="@/assets/img/3.png" alt="">
                                    </td> -->
                                    <td>
                                        <el-button @click="See(x)" type="primary" icon="el-icon-search" size="mini" circle></el-button>
                                    </td>
								</tr>
							</tbody>
						</table>
                        <div class="panel-footer text-center" style="margin:20px 0px">
                            <button @click="rout()" class="btn btn-default ">返回上一页</button>
                            <button v-if="Status!=5 && Status!=6" class="btn btn-info" @click="sub(0)">提交</button>
                            <!-- <button v-if="Status!=5 && Status!=6" class="btn btn-success" :disabled="!checkList.length" @click="sub(1)">标记为结业</button> -->
                            <button v-if="Status!=5 && Status!=6" class="btn btn-primary" :disabled="!checkList.length" @click="sub(2)">标记为未通过</button>
                        </div>
            </section>

    </div>
</template>
<script>
    import {ajax,paging,dateFtt} from '@/assets/fc';
	export default {
		components: {
//	    	VueDaterangePicker
        },
        data(){
            return{
                query_obj:{
                    page:1,
                    per_page:1000,
                    student_class:'',
                    student_name:'',
                },
                student_obj:{	
	  				DataList:[],
	  				MaxCount:1,
	  				MaxPage:1
                },
                Status_name:['','待审核','未通过','已通过'],
                Status:'',
                checkList: [],
                ishasNumber: []
            }
        },
        methods:{
            See(x){
				console.log('查看学生');
				console.log(this.Status);
				// if(this.Status==1 || this.Status==2){
					this.$router.push('/studentDetails?id='+x.Id+'&Status='+this.Status)
				// }
			},
            rout(){
                window.history.back();
            },
            sub(Status){
                var list= JSON.parse(JSON.stringify(this.checkList));
                var tag = true;
                if(Status == 2){
                    list.forEach(v => {
                        v.Status = Status;
                        if(v.CertificateNumber){
                            tag =false;
                             this.$message({
                                showClose: true,
                                message: '有证书编号只能选择结业！' ,
                                type: 'error'
                            });
                        }
                    })
                    // this.$confirm('确认将选中的学生标记为未通过？?', '提示', {
                    //     confirmButtonText: '确定',
                    //     cancelButtonText: '取消',
                    //     type: 'warning'
                    // }).then(() => {

                    // }).catch(() => {
                    //     tag = false;   
                    // });
                }
                if(Status == 0){
                    list = this.student_obj.DataList;
                    for(var j = 0; j < list.length-1; j++){
                        for(var i = j+1; i < list.length; i++){
                            if(list[j].CertificateNumber == null || list[i].CertificateNumber == null) break;
                            if(list[j].CertificateNumber.trim() == list[i].CertificateNumber.trim() && list[j].CertificateNumber.trim()){
                                tag = false;
                                this.$message({
                                    showClose: true,
                                    message: '学生证书编号不能一样！' ,
                                    type: 'error'
                                });
                                return;
                            }
                        }
                    }
                    var isExist = (v) => {
                        for(var k = 0; k < this.ishasNumber.length; k++){
                            if(v.Id === this.ishasNumber[k].Id){
                                return true;
                            }
                        }
                    }
                    list = list.filter(v => {
                        if(!isExist(v) && v.CertificateNumber){
                            v.Status = 1;
                            return true;
                        }
                         return false;
                    })
                }
                if(Status == 1){
                    list.forEach(v => {
                        v.Status = Status;
                        if(!v.CertificateNumber){
                            tag =false;
                            this.$message({
                                showClose: true,
                                message: '请填写已选学生的证书编号！' ,
                                type: 'error'
                            });
                        }
                    })
                }
                if(tag){
                    console.log(JSON.stringify({StudentList: list}))
                    ajax('patch','/student/list',JSON.stringify({StudentList: list}),this.modify_return);
                }
                
            },
            modify_return(x){
                console.log(x);
                var x=JSON.parse(x);
                if(x.Result){
                    this.$alert('修改成功！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            window.history.back();
                        }
                    });
                }else{
                    this.get_student();
                    this.$alert(x.Message, '提示', {
                        confirmButtonText: '确定',
                        dangerouslyUseHTMLString: true
                    });
                }
            },
            //获取学生
	  		get_student(){
                console.log(this.query_obj);
                ajax('get','/student',this.query_obj,this.student_return)
            },
            student_return(x){
				var x=JSON.parse(x);
				console.log(x)
                this.student_obj=x.Memory;
                this.ishasNumber = x.Memory.DataList.filter(v => {
                    return v.CertificateNumber
                })
                console.log("有证书编号的学生",this.ishasNumber)
            },
            checkChange(item, idx, e) {
                if(e.target.checked){
                    this.checkList.push(item);
                }else{
                    this.checkList = this.checkList.filter(v => {
                        return v.Id != item.Id;
                    })
                }
                var allselect = $("th input:checkbox");
                var itemselect = $("td input:checkbox").not(":disabled");
                var hasNot = false;
                if(itemselect.each( (i, v) =>{
                    if(!$(v).prop('checked')){//有未被选中的
                        hasNot = true;
                    }
                }))
                if(hasNot){
                    allselect.prop('checked', false);
                }else{
                    allselect.prop('checked', true);
                }
                this.getCheckList()
            },
            allcheckChange(e) {
                var itemselect = $("td input:checkbox").not(":disabled");
                itemselect.prop('checked', e.target.checked);
                this.getCheckList()
            },
            getCheckList() {
                var itemselect = $("td input:checkbox").not(":disabled");
                var checkList =  itemselect.filter(":checked");//过滤出已经被选择的
                this.checkList = [];
                checkList.each((i, v) => {
                    if(v.checked){
                        this.checkList.push(this.student_obj.DataList[v.dataset.id]);
                    }
                })
                console.log(this.checkList);
            },
            doPrint(id) {
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
        mounted(){
            var query=this.$route.query;
            this.query_obj.student_class=query.id;
            this.Status=query.Status
            this.get_student();
        }
    }
</script>
<style>
    #adoptstudent .no_border{
        border:none;
    }
</style>
