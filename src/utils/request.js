import axios from 'axios'
// 统一配置
const instance = axios.create({
    baseURL: 'http://localhost:5000',
    responseType: 'json',
    ValidityState(status) {
        // 200外的状态码都认定为失败
        return status === 200
    }
})