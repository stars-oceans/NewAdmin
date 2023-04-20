<template>
  <!-- hreader -->
  <el-page-header :icon="null" title="新闻管理">
    <template #content>
      <span class="text-large font-600 mr-3"> 新闻列表 </span>
    </template>
  </el-page-header>

  <el-row :gutter="24">
    <el-col :span="22">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <h3>新闻列表</h3>
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

          <!-- 分类 -->
          <el-table-column label="分类" width="180">
            <template #default="scope">
              <span>{{  categoryfun( scope.row.category ) }}</span>
            </template>
          </el-table-column>

          <!-- 时间 -->
          <el-table-column label="调整时间" width="180">
            <template #default="scope">
              <span>{{ formatTime.getTime(scope.row.editTime) }}</span>
            </template>
          </el-table-column>

          <!-- 是否发布 -->
          <el-table-column label="是否发布" width="180">
            <template #default="scope">
              <el-switch v-model="scope.row.isPublish" @change="handleSwitchChange(scope.row)" :active-value="1" :inactive-value="0"></el-switch>
            </template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作" width="180">
            <template #default="scope">
              <el-button type="success" @click="Read(scope.$index, scope.row)" :icon="Star" circle />

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
          <el-form ref="newsRef" :model="newsForm" :rules="rules" label-width="120px">
            <el-form-item label="标题" prop="title">
              <el-input v-model="newsForm.title" />
            </el-form-item>

            <!-- editor 组件 -->
            <el-form-item label="内容" prop="content">
              <editor @editorChange='editorChangeFun' :content="content "></editor>
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

        <!-- 预览对话框 -->
        <el-dialog v-model="dialogVisibleRead" title="预览" width="50%">
          <h1>标题 {{ newsForm.title }}</h1>
          <div>时间 {{  formatTime.getTime(newsForm.editTime) }}</div>
          <!-- 分割线 -->
          <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
    内容
          <div v-html="newsForm.content" class="htmlContent"></div>
          <template #footer>
            <el-button @click="dialogVisibleRead = false" align="center">关闭</el-button>
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

const tableData = ref([])

let gettableData = async function () {
  let data = await axios.get('/adminapi/news/findnews')
  //  console.log(data.data.data);
  tableData.value = data.data.data
}

// 点击了 预览按钮
let Read = async function (index, item) {
  dialogVisibleRead.value = true
  const data = await axios.get('adminapi/news/finditem', {
    params: {
      id: item._id,
    }
  })
  newsForm.value = data.data.data
  content.value = data.data.data.content
  // console.log(content.value);
  // console.log(newsForm.value);

}



function categoryfun(category) {
  let arr = ['最新动态', '典型案例', '通知公告']
  // category  为  1 | 2 | 3
  return arr[category - 1]
};

// 开关  
// 修改是否发布
async function handleSwitchChange(item) {
  // console.log(item);
  const data = await axios.post('/adminapi/news/publish', {
    id: item._id,
    isPublish: item.isPublish
  })
  if (item.isPublish === 1) {
    ElMessage({
      showClose: true,
      message: '发布成功!',
      type: 'success',
      duration: 1000
    })
  } else {
    ElMessage({
      showClose: true,
      message: '暂不发布!',
      type: 'warning',
      duration: 1000
    })
  }

}

// 对话框
let dialogVisible = ref(false)


let content = ref()
//  新编按钮
let handleEdit = async function (index, item) {
  // 对话框 显示
  dialogVisible.value = true
  const data = await axios.get('adminapi/news/finditem', {
    params: {
      id: item._id,
    }
  })
  // console.log(data.data.data);
  newsForm.value = data.data.data
  content.value = data.data.data.content
  // console.log(newsForm.value);
  // console.log(newsForm.value.cover);
}
//TODO: 对话框的 确定按钮
function handleEditComfirm() {
  newsRef.value.validate(async (valid) => {
    if (valid) {
      // upload 方法 在自己封装的 upload.js里面
      // 提交给 vuex
      // 提示框
      // 因为是 ref 的动态数据绑定,所以需要加一个  value
      const data = await upload('adminapi/news/updataNews', newsForm.value)
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
  let data = await axios.get('/adminapi/news/deleteitem', {
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
const newsRef = ref();
// 
const newsForm = ref({
  title: '',
  content: '',
  category: 2,  // 1最新动态, 2典型案例,3通知公告
  cover: '',
  file: '',
  isPublish: 0,  // 0 未发布, 1 已经发布
  file: '',
  editTime: ''
})

// // 1最新动态, 2典型案例,3通知公告的 文字遍历数据
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
  // console.log(newsForm.value.file);
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