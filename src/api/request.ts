/**
 * 封装axios
 */
import axios from 'axios';
import { message } from 'antd';
import { mockurl } from '@/utils/commonurl';

// 定义常见的错误信息
const TOKEN_ERROR = 'Token认证失败，请重新登录';
const NETWORK_ERROR = '网络异常，请检查网络后重试';

// BASEURL 定义可以同时请求多个端口号
const BASEURL = 'http://localhost:3000';

// 创建axios实例对象，添加全局配置
const service = axios.create({
  baseURL: BASEURL,
  timeout: 8000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截
service.interceptors.request.use((config: any) => {
  // 在请求发送前进行验证

  const { headers } = config;

  encodeURIComponent(config.params);
  // 添加token之类的东西
  const token = localStorage.getItem('token');

  if (token) {
    headers!.common.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 响应拦截
service.interceptors.response.use((config) => {
  const { status, data } = config;
  const mockurl1 = '/mock';
  if (status === 200) {
    if (mockurl.match(mockurl1) !== null) {
      return data;
    }
    return { data };
  } else if (status === 1005) {
    // 和后台约定的，Token过期，code是1005
    message.error(TOKEN_ERROR);
    return Promise.reject(TOKEN_ERROR);
  } else {
    message.error(NETWORK_ERROR);
    return Promise.reject(NETWORK_ERROR);
  }
});

// 请求核心函数，options 请求配置
function request(options) {
  // eslint-disable-next-line no-param-reassign
  options.method = options.method || 'get'; // 如果是get请求的话，则将data中的数据转移到params中
  if (options.method.toLowerCase() === 'get') {
    // eslint-disable-next-line no-param-reassign
    options.params = options.data;
  }

  if (process.env.NODE_ENV === 'production') {
    // 在正式环境中，不管有没有开启moke开关，都使用正式环境base_url，以防万一
    service.defaults.baseURL = process.env.BASEURL;
  } else {
    // VUE_APP_MOCK为1，代表开启moke模式
    service.defaults.baseURL =
      process.env.VUE_APP_MOCK === '1'
        ? process.env.VUE_APP_MOCK_API
        : process.env.VUE_APP_BASE_API;
  }

  return service(options);
}
/**
 * 可以通过 request.get() 方式调用
 */
['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({
      method: item,
      url,
      data,
      ...options,
    });
  };
});

// export default request;
export default service;
