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
                        <el-menu-item index="/middle/coach/toview">
                            <i class="el-icon-menu"></i>
                            <span slot="title">我的预约</span>
                        </el-menu-item>
                        <!--<el-menu-item index="/middle/coach/coachmyappointment">-->
                            <!--<i class="el-icon-menu"></i>-->
                            <!--<span slot="title">我的预约</span>-->
                        <!--</el-menu-item>-->
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "CoachSlotAside",
        data() {
            return {
                isDefaultActive: '/middle/coach',
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