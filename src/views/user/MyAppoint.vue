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
                    label="教练名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    align="center"
                    :formatter="isSexFormat">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="beginTime"
                    label="开始时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="endTime"
                    label="结束时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="evaluate"
                    label="评价"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="isValid"
                    label="状态"
                    align="center" :formatter="isValidFormat">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button v-show="scope.row.isValid == 1" type="primary" circle>评价</el-button>
                    <el-button v-show="scope.row.isValid == 0" type="danger" circle>取消</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "MyAppoint",
        data(){
            return{
                tableData: [],
                input: '',
            }
        },
        methods:{
            // 添加性别过滤
            isSexFormat(date){
                if(date.sex == 0){
                    return '女'
                }
                if(date.sex == 1){
                    return '男'
                }
            },
            isValidFormat(date){
                if(date.isValid == 0){
                    return '已预约'
                }
                if(date.isValid == 1){
                    return '已完成'
                }
            },
            //获取我的预约
            getAppointAll(){
                request({
                    url:'/appoint/getAppointAll',
                    method:'post',
                    headers:{
                        "token": localStorage.getItem("token") ,
                    },
                    params:{
                        "userId": JSON.parse(localStorage.getItem("userInfo")).id,
                    },
                }).then(res => {
                    console.log(res);
                    if(res.data.code==='0'){
                        this.tableData = res.data.data ;
                    }
                }).catch(err => {
                    console.log(err) ;
                })
            },
        },
        created(){
            this.getAppointAll() ;
        }
    }
</script>

<style scoped>

</style>