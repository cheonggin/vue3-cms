<template>
  <el-card>
    <PageContent
      ref="pageContentRef"
      v-bind="contentConfig"
      @add="showAddDialog"
      @edit="showEditDialog"
    />
    <PageDialog
      ref="pageDialogRef"
      v-bind="dialogConfig"
      :defaultInfo="defaultInfo"
    />
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import PageContent from '@/components/page-content'
import PageDialog from '@/components/page-dialog'

import usePageContent from '@/hooks/use-page-content'
import { useLoginStore } from '@/store/login/login'

import { tableConfig } from './config/table.config'
import { formConfig } from './config/form.config'

// hooks
const { pageDialogRef, defaultInfo, showAddDialog, showEditDialog } =
  usePageContent()

const loginStore = useLoginStore()

const formConfigRef = computed(() => {
  // 找出父级分类选项
  const parentItem = formConfig.formData.find(item => item.field === 'pid')
  parentItem!.options = loginStore.entireCategory
  return formConfig
})

const pageName = 'category'
const contentConfig = {
  pageName,
  title: '分类列表',
  text: '添加分类',
  tableConfig
}
const dialogConfig = {
  pageName,
  tip: '分类',
  formConfig: formConfigRef.value
}
</script>

<style lang="scss" scoped></style>
