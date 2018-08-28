<template>
	<div id="home">
		<section class="application container">
			<div class="row  mt-5 justify-content-between">
				<div class="col-3 search border rounded">
					<input type="text" class="w-85 search-input" v-on:input="onchange" placeholder="搜索" v-model="getData_obj.class_name" />
					<img src="@/assets/img/search.png" @click="search()" class="search-btn">
				</div>
				<!--<div class="col-3 text-right" v-if="userType == 0">-->
				<div class="col-3 text-right">
					<a @click="openClass" class="btn main-btn text-white">新建课程 +</a>
				</div>
			</div>
			<hr>
			<div class="row filter mt-4">
				<label class="pt-1">课程状态：</label>
				<!-- <a href="javascript:void(0)" :class="{'active':courseActive=='all'}" @click="mkCourse('all')">全部</a> -->
				<a href="javascript:void(0)" :class="{'active':courseActive=='pending'}" @click="mkCourse('pending')">审核中</a>
				<a href="javascript:void(0)" :class="{'active':courseActive=='pass'}" @click="mkCourse('pass')">已通过</a>
				<a href="javascript:void(0)" :class="{'active':courseActive=='rejt'}" @click="mkCourse('rejt')">未通过</a>
			</div>

			<div class="row filter mt-4">
				<label class="pt-2">申请时间：</label>
				<div class="ml-5">
				  	<div  class="block">
				    	<el-date-picker
					    	v-on:change="change_time()"
					      	v-model="default_time"
					      	type="daterange"
					      	align="left"
					      	unlink-panels
					      	range-separator="至"
					      	start-placeholder="开始时间"
					      	end-placeholder="结束时间"
					      	:picker-options="pickerOptions2">
				   		</el-date-picker>
				  	</div>
				</div>
				 
			</div>
			<hr class="my-4">
				<el-table :data="dataList" border style="width: 100%">
    				<el-table-column prop="Status" label="状态" width="180"></el-table-column>
    				<el-table-column prop="Name" label="培训班级名称" width="180"> </el-table-column>
    				<el-table-column prop="User" label="企业/机构"> </el-table-column>
					<el-table-column prop="CreateDate" label="申请时间"> </el-table-column>
					<el-table-column prop="ReviewUserName" label="审核人"> </el-table-column>
					<el-table-column  label="操作">
						<template slot-scope="scope">
							<a href="#">{{scope.$row}}</a>
						</template>
					</el-table-column>
  				</el-table>

			<hr>

			<div class="d-flex justify-content-between">
				<span>共有{{total}}条记录</span>
				<ul class="my_pagination" v-if="page.list.length!=0">
					<li @click="change_page(page.shang)" :class="{'disabled':page.shang=='','active':page.shang!=''}"><</li>
					<li @click="change_page(x)" v-for="x in page.list" :class="{'active':x==getData_obj.page}">{{x}}</li>
					<li @click="change_page(page.xia)" :class="{'disabled':page.xia=='','active':page.xia!=''}">></li>
				</ul>
			</div>

		</section>
		
	</div>
</template>

