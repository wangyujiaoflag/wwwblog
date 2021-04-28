import axios from 'axios'
axios.defaults.baseURL = "http://192.168.0.102:6066/zuul"
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router/index'
import storage from '@/util/cookie'
var http=axios.create({
  // baseurl和proxy设置失败，出现 http://localhost:8080/dkhl
  // baseURL: process.env.BASE_API,  // /
  // baseURL: '192.168.0.101:6066',
  timeout: 3000,
//   withCredentials: true,  // 是否允许发送cookie
})

//添加请求拦截器
http.interceptors.request.use(function(config){
  // 请求添加token
  let token = storage.get('TOKEN');
  if(token) {
    config.headers['token'] = token;
  }
  return config
  },function(error){
    return Promise.reject(error)
})
//添加响应拦截器
http.interceptors.response.use(
    // 1 是成功 0是返回错误信息
    function(response) {
        let res = response.data;
        if(res.code == 1) {
            return response.data;
        } 
        else if(res.code == 0) {
            Message({
                message:res.message,
                type:'error', 
            }); 
            return Promise.reject(res);
        } 
    },
    function(error){
        if(error.response.status == 401) {
            router.replace({
                path: 'login',
                query: {redirect: router.currentRoute.fullPath}
            })
        }
        return Promise.reject(error)
    }
);

//get请求
export function get(url,param){
    return new Promise((resolve,reject)=>{
        http({method:'get', url, params:param})
        .then(res=>{  //axios返回的是一个promise对象
            resolve(res)  //resolve在promise执行器内部 
        }).catch(err=>{
            console.log(err);
            Message({
                message:err.message,
                type:'error',
                duration:2*1000 
            });

        })
    })
};

//post请求
export function post(url,param){
  return new Promise((resolve,reject)=>{
      http({ method:'post', url, data:param })
      .then(res=>{
        //   console.log(res,'resolve');
          resolve(res)
      },err=>{
          return Promise.reject(err.message)
      }).catch(err=>{
          // 路由重定向---有问题
        router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
        })
        return Promise.reject(err.message)
      })
  })
}
