
const state ={
    token:'',
    userName:''
}

const getters = {
    token:state => state.token , //用户名
    userName:state => state.userName, //用户token
}
const mutations ={
    SET_TOKEN(state,value){
        state.token = value
  },
    SET_USERNAME(state,value){
      state.userName = value
    },
}

export default {
  namespaced:true,  
  state,
  getters,
  mutations,
};