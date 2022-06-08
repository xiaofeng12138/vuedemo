const interfaceUrl = {
    //登录页面
     login:'/seaadmin/auth', //用户登录
     kaptcha: '/seaadmin/kaptcha/new?', //图片验证码
    //展位页面
     updPatrolRecodeByExhibitor:'/expo/ranger/expoIpad/updPatrolRecodeByExhibitor', //巡馆记录表提交
     qryPatrolRecodeByExhibitor:'/expo/ranger/expoIpad/qryPatrolRecodeByExhibitor', //巡馆记录表查询
     deleteImageFile:'/expo/ep/uploadFile/deleteImageFile', //图片删除
     queryImageFiles:'/expo/ep/uploadFile/queryImageFiles', //图片查询
     uploadPhotoFile:'/expo/ep/uploadFile/uploadPhotoFile', //图片上传

    //搜索页面
    queryMaterialsComplex:'/expo/public/materialsExamine/queryMaterialsComplex', // 展品清单请求
    allExhibitorsData:'/expo/public/exhibitors/allExhibitorsData',  //展商清单查询
    qryLimitAndForbidList:'/expo/ranger/expoIpad/qryLimitAndForbidList', //禁限清单查询
    queryMaterialsComplex:'/expo/public/materialsExamine/queryMaterialsComplex', //搜索结果
    getSearchContentByUser:'/expo/ranger/expoIpad/getSearchContentByUser', //搜索接口
    addSearchContentByUser:'/expo/ranger/expoIpad/addSearchContentByUser', //搜索记录
    removeSearchContentById:'/expo/ranger/expoIpad/removeSearchContentById', //删除搜索记录

    //扫码页面
    addExpoSignIn:'/expo/ranger/expoIpad/addExpoSignIn', //扫码功能
    getExpoSignInByUser:'/expo/ranger/expoIpad/getExpoSignInByUser', //扫码记录

    //focus 页面
    getExpoUnnormalStateByUser:'/expo/ranger/expoIpad/getExpoUnnormalStateByUser', //查询异常展位
    qryExhibitorListByBoothNo:'/expo/ranger/expoIpad/qryExhibitorListByBoothNo', //根据展位号查询展位
    addExpoUnnormalState:'/expo/ranger/expoIpad/addExpoUnnormalState', //展位异常提交

    //查验信息
    queryInspectionRecord:'/expo/public/limitList/queryInspectionRecord',

    //根据展管号模糊查询展位号
    qryExpoAreaByHallno:'/expo/ranger/expoIpad/qryExpoAreaByHallno',

    //记录表异常查询
    queryErrorPatrolRecord:'/expo/public/expoIpad/queryErrorPatrolRecord',

    //视频查询功能
    queryVideoByZwh:'/expo/ep/uploadFile/queryVideoByZwh',

    //查询高风险展位
    queryExhibitionNo:'expo/public/limitList/queryExhibitionNo',

    //一件呼叫接口

    unDealList:'expo/call/unDealList',   //待处理呼叫记录
    respCall:'expo/call/respCall', //响应呼叫处理
    myDealList:'expo/call/myDealList',
    submitDealInfo:'expo/call/submitDealInfo', //响应回复详情
    detailInfo:'expo/call/detailInfo',  //响应详情

    //废弃物接口
    qryApplyList:'expo/xgWaste/qryApplyList', //废物未处理
    wasteDeal:'expo/xgWaste/wasteDeal' , //废物处置结果
    qryWasteDealList:'expo/xgWaste/qryWasteDealList',  //我的废物

    //试吃试用
    queryTryOutRecord:'expo/public/expoIpad/queryTryOutRecord',

    //咨询部分接口
    queryunDealList:'expo/consult/unDealList',
    querydetailInfo:'expo/consult/detailInfo', //咨询单条详情
    querysubmitDealInfo:'expo/consult/submitDealInfo' , //咨询单条提交
    querymyDealList:'expo/consult/myDealList',  //咨询解答我已解决
    uploadImage:'expo/ep/uploadFile/uploadImage', //咨询文件上传

    //记录表异常文件上传接口
    addFile:'/expo/customsErpAttachment/addBase64File',  //咨询解答我已解决
   
    queryNoticeByUser:'/expo/expoNotice/queryNoticeByUser', //公告列表查询
    addNoticeRead:'/expo/expoNoticeRead/addNoticeRead', //公告已读接口
    
}

export default interfaceUrl