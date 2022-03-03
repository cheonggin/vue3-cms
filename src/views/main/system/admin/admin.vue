<template>
  <el-card>
    <PageSearch v-model="query" @search="onSearch" @clear="onClear" />
    <PageContent
      ref="pageContentRef"
      :tableConfig="tableConfig"
      :query="query"
      pageName="admin"
      title="管理员列表"
      text="添加管理员"
      @add="showAddDialog"
      @edit="showEditDialog"
    />
    <PageDialog
      ref="pageDialogRef"
      :formConfig="formConfig"
      tip="管理员"
      pageName="admin"
      :defaultInfo="defaultInfo"
      @confirm="handleConfirm"
    />
  </el-card>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageDialog from '@/components/page-dialog'

import usePageSearch from '@/hooks/use-page-search'
import usePageContent from '@/hooks/use-page-content'
import usePageDialog from '@/hooks/use-page-dialog'

import { tableConfig } from './config/table.config'
import { formConfig } from './config/form.config'

// hooks
const { query, pageContentRef, onSearch, onClear } = usePageSearch()
const { pageDialogRef, defaultInfo, showAddDialog, showEditDialog } =
  usePageContent(addCallback, editCallback)
const { handleConfirm } = usePageDialog(query.value)

// 处理新建对话框中密码框的显示
function addCallback() {
  const pwdItem = formConfig.formData.find(item => item.type === 'password')

  pwdItem!.isHidden = false
}

// 处理修改对话框中密码框的显示
function editCallback() {
  const pwdItem = formConfig.formData.find(item => item.type === 'password')

  pwdItem!.isHidden = true
}
</script>

<style lang="scss" scoped></style>
