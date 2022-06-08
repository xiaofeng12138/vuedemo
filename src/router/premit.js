import router from "./index";
import { Message } from 'element-ui';
import  store  from '../store/store'

const whiteRouter = ['/login']
router.beforeEach((to,form,next)=>{
    if(store.getters['Login/token']){
       if(to.path == '/login'){
            localStorage.setItem("username", '');
            localStorage.setItem("token", '');
            store.commit("Login/SET_TOKEN", ''); //存储用户token到vuex
            store.commit("Login/SET_USERNAME", ''); //存储用户名到Vuex
            next()
        }else{
          next()
        }
    }else{
       if(whiteRouter.indexOf(to.path) !== -1){    //存在
            next()   //to 跳转对应的路由
        }else{
            next('/login')   //路由指向 不存在直接返回登录页
            Message.error('请先登录')
        }
    }
})