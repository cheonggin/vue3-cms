<template>
  <el-card>
    <MySearch v-model="query" title="添加管理员" @add="showDialog" />

    <PageContent
      ref="pageContentRef"
      :query="query"
      :content-table-config="contentTableConfig"
      page-name="admin"
      @edit="handleEdit"
    >
      <template #roleId="scope">
        {{ scope.row.roleId.name }}
      </template>
    </PageContent>

    <MyDialog
      ref="myDialogRef"
      page-name="admin"
      :form-config="formConfigRef"
      :default-info="defaultInfo"
    />
  </el-card>
</template>

<script setup>
import { useStore } from 'vuex'

import MySearch from '@/components/search/search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import MyDialog from '@/components/dialog/dialog.vue'

import { contentTableConfig } from './config/table.config'
import { formConfig } from './config/form.config'
import { useSearch } from '@/hooks/use-search'
import { useDialog } from '@/hooks/use-dialog'
import { computed } from 'vue-demi'

const { query, pageContentRef } = useSearch()
const { myDialogRef, defaultInfo, showDialog, handleEdit } = useDialog(
  addFn,
  editFn
)

// 动态添加角色列表
const store = useStore()
const formConfigRef = computed(() => {
  const roleItem = formConfig.formItems.find(item => item.field === 'roleId')
  roleItem.options = store.state.entireRole.map(item => {
    return { label: item.name, value: item._id }
  })

  return formConfig
})

// 处理新建与添加对话框中密码框的显示
function addFn() {
  const pwdItem = formConfig.formItems.find(item => item.type === 'password')

  pwdItem.isHidden = false
}

function editFn() {
  const pwdItem = formConfig.formItems.find(item => item.type === 'password')

  pwdItem.isHidden = true
}
</script>

<style lang="scss" scoped></style>
