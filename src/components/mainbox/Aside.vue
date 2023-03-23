<template>
  <el-aside :width="$store.state.isCollapse? '69px':'250px'"  >
    <el-menu 
     :router="true"
     :collapse-transition = "false"
      :collapse = "$store.state.isCollapse"
      :default-active = "route.fullPath"
      active-text-color = "#409eff"
      background-color = "#1e1e1e"
      text-color = "#fff"
      >
      <!-- 普通的侧边栏 -->
      <el-menu-item index="/home">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <!-- 个人中心 -->
      <el-menu-item index="/center">
        <el-icon>
          <Avatar />
        </el-icon>
        <span>个人中心</span>
      </el-menu-item>

      <!-- 折叠侧边栏 -->
      <!-- 用户管理 -->
      <el-sub-menu index="/uers-manage">
        <template #title>
          <el-icon>
            <UserFilled />
          </el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/useradd">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
      </el-sub-menu>
      <!-- 新闻管理 -->
      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon>
            <Management />
          </el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item index="/news-manage/newsadd">创建新闻</el-menu-item>
        <el-menu-item index="/news-manage/newslist">用户新闻</el-menu-item>
      </el-sub-menu>
      <!-- 产品管理 -->
      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon>
            <Briefcase />
          </el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/product-manage/productadd">添加产品</el-menu-item>
        <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>
      </el-sub-menu>

    </el-menu>
  </el-aside>
</template>

<script setup>
// 导入 icon 组件
import { HomeFilled, Avatar, UserFilled, Management, Briefcase } from '@element-plus/icons-vue'

// 导入 vuex
import store from '../../store'

import { useRoute } from "vue-router"
const route = useRoute()
</script>

<style  scoped>

  .el-aside{
    height: 100%;
    user-select : none;
  }
    .el-menu {
        height: 90.5vh;
    }
    .el-menu-item:hover{
        background-color: #0d7ae7;
    }

.el-menu--collapse{
  width: 70px
}
</style>