import Center from '@/views/center/Center'
import Home from '@/views/home/Home'
// 导入用户信息组件
import UserAdd from '@/views/user-manage/UserAdd'
import UserList from '@/views/user-manage/UserList'
// 导入新闻信息组件
import NewsAdd from '@/views/news-manage/NewsAdd'
import NewsList from '@/views/news-manage/NewsList'
 // 导入产品信息的组件
import ProductAdd from '@/views/product-manage/ProductAdd'
import ProductList from '@/views/product-manage/ProductList'

const routes = [
  // 主页路由
  {
    path : '/home',
    name : 'Home',
    component : Home
  },
  {
    path : '/center',
    name : 'Center',
    component : Center
  },
  // 用户信息的路由配置
  {
    path : '/user-manage/useradd',
    name : 'UserAdd',
    component : UserAdd
  },
  {
    path : '/user-manage/userlist',
    name : 'UserList',
    component : UserList
  },
  // 新闻信息的路由配置
  {
    path : '/news-manage/newsadd',
    name : 'NewsAdd',
    component : NewsAdd
  },
  {
    path : '/news-manage/newslist',
    name : 'NewsList',
    component : NewsList
  },
  // 产品信息的路由配置
  {
    path : '/product-manage/productadd',
    name : 'ProductAdd',
    component : ProductAdd
  },
  {
    path : '/product-manage/productlist',
    name : 'ProductList',
    component : ProductList
  },
 
]

export default routes