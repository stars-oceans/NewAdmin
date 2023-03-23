import { createStore } from 'vuex';
import createPersistedstate from 'vuex-persistedstate';
export default createStore({
  state: {
    isRouterFrist :false,
    // 控制侧栏是否折叠
    isCollapse : false
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
    }
  },
  actions: {
  },
  modules: {
  },
      // 持久化
      plugins:[createPersistedstate({
        paths : ['isCollapse']
      })],
})
