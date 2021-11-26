<template>
  <el-menu
    background-color="#0c2135"
    text-color="#b7bdc3"
    :is-collapse="collapse"
    :collapse-transition="false"
    :default-active="activePath"
    unique-opened
    router
  >
    <el-menu-item index="/index">
      <el-icon><home-filled /></el-icon>首页
    </el-menu-item>
    <el-sub-menu
      v-for="(menu, index) in menuList"
      :key="index"
      :index="index + ''"
    >
      <template #title>
        <el-icon><component :is="menu.icon"></component></el-icon>
        {{ menu.primaryTitle }}
      </template>
      <el-menu-item
        v-for="submenu in menu.children"
        :key="submenu.path"
        :index="submenu.path"
      >
        {{ submenu.title }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { HomeFilled } from '@element-plus/icons'
import { ref, watch } from 'vue'
import { menuList } from './config/menu'
import { useRoute } from 'vue-router'

const activePath = ref('')
const route = useRoute()

watch(
  () => route.path,
  newPath => {
    window.sessionStorage.setItem('activePath', newPath)
  }
)

activePath.value = window.sessionStorage.getItem('activePath')

defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