<script>
import { ajax, paging, dateFtt } from "@/assets/fc";
export default {
  components: {
    //	    	VueDaterangePicker
  },
  name: "",
  data() {
    var new_date = new Date();
    var Today =
      new_date.getFullYear() +
      "-" +
      (new_date.getMonth() + 1) +
      "-" +
      new_date.getDate(); //今天
    var firstDay =
      new_date.getFullYear() + "-" + (new_date.getMonth() + 1) + "-01"; //当月第一天
    return {
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      default_time: [firstDay, Today], //默认时间
      Prompt: "", //提示
      active: "pending",
      courseActive: "pending",
      Name: "",
      username: "",
      userType: "", // 0 user 1 admin 2 super admin,
      total: "", //总条数
      dataList: [], //数据列表
      maxCount: "", //最大页数
      review: "/review.html",
      searchString: "", //搜索条件

      Status: ["", "待审核", "待审核证书编号", "待审核补贴", "审核通过"], //审核状态
      getData_obj: {
        //查询参数
        page: 1,
        per_page: 5,
        user: "",
        class_name: "",
        startdate: firstDay,
        enddate: Today,
        status: 1 //这里填写1表示审核中的
      },
      page: {
        //分页
        list: [],
        shang: "",
        xia: ""
      }
    };
  },
  methods: {
    change_time() {
      this.getData_obj.page = 1;
      if (this.default_time && this.default_time != null) {
        //					console.log(this.default_time);
        this.getData_obj.startdate = dateFtt(
          this.default_time[0],
          "yyyy-MM-dd"
        );
        this.getData_obj.enddate = dateFtt(this.default_time[1], "yyyy-MM-dd");
      } else {
        this.getData_obj.startdate = "";
        this.getData_obj.enddate = "";
      }
      this.getData();
    },
    //点击分页
    change_page(x) {
      if (x != "") {
        this.getData_obj.page = x;
        this.getData();
      }
    },
    openClass: function() {
      sessionStorage.setItem("currentClick", "");
      //				window.location.href = "new-class.html"
      this.$router.push("/newclass");
    },
    //选择创建方
    mkActive: function(tag) {
      this.active = tag;
      this.getData();
    },
    //第一个查看
    goToDetail: function(item) {
      sessionStorage.setItem("currentClick", item.Id);
      //				window.location.href = "/newclass";
      this.$router.push("/newclass");
    },
    //第二个查看
    goToReview: function(item, index) {
      // console.log('ucks')
      sessionStorage.setItem("currentClick", item.Id);
      //				window.location.href = "review.html"
      this.$router.push("/newclass");
    },

    class_return(x) {
      var x = JSON.parse(x);
      if (x.Result) {
        this.dataList = x.Memory.DataList;
        this.total = x.Memory.MaxCount;
        this.page = paging(x.Memory.MaxPage, this.getData_obj.page);
      } else {
        this.Prompt = x.Message;
        $("#home .modal_1").modal("show");
      }
      console.log(x);
    },
    getData: function(u, s, c) {
      let self = this;
      //				let user = u ? u :'';
      //				let status = s ? s : '';
      //				let clas = c ? c :'';
      //				let self = this;
      ajax("get", "/class", self.getData_obj, self.class_return);
    },

    onchange: function() {
      if (!this.searchString) {
        this.getData();
        console.log("onchange");
      }
    },
    //选择课程状态
    mkCourse: function(tag) {
      this.courseActive = tag;
      let status = "";
      if (tag == "all") {
        this.getData_obj.status = "";
      } else if (tag == "rejt") {
        this.getData_obj.status = 2;
      } else if (tag == "pass") {
        this.getData_obj.status = 3;
      } else if (tag == "pending") {
        this.getData_obj.status = 1;
      }
      this.getData();
    },
    search: function() {
      this.getData("", "", this.searchString);
    }
  },
  created: function() {},
  mounted: function() {
    var user = JSON.parse(localStorage.user0609);
    console.log(user);
    this.userType = user.Type;
    this.Name = user.Name;
    this.username = user.Id;
    //			console.log(this.userType)
    this.getData();
  }
};
</script>

<style>
#home .my_pagination {
  display: flex;
}
#home .my_pagination li {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}
#home .my_pagination li.active {
  color: #2e2edd;
}
#home .my_pagination li.disabled {
  color: #9c9c9c;
}

#home .search-input {
  border: none;
  outline: none;
  padding-top: 5px;
}

#home .w-85 {
  width: 90%;
}

#home .main-btn {
  color: #ffffff;
  background: #3737e1;
}

#home .filter a.active {
  color: #ffffff;
  background: #3737e1;
}

#home .filter a {
  margin-left: 3rem;
  display: block;
  padding: 3px 15px 4px 15px;
  border-radius: 5px;
  color: #000000;
}
</style>