<template>
  <!-- hreader -->
  <el-page-header :icon="null" title="产品管理">
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
            <h3>添加产品</h3>
          </div>
        </template>

        <!-- 表单 -->
        <el-form ref="ProductRef" :model="ProductForm" :rules="rules" label-width="120px">
          <el-form-item label="产品名称" prop="title">
            <el-input v-model="ProductForm.title" />
          </el-form-item>


             <!-- 文本域 -->
          <el-form-item label="产品摘要" prop="introduction">
            <el-input v-model="ProductForm.introduction" rows="2" type="textarea" />
          </el-form-item>

          <!-- 文本域 -->
          <el-form-item label="产品详细" prop="detail">
            <el-input v-model="ProductForm.detail" rows="2" type="textarea" />
          </el-form-item>
          <!-- 头像 -->
          <el-form-item label="头 &nbsp; 像" prop="cover">
            <!-- Upload -->
            <Upload :avatar="ProductForm.cover" @fileChange='shangchuan' />
          </el-form-item>

          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">
              添加产品
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
const ProductRef = ref();
const ProductForm = reactive({
  title: '',
  introduction: '',
  detail : '',
  cover: '',
  // 头像地址
  file: null
})

const rules = reactive({
  title: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 8, message: '请输入2 到 8 个字符', trigger: 'blur' },
  ],

  introduction: [
    { required: true, message: '请简单介绍一下自己', trigger: 'blur' },
    { min: 2, max: 200, message: '请输入3 到 200 个字符', trigger: 'blur' },
  ],
  detail: [
    { required: true, message: '请简单介绍一下自己', trigger: 'blur' },
    { min: 2, max: 200, message: '请输入3 到 200 个字符', trigger: 'blur' },
  ],
  cover: [
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
  ProductForm.cover = URL.createObjectURL(file.raw)
  // 头像的 file 源对象
  ProductForm.file = file.raw
}

// 添加按钮
let submitForm = function () {
  ProductRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(ProductForm);
      let data = await upload('/adminapi/Product/add', ProductForm)
      // console.log(data);
      if (data.data.ok == 1) {
        // 提示框
        ElMessage({
          showClose: true,
          message: '添加成功',
          type: 'success',
          duration: 1000
        })
        router.push('/product-manage/productlist')
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