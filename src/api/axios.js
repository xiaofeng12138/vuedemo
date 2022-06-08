import axios from 'axios'
import baseURL from '@/util/env.js'
import store from '@/store/store'
console.log(process.env.BASE_URL)
const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 50000, //请求超时
  headers: {'Content-Type': 'application/json;charset=UTF-8'}
})

//添加请求拦截
service.interceptors.request.use(function(config){
   let token = localStorage.getItem('token');
   if(token){
     config.headers['Authorization'] = token
   }
   return config
}),function(error){
  return Promise.reject(error)
}

//添加响应拦截
service.interceptors.response.use(
  function(response) {
    // 请求正常则返回,这里返回了所有的请求头和请求体信息
    //return Promise.resolve(response)
    if(response.data.code =='700'){
      store.commit("Login/SET_TOKEN", ''); //清空token
      store.commit("Login/SET_USERNAME", ''); //清空用户名
    }else{
      return response.data
    }
  },
  //响应错误该做的事情
  function(error) {
    return Promise.reject(error)
  }
)

export default service
