<template>
  <div class="login-panel">
    <h1 class="title">商城后台管理系统</h1>

    <el-card>
      <LoginAccount ref="accountRef" />

      <el-button type="primary" class="login-btn" @click="handleLogin">
        立即登录
      </el-button>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginAccount from './login-account.vue'

const accountRef = ref(null)

function handleLogin() {
  accountRef.value.loginAction()
}
</script>

<style lang="scss" scoped>
.login-panel {
  margin-bottom: 100px;
  width: 390px;

  .title {
    text-align: center;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
