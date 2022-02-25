<template>
  <div class="container">
    <MyBreadcrumb :list="$route.meta.breadcrumbList" />
    <UserInfo />
  </div>
</template>

<script setup lang="ts">
import MyBreadcrumb from '@/components/breadcrumb'
import UserInfo from './user-info.vue'
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
</style>
