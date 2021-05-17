<template>
    <div>
        <div style="padding-bottom: 20px">
            <span style="padding-left: 20px">用户姓名 : </span>
            <el-input
                    placeholder="请输入内容"
                    v-model="inputUser"
                    style="width: 20%"
                    clearable>
            </el-input>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style="padding-left: 20px">教练姓名 : </span>
            <el-input
                    placeholder="请输入内容"
                    v-model="inputCoach"
                    style="width: 20%"
                    clearable>
            </el-input>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" icon="el-icon-thumb">搜索</el-button>

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
                    prop="nameuser"
                    label="用户姓名"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户账户"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="namecoach"
                    label="教练姓名"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="coachname"
                    label="教练账户"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="begintime"
                    label="开始时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="endtime"
                    label="结束时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="evaluate"
                    label="评价"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="is_valid"
                    label="状态"
                    align="center" :formatter="isValidFormat">

            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Appointment",
        data(){
            return{
                inputUser: '',
                inputCoach: '',
                tableData: [
                    {
                        id: 1,
                        nameuser: '李思雨',
                        username: 'lisi',
                        namecoach: 'lisi',
                        coachname: 'sdsd',
                        begintime: '2020-4-13',
                        endtime: '2020-4-14',
                        evaluate:'评价',
                        is_valid: 1
                    },
                    {
                        id: 2,
                        nameuser: '李思雨',
                        username: 'lisi',
                        namecoach: 'lisi',
                        coachname: 'sdsd',
                        begintime: '',
                        endtime: '',
                        evaluate:'评价',
                        is_valid: 0
                    }
                ],
            }
        },
        methods:{
            isValidFormat(date){
                if(date.is_valid == 0){
                    return '未完成'
                }
                if(date.is_valid == 1){
                    return '已完成'
                }
            }
        }
    }
</script>

<style scoped>

</style>