<template>
  <el-tooltip
    :content="isCollapse ? '展开菜单栏' : '折叠菜单栏'"
    placement="bottom"
    effect="dark"
  >
    <el-icon class="fold" @click="handleFold">
      <template v-if="isCollapse">
        <fold />
      </template>
      <template v-else>
        <expand />
      </template>
    </el-icon>
  </el-tooltip>
  <el-menu
    background-color="#0c2135"
    text-color="#b7bdc3"
    :collapse="isCollapse"
    :collapse-transition="false"
    :default-active="activePath"
    unique-opened
    router
  >
    <el-menu-item index="/index" class="home">
      <el-icon><HomeFilled /></el-icon>首页
    </el-menu-item>
    <el-sub-menu
      v-for="menu in menuList"
      :key="menu.id"
      :index="menu.path + ''"
    >
      <template #title>
        <el-icon><component :is="menu.icon"></component></el-icon>
        {{ menu.name }}
      </template>
      <el-menu-item
        v-for="submenu in menu.children"
        :key="submenu.path"
        :index="submenu.path"
      >
        {{ submenu.name }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { sessionCache } from '@/utils/cache'
import { ref, PropType, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { IMenuList } from '../types'

const route = useRoute()
const isCollapse = ref(false)
const activePath = ref('/index')
const emits = defineEmits(['toggleFold'])

watch(
  () => route.path,
  newPath => {
    activePath.value = newPath
    if (newPath === '/login') return
    sessionCache.setCache('activePath', newPath)
  }
)

activePath.value = sessionCache.getCache('activePath') || '/index'

defineProps({
  menuList: {
    type: Array as PropType<IMenuList[]>,
    default: () => []
  }
})

function handleFold() {
  isCollapse.value = !isCollapse.value
  emits('toggleFold', isCollapse.value)
}
</script>

<style lang="scss" scoped>
.fold {
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
  color: #fff;
}

.el-menu {
  border-right: none;
}

:deep(.el-icon) {
  margin-left: -5px !important;
  margin-right: 14px !important;
}
</style>
