<template>
  <el-breadcrumb :separator-icon="ArrowRightBold">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) in list" :key="index">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { ArrowRightBold } from '@element-plus/icons-vue'

import type { IBreadcrumb } from '../types'

defineProps({
  list: {
    type: Array as PropType<IBreadcrumb[]>,
    default: () => []
  }
})
</script>

<style lang="scss" scoped></style>
