<template>
  <!-- hreader -->
  <el-page-header :icon="null" title="用户管理">
    <template #content>
      <span class="text-large font-600 mr-3"> 添加用户 </span>
    </template>
  </el-page-header>

  
  <el-row :gutter="20">
    <!-- left 区 -->
    <el-col :span="20">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <h3>添加信息</h3>
          </div>
        </template>

        <!-- 表单 -->
        <el-form ref="userRef" :model="userForm" :rules="rules" label-width="120px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" />
          </el-form-item>

          <el-form-item label="密 &nbsp; 码" prop="password">
            <el-input v-model="userForm.password" />
          </el-form-item>

          <!-- 下拉列表 -->
          <el-form-item label="角 &nbsp; 色" prop="role">
            <el-select style="width:100%;" v-model="userForm.role" placeholder="请选角色">
              <el-option v-for="item in option" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>


          <!-- 文本域 -->
          <el-form-item label="文 &nbsp; 本" prop="introduction">
            <el-input v-model="userForm.introduction" rows="2" type="textarea" />
          </el-form-item>
          <!-- 文本域 -->
          <el-form-item label="头 &nbsp; 像" prop="avatar">
            <!-- Upload -->
            <Upload :avatar="userForm.avatar" @fileChange='shangchuan' />
          </el-form-item>

          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">
              添加用户
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

            
<script setup> 
import { ElMessage } from 'element-plus'
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter()
// 导入上传组件
import Upload from '@/components/upload/Upload.vue'
// 导入 upload js文件 为服务端发请求
import upload from '@/util/upload'
// 挂载 vuex
const store = useStore()
// 表单
const userRef = ref();
const userForm = reactive({
  username: '',
  password: '',
  introduction: '',
  role: 0,
  avatar: '',
  // 头像地址
  file: null
})
let option = [
  { label: '管理员', value: 1 },
  { label: '编辑', value: 0},
]

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 8, message: '请输入2 到 8 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 2, max: 8, message: '请输入2 到 8 个字符', trigger: 'blur' },
  ],
  role: [
    {
      required: true,
      message: '请选中你的角色',
      trigger: 'change',
    },
  ],
  introduction: [
    { required: true, message: '请简单介绍一下自己', trigger: 'blur' },
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

// 上传头像的区域按钮：
let shangchuan = function (file) {
  // 把file 的对象转换为 URL 地址
  userForm.avatar = URL.createObjectURL(file.raw)
  // 头像的 file 源对象
  userForm.file = file.raw
}

// 添加按钮
let submitForm = function () {
  userRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(userForm);
      let data = await upload('/adminapi/user/adduser', userForm)
      if (data.data.ok == 1) {
        // 提示框
        ElMessage({
          showClose: true,
          message: '添加成功',
          type: 'success',
          duration: 1000
        })

        router.push('/user-manage/userlist')
      } else {
        console.log('Useradd组件提交出错了');
      }
    }
  })
}   
</script>

<style scoped>
    .el-row{
        margin-top: 20px;
    }

</style>