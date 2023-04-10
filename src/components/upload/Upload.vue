<template>
  <el-upload action="" class="avatar-uploader" :on-change="shangchuan" :show-file-list="false" :auto-upload="false">
    <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script setup>
import { defineEmits, defineProps,computed,onMounted} from 'vue'
import { Plus } from '@element-plus/icons-vue'


let props = defineProps({
  avatar : String
})

let uploadAvatar = computed(() => {
  return props.avatar.includes('blob') ? props.avatar : 'http://localhost:3000' + props.avatar

})

let emit = defineEmits(['fileChange'])
// 上传头像的回调
let shangchuan = function (file) {
  // console.log('这个传过来的'+props.avatar);
// console.log(file);
  // 自定义方法 给父用
  emit('fileChange', file)
}
</script>

<style lang="less" scoped>
  ::v-deep .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

 ::v-deep  .el-upload:hover {
  border-color: var(--el-color-primary);
}

 ::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>