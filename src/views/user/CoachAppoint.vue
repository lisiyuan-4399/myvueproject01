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

            <!--点击详情弹出抽题-->
            <el-drawer
                    title="教练详情"
                    :visible.sync="dialog"
                    custom-class="demo-drawer"
            >
                <div class="demo-drawer__content" style="padding-left: 50px">
                    <el-form :model="form" ref="form" >
                        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" style="width: 300px" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
                            <el-input v-model="form.age" autocomplete="off" style="width: 300px" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="预约次数" prop="num" :label-width="formLabelWidth">
                            <el-input v-model="form.num" autocomplete="off" style="width: 300px" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
                            <el-input v-model="form.sex" autocomplete="off" style="width: 300px" readonly :formatter="isSexFormat"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
                            <el-input v-model="form.phone" autocomplete="off" style="width: 300px" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                            <el-input v-model="form.email" autocomplete="off" style="width: 300px" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
                            <el-input v-model="form.description" autocomplete="off" style="width: 300px" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="图片" prop="pic" :label-width="formLabelWidth">
                            <el-input v-model="form.pic" autocomplete="off" style="width: 300px" readonly></el-input>
                        </el-form-item>

                    </el-form>
                    <div class="demo-drawer__footer" style="padding-left: 20px">
                        <el-button @click="cancelForm">取 消</el-button>
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
                    prop="age"
                    label="年龄"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    align="center"
                    :formatter="isSexFormat">
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
                    <el-button type="primary" circle @click="detailsCoach(scope.row)">详情</el-button>
                    <el-button type="danger" circle @click="toAppointment(scope.row)">预约</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "CoachAppoint",
        data() {
            return {
                tableData: [
                    {
                        id: 1,
                        name: '李思雨',
                        age: 22,
                        sex: 1,
                        phone: '123455',
                        email: '132@qq.com',
                        description: '型男',
                        pic: '图片链接',
                        num: 99,
                        is_delete: 0
                    },
                    {
                        id: 2,
                        name: '郭怀丽',
                        age: 21,
                        sex: 0,
                        phone: '123455',
                        email: '132@qq.com',
                        description: '靓女',
                        pic: '图片链接',
                        num: 99,
                        is_delete: 0,
                    }
                ],
                input: '',
                form: {
                    id: '',
                    name: '',
                    age: '',
                    sex: '',
                    email: '',
                    phone: '',
                    description: '',
                    pic: '',
                    num: '',
                },
                dialog: false,
                formLabelWidth: '80px',
            }
        },
        methods: {
            // 添加性别过滤
            isSexFormat(date){
                if(date.sex == 0){
                    return '女'
                }
                if(date.sex == 1){
                    return '男'
                }
            },
            //查看教练详情
            detailsCoach(data){
                this.dialog = true ;
                this.form =  {
                        id: data.id,
                        name: data.name,
                        age: data.age,
                        sex: data.sex,
                        email: data.email,
                        phone: data.phone,
                        description: data.description,
                        pic: data.pic,
                        num: data.num,
                };
            },
            cancelForm() {
                this.dialog = false;
            },
            //去预约
            toAppointment(data){
                this.$confirm('是否确认预约 '+data.name+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log("去预约");
                    console.log(data);
                }).catch(() => {});
            }
        },
    }
</script>

<style scoped>

</style>