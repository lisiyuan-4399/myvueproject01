<template>
    <div class="header">
        <el-container class="main">
            <el-header class="mainHeader">
                <div class="header_left">
                    <span class="header_title">项目简介</span>
                </div>
                <div class="header_right">

                    <div class="avatar">
                        <el-avatar :src="require('../assets/image/user.png')" class="el-avatar"></el-avatar>
                    </div>
                    <div>
              <span>
                  {{user.name}}
                   <el-divider direction="vertical"></el-divider>
                  {{user.value === 'user'? '用户':(user.value === 'coach'? '教练':(user.value === 'admin'?'管理员':'-')) }}
                  <el-divider direction="vertical"></el-divider>
                  <el-link :underline="false" @click="logout()">退出</el-link>
              </span>
                    </div>
                </div>
            </el-header>
        </el-container>
    </div>
</template>

<script>
    import {request} from "../network/request";
    export default {
        name: "Head",
        data(){
            return{
                user: {
                    // name: this.$store.state.userInfo.name,
                    value: localStorage.getItem("user"),
                    name:'',
                },

            }
        },
        methods:{
            getUserInfo(){
                request({
                    url:'/user/getUserInfo',
                    method:'post',
                    headers:{
                        "token": localStorage.getItem("token") ,
                    },
                }).then(res => {
                    console.log("getUserInfo") ;
                    console.log(res);
                    if(res.data.code === '0'){
                        localStorage.setItem("userInfo",JSON.stringify(res.data.data)) ;
                        this.user.name = res.data.data.name;
                    }
                }).catch(err => {
                    console.log(err) ;
                })
            },
            logout(){
                console.log("退出");
                request({
                    url:'/login/logout',
                    method:'post',
                    headers:{
                        "token": localStorage.getItem("token") ,
                    },
                }).then(res => {
                    if(res.data.code === '0'){
                        localStorage.clear() ;
                        this.$router.push({name:'/login'});
                    }
                }).catch(err => {
                    console.log(err) ;
                })

            },
        },
        created(){
            this.getUserInfo() ;
        }

    }
</script>

<style scoped>
    @import "../assets/css/myhead.css";
</style>