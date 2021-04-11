<template>
    <div>
        <slot name="slotUser"></slot>
        <slot name="slotCoach"></slot>
        <slot name="slotAdmin"></slot>
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