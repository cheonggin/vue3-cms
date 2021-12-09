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
    <el-menu-item index="/index" class="home">
      <el-icon><home-filled /></el-icon>首页
    </el-menu-item>
    <el-sub-menu
      v-for="menu in menuList"
      :key="menu._id"
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

<script setup>
import { HomeFilled } from '@element-plus/icons'
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const activePath = ref('')
const route = useRoute()

// vuex
const store = useStore()
const menuList = computed(() => store.state.login.userMenu)

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

:deep(.el-menu-item) {
  padding-left: 50px !important;
}
.home {
  padding-left: 20px !important;
}
</style>
