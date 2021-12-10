<template>
  <el-card>
    <MySearch v-model="query" />

    <PageContent
      ref="pageContentRef"
      :query="query"
      :content-table-config="contentTableConfig"
      :is-show-footer="false"
      title="添加菜单"
      page-name="menu"
      @add="handleCreate"
      @edit="handleEdit"
    >
      <template #type="scope">
        {{ scope.row.type === 1 ? '菜单' : '按钮' }}
      </template>
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.status ? 'success' : 'danger'"
        >
          {{ scope.row.status ? '正常' : '禁用' }}
        </el-button>
      </template>
    </PageContent>

    <MyDialog
      ref="myDialogRef"
      page-name="menu"
      :form-config="formConfigRef"
      :default-info="defaultInfo"
    />
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

import MySearch from '@/components/search/search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import MyDialog from '@/components/dialog/dialog.vue'

import { contentTableConfig } from './config/table.config'
import { formConfig } from './config/form.config'
import { useSearch } from '@/hooks/use-search'
import { useDialog } from '@/hooks/use-dialog'

const { query, pageContentRef } = useSearch()
const { myDialogRef, defaultInfo, handleCreate, handleEdit } = useDialog()

// vuex
const store = useStore()
const formConfigRef = computed(() => {
  const cascaderItem = formConfig.formItems.find(
    item => item.field === 'parent'
  )

  cascaderItem.options = store.state.entireMenu.map(item => {
    item.label = item.name
    item.value = item._id

    if (item.children.length > 0) {
      item.children.map(item1 => {
        item1.label = item1.name
        item1.value = item1._id

        if (item1.children && item1.children.length > 0) {
          item1.children.map(val => {
            val.label = val.name
            val.value = val._id
            return val
          })
        }

        return item1
      })
    }

    return item
  })

  return formConfig
})
</script>

<style lang="scss" scoped></style>
