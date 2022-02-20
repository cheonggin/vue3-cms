<template>
  <ElConfigProvider :locale="zhCn">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { useLoginStore } from '@/store/login'

const loginStore = useLoginStore()
loginStore.loadLocalLogin()
</script>

<style scoped></style>
