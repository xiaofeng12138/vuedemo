import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Tabbar from './components/tabbar/tabbar.vue'
//导入axios
import Axios from 'axios'
Vue.prototype.$Axios = Axios;
import VueLazyload from 'vue-lazyload'
import '../static/font/iconfont.css'
//导入store
import store from './store/store'
import './router/premit'  //引入导航守卫

Vue.use(VueLazyload)
//全部配置请求地址
// Axios.default.baseURL = 'https://180.167.173.154'
Vue.config.productionTip = false
Vue.component('fdnav',Tabbar)
//全局挂载elementUI
Vue.use(ElementUI)

//导入jquery
import $ from 'jquery'
Vue.prototype.$jq = $;

//导入vue-picture-preview

import picPreview from 'vue-picture-preview'
Vue.use(picPreview)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})







