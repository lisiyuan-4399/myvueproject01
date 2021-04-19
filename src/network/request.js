import axios from 'axios'

export function request(config) {

        const instance = axios.create({
            baseURL: 'http://localhost:8081/',
            timeout: 5000
        });

        //发送真正的网络请求
        return instance(config) ;

}
