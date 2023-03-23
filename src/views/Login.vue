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
          console.log(res.data);
          if (res.data.ok === 1) {
            localStorage.setItem('token','aaa')
            router.push('/home')
            ElMessage({
              message: '登录成功',
              type: 'success',
              duration : 1000
            })
            
          } else {
            ElMessage.error('用户名或密码错误')
          }
        },
        function (error) {
          console.log(error.message);
        }
      )
      //  localStorage.setItem('token','yhc')
      //  router.push('/home')

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
      value: '#0d47a1'
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
  particles: {
    color: {
      value: '#ffffff'
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce'
      },
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: { min: 1, max: 5 },
    }
  },
  detectRetina: true
}

</script>
<style scoped>
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