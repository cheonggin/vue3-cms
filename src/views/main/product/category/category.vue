<template>
  <el-card>
    <MySearch v-model="query" title="添加商品" @add="showDialog" />

    <PageContent
      ref="pageContentRef"
      :query="query"
      :content-table-config="contentTableConfig"
      page-name="category"
      @edit="handleEdit"
    >
    </PageContent>

    <MyDialog
      ref="myDialogRef"
      page-name="category"
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
const { myDialogRef, defaultInfo, showDialog, handleEdit } = useDialog()

// vuex
const store = useStore()
const formConfigRef = computed(() => {
  const cascaderItem = formConfig.formItems.find(
    item => item.field === 'parent'
  )

  cascaderItem.options = store.state.entireCategory.map(item => {
    item.label = item.name
    item.value = item._id

    if (item.children.length > 0) {
      item.children.map(item1 => {
        item1.label = item1.name
        item1.value = item1._id
        return item1
      })
    }

    return item
  })

  return formConfig
})
</script>

<style lang="scss" scoped></style>
