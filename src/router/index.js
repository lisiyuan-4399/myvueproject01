import Vue from 'vue'
import VueRouter from 'vue-router'

//对路由进行懒加载
const Middle = () => import('../views/Middle');
const Coach = () => import('../views/admin/Coach');
const Equipment = () => import('../views/admin/Equipment');
const Login = () => import('../views/Login');
const User = () => import('../views/admin/User');
const Appointment = () => import('../views/admin/Appointment');
const ToView = () => import('../views/coach/ToView');
const CoachMyAppoint = () => import('../views/coach/CoachMyAppoint');
const EquipAppoint = () => import('../views/user/EquipAppoint');
const CoachAppoint = () => import('../views/user/CoachAppoint');
const Suggest = () => import('../views/user/Suggest');
const MyAppoint = () => import('../views/user/MyAppoint');
const PersonalDetails = () => import('../views/user/PersonalDetails');

//1.安装插件
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

//3.对 routes 进行抽取
const routes = [
    //进行默认跳转
    {
        path: '/',
        name: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: '/login',
        component: Login
    },
    {
        path: '/middle',
        name: '/middle',
        component: Middle,
        children:[
            // 管理员路由
            {
                path: '/middle/admin',
                name: '/middle/admin',
                redirect: '/middle/admin/user'
            },
            {
                path: '/middle/admin/user',
                name: '/middle/admin/user',
                component: User
            },
            {
                path: '/middle/admin/coach',
                name: '/middle/admin/coach',
                component: Coach
            },
            {
                path: '/middle/admin/equipment',
                name: '/middle/admin/equipment',
                component: Equipment
            },
            {
                path: '/middle/admin/appointment',
                name: '/middle/admin/appointment',
                component: Appointment
            },
            // 教练路由
            {
                path: '/middle/coach',
                name: '/middle/coach',
                redirect: '/middle/coach/toview'
            },
            {
                path: '/middle/coach/toview',
                name: '/middle/coach/toview',
                component: ToView
            },
            {
                path: '/middle/coach/coachmyappointment',
                name: '/middle/coach/coachmyappointment',
                component: CoachMyAppoint
            },
            //用户路由
            {
                path: '/middle/user',
                name: '/middle/user',
                redirect: '/middle/user/equipappoint'
            },
            {
                path: '/middle/user/equipappoint',
                name: '/middle/user/equipappoint',
                component: EquipAppoint
            },
            {
                path: '/middle/user/coachappoint',
                name: '/middle/user/coachappoint',
                component: CoachAppoint
            },
            {
                path: '/middle/user/suggest',
                name: '/middle/user/suggest',
                component: Suggest
            },
            {
                path: '/middle/user/myappoint',
                name: '/middle/user/myappoint',
                component: MyAppoint
            },
            {
                path: '/middle/user/personaldetails',
                name: '/middle/user/personaldetails',
                component: PersonalDetails
            }
        ]
    },

];

//2.创建 router
const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router