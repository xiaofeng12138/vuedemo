import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index/index.vue'
import Tabbar from '../components/tabbar/tabbar.vue'
import Floorplan from '../components/floorplan/floorplan.vue'
import Search from '../components/search/search.vue'
import Qrcode from '../components/qrcode/qrcode.vue'
import QrcodeHistory from '../components/qrcode/qrcodeHistory.vue'
import Focus from '../components/focus/focus.vue'
import Login from '../components/login/login.vue'
import SearchDetail from '../components/search/searchdetails.vue'
import Result from '../components/search/result.vue'
import First from '../components/floorplan/first.vue'
import Second from '../components/floorplan/second.vue'
import Zwxq from '../components/floorplan/zwxq.vue'
import Zwjs from '../components/floorplan/floorplandetail.vue'
import Zwxx from '../components/floorplan/zwxx.vue'
import Xgjl from '../components/floorplan/xgjl.vue'
import Xgjlb from '../components/floorplan/xgjlb.vue'
import Islogin from '../components/login/islogin.vue'
import Upload from '../components/upload/upload.vue'
import Imglist from '../components/upload/imgList.vue'
import FocusResult from '../components/focus/focusresult.vue'
import Test from '../components/test/test.vue'
import Video from '../components/upload/videoUpload.vue'
import North from '../components/floorplan/north.vue'
import Response from '../components/response/response.vue'
import My from '../components/my/my.vue'
import Submitres from '../components/my/mysubmit.vue'
import Showdetail from '../components/my/myresdetail.vue'
import Answerdetail from '../components/my/myAnsdetail.vue';
import ConsultDetail from '../components/response/consultDetail.vue'
import AcceptDetail from '../components/response/acceptdetail.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name:'index',
      component: Index
    },
    {
      path:'/tab',
      component:Tabbar
    },
    {
       path:'/floorplan',
       name:"floorplan",
       redirect:{
         name:'first'
       },
       component:Floorplan,
       children:[
          {
          path:'first',
          name:'first',
          component:First
         },
           {
          path:'second',
          name:'second',
          component:Second
         },
      ]
    },
    {
       path:'/north',
       name:'north',
       component:North
    },
    {
      path:'/zwxq',
      name:'zwxq',
      component:Zwxq
   },
     {
       path:'/zwjs',
        redirect:{
         name:'zwxx'
       },
       component:Zwjs,
       children:[
            {
             path:'zwxx',
             name:'zwxx',
             component:Zwxx
            },
          {
             path:'xgjl',
             name:'xgjl',
             component:Xgjl
          }
       ]
     },
    {
       path:'/xgjlb',
       name:"xgjlb",
      component:Xgjlb,
    },
    {
      path:'/search',
      name:"search",
      component:Search,
    },
     {
       path:'/searchdetail',
       name:"searchdetail",
       component:SearchDetail,
    },
    {
       path:'/searchresult',
       name:"searchresult",
       component:Result,
    }, 
    {
       path:'/upload',
       name:"upload",
       component:Upload,
    },
    {
       path:'/video',
       name:"video",
       component:Video,
    },
    {
      exact:true,
      path:'/upload/imgList',
      name:"imgList",
      component:Imglist,
    },
    {
       path:'/qrcode',
       name:"qrcode",
      component:Qrcode
    },
    {
      path:'/qrcodeHistory',
      name:"qrcodeHistory",
     component:QrcodeHistory
   },
    {
       path:'/focus',
       name:"focus",
       component:Focus
    },
     {
       path:'/focusresult',
       name:"focusresult",
       component:FocusResult
    },
    {
       path:'/login',
       name:"login",
       component:Login
    },
     {
       path:'/islogin',
       name:"islogin",
       component:Islogin
    },
    {
       path:'/test',
       name:"test",
       component:Test
    },
    {
      path:'/response',
      name:"response",
      component:Response
    },
    {
      path:'/my',
      name:"my",
      component:My
    },
    {
      path:'/submitres',
      name:"submitres",
      component:Submitres
    },
    {
      path:'/showdetail',
      name:"showdetail",
      component:Showdetail
    },
    {
      path:'/answerdetail',
      name:"answerdetail",
      component:Answerdetail
    },
    {
      path:'/consultDetail',
      name:"consultDetail",
      component:ConsultDetail
    },{
      path:'/acceptdetail',
      name:"acceptdetail",
      component:AcceptDetail
    }
  ]
})
