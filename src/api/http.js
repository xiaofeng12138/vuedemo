import request from './axios'
//封装axios
export function publicInter(url ,params){
   return request({
       url: url,
       method:'post',
       data:JSON.stringify(params),
       headers:{
           'Content-type':'application/json;charset=UTF-8'
       }
   })
}