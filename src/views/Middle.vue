<template>
    <div>
        <el-container>
            <el-header id="elheader">
                <Head></Head>
            </el-header>
            <el-container>
                <el-aside id="elaside">
                    <Aside>
                        <user-slot-aside slot="slotUser" v-show="userShow"></user-slot-aside>
                        <coach-slot-aside slot="slotCoach" v-show="coachShow"></coach-slot-aside>
                        <admin-slot-aside slot="slotAdmin" v-show="adminShow"></admin-slot-aside>
                    </Aside>
                </el-aside>
                <el-main id="elmain">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Head from './Head'
    import Aside from './Aside'
    import AdminSlotAside from './slot/AdminSlotAside'
    import CoachSlotAside from './slot/CoachSlotAside'
    import UserSlotAside from './slot/UserSlotAside'
    export default {
        name: "Middle",
        components:{
            Head,
            Aside,
            UserSlotAside,
            CoachSlotAside,
            AdminSlotAside,

        },
        data(){
            return{
                userShow: true,
                coachShow: false,
                adminShow: false,
            }
        },
    }
</script>

<style scoped>
    @import "../assets/css/myapp.css";
    @import "../assets/css/base.css";
</style>