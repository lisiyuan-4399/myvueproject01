<template>
    <div>
        <div style="padding-bottom: 20px">
        <span style="padding-left: 20px">姓名 : </span>
        <el-input
                placeholder="请输入内容"
                v-model="input"
                style="width: 20%"
                clearable>
        </el-input>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" icon="el-icon-thumb">搜索</el-button>
        <el-button type="primary" icon="el-icon-user" @click="toAddUser()">新增用户</el-button>
            <el-drawer
                    :title="title"
                    :visible.sync="dialog"
                    custom-class="demo-drawer"
            >
                <div class="demo-drawer__content">
                    <el-form :model="form" :rules="rules" ref="form">
                        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" style="width: 300px"></el-input>
                        </el-form-item>
                        <el-form-item label="账号" prop="username" :label-width="formLabelWidth">
                            <el-input v-if="title === '新增用户'" v-model="form.username" autocomplete="off" style="width: 300px"></el-input>
                            <el-input v-else readonly v-model="form.username" autocomplete="off" style="width: 300px"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                            <el-input v-model="form.password" autocomplete="off" style="width: 300px"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
                            <el-radio v-model="form.sex" :label="1">男</el-radio>
                            <el-radio v-model="form.sex" :label="0">女</el-radio>
                        </el-form-item>
                        <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
                            <el-input v-model="form.phone" autocomplete="off" style="width: 300px"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                            <el-input v-model="form.email" autocomplete="off" style="width: 300px"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="demo-drawer__footer" style="padding-left: 20px">
                        <el-button @click="cancelForm">取 消</el-button>
                        <el-button v-show="title === '新增用户'" type="primary" @click="addUser('form')" >确 定(添加)</el-button>
                        <el-button v-show="title === '修改用户'" type="primary" @click="updateUser('form')" >确 定(修改)</el-button>
                    </div>
                </div>
            </el-drawer>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="编号"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="账户"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="password"
                    label="密码"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    align="center"
                    :formatter="isSexFormat">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="toUpdateForm(scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.row)"></el-button>
               </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "User",
        data() {
            return {
                tableData: [],
                input: '',
                title: '',
                form: {
                    id: '',
                    name: '',
                    sex: '',
                    username: '',
                    password: '',
                    email: '',
                    phone: ''
                },
                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                rules: {
                    name:[
                        {required: true, message: '姓名不可为空', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '账号不可为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不可为空', trigger: 'blur'}
                    ]
                },
                dialog: false,
                formLabelWidth: '80px',
            }
        },
        methods: {
            getUserAll(){
                request({
                    url:'/user/getUserAll',
                    method:'post',
                    headers:{
                        "token": localStorage.getItem("token") ,
                    },
                }).then(res => {
                    if(res.data.code === '0'){
                       this.tableData = res.data.data ;
                    }
                }).catch(err => {
                    console.log(err) ;
                })
            },
            addUser(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("添加用户");
                        this.dialog = false;
                        console.log(this.form);
                        const user = this.form ;
                        request({
                            url:'/user/addUser',
                            method:'post',
                            headers:{
                                "token": localStorage.getItem("token") ,
                            },
                            data:{
                                name: user.name,
                                sex: user.sex,
                                username: user.username,
                                password: user.password,
                                email: user.email,
                                phone: user.phone
                            }
                        }).then(res => {
                            console.log(res);
                            if(res.data.code === '0'){
                                this.getUserAll();
                                this.$back('添加用户',res.data.msg,'success');
                            }else{
                                this.$back('添加用户',res.data.msg,'error');
                            }
                        }).catch(err => {
                            console.log(err) ;
                        })
                    }
                });

            },
            cancelForm() {
                this.dialog = false;
            },
            // 是否为管理员校验
            isSexFormat(date){
                if(date.sex == 0){
                    return '女'
                }
                if(date.sex == 1){
                    return '男'
                }
            },
            //去添加
            toAddUser(){
                this.title = '新增用户';
                this.dialog = true;
            },
            // 去修改
            toUpdateForm(data){
                console.log(data);
                this.title = '修改用户' ;
                // 进行编辑弹框
                this.dialog = true ;
                //将所以信息进行赋值
                this.form = { // 编辑
                    id : data.id,
                    name : data.name,
                    username: data.username,
                    password: data.password,
                    sex: data.sex,
                    phone: data.phone,
                    email: data.email,
                } ;
            },
            //修改用户
            updateUser(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("修改用户");
                        this.dialog = false;
                        console.log(this.form);
                        const user = this.form ;
                        request({
                            url:'/user/updateUser',
                            method:'post',
                            headers:{
                                "token": localStorage.getItem("token") ,
                            },
                            data:{
                                id: user.id ,
                                name: user.name,
                                sex: user.sex,
                                username: user.username,
                                password: user.password,
                                email: user.email,
                                phone: user.phone
                            }
                        }).then(res => {
                            console.log(res);
                            if(res.data.code === '0'){
                                this.getUserAll();
                                this.$back('修改',res.data.msg,'success');
                            }else{
                                this.$back('修改',res.data.msg,'error');
                            }
                        }).catch(err => {
                            console.log(err) ;
                        })
                    }
                });
            },
            //删除用户
            deleteUser(data){
                this.$confirm('是否确认删除 账户 '+data.username+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //调用删除方法
                    console.log("删除方法");
                    request({
                        url:'/user/deleteUser?id='+data.id,
                        method:'post',
                        headers:{
                            "token": localStorage.getItem("token") ,
                        },
                        data:{
                        }
                    }).then(res => {
                        console.log(res);
                        const title = "删除" ;
                        if(res.data.code === '0'){
                            this.getUserAll();
                            this.$back(title,res.data.msg,'success');
                        }else{
                            this.$back(title,res.data.msg,'error');
                        }
                    }).catch(err => {
                        console.log(err) ;
                    })
                }).catch(() => {});
            },
        },
        created(){
            this.getUserAll();
        },
    }
</script>

<style scoped>

</style>