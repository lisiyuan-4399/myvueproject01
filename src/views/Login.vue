<template>
    <div class="mid-class" id="app">
        <div class="art-right-w3ls">
            <h2>Sign In and Sign Up</h2>

            <el-form ref="form" :model="form" :rules="rules">
                <div class="main">
                    <div class="form-left-to-w3l">
                        <el-form-item prop="username">
                                <el-input v-model="form.username" placeholder="Username" @keyup.native="trimLR"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                                <el-input type="password" v-model="form.password" placeholder="Password" @keyup.native="trimLR"></el-input>
                        </el-form-item>

                        <el-form-item prop="getType">
                            <el-select v-model="form.value">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </div>
                </div>
                <!--<div class="left-side-forget">-->
                    <!--<input type="checkbox" class="checked">-->
                    <!--<span class="remenber-me">Remember me </span>-->
                <!--</div>-->
                <div class="right-side-forget">
                    <!--忘记密码的链接-->
                    <a href="#" class="for">Forgot password...?</a>
                </div>
                <div class="clear"></div>
                <div class="btnn">
                    <el-button type="primary" @click="toLogin('form')">Sign In</el-button>
                </div>
            </el-form>
            <div class="w3layouts_more-buttn">
                <h3>Don't Have an account..?
                    <!--进行注册的链接-->
                    <a href="#content1">Sign Up Here
                    </a>
                </h3>
            </div>
            <!-- popup-->
            <div id="content1" class="popup-effect">
                <div class="popup">
                    <!--login form-->
                    <div class="letter-w3ls">
                        <form action="#" method="post">
                            <div class="form-left-to-w3l">
                                <input type="text" name="name" placeholder="Username" required="">
                            </div>
                            <div class="form-left-to-w3l">
                                <input type="text" name="name" placeholder="Phone" required="">
                            </div>
                            <div class="form-left-to-w3l">
                                <input type="email" name="email" placeholder="Email" required="">
                            </div>
                            <div class="form-left-to-w3l">
                                <input type="password" name="password" placeholder="Password" required="">
                            </div>
                            <div class="form-left-to-w3l margin-zero">
                                <input type="password" name="password" placeholder="Confirm Password" required="">
                            </div>
                            <div class="btnn">
                                <button type="submit">Sign Up</button>
                                <br>
                            </div>
                        </form>
                        <div class="clear"></div>
                    </div>
                    <!--//login form-->
                    <a class="close" href="#">&times;</a>
                </div>
            </div>
            <!-- //popup -->
        </div>
        <div class="art-left-w3ls">
            <h1 class="header-w3ls">
                Gaze sign up & login Form
            </h1>
        </div>

    </div>
</template>

<script>
    import {request} from "../network/request";

    export default {
        name: "Login",
        data(){
            return{
                form:{
                    username:'',
                    password:'',
                    value: 'user',
                },
                rules: {
                    username: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                },
                options:[
                    {
                        value: 'user',
                        label: '会员'
                    },
                    {
                        value: 'coach',
                        label: '教练'
                    },
                    {
                        value: 'admin',
                        label: '管理员'
                    }
                ],

            }
        },
        methods: {
            //登录方法
            toLogin(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        request({
                            url:'/login/toLogin/'+this.form.value,
                            method:'post',
                            data:{
                                username: this.form.username,
                                password: this.form.password,
                            }
                        }).then(res => {
                            console.log(res);
                            const type = res.data.code === '0' ? 'success' : 'error' ;
                            if (res.data.code === '0'){
                                console.log("登录成功") ;
                                //进行路由跳转
                                const name = '/middle' ;
                                this.$router.push({name:name, params:{type:this.form.value}} );
                            }else {
                                this.$back('详情',res.data.msg,type);
                            }

                        }).catch(err => {
                            console.log(err);
                        })
                    }

                })
            },
            trimLR(){
                // 对前端进行去除空格处理
                this.form.username = this.form.username.replace(/^\s+|\s+$/gm,'');
                this.form.password = this.form.password.replace(/^\s+|\s+$/gm,'');
            },
        },
        created(){

        }
    }
</script>

<style scoped>
    @import "../assets/css/login.css";
</style>