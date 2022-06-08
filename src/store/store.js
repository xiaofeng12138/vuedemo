import  Vuex from 'vuex'
import Vue from 'vue'
import Login from './module/login.js'
import Zsinfo from './module/zsinfo'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
      Login,
      Zsinfo
    }
})