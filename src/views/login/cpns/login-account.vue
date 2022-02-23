<template>
  <div class="login-account">
    <el-form
      ref="formRef"
      label-position="left"
      label-width="100px"
      :rules="rules"
      :model="account"
      @keyup.enter="loginAction"
    >
      <el-form-item label="账号" prop="name" label-width="60px">
        <el-input v-model="account.name"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" label-width="60px">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElForm } from 'element-plus'

import { rules } from '../config/account-config'
import { useLoginStore } from '@/store/login/login'

const formRef = ref<InstanceType<typeof ElForm>>()

const account = reactive({
  name: '',
  password: ''
})

const loginStore = useLoginStore()

function loginAction() {
  // 表单验证规则通过则发送登录请求
  formRef.value?.validate(valid => {
    if (valid) {
      loginStore.loginAccountAction(account)
    }
  })
}

defineExpose({ loginAction })
</script>

<style lang="scss" scoped>
:deep(.el-input__suffix) {
  align-items: center;
}
</style>
