// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery'
//require('bootstrap'); 4.0 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import ElementUI, { Alert } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import axios from 'axios'
Vue.prototype.$http=axios;

Vue.config.productionTip = false

import '@/assets/css/style.css'


const ADMIN_LIST = ['/user', '/admini/home', '/admini/adminiSeeclass', '/admini/subsidyAudit', '/quick', '/channeldetails', '/quickstuednt', '/admini/studentDetails', '/admini/subsidy', '/admini/addsubsidy', '/admini/statistics'];
router.beforeEach((to,from,next)=>{
  var USER = localStorage.user0609 ? JSON.parse(localStorage.user0609) : '';
  if(!USER && to.path != '/' && from.path != '/'){
    next({path:'/'});//跳转到登录页
  }else if((USER.Type == '1' || USER.Type == '2') && ADMIN_LIST.indexOf(to.path) != -1){
    next({path:'/home'});//访问没有权限的路由时重定向到首页
  }else{
    next();
  }  
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

