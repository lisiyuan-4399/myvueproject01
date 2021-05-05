<template>
    <div>
        <el-row :gutter="20"   >
            <el-col :span="6" v-for="(src,index) in photoList" :key="index">
                <div class="block">
                    <el-image style="width: 300px; height: 300px;"
                            :src="'http://127.0.0.1:8081'+src.pic" ></el-image>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "EquipAppoint",
        data(){
            return{
                url: 'http://127.0.0.1:8081',
                photoList:[],
            }
        },
        methods:{
            //获取器材的全部图片链接
            getPhotoList(){
                request({
                    url:'/equipment/getEquipmentPic',
                    method:'post',
                    headers:{
                        "token": localStorage.getItem("token") ,
                    },
                    data:{

                    }
                }).then(res => {
                    console.log(res);
                    if(res.data.code==='0'){
                        this.photoList = res.data.data ;
                    }
                }).catch(err => {
                    console.log(err) ;
                })
            },
        },
        created(){
            this.getPhotoList() ;
        }
    }
</script>

<style scoped>
</style>