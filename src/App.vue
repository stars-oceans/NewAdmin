<template>
  <router-view></router-view>
</template>

<style lang="scss">
*{
  margin: 0; padding: 0;
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
    width: 2px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 5px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgb(71, 146, 231);
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
// ::-webkit-scrollbar-thumb:window-inactive {
//     background: rgba(255, 0, 0, 0.4);
// }
</style>
