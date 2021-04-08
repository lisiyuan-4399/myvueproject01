import Vue from 'vue'
import VueRouter from 'vue-router'

//对路由进行懒加载
const Middle = () => import('../views/Middle');
const Coach = () => import('../views/admin/Coach');
const Equipment = () => import('../views/admin/Equipment');
const Login = () => import('../views/Login');
const User = () => import('../views/admin/User');
const ToView = () => import('../views/coach/ToView');
const EquipAppoint = () => import('../views/user/EquipAppoint');
const CoachAppoint = () => import('../views/user/CoachAppoint');
const Suggest = () => import('../views/user/Suggest');

//1.安装插件
Vue.use(VueRouter);

//3.对 routes 进行抽取
const routes = [
    //进行默认跳转
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/middle',
        component: Middle,
        children:[
            // 管理员路由
            {
                path: '/middle/admin',
                redirect: '/middle/admin/user'
            },
            {
                path: '/middle/admin/user',
                component: User
            },
            {
                path: '/middle/admin/coach',
                component: Coach
            },
            {
                path: '/middle/admin/equipment',
                component: Equipment
            },
            // 教练路由
            {
                path: '/middle/coac',
                redirect: '/middle/coach/toview'
            },
            {
                path: '/middle/coach/toview',
                component: ToView
            },
            //用户路由
            {
                path: '/middle/user',
                redirect: '/middle/user/equipappoint'
            },
            {
                path: '/middle/user/equipappoint',
                component: EquipAppoint
            },
            {
                path: '/middle/user/coachappoint',
                component: CoachAppoint
            },
            {
                path: '/middle/user/suggest',
                component: Suggest
            },
        ]
    },

]

//2.创建 router
const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router