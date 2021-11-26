<template>
  <el-container class="main">
    <el-aside :width="isCollapse ? '48px' : '200px'">
      <NavMenu :collapse="isCollapse" />
    </el-aside>

    <el-container class="page">
      <el-header class="page-header">
        <NavHeader @toggle-fold="handleToggleFold" />
      </el-header>

      <el-main class="page-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'

import NavHeader from '@/components/nav-header/nav-header.vue'
import NavMenu from '@/components/nav-menu/nav-menu.vue'

const isCollapse = ref(false)

function handleToggleFold(isFold) {
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
