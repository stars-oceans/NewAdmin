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
        <el-avatar :src="avatarUrl ? avatarUrl :`https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`" :size="80" />
        <h3>{{ store.state.userInfo.username }}</h3>
        <h3>{{ store.state.userInfo.role === 0 ? '编辑' : '管理员' }}</h3>
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

        <!-- 表单 -->
        <el-form ref="userRef" :model="userForm" :rules="rules" label-width="120px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" />
          </el-form-item>

          <!-- 下拉列表 -->
          <el-form-item label="性别" prop="gender">
            <el-select style="width:100%;" v-model="userForm.gender" placeholder="请选中性别">
              <el-option v-for="item in option" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>

          <!-- 文本域 -->
          <el-form-item label="文本" prop="introduction">
            <el-input v-model="userForm.introduction" rows="2" type="textarea" />
          </el-form-item>
          <!-- 上传头像 -->
          <el-form-item label="头像" prop="avatar">
            <!-- Upload -->
            <Upload :avatar="userForm.avatar" @fileChange='shangchuan' />
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">
              更新
            </el-button>
          </el-form-item>
        </el-form>

      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
// 导入 axios 
import axios from 'axios'
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import upload from '@/util/upload'
// 导入上传组件
import Upload from '@/components/upload/Upload.vue'

let store = useStore()
let { username, gender, introduction, avatar, role } = store.state.userInfo

// 显示默认头像或者显示 上传头像的计算属性
let avatarUrl = computed(() => {
  if (store.state.userInfo.avatar) {
    return 'http://localhost:3000' + store.state.userInfo.avatar
  } else {
    false
  }
})

// 表单
const userRef = ref();
const userForm = reactive({
  username: username,
  introduction: introduction,
  gender: gender,
  avatar: avatar,
  // 头像地址
  file: null
})
let option = [
  { label: '保密', value: 0 },
  { label: '男', value: 1 },
  { label: '女', value: 2 },
]
const rules = reactive({
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 2, max: 8, message: '请输入2 到 8 个字符', trigger: 'blur' },
  ],
  gender: [
    {
      required: true,
      message: '请选中你的性别',
      trigger: 'change',
    },
  ],
  introduction: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 2, max: 200, message: '请输入3 到 200 个字符', trigger: 'blur' },
  ],

  avatar: [
    {
      required: true,
      message: '情上传头像',
      trigger: 'change',
    },
  ],
})
// 上传头像：
// const imageUrl = ref('http://localhost:3000')
// 上传头像的回调
let shangchuan = function (file) {
  // 把file 的对象转换为 URL 地址
  userForm.avatar = URL.createObjectURL(file.raw)
  // 头像的 file 源对象
  userForm.file = file.raw
}

// 确定按钮 
let submitForm = function () {
  userRef.value.validate(async (valid) => {
    if (valid) {
      // upload 方法 在自己封装的 upload.js里面
      let data = await upload('/adminapi/user/upload', userForm)
      if (data.data.ok === 1) {
        // 提交给 vuex
        store.commit('getUserInfo', data.data.data)
        // 提示框
        ElMessage({
          showClose: true,
          message: '更新成功',
          type: 'success',
          duration: 1000
        })
      }
    }
  })
}

</script>

<style lang="less" scoped>
.el-row {
  margin-top: 20px;
}
/*  left 区  */
.userMsg {
  text-align: center;

  h3 {
    margin-top: 10px;
  }
}
// 头像
::v-deep .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar {
  width: 178px;
  height: 178px;
}
</style>>

