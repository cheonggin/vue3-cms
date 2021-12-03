<template>
  <div class="login-account">
    <el-form
      ref="formRef"
      label-position="left"
      label-width="100px"
      :rules="rules"
      :model="account"
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

<script setup>
import { reactive, ref, defineExpose } from 'vue'
import { useStore } from 'vuex'

import { rules } from '../config/account-config'

const store = useStore()
const account = reactive({
  name: 'test',
  password: 'test'
})
const formRef = ref(null)

defineExpose({
  loginAction() {
    formRef.value.validate(async valid => {
      valid && store.dispatch('login/accountLoginAction', account)
    })
  }
})
</script>

<style lang="scss" scoped></style>
