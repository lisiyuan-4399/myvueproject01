<template>
    <div>
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
    </div>

</template>

<script>
    export default {
        name: "AdminSlotAside"
    }
</script>

<style scoped>

</style>