<template>
  <el-header>
    <el-menu text-color="#fff" background-color="#1e1e1e" class="el-menu-demo" mode="horizontal" :ellipsis="false">
      <el-menu-item index="0">LOGO</el-menu-item>
      <el-menu-item index="0-1">
        <el-switch v-model="value" @click="isChange" />
      </el-menu-item>

      <div class="flex-grow" />
      <el-menu-item index="1">档案</el-menu-item>
      <!-- <el-menu-item> -->
        <el-dropdown>
          <em>欢迎 admin 登录</em>
            <el-icon  size="26">
              <Avatar color="white" />
            </el-icon>
          <template #dropdown>
          
            <el-dropdown-menu>
              <el-dropdown-item @click="logCenter">个人中心</el-dropdown-item>
              <el-dropdown-item   @click="logOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      <!-- </el-menu-item> -->
    </el-menu>
  </el-header>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue'
import store from '../../store'
import { Avatar } from '@element-plus/icons-vue'
// 导入 router 模块
import { useRouter } from 'vue-router'
let router = useRouter()

// 折叠按钮
let value = ref(!store.state.isCollapse)
let value1 = ref(store.state.isCollapse)
let isChange = function () {
  value1.value = !value1.value
  store.commit('setIsColapse', value1.value)
}

// 退出
let logOut = function () {
    router.push('/login')
    localStorage.removeItem('token')
}
// 跳转到 center 页面
let logCenter = function(){
   router.push('/center')
}
</script>

<style lang="scss" scoped>
.el-header {
  width: 100vw;
  height: 80px;
}
.flex-grow {
  flex-grow: 1;
}

.el-header {
  padding: 0 0 !important;
  user-select: none;
}
::v-deep .el-menu {
  //   height: 20vh;
  height: 80px;
}
.el-menu--horizontal {
  border: none;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.el-dropdown{

  margin: auto 50px;
}
</style>>
