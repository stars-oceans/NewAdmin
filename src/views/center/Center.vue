<template>
  <!-- hreader -->
  <el-page-header :icon="null" title="企业后台管理系统">
    <template #content>
      <span class="text-large font-600 mr-3"> 个人中心 </span>
    </template>
  </el-page-header>
  <!-- mian 要展示区域, 将分为两个区 -->
  <el-row :gutter="20">
    <!-- left 区 -->
    <el-col :span="8">
      <el-card class="box-card userMsg">
        <el-avatar :src="avatarUrl ? avatarUrl:`https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`" :size="80"/>
        <h3>{{ store.state.userInfo.username }}</h3>
        <h3>{{ store.state.userInfo.role === 0 ? '普通用户' : '管理员' }}</h3>
      </el-card>
    </el-col>

    <!-- rigth 区 -->
    <el-col :span="16">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <h3>个人信息</h3>
          </div>
        </template>
        11111111111
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
let store = useStore()

let avatarUrl = computed(()=>{
  return store.state.userInfo.avatar
})

</script>

<style lang="less" scoped>
  .el-row{
    margin-top: 20px;
    
  }
    /*  left 区  */
  .userMsg{
    text-align: center;
    
    h3{
      margin-top : 10px;
    }
   
  }
</style>>

