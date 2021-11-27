<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) in list" :key="index">
      {{ item }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons'

defineProps({
  list: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped></style>
