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
                <slot name="slotUser"></slot>
                <slot name="slotCoach"></slot>
                <slot name="slotAdmin"></slot>
            </el-menu>
        </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Aside",
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