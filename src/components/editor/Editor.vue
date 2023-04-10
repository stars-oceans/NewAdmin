<template>
  <div id="myEditor">
    <template>
  {{ content }}
 </template>
  </div>
</template>

<script setup>
import {onMounted,defineEmits, defineProps} from 'vue'
import E from 'wangeditor'

defineProps({
  content : String
})

// 子传父
 const emits = defineEmits(['editorChange'])
onMounted(()=>{
const editor = new E('#myEditor')
// 或者 const editor = new E( document.getElementById('div1') )
editor.create()

// 回调函数
editor.config.onchange = function (newHtml) {
  // console.log("change 之后最新的 html", newHtml);
  emits('editorChange',newHtml)
};
}) 
</script>

<style>

</style>