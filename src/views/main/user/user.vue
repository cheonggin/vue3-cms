<template>
  <el-card>
    <MySearch
      v-model="query"
      :is-show-add="false"
      placeholder="请输入用户名查询"
    />
    <PageContent
      ref="pageContentRef"
      :query="query"
      :content-table-config="contentTableConfig"
      page-name="user"
    />
  </el-card>
</template>

<script setup>
import MySearch from '@/components/search/search.vue'
import PageContent from '@/components/page-content/page-content.vue'

import { contentTableConfig } from './config/table.config'

import { useSearch } from '@/hooks/use-search'

const { query, pageContentRef } = useSearch()
</script>

<style lang="scss" scoped></style>
