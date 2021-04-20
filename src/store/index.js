import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex);

//2.创建对象
const store = new Vuex.Store({
    state: {
        //常量
        userInfo: {
            name: '',
            value: '',
        }
    },
    mutations: {
        //方法
        //传参
        setUserInfo(state,user) {
            state.userInfo.name = user.name;
            state.userInfo.value = user.value ;
        }
    },
    actions: {

    },
    getters: {

    },
    modules: {

    }
});

//3.导出 store 独享
export default store