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
                        <el-menu-item index="/middle/admin/user">
                            <i class="el-icon-menu"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                        <el-menu-item index="/middle/admin/coach">
                            <i class="el-icon-menu"></i>
                            <span slot="title">教练管理</span>
                        </el-menu-item>
                        <el-menu-item index="/middle/admin/equipment">
                            <i class="el-icon-menu"></i>
                            <span slot="title">器材管理</span>
                        </el-menu-item>
                        <el-menu-item index="/middle/admin/appointment">
                            <i class="el-icon-menu"></i>
                            <span slot="title">预约查看</span>
                        </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "AdminSlotAside",
        data() {
            return {
                isDefaultActive: '/middle/admin',
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