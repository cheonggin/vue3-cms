<template>
  <el-card>
    <PageContent
      ref="pageContentRef"
      v-bind="contentConfig"
      @add="showAddDialog"
      @edit="showEditDialog"
    >
      <template #type="scope">
        {{ scope.row.type === '1' ? '菜单' : '按钮' }}
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
  // 找出父级菜单选项
  const parentItem = formConfig.formData.find(item => item.field === 'pid')
  parentItem!.options = loginStore.entireMenu
  return formConfig
})

const contentConfig = {
  pageName: 'menu',
  title: '菜单列表',
  text: '添加菜单',
  tableConfig
}
const dialogConfig = {
  pageName: 'menu',
  tip: '菜单',
  formConfig: formConfigRef.value
}
</script>

<style lang="scss" scoped></style>
