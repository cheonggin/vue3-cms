<template>
  <el-container class="main">
    <el-aside :width="isCollapse ? '48px' : '200px'">
      <NavMenu :menuList="menuList" @toggleFold="handleToggleFold" />
    </el-aside>

    <el-container class="page">
      <el-header class="page-header">
        <NavHeader />
      </el-header>

      <el-main class="page-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'

import { useLoginStore } from '@/store/login/login'

const isCollapse = ref(false)

const loginStore = useLoginStore()
const menuList = computed(() => loginStore.userMenu)

function handleToggleFold(isFold: boolean) {
  isCollapse.value = isFold
}
</script>

<style lang="scss" scoped>
.main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  .el-aside {
    background-color: #00132a;
  }

  .page-header {
    display: flex;
    align-items: center;
    height: 48px;
  }

  .page-content {
    background-color: #f0f2f5;
  }
}
</style>
