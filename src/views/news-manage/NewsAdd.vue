<template>
  <!-- hreader -->
  <el-page-header :icon="null" title="新闻管理">
    <template #content>
      <span class="text-large font-600 mr-3"> 创建新闻 </span>
    </template>
  </el-page-header>

  <el-row :gutter="24">
    <el-col :span="22">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <h3>创建新闻</h3>
          </div>
        </template>
        <!-- 表单 -->
        <el-form ref="newsRef" :model="newsForm" :rules="rules" label-width="120px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="newsForm.title" />
          </el-form-item>

          <!-- editor 组件 -->

          <el-form-item label="内容" prop="content">
            <editor @editorChange='editorChangeFun'></editor>
          </el-form-item>

          <!-- 下拉列表 -->
          <el-form-item label="类型" prop="role">
            <el-select style="width:100%;" v-model="newsForm.category" placeholder="请选类型">
              <el-option v-for="item in option" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>

          <!-- 上传封面 -->
          <el-form-item label="封面" prop="cover">
            <!-- Upload -->
            <Upload :avatar="newsForm.cover" @fileChange='shangchuan' />
          </el-form-item>

           <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">
              添加新闻
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
// 导入 editor 组件
import editor from '@/components/editor/Editor.vue'
import upload from '@/util/upload'
// 导入上传组件
import Upload from '@/components/upload/Upload.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 表单
const newsRef = ref();
// 
const newsForm = ref({
  title: '',
  content: '',
  category: 2,  // 1最新动态, 2典型案例,3通知公告
  cover: '',
  file: '',
  isPublish: 0  // 0 未发布, 1 已经发布
})
let option = [
  { label: '最新动态', value: 1 },
  { label: '典型案例', value: 2 },
  { label: '通知公告', value: 3 },

]

const rules = reactive({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 2, max: 8, message: '请输入2 到 8 个字符', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  category: [
    {
      required: true,
      message: '请选则分类',
      trigger: 'change',
    },
  ],
  cover: [
    { required: true, message: '请上传图片', trigger: 'blur' },
  ],

})

// 接受 Editor 子传父回来的参数
let editorChangeFun = (val) => {
  newsForm.value.content = val;
  // console.log(newsForm.value.content);
}

// 上传背景的 方法
let shangchuan = (file) => {
  // console.log(file);
  newsForm.value.cover = URL.createObjectURL(file.raw)
  // console.log(newsForm.value.cover);
  newsForm.value.file = file.raw
}
// 添加新闻按钮
let submitForm = function () {
  newsRef.value.validate( async (valid) => {
    if (valid) {
      // upload 方法 在自己封装的 upload.js里面
        // 提交给 vuex
        // 提示框
        // 因为是 ref 的动态数据绑定,所以需要加一个  value
        console.log(newsForm.value.file);
      const res =   await upload('adminapi/news/add',newsForm.value)
      router.push('/news-manage/newslist')
      // console.log(res);

        ElMessage({
          showClose: true,
          message: '创建成功!',
          type: 'success',
          duration: 1000
        })
    }
  })
}
</script>

<style scoped>
.el-row {
  margin-top: 20px;
}

::v-deep .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar {
  width: 178px;
  height: 178px;
}
</style>