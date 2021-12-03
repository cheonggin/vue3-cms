<template>
  <el-card>
    <MySearch v-model="query" title="添加角色" @add="showDialog" />

    <PageContent
      ref="pageContentRef"
      :query="query"
      :content-table-config="contentTableConfig"
      page-name="role"
      @edit="handleEdit"
    />

    <MyDialog
      ref="myDialogRef"
      page-name="role"
      :form-config="formConfig"
      :default-info="defaultInfo"
    />
  </el-card>
</template>

<script setup>
import MySearch from '@/components/search/search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import MyDialog from '@/components/dialog/dialog.vue'

import { contentTableConfig } from './config/table.config'
import { formConfig } from './config/form.config'
import { useSearch } from '@/hooks/use-search'
import { useDialog } from '@/hooks/use-dialog'

// hooks
const { query, pageContentRef } = useSearch()
const { myDialogRef, defaultInfo, showDialog, handleEdit } = useDialog()
</script>

<style lang="scss" scoped></style>
