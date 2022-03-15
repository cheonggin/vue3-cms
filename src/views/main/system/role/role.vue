<template>
  <el-card>
    <PageSearch
      v-model="query"
      @search="onSearch"
      @clear="onClear"
      placeholder="请输入角色名称搜索"
    />
    <PageContent
      ref="pageContentRef"
      v-bind="contentConfig"
      :query="query"
      @add="showAddDialog"
      @edit="showEditDialog"
    >
    </PageContent>
    <PageDialog
      ref="pageDialogRef"
      v-bind="dialogConfig"
      :defaultInfo="defaultInfo"
      :permission-list="permissionList"
    >
      <el-tree
        ref="elTreeRef"
        :data="menuList"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleChangeCheck"
    /></PageDialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageDialog from '@/components/page-dialog'

import usePageSearch from '@/hooks/use-page-search'
import usePageContent from '@/hooks/use-page-content'

import { tableConfig } from './config/table.config'
import { formConfig } from './config/form.config'

import { useLoginStore } from '@/store/login/login'

// hooks
const { query, pageContentRef, onSearch, onClear } = usePageSearch()
const { pageDialogRef, defaultInfo, showAddDialog, showEditDialog } =
  usePageContent(undefined, editCallback)

const contentConfig = {
  pageName: 'role',
  title: '角色列表',
  text: '添加角色',
  tableConfig
}
const dialogConfig = {
  pageName: 'role',
  tip: '角色',
  formConfig
}

const loginStore = useLoginStore()
const menuList = computed(() => loginStore.entireMenu)
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const permissionList = ref({})

function handleChangeCheck(list: any, data: any) {
  const { checkedKeys, halfCheckedKeys } = data
  permissionList.value = { checkedKeys, halfCheckedKeys }
}

function editCallback(rowData: any) {
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(rowData.checkedKeys)
  })
}
</script>

<style lang="scss" scoped></style>
