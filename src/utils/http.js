import axios from 'axios'
import {store} from '../redux/store'
// axios.defaults.baseURL="http://localhost:8080/"
// axios拦截器
// 在请求前拦截
axios.interceptors.request.use(function(config){
    // 显示loading
    store.dispatch({
        type:"change_loading",
        payload:true
    })
    return config;
},function(error){
    return Promise.reject(error)
})

axios.interceptors.response.use(function(response){
    // 隐藏loading
    store.dispatch({
        type:"change_loading",
        payload:false
    })
    return response;
},function(error){
    return Promise.reject(error)
})