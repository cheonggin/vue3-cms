<template>
  <el-card>
    <PageSearch v-model="query" @search="onSearch" @clear="onClear" />
    <PageContent
      ref="pageContentRef"
      v-bind="contentConfig"
      :query="query"
      @add="showAddDialog"
      @edit="showEditDialog"
    >
      <template #role_id="scope">
        {{ scope.row.role.name }}
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

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageDialog from '@/components/page-dialog'

import usePageSearch from '@/hooks/use-page-search'
import usePageContent from '@/hooks/use-page-content'
import { useLoginStore } from '@/store/login/login'

import { tableConfig } from './config/table.config'
import { formConfig } from './config/form.config'

// hooks
const { query, pageContentRef, onSearch, onClear } = usePageSearch()
const { pageDialogRef, defaultInfo, showAddDialog, showEditDialog } =
  usePageContent(addCallback, editCallback)

const loginStore = useLoginStore()

const formConfigRef = computed(() => {
  const roleItem = formConfig.formData.find(item => item.field === 'role_id')
  roleItem!.options = loginStore.entireRole.map(item => {
    return {
      label: item.name,
      id: item.id
    }
  })
  return formConfig
})

const contentConfig = {
  pageName: 'admin',
  title: '管理员列表',
  text: '添加管理员',
  tableConfig
}
const dialogConfig = {
  pageName: 'admin',
  tip: '管理员',
  formConfig: formConfigRef.value
}

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
