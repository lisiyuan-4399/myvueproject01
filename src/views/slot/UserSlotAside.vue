<template>
    <div>
        <el-menu-item index="/middle/user/equipappoint">
            <i class="el-icon-menu"></i>
            <span slot="title">器材预约</span>
        </el-menu-item>
        <el-menu-item index="/middle/user/coachappoint">
            <i class="el-icon-menu"></i>
            <span slot="title">教练预约</span>
        </el-menu-item>
        <el-menu-item index="/middle/user/suggest">
            <i class="el-icon-menu"></i>
            <span slot="title">提出建议</span>
        </el-menu-item>
    </div>
</template>

<script>
    export default {
        name: "UserSlotAside"
    }
</script>

<style scoped>

</style>