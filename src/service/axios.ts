import axios from 'axios';
import { Toast } from 'vant';
import { urlList } from './baseUrl';
enum methodType {
  post = 'post',
  get = 'get',
  delete = 'delete',
  put = 'put'
}
interface req {
  url: string,
  method: methodType,
  params: any,
  paramsType: 0 | 1,  // 参数传递类型：0：body传参，1：参数拼接到url,
  needLogin: boolean,
  loading: boolean, // 是否需要加载中样式
}

const mode = import.meta.env.MODE || 'dev';

const config = {
    baseURL: urlList[mode],
    timeout: 8000,
}
// 创建axios实例
const service = axios.create(config);

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log('response', response)
    if (!response.data.status) return Toast(response.data.message);
    return response.data.data
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

const request = (req: req) => {
  if (req.needLogin) {
    // 查询登录状态
  }

}
function get (req: req) {
  service({
    url: req.url,
  })
}
export default request