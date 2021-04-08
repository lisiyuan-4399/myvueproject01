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
                  用户姓名
                   <el-divider direction="vertical"></el-divider>
                  用户职位
              </span>
                    </div>
                </div>
            </el-header>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Head"
    }
</script>

<style scoped>
    @import "../assets/css/myhead.css";
</style>