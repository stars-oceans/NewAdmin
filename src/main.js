import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 element plus
import ElementPlus from 'element-plus'
// 导入 element plus 的 css 库
import 'element-plus/dist/index.css'
// 引入粒子库
import Particles from "particles.vue3"

const app = createApp(App)

app
.use(Particles)
.use(ElementPlus)
.use(store)
.use(router)
.mount('#app')
