import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import home from '@/components/home'
const newclass=()=>import('@/components/newclass');			//新建班级
const role=()=>import('@/components/role');		//角色管理
const roleDetails=()=>import('@/components/roleDetails');		//角色想请
const user=()=>import('@/components/user');		//角色想请
const userdetails=()=>import('@/components/userdetails');		//角色想请
const classexamine=()=>import('@/components/classexamine');		//角色想请
const subsidystandard=()=>import('@/components/subsidystandard');		//补贴
const businessscope=()=>import('@/components/businessscope');		//补贴


const addclass=()=>import('@/components/class/addclass');		//新建班级
const Seeclass=()=>import('@/components/class/Seeclass');		//查看班级
const Student=()=>import('@/components/class/Student');		//查看和修改学生
const studentDetails=()=>import('@/components/class/studentDetails');		//查看和修改学生;
const addstudent=()=>import('@/components/class/addstudent');		//查看和修改学生;

// 管理员
const adminihome=()=>import('@/components/admini/home');		//查看和修改学生;
const adminiSeeclass=()=>import('@/components/admini/Seeclass');		//查看班级
const quick=()=>import('@/components/admini/quick');		//直补列表
const channeldetails=()=>import('@/components/admini/channeldetails');		//直补详情
const quickstuednt=()=>import('@/components/admini/quickstuednt');		//直补学生信息
const adminstudentDetails=()=>import('@/components/admini/studentDetails');		//直补学生信息
const adminsubsidy=()=>import('@/components/admini/subsidy');		//直补学生信息
const adminaddsubsidy=()=>import('@/components/admini/addsubsidy');		//直补 补贴
const statistics=()=>import('@/components/admini/statistics');		//直补 补贴
const subsidyAudit=()=>import('@/components/admini/subsidyAudit');		//添加补贴

const adoptstudent=()=>import('@/components/class/adoptstudent');		//企业查看学生 已通过
const curriculum=()=>import('@/components/class/curriculum');		//课程
const subsidy=()=>import('@/components/class/subsidy');		//补贴
const addsubsidy=()=>import('@/components/class/addsubsidy');		//添加补贴


const modifypassword=()=>import('@/components/modifypassword');		//修改密码
const userinfo=()=>import('@/components/class/userinfo');		//修改密码



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component:login
    },
		{
        path: '/index',
        component: index,
        children: [
          {path: '/', component:home},
          {path: '/home',
            meta:['SYSTEM',0,1,2],
            component:home
          },
          {path: '/newclass', component:newclass},
          {path: '/newclass/:type', component:newclass},
          {path: '/role', component:role},
          {path: '/roleDetails', component:roleDetails},
          {path: '/roleDetails/:id', component:roleDetails},
          {path: '/user', component:user},
          {path: '/userdetails', component:userdetails},
          {path: '/userdetails/:id', component:userdetails},
          {path: '/classexamine', component:classexamine},
          {path: '/subsidystandard', component:subsidystandard},
          {path: '/businessscope', component:businessscope},
          {path: '/addclass', component:addclass},  //新建
          {path: '/Seeclass', component:Seeclass},  //查看班级
          {path: '/Student', component:Student},  //查看和修改学生
          {path: '/studentDetails', component:studentDetails},  //
          {path: '/admini/home', component:adminihome},  //管理员审核界面
          {path: '/admini/adminiSeeclass', component:adminiSeeclass},  //管理员审核界面
          {path: '/admini/subsidyAudit', component:subsidyAudit},  //补贴审核
          {path: '/quick', component:quick},  //直补
          {path: '/channeldetails', component:channeldetails},  //直补
          {path: '/quickstuednt', component:quickstuednt},  //直补学生列表
          {path: '/admini/studentDetails', component:adminstudentDetails},  //直补单个学生
          {path: '/admini/subsidy', component:adminsubsidy},  //直补单个学生
          {path: '/admini/addsubsidy', component:adminaddsubsidy},  //直补补贴
          {path: '/admini/statistics', component:statistics},  //直补补贴
          {path: '/addstudent', component:addstudent},  
          {path: '/adoptstudent', component:adoptstudent},
          {path: '/curriculum', name: 'curriculum', component:curriculum}, 
          {path: '/subsidy', component:subsidy}, 
          {path: '/addsubsidy', component:addsubsidy}, 
          {path: '/modifypassword', component:modifypassword}, 
          {path: '/userinfo', component:userinfo}, 
          
        ]
   	}
  ]
})
