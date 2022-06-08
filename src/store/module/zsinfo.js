
const state ={
    exhiList:'',  //展馆号
    BoothNumber:'',//展台号
    companyId:'', //公司id
}

const getters = {
    exhiList:state => state.exhiList , //展馆号
    BoothNumber:state => state.BoothNumber, //展台号
    companyId:state => state.companyId, //公司id
}
const mutations ={
    SET_EXHILIST(state,value){
        state.exhiList = value
  },
    SET_BOOTHNUMBER(state,value){
      state.BoothNumber = value
    },
    
    SET_COMPANYID(state,value){
      state.companyId = value
    },
}

export default {
  namespaced:true,  
  state,
  getters,
  mutations,
};