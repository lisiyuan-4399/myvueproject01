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
                    label="用户名称"
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
                    prop="begin_time"
                    label="开始时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="end_time"
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
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button v-show="scope.row.is_valid == 0" type="primary" circle>完成</el-button>
                    <span v-show="scope.row.is_valid == 1" readonly circle>已完成</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "CoachMyAppoint",
        data(){
            return{
                tableData: [
                    {
                        id: 1,
                        name: '李思雨',
                        age: 22,
                        sex: 1,
                        phone: '15238',
                        begin_time: '2016-05-04',
                        end_time: '',
                        evaluate: '-',
                        is_valid: 0,
                    },
                    {
                        id: 2,
                        name: '郭怀丽',
                        age: 21,
                        sex: 0,
                        phone: '15890',
                        begin_time: '2016-05-04',
                        end_time: '2016-05-04',
                        evaluate: '-',
                        is_valid: 1,
                    }
                ],
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
                if(date.is_valid == 0){
                    return '已预约'
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