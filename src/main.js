import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'; // 导入element-ui包
import 'element-ui/lib/theme-chalk/index.css'; // 导入相关样式
import axios from 'axios';

Vue.use(ElementUI); // 引用
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
    router
}).$mount('#app')
