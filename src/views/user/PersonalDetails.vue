<template>
    <div>
        <el-form ref="form" :model="form">
            <el-form-item label="昵称" :label-width="formLabelWidth">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
                <el-radio v-model="form.sex" :label="1">男</el-radio>
                <el-radio v-model="form.sex" :label="0">女</el-radio>
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday" :label-width="formLabelWidth">
                <div class="block">
                    <el-date-picker
                            v-model="form.birthday"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item label="居住地址" :label-width="formLabelWidth">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="身高" :label-width="formLabelWidth">
                <el-input v-model="form.height"></el-input>
            </el-form-item>
            <el-form-item label="QQ" :label-width="formLabelWidth">
                <el-input v-model="form.qq"></el-input>
            </el-form-item>
            <el-form-item label="个人描述" prop="description" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
            <div class="demo-drawer__footer" style="padding-left: 40px">
                <el-button @click="reset()">重置</el-button>
                <el-button @click="updateMyMessage()" type="primary">确认修改</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "PersonalDetails",
        data(){
            return{
                form: {
                    id: '',
                    uId:'',
                    name: '',
                    sex: '',
                    phone: '',
                    email: '',
                    description: '',
                    address: '',
                    height: '',
                    qq: '',
                    birthday: '',
                },
                formLabelWidth: '80px',
            }
        },
        methods:{
            reset(){

            },
            updateMyMessage(){
                const myData = this.form ;
                request({
                    url:'/user/updateMyMessage',
                    method:'post',
                    headers:{
                        "token": localStorage.getItem("token") ,
                    },
                    data:{
                        id: myData.id,
                        uid:JSON.parse(localStorage.getItem("userInfo")).id,
                        name: myData.name,
                        sex: myData.sex,
                        phone: myData.phone,
                        email: myData.email,
                        description: myData.description,
                        address: myData.address,
                        height: myData.height,
                        QQ: myData.qq,
                        birthday: myData.birthday,
                    }
                }).then(res => {
                    console.log(res);
                    const title = "个人信息" ;
                    if (res.data.code === '0'){
                        console.log("修改个人信息成功!");
                        this.getMyMessage() ;
                        this.$back(title,res.data.msg,'success');
                    }else{
                        this.$back(title,res.data.msg,'error');
                    }
                }).catch(err => {
                    console.log(err) ;
                })
            },
            getMyMessage(){
                request({
                    url:'/user/getMyMessage',
                    method:'post',
                    headers:{
                        "token": localStorage.getItem("token") ,
                    },
                    params:{
                        "userId": JSON.parse(localStorage.getItem("userInfo")).id,
                    },
                }).then(res => {
                    console.log(res);
                    if (res.data.code === '0'){
                        this.form = res.data.data ;
                    }
                }).catch(err => {
                    console.log(err) ;
                })

            },
        },
        created(){
            this.getMyMessage() ;
        }
    }
</script>

<style scoped>

</style>