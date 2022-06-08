import  Vuex from 'vuex'
import Vue from 'vue'
import Login from './module/login.js'
Vue.use(Vuex)

export default new Vuex.Store({
      state:{  //存放可以共享的数据
        loginUser:'' || localStorage.getItem('user'), //登录用户
        token:'' || localStorage.getItem('token'), //用户是否登录
        exhiList:'' || localStorage.getItem('exhiList') , //展馆号
        BoothNumber:'' || localStorage.getItem('BoothNumber') , //展位号
        companyId:'' || localStorage.getItem('companyId'), //公司id
      },

    mutations:{
      //登录用户名
      saveLoginUser(state,value){
        state.loginUser = value;
        localStorage.setItem('user',value) 
      },

      //删除登录用户
      delLoginUser(state){
        localStorage.removeItem('user') 
        state.loginUser = ''
      },

      saveToken(state,value){
        state.token = value;
        localStorage.setItem('token',value) 
      },


      delToken(state){
       localStorage.removeItem('token')
       state.token = ''
      },

      //展馆号
      exhiList(state,value){
          state.exhiList = value;
          localStorage.setItem('exhiList',value) 
      },
      //展台号
      BoothNumber(state,value){
          state.BoothNumber = value;
          localStorage.setItem('BoothNumber',value) 
      },

      //公司id 记录表需要
       companyId(state,value){
          state.companyId = value;
          localStorage.setItem('companyId',value) 
      },
    },
    modules:{
      Login
    }
})