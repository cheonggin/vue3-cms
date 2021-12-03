<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="Close" @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ArrowDown, Close } from '@element-plus/icons'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import localCache from '@/utils/cache'

const router = useRouter()
const store = useStore()

const name = computed(() => store.state.login.userinfo.name)

function logout() {
  localCache.deleteCache('token')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  display: flex;
}
</style>
