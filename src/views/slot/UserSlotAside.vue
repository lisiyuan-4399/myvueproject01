<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-menu
                        :default-active="isDefaultActive"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        router>
                        <el-menu-item index="/middle/user/equipappoint">
                            <i class="el-icon-menu"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                        <el-menu-item index="/middle/user/coachappoint">
                            <i class="el-icon-menu"></i>
                            <span slot="title">教练预约</span>
                        </el-menu-item>
                        <el-menu-item index="/middle/user/myappoint">
                            <i class="el-icon-menu"></i>
                            <span slot="title">我的预约</span>
                        </el-menu-item>
                        <el-menu-item index="/middle/user/suggest">
                            <i class="el-icon-menu"></i>
                            <span slot="title">提出建议</span>
                        </el-menu-item>
                        <el-menu-item index="/middle/user/personaldetails">
                            <i class="el-icon-menu"></i>
                            <span slot="title">个人中心</span>
                        </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "UserSlotAside",
        data() {
            return {
                isDefaultActive: '/middle/user',
            }
        },
        methods: {

        },
        watch:{
            $route(to){
                this.isDefaultActive = to.path ;
            }
        },
        created(){
            this.isDefaultActive = this.$route.path;
        }
    }
</script>

<style scoped>

</style>