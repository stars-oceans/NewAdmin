import { createStore } from 'vuex';
import createPersistedstate from 'vuex-persistedstate';
export default createStore({
  state: {
    isRouterFrist :false,
    // 控制侧栏是否折叠
    isCollapse : false,
    // 用户信息
    userInfo : {}
  },
  getters: {
  },
  mutations: {
    getRouterFrist(state, value){
      state.isRouterFrist = value
      // console.log('提交后的 statestate.isRouterFrist',state.isRouterFrist);
    },
    setIsColapse(state,value){
      state.isCollapse  = value
    },
    // 用户信息
    getUserInfo(state, value){
      // console.log(value);
      state.userInfo = {
        ...state.userInfo,
         ...value
      }
    },
    clearUserInfo(state, value){
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
      // 持久化
      plugins:[createPersistedstate({
        // 这里就是 放置持久化的地方
        paths : ['isCollapse','userInfo']
      })],
})
