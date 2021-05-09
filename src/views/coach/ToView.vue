<template>
    <div>
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
                    <el-button v-show="scope.row.isValid == 1" type="info" circle >已完成</el-button>
                    <el-button v-show="scope.row.isValid == 0" type="primary" circle @click="completeAppoit(scope.row)">完成</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "ToView",
        data(){
            return{
                tableData: [],

            }
        },
        methods:{
            //获取我的预约
            getAppointAll(){
                request({
                    url:'/appoint/getCoachAppointAll',
                    method:'post',
                    headers:{
                        "token": localStorage.getItem("token") ,
                    },
                    params:{
                        "coachId": JSON.parse(localStorage.getItem("userInfo")).id,
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
            //取消预约
            completeAppoit(data){
                this.$confirm('是否完成预约 '+data.name+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log("取消预约");
                    console.log(data);
                    const title = '';
                    request({
                        url:'/appoint/completeAppoit',
                        method:'post',
                        headers:{
                            "token": localStorage.getItem("token") ,
                        },
                        params:{
                            "id": data.id,
                        },
                    }).then(res => {

                        if(res.data.code==='0'){
                            this.$back(title,res.data.msg,'success');
                            this.getAppointAll() ;
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
            this.getAppointAll() ;
        },
    }
</script>

<style scoped>

</style>