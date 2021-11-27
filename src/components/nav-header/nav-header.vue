<template>
  <el-tooltip content="切换菜单栏" placement="bottom" effect="dark">
    <el-icon class="fold" @click="handleFold"><fold /></el-icon>
  </el-tooltip>

  <div class="container">
    <MyBreadcrumb :list="$route.meta" />
    <UserInfo />
  </div>
</template>

<script setup>
import { Fold } from '@element-plus/icons'
import { ref } from 'vue'

import MyBreadcrumb from '@/base-ui/breadcrumb/breadcrumb.vue'
import UserInfo from './user-info.vue'

const isFold = ref(false)

const emits = defineEmits(['toggleFold'])

function handleFold() {
  isFold.value = !isFold.value
  emits('toggleFold', isFold.value)
}
</script>

<style lang="scss" scoped>
.fold {
  margin-right: 20px;
  cursor: pointer;
}

.container {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
</style>
