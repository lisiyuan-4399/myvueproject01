<template>
    <div class="header">
        <el-container class="main">
            <el-header class="mainHeader">
                <div class="header_left">
                    <span class="header_title">项目简介</span>
                </div>
                <div class="header_right">

                    <div class="avatar">
                        <el-avatar :src="require('../assets/image/user.png')" class="el-avatar"></el-avatar>
                    </div>
                    <div>
              <span>
                  {{user.name}}
                   <el-divider direction="vertical"></el-divider>
                  {{user.value === 'user'? '用户':(user.value === 'coach'? '教练':(user.value === 'admin'?'管理员':'-')) }}
              </span>
                    </div>
                </div>
            </el-header>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Head",
        data(){
            return{
                user: {
                    name: this.$store.state.userInfo.name,
                    value: this.$store.state.userInfo.value,
                },
            }
        },
        methods:{

        },
        mounted(){

        },

    }
</script>

<style scoped>
    @import "../assets/css/myhead.css";
</style>