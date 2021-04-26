<template>
    <div>
        <el-row :gutter="20"   >
            <el-col :span="6" v-for="(src,index) in photoList" :key="index">
                <div class="block">
                    <el-image :src="src" ></el-image>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "EquipAppoint",
        data(){
            return{
                photoList:[
                    'http://127.0.0.1:8081/images/1.jpeg',
                    'http://127.0.0.1:8081/images/1.jpeg',
                    ],
            }
        },
        methods:{
            //获取器材的全部图片链接
            getPhotoList(){

            },
        },
        created(){

        }
    }
</script>

<style scoped>
</style>