<template>
  	<div id="login">
			<section class="login mt-left pt-login">
        <form @submit.prevent="loginSystem()">
		      <h1 class="login-h1">Hello!</h1>
		      <h2 class="login-h2 mt-4 mb-5">WELCOME TO MY WORLD!</h2>
		      
		      <div class="input-group input-radius">
		        <img src="@/assets/img/user.png" class="mx-4 my-3 " width="25px" height="25px" alt="">
		        <input type="text" required="" pattern=".*[^ ].*" class="rm-input" placeholder="账号" v-model="logObj.Code">
		      </div>
		
		      <div class="input-group input-radius mt-4">
		        <img src="@/assets/img/pwd.png" class="mx-4 my-3 " width="25px" height="25px" alt="">
		        <input type="password" required="" pattern=".*[^ ].*"  class="rm-input" placeholder="密码" v-model="logObj.Password">
		      </div>
		      <button type="submit" class="btn mt-5 btn_1">登录</button>
          </form>
		    </section>
  	</div>
</template>

<script>
import { http, ajax } from "@/assets/fc";
import "@/assets/md5/md5.min";
import crypto from "crypto";
export default {
  name: "",
  data() {
    return {
      logObj: {
        Code: "",
        user_password: "",
        Password: ""
      },
      Prompt: ""
    };
  },
  methods: {
    loginSystem() {
      // var md5 = crypto.createHash("md5");
      // md5.update(this.logObj.Password);
      // var user_password = md5.digest("hex");
      // this.logObj.user_password = user_password.toUpperCase(); //英文全部转为大写
      //	  			console.log(this.logObj)
      ajax("post", "/user/login", JSON.stringify(this.logObj), this.login);
    },
    login(x) {
      var x = JSON.parse(x);
      console.log(x);
      if (x.Result) {
        localStorage.user0609 = JSON.stringify(x.Memory.User);
        localStorage.permission0609 = JSON.stringify(x.Memory.permission);
        //判断是登录是是什么类型的  SYSTEM超级管理员  0管理员1企业 2机构
          if(x.Memory.User.Type=='SYSTEM' || x.Memory.User.Type==0){
            this.$router.push("/user");
          }else{
            if(this.logObj.Password=='123456'){
              this.$router.push("/modifypassword?prompt=1");
            }else{
              this.$router.push("/home");
            }
        }
      } else {
        // this.Prompt = x.Message;
        // $("#login .modal_1").modal("show");
        this.$message({
          showClose: true,
          message: x.Message,
          type: 'error'
        });
      }

      //	  			$('#login .modal_1').on('shown.bs.modal', function () {
      //				})
    }
  },
  created: function() {},
  mounted: function() {
   
  }
};
</script>

<style >
#login {
  min-height: 100%;
  /*height: 100%;*/
  background: url(../assets/img/bg.png) right 50% no-repeat;
}
#login .btn_1 {
  width: 183px;
  height: 53px;
  background-image: linear-gradient(101deg, #17189d 0%, #3a3ce6 100%);
  font-family: MicrosoftYaHei;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0px;
  font-size: 20px;
  letter-spacing: 2px;
  color: #ffffff;
  border-radius: 34px !important;
}
#login .pt-login {
  padding-top: 10% !important;
}
#login .mt-left {
  margin-left: 5% !important;
}
#login .input-radius {
  width: 322px;
  height: 52px;
  border: 0px;
  /* border: 1px solid #bbb; */
  background-color: #f7f5fb;
  border-radius: 34px;
  outline: none;
}
#login .rm-input {
  border: 0px;
  background-color: #f7f5fb;
  outline: none;
}
#login .login-h1 {
  font-family: ArialMT;
  font-size: 64px;
  line-height: 43px;
  /* letter-spacing: 0px; */
  color: #404040;
}
#login .login-h2 {
  font-family: ArialMT;
  font-size: 24px;
  line-height: 43px;
  /* letter-spacing: 0px; */
  color: #4d4d4d;
}
</style>
