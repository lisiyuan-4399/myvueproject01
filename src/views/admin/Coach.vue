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
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary" icon="el-icon-user" @click="toAddCoach()">新增教练</el-button>
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
                            <el-input v-if="title === '新增教练'" v-model="form.username" autocomplete="off" style="width: 300px"></el-input>
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
                        <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
                            <el-input v-model="form.description" autocomplete="off" style="width: 300px"></el-input>
                        </el-form-item>
                        <el-form-item label="图片" :label-width="formLabelWidth">
                            <el-upload
                                    ref="upload"
                                    :action="uploadUrl()"
                                    list-type="picture-card"
                                    :before-upload="myBeforeUpload"
                                    :on-change="myOnChange"
                                    :on-preview="myOnPreview"
                                    :on-success="myOnSuccess"
                                    :on-remove="myOnRemove"
                                    :auto-upload="false"
                                    :multiple="false"
                                    :file-list="fl"
                                    :data="myData"
                                    :headers="myHeaders">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <div class="demo-drawer__footer" style="padding-left: 20px">
                        <el-button @click="cancelForm">取 消</el-button>
                        <el-button v-show="title == '新增教练'" type="primary" @click="addCoach('form')" >确 定(添加)</el-button>
                        <el-button  v-show="title == '修改教练' && flag" type="primary" @click="updateCoachToPian('form')" >确 定(图片)</el-button>
                        <el-button v-show="title == '修改教练' && !flag" type="primary" @click="updateCoach('form')" >确 定(修改)</el-button>
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
                prop="num"
                label="预约次数"
                align="center">
        </el-table-column>
        <el-table-column
                label="操作"
                align="center">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle @click="toUpdateForm(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="deleteCoach(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "Coach",
        data() {
            return {
                flag: false,
                myUploadUrl: 'http://127.0.0.1:8081/coach/uploadPath',
                url: 'http://127.0.0.1:8081' ,
                fl:[],
                //上传商品图片
                myHeaders:{
                    "token": localStorage.getItem("token") ,
                },
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
                    phone: '',
                    description: '',
                    pic: '',
                    num: '',
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
            myOnRemove(file, fileList){
                console.log(file);
                console.log(fileList);
                this.fl = [];
                this.flag = true;
            },
            myOnSuccess(response,file,fileList){
                console.log("myOnSuccess") ;
                console.log(response);
                console.log(file);
                console.log(fileList);
                if(response.code === '0'){
                    this.dialog = false;
                    this.form = {};
                    this.fl = [];
                    this.getCoachAll() ;
                    this.$back('教练',response.msg,'success');
                }else{
                    this.dialog = false;
                    this.$back('教练',response.msg,'error');
                }


            },
            myOnPreview(file){
                console.log("myOnPreview") ;
                console.log(file);
            },
            //导入接口地址
            uploadUrl() {
                console.log(this.myUploadUrl);
                return this.myUploadUrl;   //接口
            },
            myOnChange(file, fileList){
                console.log("myOnChange");
                console.log(file);
                console.log(fileList);
            },
            myBeforeUpload(file){
                console.log("myBeforeUpload");
                console.log(file);
            },

            addCoach(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$refs.upload.submit();
                    }
                });

            },
            cancelForm() {
                this.dialog = false;
            },
            // 添加性别过滤
            isSexFormat(date){
                if(date.sex == 0){
                    return '女'
                }
                if(date.sex == 1){
                    return '男'
                }
            },
            //去添加
            toAddCoach(){
                this.myUploadUrl = 'http://127.0.0.1:8081/coach/uploadPath';
                this.title = '新增教练';
                this.dialog = true;
                this.form = {};
                this.fl =  [];
            },
            // 去修改
            toUpdateForm(data){
                this.myUploadUrl = 'http://127.0.0.1:8081/coach/updateUploadPath';
                this.flag =  false; //判断是否修改图片的按钮
                if(this.fl.length>0){
                    this.fl.pop() ;
                }
                console.log(data);
                this.title = '修改教练' ;
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
                    description: data.description,
                    pic: data.pic,
                    num: data.num,
                } ;
                if(this.form.pic != null){
                    this.fl.push({name:this.form.pic,url:this.url+this.form.pic}) ;
                }


            },
            updateCoachToPian(formName){
                console.log("TuPian");
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 修改添加图片的方法
                        this.$refs.upload.submit();
                    }
                });
            },
            //修改用户
            updateCoach(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("修改教练");
                        this.dialog = false;
                        console.log(this.form);

                        const user = this.form ;
                        request({
                            url:'/coach/updateCoach',
                            method:'post',
                            headers:{
                                "token": localStorage.getItem("token") ,
                            },
                            data:{
                                id : user.id,
                                name : user.name,
                                username: user.username,
                                password: user.password,
                                sex: user.sex,
                                phone: user.phone,
                                email: user.email,
                                description: user.description,
                                num: user.num,
                            }
                        }).then(res => {
                            console.log(res);
                            if(res.data.code === '0'){
                                this.getCoachAll();
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
            deleteCoach(data){
                this.$confirm('是否确认删除（教练） 账户 '+data.username+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //调用删除方法
                    console.log("删除方法");
                    request({
                        url:'/coach/deleteCoach?id='+data.id,
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
                            this.getCoachAll();
                            this.$back(title,res.data.msg,'success');
                        }else{
                            this.$back(title,res.data.msg,'error');
                        }
                    }).catch(err => {
                        console.log(err) ;
                    })


                }).catch(() => {});
            },
            getCoachAll(){
                request({
                    url:'/coach/getCoachAll',
                    method:'post',
                    headers:{
                        "token": localStorage.getItem("token") ,
                    },
                }).then(res => {
                    console.log(res);
                    if(res.data.code === '0'){
                        this.tableData = res.data.data ;
                    }
                }).catch(err => {
                    console.log(err) ;
                })
            },
        },
        created(){
            this.getCoachAll() ;
        },
        computed: {
            // 这里定义上传文件时携带的参数，即表单数据
            //上传文件时候 , 传递的数据
            myData: function() {
                return this.form ;
            }
        },
    }
</script>

<style scoped>


    .el-upload-list__item {
        transition: none !important;
    }


</style>