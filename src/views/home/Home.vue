<template>
  <h1>Home</h1>
  <h2>{{ xianshi }}</h2>
    <el-button type="primary" @click="luoli">获取</el-button>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import {useStore} from 'vuex'

const store = useStore()
let  xianshi = ref('aa')
let luoli = function(){
    axios.get('/adminapi/user/home').then(function(req,res){
          console.log(req.data);
          xianshi.value = req.data
          console.log(store.state.userInfo);
    },
    function(error){
      console.log(error.message);
    })
}
  
</script>

<style>

</style>