<template>
  <el-card>
    <PageSearch
      v-model="query"
      @search="onSearch"
      @clear="onClear"
      placeholder="请输入商品名称搜索"
    />
    <PageContent
      ref="pageContentRef"
      v-bind="contentConfig"
      @add="showAddDialog"
      @edit="showEditDialog"
    >
      <template #image="scope">
        <el-image
          style="width: 50px; height: 50px"
          :src="scope.row.image"
          :preview-src-list="[scope.row.image]"
          fit="cover"
        />
      </template>
    </PageContent>
    <PageDialog
      ref="pageDialogRef"
      v-bind="dialogConfig"
      :defaultInfo="defaultInfo"
    />
  </el-card>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageDialog from '@/components/page-dialog'

import usePageSearch from '@/hooks/use-page-search'
import usePageContent from '@/hooks/use-page-content'

import { tableConfig } from './config/table.config'
import { formConfig } from './config/form.config'

// hooks
const { query, pageContentRef, onSearch, onClear } = usePageSearch()
const { pageDialogRef, defaultInfo, showAddDialog, showEditDialog } =
  usePageContent()

const pageName = 'goods'
const contentConfig = {
  pageName,
  title: '商品列表',
  text: '添加商品',
  tableConfig
}
const dialogConfig = {
  pageName,
  tip: '商品',
  formConfig
}
</script>

<style lang="scss" scoped></style>
