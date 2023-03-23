import { createRouter, createWebHashHistory } from 'vue-router'

// 导入组件
import Login from '@/views/Login'
import MainBox from '@/views/MainBox'

// 导入 config.js 里面的 路由规则
import RoutesConfig from '@/router/config'
import NotFound from '@/views/notfount/NotFount'

// 导入 Vuex 的 store 文件
import store from '@/store/index'
const routes = [
  // 路由重定向
  {
    path: '/',
    require: '/login',
    component: Login
  },
  // 404组件
  {
    path : "/:pathMatch(.*)*",
    name : 'Notfound',
    component : NotFound
  },
  // 登录组件
  {
    path: '/login',
    name: 'Login',
    component: Login,

  },
  // 主页功能总组件
  {
    path: '/mainbox',
    name: 'MainBox',
    component: MainBox,
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(process.env.BASE_URL),
  routes
})

// 封装一个方法函数
const configRouter = () => {
  // 遍历 导入 config.js 里面的每一项 路由规则
  RoutesConfig.forEach(function (item) {
    router.addRoute('MainBox', item)
  })
  // 自己想写写
  // for(let i=0; i< RoutesConfig.length; i++){
  //   router.addRoute('MainBox',RoutesConfig[i])
  //   console.log(RoutesConfig[i]);
  // }
}
configRouter()
// 路由前置守卫
router.beforeEach((to, from, next) =>{
  // 查看是否访问的是 login 页面
  if (to.name === 'Login') {
    next()
  } else {
    // 查看是否存有 token
    // 如果授权(已经登录过了) next()
    // 未授权, 重定向到 login
    if (localStorage.getItem('token')) {
      configRouter()
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

store.commit('getRouterFrist', true)



export default router
