<template>
     <el-container direction="vertical">
     <Header/>
      <el-container>
        <Aside/>
        <el-main>
          <!-- main 区域的路由展示 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script setup>
import Header from '../components/mainbox/Header.vue'
import Aside from '../components/mainbox/Aside.vue'

</script>

<style>

</style>