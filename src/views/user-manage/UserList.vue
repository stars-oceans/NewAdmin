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
          <el-table-column prop="username" label="用户名" width="180" />
          <!-- 头像信息 -->
          <el-table-column label="头像">
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
          <el-table-column label="角色">
            <template #default="scope">
              <el-tag v-if="scope.row.role === 0" class="ml-2" type="success">编辑</el-tag>
              <el-tag v-else class="ml-2" type="danger">管理员</el-tag>

            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-popconfirm title="你确定要删除嘛?" @confirm="handleDelete(scope.$index, scope.row)" confirm-button-text="确认" cancel-button-text="取消">
                <template #reference>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>

</template>

<script setup>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
let tableData = ref([])

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
let handleEdit = function (index, data) {

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
  // console.log(res);
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
</script>

<style scoped>

.el-row{
  margin-top: 30px;
}

</style>