<template>
  <div id="app">
    <Particles id="tsparticles" :particlesInit="particlesInit" />

    <Particles id="tsparticles" :particlesInit="particlesInit" :options="options" />

    <!-- formBox 表单 的盒子 -->
    <div class="formBox">
      <h2>企业门户管理系统</h2>
      <el-form label-width="120px" class="demo-ruleForm" status-icon ref="loginFormRef" :model="loginForm" :rules="rules">
        <el-form-item label="用户名" style="color:#000000;" prop="username">
          <el-input v-model="loginForm.username" type="text"  autocomplete="off" />
        </el-form-item>
        <el-form-item label="密&nbsp;&nbsp;&nbsp;码" prop="password">
          <el-input v-model="loginForm.password" type="password"  autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { loadFull } from "tsparticles";
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// 导入 axios 
import axios from 'axios'
// 导入 vuex 
import { useStore } from 'vuex';
const store = useStore()
const router = useRouter()
// form 表单的引用对象
const loginFormRef = ref()
// 校验规则的对象
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 6, message: 'Length should be 3 to 5', trigger: 'blur' },
  ]
})
// 表单对象 输入的用户名和密码 v-moudle 双向绑定
const loginForm = reactive({
  username: 'admin',
  password: '123456',
})
// 登录按钮绑定方法
const submitForm = function () {
  // 1. 手动校验
  loginFormRef.value.validate((value) => {
    if (value === true) {
      // 发起请求
      axios.post('/adminapi/user/login', {
        username: loginForm.username,
        password: loginForm.password
      }).then(
        function (res) {
          if (res.data.ok === 1) {
            router.push('/home')
            ElMessage({
              message: '登录成功',
              type: 'success',
              duration : 1000
            })
          // console.log(res.data.data);
            store.commit('getUserInfo', res.data.data)
          } else {
            ElMessage.error('用户名或密码错误')
          }
        },
        function (error) {
          console.log(error.message);
        }
      )
    }
  })


}

const particlesInit = async engine => {
  await loadFull(engine);
};


  // particles 的背景配置
const options = {
  background: {
    color: {
      value: '#9bd1f8'
    }
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  
  // 雪天背景
    particles: {
    number: {
      value: 120, // 颗粒数量
    },
    color: {
      value: '#fff', // 颗粒颜色
    },
    shape: {
      type: 'image', // 颗粒类型：图片
      image: {
        src: './img/snow.png', // 图片路径
        width: 10,
        height: 10,
      },
    },
    size: {
      value: 10, // 颗粒尺寸
      random: true, // 随机尺寸
    },
    line_linked: {
      enable: false, // 禁用连线
    },
    move: {
      enable: true, // 启用移动
      speed: 3, // 移动速度
      direction: 'bottom', // 移动方向：向下
      straight: false, // 是否是直线移动
    },
  },
  // 下雪背景结束地
  interactivity: {
    events: {
      onhover: {
        enable: false, // 禁用鼠标悬停事件
      },
      onclick: {
        enable: true, // 启用点击事件
        mode: 'push', // 模式：新增颗粒
      },
      resize: true, // 监听画布尺寸变化
    },
    modes: {
      push: {
        // 新增模式
        particles_nb: 5, // 新增数量
      },
    },
  },
  detectRetina: true

}



</script>
<style scoped>
  #app{
    user-select: none;
  }
  .formBox{
    width: 500px;
    height: 300px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background:rgba(255, 255, 255, 0.3);

    text-align: center;
    padding-top: 16px;
    padding-right: 20px;
    border-radius: 10px;
  }
  .formBox h2{
    margin-bottom: 50px;
  }

::v-deep .el-form-item__label{
    color: rgb(39, 38, 38);
  }

</style>