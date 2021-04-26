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
            <el-button type="primary" icon="el-icon-user" @click="toAddEquipment()">新增器材</el-button>
            <el-drawer
                    :title="title"
                    :visible.sync="dialog"
                    custom-class="demo-drawer"
            >
                <div class="demo-drawer__content">
                    <el-form :model="form" :rules="rules" ref="form">
                        <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" style="width: 300px"></el-input>
                        </el-form-item>
                        <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
                            <el-input v-model="form.description" autocomplete="off" style="width: 300px"></el-input>
                        </el-form-item>

                        <el-form-item label="图片" :label-width="formLabelWidth">
                            <el-upload
                                    ref="upload"
                                    :action="uploadUrl()"
                                    list-type="picture-card"
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
                        <el-button v-show="title == '新增器材'" type="primary" @click="addEquipment('form')" >确 定(添加)</el-button>
                        <el-button v-show="title == '修改器材'  && flag" type="primary" @click="updateEquipmentToPian('form')" >确 定(图片)</el-button>
                        <el-button v-show="title == '修改器材'  && !flag" type="primary" @click="updateEquipment('form')" >确 定(修改)</el-button>
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
                    prop="description"
                    label="描述"
                    align="center">
            </el-table-column>

            <el-table-column label="商品图片" align="center">
                <template slot-scope="scope">
                    <el-image style="width: 100px; height: 100px"
                              :src="scope.row.pic"
                              :preview-src-list="[scope.row.pic]">
                    </el-image>
                </template>
            </el-table-column>

            <el-table-column
                    prop="beginTime"
                    label="使用时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="toUpdateForm(scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteEquipment(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "Equipment",
        data() {
            return {
                flag: false, //控制修改按钮（图片还是普通字段）
                url: 'http://127.0.0.1:8081' ,
                myUploadUrl: '',
                fl:[],
                tableData: [],
                input: '',
                title: '',
                form: {
                    id: '',
                    name: '',
                    description: '',
                    pic: '',
                    beginTime: '',
                },
                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                rules: {
                    name:[
                        {required: true, message: '姓名不可为空', trigger: 'blur'}
                    ],
                },
                dialog: false,
                formLabelWidth: '80px',
                //上传商品图片
                myHeaders:{
                    "token": localStorage.getItem("token") ,
                },
            }
        },
        methods: {
            updateEquipmentToPian(formName){
                console.log("TuPian");
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$refs.upload.submit();
                    }
                });
            },
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
                    this.getEquipment() ;
                    this.$back('器材',response.msg,'success');
                }else{
                    this.dialog = false;
                    this.$back('器材',response.msg,'error');
                }
            },
            uploadUrl() {
                return this.myUploadUrl;   //接口
            },
            //添加器材
            addEquipment(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$refs.upload.submit();
                    }
                });

            },
            cancelForm() {
                this.dialog = false;
            },
            //去添加
            toAddEquipment(){
                this.myUploadUrl = 'http://127.0.0.1:8081/equipment/uploadPath';
                this.title = '新增器材';
                this.dialog = true;
                this.form = {};
                this.fl =  [];
            },
            // 去修改
            toUpdateForm(data){
                this.myUploadUrl = 'http://127.0.0.1:8081/equipment/updateUploadPath';
                this.flag =  false; //判断是否修改图片的按钮
                if(this.fl.length>0){
                    this.fl.pop() ;
                }
                console.log(data);
                this.title = '修改器材' ;
                // 进行编辑弹框
                this.dialog = true ;
                //将所以信息进行赋值
                this.form = { // 编辑
                    id : data.id,
                    name : data.name,
                    description: data.description,
                    pic: data.pic,
                    begin_time: data.begin_time,

                } ;
                if(this.form.pic != null){
                    this.fl.push({name:this.form.pic,url:this.form.pic}) ;
                }
            },
            //修改用户
            updateEquipment(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("修改器材");
                        this.dialog = false;
                        console.log(this.form);
                        const user = this.form ;
                        request({
                            url:'/equipment/updateEquipment',
                            method:'post',
                            headers:{
                                "token": localStorage.getItem("token") ,
                            },
                            data:{
                                id : user.id,
                                name : user.name,
                                description: user.description,
                            }
                        }).then(res => {
                            console.log(res);
                            if(res.data.code === '0'){
                                this.getEquipment();
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
            //删除器材
            deleteEquipment(data){
                this.$confirm('是否确认删除 '+data.name+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //调用删除方法
                    console.log("删除方法");
                    request({
                        url:'/equipment/deleteEquipment?id='+data.id,
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
                            this.getEquipment();
                            this.$back(title,res.data.msg,'success');
                        }else{
                            this.$back(title,res.data.msg,'error');
                        }
                    }).catch(err => {
                        console.log(err) ;
                    })
                }).catch(() => {});
            },

            //查询全部器材
            getEquipment(){
                request({
                    url:'/equipment/getEquipmentAll',
                    method:'post',
                    headers:{
                        "token": localStorage.getItem("token") ,
                    },
                }).then(res => {
                    console.log(res);
                    if(res.data.code === '0'){
                        this.tableData = res.data.data ;
                        for(let i=0 ;i<this.tableData.length;i++){
                            this.tableData[i].pic = this.url+this.tableData[i].pic;
                            console.log(this.tableData[i].pic);
                        }
                    }
                }).catch(err => {
                    console.log(err) ;
                })
            },
        },

        computed: {
            // 这里定义上传文件时携带的参数，即表单数据
            //上传文件时候 , 传递的数据
            myData: function() {
                return this.form ;
            }
        },
        created(){
            this.getEquipment() ;
        }
    }
</script>

<style scoped>

</style>