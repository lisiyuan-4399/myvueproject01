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
                        <el-form-item label="图片" prop="pic" :label-width="formLabelWidth">
                            <el-input v-model="form.pic" autocomplete="off" style="width: 300px"></el-input>
                        </el-form-item>
                        <el-form-item label="使用时间" prop="begin_time" :label-width="formLabelWidth">
                            <el-input v-model="form.begin_time" autocomplete="off" style="width: 300px"></el-input>
                        </el-form-item>

                    </el-form>
                    <div class="demo-drawer__footer" style="padding-left: 20px">
                        <el-button @click="cancelForm">取 消</el-button>
                        <el-button v-show="title == '新增器材'" type="primary" @click="addEquipment('form')" >确 定(添加)</el-button>
                        <el-button v-show="title == '修改器材'" type="primary" @click="updateEquipment('form')" >确 定(修改)</el-button>
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
            <el-table-column
                    prop="pic"
                    label="描述"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="is_delete"
                    label="状态"
                    align="center"
                    :formatter="isDeleteFormat">
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
    export default {
        name: "Equipment",
        data() {
            return {
                tableData: [
                    {
                        id: 1,
                        name: '器材1',
                        description: '型男',
                        pic: '图片链接',
                        is_delete: 0
                    },
                    {
                        id: 2,
                        name: '器材2',
                        description: '靓女',
                        pic: '图片链接',
                        is_delete: 0,
                    }
                ],
                input: '',
                title: '',
                form: {
                    id: '',
                    name: '',
                    description: '',
                    pic: '',
                },
                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                rules: {
                    name:[
                        {required: true, message: '姓名不可为空', trigger: 'blur'}
                    ],
                },
                dialog: false,
                formLabelWidth: '80px',
            }
        },
        methods: {
            //添加器材
            addEquipment(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("添加器材");

                        this.dialog = false;
                        console.log(this.form);
                    }
                });

            },
            cancelForm() {
                this.dialog = false;
            },

            isDeleteFormat(date){
                if(date.is_delete == 0){
                    return '-'
                }
                if(date.is_delete == 1){
                    return '已删除'
                }
            },
            //去添加
            toAddEquipment(){
                this.title = '新增器材';
                this.dialog = true;
            },
            // 去修改
            toUpdateForm(data){
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
                    is_delete: data.is_delete,

                } ;
            },
            //修改用户
            updateEquipment(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("修改器材");

                        this.dialog = false;
                        console.log(this.form);
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
                }).catch(() => {});
            },
        },
    }
</script>

<style scoped>

</style>