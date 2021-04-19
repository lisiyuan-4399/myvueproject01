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
    export default {
        name: "PersonalDetails",
        data(){
            return{
                tableData: [
                    {

                    },
                ],
                form: {
                    id: 1,
                    name: '李思雨',
                    sex: 1,
                    phone: '123455',
                    email: '132@qq.com',
                    description: '型男',
                    address: '河南项城',
                    height: '175',
                    qq: '1393906569',
                    birthday: '2021-04-12',

                },
                formLabelWidth: '80px',
            }
        },
        methods:{
            reset(){

            },
            updateMyMessage(){

            },
        }
    }
</script>

<style scoped>

</style>