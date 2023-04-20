<template>
  <!-- hreader -->
  <el-page-header :icon="null" title="新闻管理">
    <template #content>
      <span class="text-large font-600 mr-3"> 产品列表 </span>
    </template>
  </el-page-header>

  <el-row :gutter="24">
    <el-col :span="22">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <h3>产品列表</h3>
          </div>
        </template>

        <!-- table 表 -->
        <el-table :data="tableData" style="width: 100%">
          <!-- 标题 -->
          <el-table-column label="标题" width="180">
            <template #default="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>

          <!-- 简要 -->
          <el-table-column label="简要" width="180">
            <template #default="scope">
              <span>{{ scope.row.introduction }}</span>
            </template>
          </el-table-column>

          <!-- 时间 -->
          <el-table-column label="调整时间" width="180">
            <template #default="scope">
              <span>{{ formatTime.getTime(scope.row.ediTime) }}</span>
            </template>
          </el-table-column>

     

          <!-- 操作 -->
          <el-table-column label="操作" width="180">
            <template #default="scope">

              <!-- 新编按钮 -->
              <el-button type="primary" @click="handleEdit(scope.$index, scope.row)" :icon="Edit" circle></el-button>

              <!-- 删除按钮 -->
              <el-popconfirm title="你确定要删除嘛?" @confirm="handleDelete(scope.$index, scope.row)" confirm-button-text="确认" cancel-button-text="取消">
                <template #reference>
                  <el-button type="danger" :icon="Delete" circle />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- 对话框 -->
        <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">

          <!-- 表单 -->
          <el-form ref="productRef" :model="productForm" :rules="rules" label-width="120px">
            <el-form-item label="标题" prop="title">
              <el-input v-model="productForm.title" />
            </el-form-item>

        <!-- 文本域 -->
          <el-form-item label="产品摘要" prop="introduction">
            <el-input v-model="productForm.introduction" rows="2" type="textarea" />
          </el-form-item>
              
            <!-- 上传封面 -->
            <el-form-item label="封面" prop="cover">
              <!-- Upload -->
              <Upload :avatar="productForm.cover" @fileChange='shangchuan' />
            </el-form-item>
          </el-form>

          <!-- 取消和确认按钮 -->
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="handleEditComfirm()">
                确认
              </el-button>
            </span>
          </template>
        </el-dialog>
     
      </el-card>
    </el-col>
  </el-row>

</template>

<script setup>
import formatTime from '@/util/formatTime.js'
import { Edit, Star, Delete } from '@element-plus/icons-vue'
import axios from 'axios'
import { ref, onMounted, reactive } from 'vue'
// 导入 editor 组件
import editor from '@/components/editor/Editor.vue'
import { ElMessage } from 'element-plus'
import upload from '@/util/upload'
// 导入上传组件
import Upload from '@/components/upload/Upload.vue'
// 分割线引入
import { StarFilled } from '@element-plus/icons-vue'
onMounted(() => {
  gettableData()
})
// 预览的对话框初始状态
let dialogVisibleRead = ref(false)

const tableData = ref()

let gettableData = async function () {
  let data = await axios.get('/adminapi/Product/findList')
  //  console.log(data.data.data);
  tableData.value = data.data.data
}




// 对话框
let dialogVisible = ref(false)


let content = ref()
//  新编按钮
let handleEdit = async function (index, item) {
  // 对话框 显示
  dialogVisible.value = true
  const data = await axios.get('/adminapi/Product/finditem', {
    params: {
      id: item._id,
    }
  })
  // console.log(data.data.data);
  productForm.value = data.data.data[0]
  content.value = data.data.data.content
  // console.log(productForm.value);
  // console.log(productForm.value.title);
}
//TODO: 对话框的 确定按钮
function handleEditComfirm() {
  productRef.value.validate(async (valid) => {
    if (valid) {
      // upload 方法 在自己封装的 upload.js里面
      // 提交给 vuex
      // 提示框
      // 因为是 ref 的动态数据绑定,所以需要加一个  value
      const data = await upload('/adminapi/Product/updataProduct', productForm.value)
      if (data) {
        // 关闭对话框
        dialogVisible.value = false
        // 删除后重新查询
        gettableData()
        // 提示框
        ElMessage({
          showClose: true,
          message: '修改成功!',
          type: 'success',
          duration: 1000
        })
      }

    }
  })
}

// 删除 按钮
async function handleDelete(value, item) {
  // console.log(item);
  let data = await axios.get('/adminapi/Product/deleteitem', {
    params: {
      id: item._id
    }
  })
  if (data) {
    // 删除后重新查询
    gettableData()
    // 提示框
    ElMessage({
      showClose: true,
      message: '删除成功!',
      type: 'success',
      duration: 1000
    })
  }


}

// 对话框里面的数据前端检验
// 表单
const productRef = ref();
// 
const productForm = ref({
  title: '',
  introduction : '',
  detail : '',
  cover: '',
  // 头像地址
  file: null,
  ediTime: ''
})



const rules = reactive({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 2, max: 8, message: '请输入2 到 8 个字符', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],

  cover: [
    { required: true, message: '请上传图片', trigger: 'blur' },
  ],

})

// 接受 Editor 子传父回来的参数
let editorChangeFun = (val) => {
  productForm.value.content = val;
  // console.log(productForm.value.content);
}

// 上传背景的 方法
let shangchuan = (file) => {
  // console.log(file);
  productForm.value.cover = URL.createObjectURL(file.raw)
  // console.log(productForm.value.cover);
  productForm.value.file = file.raw
  // console.log(productForm.value.file);
}
</script>

<style scoped>
.el-row {
  margin-top: 20px;
}

 ::v-deep .htmlContent{
  max-width: 100%;
}

</style>