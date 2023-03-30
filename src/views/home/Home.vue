<template>
  <!-- hreader -->
  <el-page-header :icon="null" title="企业后台管理系统">
    <template #content>
      <span class="text-large font-600 mr-3"> 首页 </span>
    </template>
  </el-page-header>
  <!-- 卡片 -->
  <el-card class="box-card">
    <el-row>
      <el-col :span="4">
        <el-avatar :src="avatarUrl ? avatarUrl:`https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`" :size="80" />
      </el-col>

      <el-col :span="20" style=" line-height: 80px; font-weight: 600;">
        欢迎回来,{{ store.state.userInfo.username }},{{ welcomeText }}
      </el-col>
    </el-row>
  </el-card>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>公司产品</span>
      </div>
    </template>
    <!-- 轮播 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </el-card>

</template>

<script setup>
import axios from 'axios'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
// hreder：
import { ArrowLeft } from '@element-plus/icons-vue'
// 默认头像
import { UserFilled } from '@element-plus/icons-vue'
const store = useStore()

let avatarUrl = computed(() => {
  if (store.state.userInfo.avatar) {
    return 'http://localhost:3000' + store.state.userInfo.avatar
  } else {
    false
  }
})
let welcomeText = computed(() => {
  let time = new Date()
  let h = time.getHours()
  return h < 12 ? '新的一天要开心!' : '你可能有点累了适当喝杯咖啡休息一下!'
})


</script>

<style scoped>
/* 卡片 */
.box-card{
  margin:50px auto;
}


.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>