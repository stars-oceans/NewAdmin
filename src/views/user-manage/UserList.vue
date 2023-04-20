<template>
  <!-- hreader -->
  <el-page-header :icon="null" title="用户管理">
    <template #content>
      <span class="text-large font-600 mr-3"> 用户列表 </span>
    </template>
  </el-page-header>
  
  <el-row :gutter="24">
    <el-col :span="22">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <h3>用户列表</h3>
          </div>
        </template>

        <!-- table 表 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="username" align="center" label="用户名" width="180" />
          <!-- 头像信息 -->
          <el-table-column align="center" label="头像">
            <template #default="scope">
              <div v-if="scope.row.avatar">
                <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
              </div>
              <div v-else>
                <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
              </div>
            </template>
          </el-table-column>
          <!-- 角色信息 -->
          <el-table-column label="角色" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.role === 0" class="ml-2" type="success">编辑</el-tag>
              <el-tag v-else class="ml-2" type="danger">管理员</el-tag>

            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <!-- 编辑按钮 -->
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

              <!-- 删除按钮 -->
              <el-popconfirm title="你确定要删除嘛?" @confirm="handleDelete(scope.$index, scope.row)" confirm-button-text="确认" cancel-button-text="取消">
                <template #reference>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- 对话框 -->
        <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">

          <!-- 表单 -->
          <el-form ref="userRef" :model="userForm" :rules="rules" label-width="120px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>

            <el-form-item label="密 &nbsp; 码" prop="password">
              <el-input v-model="userForm.password" type="password" />
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
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

let dialogVisible = ref(false)
let tableData = ref([])
// 对话框的初始状态

// 生命周期钩子 onMounted 来发起请求
onMounted(() => {
  // 钩子里面 当页面渲染时自动查询
  getTableData()
})

let getTableData = async function () {
  let data = await axios.get('/adminapi/user/list')
  // tableData= [...tableData, ...data.data.data]
  tableData.value = data.data.data
  // console.log(tableData);
}

// 编辑按钮
let handleEdit = async function (index, data) {
  // 对话框 显示
  dialogVisible.value = true
  // 获取用户基本信息
  let res = await axios.get(`/adminapi/user/listPsw/${data._id}`)
  // console.log(res.data.data);
  userForm.value = res.data.data[0]
}

// 删除按钮 
let handleDelete = async function (index, data) {
  let id = data._id
  // 删除接口
  let res = await axios.delete(`/adminapi/user/list`, {
    params: {
      id
    }
  })

  // 提示框
  ElMessage({
    showClose: true,
    message: '删除成功',
    type: 'success',
    duration: 1000
  })

  // 删除后渲染
  // 方法 ：
  // 1.reload page
  // 2.reload data
  getTableData()    //再调用一次查询请求
  // TODO: tabledata  本地删除
}

// 对话框的 确认按钮
let handleEditComfirm = function () {
  userRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(userForm.value._id);
      // 1.更新后端
      let res = await axios.put(`adminapi/user/listUpdata/${userForm.value._id}`, userForm.value)
      if (res) {
        // console.log(res);
        // 2. 对话框隐藏   dialog 隐藏   dialogVisible = false
        dialogVisible.value = false
        // 3.获取 table 数据
        getTableData()
        // 提示框
        ElMessage({
          showClose: true,
          message: '编辑成功!',
          type: 'success',
          duration: 1000
        })
      } else {
        console.log('对话框的 确认按钮出错了');
      }
    }
  })
}

// 对话框：
// 表单
const userRef = ref();
// 
const userForm = ref({
  username: '',
  password: '',
  introduction: '',
  role: 0,

})
let option = [
  { label: '管理员', value: 1 },
  { label: '编辑', value: 0 },
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

})
</script>

<style scoped>

.el-row{
  margin-top: 30px;
}



</style>