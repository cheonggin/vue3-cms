<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ user.name }}
      <el-icon class="el-icon--right"><ArrowDown /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="Close" @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Close } from '@element-plus/icons-vue'

import { useLoginStore } from '@/store/login/login'
import { localCache, sessionCache } from '@/utils/cache'

const router = useRouter()
const loginStore = useLoginStore()
const user = computed(() => loginStore.user)

function logout() {
  localCache.clearCache()
  sessionCache.clearCache()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  display: flex;
}
</style>
