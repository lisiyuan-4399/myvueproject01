<template>
    <div>
        <el-container>
            <el-header id="elheader">
                <Head></Head>
            </el-header>
            <el-container>
                <el-aside id="elaside">
                    <Aside>
                        <user-slot-aside slot="slotUser" v-show="show==='user'"></user-slot-aside>
                        <coach-slot-aside slot="slotCoach" v-show="show==='coach'"></coach-slot-aside>
                        <admin-slot-aside slot="slotAdmin" v-show="show==='admin'"></admin-slot-aside>
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

            }
        },
        created(){
            this.show = this.$route.params.type ;
            this.$router.push({name:'/middle/'+this.show} );
        }
    }
</script>

<style scoped>
    @import "../assets/css/myapp.css";
    @import "../assets/css/base.css";
</style>