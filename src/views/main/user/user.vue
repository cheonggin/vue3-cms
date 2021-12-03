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
    >
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.status ? 'success' : 'danger'"
        >
          {{ scope.row.status ? '启用' : '禁用' }}
        </el-button>
      </template>
      <!-- <el-switch
          v-model="scope.row.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
        /> -->
    </PageContent>
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
